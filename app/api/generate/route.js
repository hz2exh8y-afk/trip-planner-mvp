import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      destination,
      days,
      budget,
      foodNotes,
      groupType,
      goal,
      interests,
      language,
    } = body;

    const languageName =
      language === "ko" ? "Korean" :
      language === "ja" ? "Japanese" :
      "English";
      

    if (!destination || !days || !budget) {
      return Response.json(
        { error: "Destination, days, and budget are required." },
        { status: 400 }
      );
    }

    const parsedDays = Number(days);
    const parsedBudget = Number(budget);

    if (Number.isNaN(parsedDays) || parsedDays < 1 || parsedDays > 14) {
      return Response.json(
        { error: "Days must be a number between 1 and 14." },
        { status: 400 }
      );
    }

    if (Number.isNaN(parsedBudget) || parsedBudget <= 0) {
      return Response.json(
        { error: "Budget must be a valid positive number." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Missing GEMINI_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const safeInterests = Array.isArray(interests) ? interests : [];

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
You are a professional travel planner.

IMPORTANT:
Write the entire itinerary in ${languageName}.
Do not mix languages.

Create a detailed ${parsedDays}-day travel itinerary for a trip to ${destination}.

Traveler profile:
- Group type: ${groupType || "Traveler"}
- Main goal: ${goal || "Easy and enjoyable travel"}
- Food preferences: ${foodNotes || "No special preference"}
- Interests: ${
      safeInterests.length ? safeInterests.join(", ") : "General sightseeing"
    }

Budget:
- Maximum daily budget: $${parsedBudget}

Requirements:
1. Break each day into:
   - Morning
   - Afternoon
   - Evening

2. Include:
   - attractions
   - food recommendations
   - local experiences
   - estimated daily cost

3. Keep the plan realistic and easy to follow.
4. Keep places geographically close when possible.
5. Use simple and helpful wording.

Output format exactly like this:

Day 1
Morning:
Afternoon:
Evening:
Estimated Cost:

Day 2
Morning:
Afternoon:
Evening:
Estimated Cost:
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return Response.json({ plan: response.text || "No itinerary generated." });
  } catch (error) {
    console.error("Generate API error:", error);

    return Response.json(
      { error: error?.message || "Failed to generate itinerary." },
      { status: 500 }
    );
  }
}