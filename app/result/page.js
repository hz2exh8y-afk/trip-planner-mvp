"use client";

import { useEffect, useState } from "react";

function parsePlan(text) {
  if (!text) return [];

  const matches = [
    ...text.matchAll(
      /(Day\s*(\d+)|(\d+)\s*일차|(\d+)\s*日目)([\s\S]*?)(?=(Day\s*\d+|\d+\s*일차|\d+\s*日目|$))/gi
    ),
  ];

  const parsed = matches.map((match, index) => {
  const dayNumber =
    Number(match[2] || match[3] || match[4]) || index + 1;

  const content = match[5] || "";

  const morning =
    content.match(
      /(Morning|아침|朝)\s*[:：]?\s*([\s\S]*?)(?=(Afternoon|오후|昼|Evening|저녁|夜|Estimated Cost|예상 비용|料金目安|$))/i
    )?.[2] || "";

  const afternoon =
    content.match(
      /(Afternoon|오후|昼)\s*[:：]?\s*([\s\S]*?)(?=(Evening|저녁|夜|Estimated Cost|예상 비용|料金目安|$))/i
    )?.[2] || "";

  const evening =
    content.match(
      /(Evening|저녁|夜)\s*[:：]?\s*([\s\S]*?)(?=(Estimated Cost|예상 비용|料金目安|$))/i
    )?.[2] || "";

  const estimatedCost =
    content.match(
      /(Estimated Cost|예상 비용|料金目安)\s*[:：]?\s*([\s\S]*?)$/i
    )?.[2] || "";

  return {
    day: dayNumber,
    morning: cleanText(morning),
    afternoon: cleanText(afternoon),
    evening: cleanText(evening),
    estimatedCost: cleanText(estimatedCost),
  };
    });

    const nonEmpty = parsed.filter(
  (d) => d.morning || d.afternoon || d.evening || d.estimatedCost
);

const unique = nonEmpty.filter((item, index, arr) => {
  return (
    index ===
    arr.findIndex(
      (d) =>
        d.day === item.day &&
        d.morning === item.morning &&
        d.afternoon === item.afternoon &&
        d.evening === item.evening &&
        d.estimatedCost === item.estimatedCost
    )
  );
});

return unique;
}

function cleanText(value) {
  return value
    .replace(/\*\*/g, "")
    .replace(/#+/g, "")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

export default function ResultPage() {
  const [plan, setPlan] = useState("");
  const [days, setDays] = useState([]);

  useEffect(() => {
    const savedPlan = localStorage.getItem("travelPlan");
    if (savedPlan) {
      setPlan(savedPlan);
      setDays(parsePlan(savedPlan));
    }
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1e293b 0%, #0f172a 45%, #020617 100%)",
        color: "white",
        padding: "40px",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <button
          onClick={() => (window.location.href = "/")}
          style={{
            marginBottom: "30px",
            padding: "10px 20px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.05)",
            color: "white",
            cursor: "pointer",
          }}
        >
          Back
        </button>

        <h1 style={{ fontSize: "44px", marginBottom: "30px" }}>
          Your itinerary
        </h1>

        {days.map((d) => (
  <div
    key={d.day}
    style={{
      marginBottom: "30px",
      borderRadius: "24px",
      padding: "24px",
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.1)",
    }}
  >
    <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>
      Day {d.day}
    </h2>

    <div style={{ marginBottom: "16px" }}>
      <strong>☀️ Morning</strong>
      <p style={{ opacity: 0.85, whiteSpace: "pre-wrap" }}>
        {d.morning || "No morning plan provided."}
      </p>
    </div>

    <div style={{ marginBottom: "16px" }}>
      <strong>🌆 Afternoon</strong>
      <p style={{ opacity: 0.85, whiteSpace: "pre-wrap" }}>
        {d.afternoon || "No afternoon plan provided."}
      </p>
    </div>

    <div style={{ marginBottom: "16px" }}>
      <strong>🌙 Evening</strong>
      <p style={{ opacity: 0.85, whiteSpace: "pre-wrap" }}>
        {d.evening || "No evening plan provided."}
      </p>
    </div>

    {d.estimatedCost ? (
      <div>
        <strong>💸 Estimated Cost</strong>
        <p style={{ opacity: 0.85 }}>{d.estimatedCost}</p>
      </div>
    ) : null}
  </div>
    ))}
      </div>
    </main>
  );
}