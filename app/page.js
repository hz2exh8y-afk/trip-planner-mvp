"use client";

import { useEffect, useMemo, useState } from "react";
const LANGUAGE_OPTIONS = [
  { label: "English", value: "en" },
  { label: "한국어", value: "ko" },
  { label: "日本語", value: "ja" },
];



const UI_TEXT = {
  en: {
    titleCountry: "Pick a country",
    subtitleCountry: "Choose where you want to travel. Popular destinations are larger for faster selection.",
    titleCity: "Choose a city",
    subtitleCity: "Pick the city you want to build the trip around.",
    titleDays: "Trip length",
    subtitleDays: "Pick the number of days.",
    titleBudget: "Budget",
    subtitleBudget: "Choose a daily spending style.",
    titleInterests: "Interests",
    subtitleInterests: "Choose one or more interests, then generate your trip.",
    back: "Back",
    generate: "Generate Trip",
    loadingTitle: "Building your trip",
    loadingSubtitle: "Planning the route, finding food spots, and shaping your itinerary.",
    planning: "✈️ Planning your trip...",
    food: "🍜 Finding food spots...",
    route: "🗺️ Building itinerary...",
    countries: {
      Japan: "Japan",
      France: "France",
      Italy: "Italy",
      Korea: "Korea",
      USA: "USA",
    },
    cities: {
      Tokyo: "Tokyo",
      Osaka: "Osaka",
      Kyoto: "Kyoto",
      Fukuoka: "Fukuoka",
      Sapporo: "Sapporo",
      Paris: "Paris",
      Nice: "Nice",
      Lyon: "Lyon",
      Bordeaux: "Bordeaux",
      Marseille: "Marseille",
      Rome: "Rome",
      Milan: "Milan",
      Florence: "Florence",
      Venice: "Venice",
      Naples: "Naples",
      Seoul: "Seoul",
      Busan: "Busan",
      Jeju: "Jeju",
      Gyeongju: "Gyeongju",
      Incheon: "Incheon",
      "New York": "New York",
      "Los Angeles": "Los Angeles",
      "Las Vegas": "Las Vegas",
      Chicago: "Chicago",
      Miami: "Miami",
    },
    interests: {
      Food: "Food",
      Shopping: "Shopping",
      Culture: "Culture",
      Nature: "Nature",
      Nightlife: "Nightlife",
      Relax: "Relax",
    },
    budgets: {
      Budget: "Budget",
      Comfort: "Comfort",
      Premium: "Premium",
    },
  },

  ko: {
    titleCountry: "나라를 선택하세요",
    subtitleCountry: "가고 싶은 나라를 고르세요. 인기 있는 곳은 더 크게 보여서 더 빨리 선택할 수 있어요.",
    titleCity: "도시를 선택하세요",
    subtitleCity: "여행 일정을 만들 도시를 고르세요.",
    titleDays: "여행 기간",
    subtitleDays: "며칠 동안 여행할지 고르세요.",
    titleBudget: "예산",
    subtitleBudget: "하루 예산 스타일을 고르세요.",
    titleInterests: "관심사",
    subtitleInterests: "관심사를 하나 이상 고른 뒤 여행 일정을 생성하세요.",
    back: "뒤로",
    generate: "여행 일정 만들기",
    loadingTitle: "여행 일정을 만드는 중",
    loadingSubtitle: "동선을 짜고, 음식점을 찾고, 여행 일정을 정리하고 있어요.",
    planning: "✈️ 여행 일정을 계획하는 중...",
    food: "🍜 음식 장소를 찾는 중...",
    route: "🗺️ 동선을 만드는 중...",
    countries: {
      Japan: "일본",
      France: "프랑스",
      Italy: "이탈리아",
      Korea: "한국",
      USA: "미국",
    },
    cities: {
      Tokyo: "도쿄",
      Osaka: "오사카",
      Kyoto: "교토",
      Fukuoka: "후쿠오카",
      Sapporo: "삿포로",
      Paris: "파리",
      Nice: "니스",
      Lyon: "리옹",
      Bordeaux: "보르도",
      Marseille: "마르세유",
      Rome: "로마",
      Milan: "밀라노",
      Florence: "피렌체",
      Venice: "베네치아",
      Naples: "나폴리",
      Seoul: "서울",
      Busan: "부산",
      Jeju: "제주",
      Gyeongju: "경주",
      Incheon: "인천",
      "New York": "뉴욕",
      "Los Angeles": "로스앤젤레스",
      "Las Vegas": "라스베이거스",
      Chicago: "시카고",
      Miami: "마이애미",
    },
    interests: {
      Food: "음식",
      Shopping: "쇼핑",
      Culture: "문화",
      Nature: "자연",
      Nightlife: "야경",
      Relax: "휴식",
    },
    budgets: {
      Budget: "가성비",
      Comfort: "보통",
      Premium: "프리미엄",
    },
  },

  ja: {
    titleCountry: "国を選んでください",
    subtitleCountry: "行きたい国を選んでください。人気のある場所は少し大きく表示されます。",
    titleCity: "都市を選んでください",
    subtitleCity: "旅程を作成する都市を選んでください。",
    titleDays: "旅行日数",
    subtitleDays: "何日間旅行するか選んでください。",
    titleBudget: "予算",
    subtitleBudget: "1日あたりの予算スタイルを選んでください。",
    titleInterests: "興味",
    subtitleInterests: "興味を1つ以上選んでから旅程を生成してください。",
    back: "戻る",
    generate: "旅行プランを作成",
    loadingTitle: "旅行プランを作成中",
    loadingSubtitle: "ルート、食事スポット、旅程を整理しています。",
    planning: "✈️ 旅行プランを作成中...",
    food: "🍜 食事スポットを探しています...",
    route: "🗺️ ルートを整理しています...",
    countries: {
      Japan: "日本",
      France: "フランス",
      Italy: "イタリア",
      Korea: "韓国",
      USA: "アメリカ",
    },
    cities: {
      Tokyo: "東京",
      Osaka: "大阪",
      Kyoto: "京都",
      Fukuoka: "福岡",
      Sapporo: "札幌",
      Paris: "パリ",
      Nice: "ニース",
      Lyon: "リヨン",
      Bordeaux: "ボルドー",
      Marseille: "マルセイユ",
      Rome: "ローマ",
      Milan: "ミラノ",
      Florence: "フィレンツェ",
      Venice: "ヴェネツィア",
      Naples: "ナポリ",
      Seoul: "ソウル",
      Busan: "釜山",
      Jeju: "済州",
      Gyeongju: "慶州",
      Incheon: "仁川",
      "New York": "ニューヨーク",
      "Los Angeles": "ロサンゼルス",
      "Las Vegas": "ラスベガス",
      Chicago: "シカゴ",
      Miami: "マイアミ",
    },
    interests: {
      Food: "グルメ",
      Shopping: "ショッピング",
      Culture: "文化",
      Nature: "自然",
      Nightlife: "ナイトライフ",
      Relax: "リラックス",
    },
    budgets: {
      Budget: "節約",
      Comfort: "標準",
      Premium: "プレミアム",
    },
  },
};

const DESTINATIONS = {
  Japan: [
    { name: "Tokyo", popularity: 100 },
    { name: "Osaka", popularity: 85 },
    { name: "Kyoto", popularity: 82 },
    { name: "Fukuoka", popularity: 58 },
    { name: "Sapporo", popularity: 55 },
  ],
  France: [
    { name: "Paris", popularity: 100 },
    { name: "Nice", popularity: 74 },
    { name: "Lyon", popularity: 68 },
    { name: "Bordeaux", popularity: 56 },
    { name: "Marseille", popularity: 52 },
  ],
  Italy: [
    { name: "Rome", popularity: 100 },
    { name: "Milan", popularity: 76 },
    { name: "Florence", popularity: 73 },
    { name: "Venice", popularity: 71 },
    { name: "Naples", popularity: 58 },
  ],
  Korea: [
    { name: "Seoul", popularity: 100 },
    { name: "Busan", popularity: 78 },
    { name: "Jeju", popularity: 72 },
    { name: "Gyeongju", popularity: 50 },
    { name: "Incheon", popularity: 46 },
  ],
  USA: [
    { name: "New York", popularity: 100 },
    { name: "Los Angeles", popularity: 86 },
    { name: "Las Vegas", popularity: 74 },
    { name: "Chicago", popularity: 66 },
    { name: "Miami", popularity: 62 },
  ],
};

const COUNTRY_OPTIONS = [
  { name: "Japan", popularity: 100 },
  { name: "France", popularity: 82 },
  { name: "Italy", popularity: 78 },
  { name: "Korea", popularity: 75 },
  { name: "USA", popularity: 84 },
];

const DAY_OPTIONS = [
  { label: "2 Days", value: 2, popularity: 55 },
  { label: "3 Days", value: 3, popularity: 82 },
  { label: "5 Days", value: 5, popularity: 100 },
  { label: "7 Days", value: 7, popularity: 76 },
  { label: "10 Days", value: 10, popularity: 48 },
];

const BUDGET_OPTIONS = [
  { label: "Budget", value: "budget", hint: "$50–100/day", popularity: 72 },
  { label: "Comfort", value: "comfort", hint: "$100–200/day", popularity: 100 },
  { label: "Premium", value: "premium", hint: "$200+/day", popularity: 58 },
];

const INTEREST_OPTIONS = [
  { label: "Food", value: "Food", popularity: 100 },
  { label: "Shopping", value: "Shopping", popularity: 78 },
  { label: "Culture", value: "Culture", popularity: 74 },
  { label: "Nature", value: "Nature", popularity: 62 },
  { label: "Nightlife", value: "Nightlife", popularity: 64 },
  { label: "Relax", value: "Relax", popularity: 56 },
];

function getBubbleSize(popularity = 70) {
  if (popularity >= 95) {
    return { width: "160px", height: "160px", fontSize: "20px" };
  }
  if (popularity >= 75) {
    return { width: "140px", height: "140px", fontSize: "18px" };
  }
  if (popularity >= 60) {
    return { width: "126px", height: "126px", fontSize: "16px" };
  }
  return { width: "112px", height: "112px", fontSize: "15px" };
}

function Bubble({ label, hint, popularity, selected, onClick }) {
  const size = getBubbleSize(popularity);

  return (
    <button
      onClick={onClick}
      style={{
        ...size,
        borderRadius: "999px",
        border: selected
          ? "1px solid rgba(255,255,255,0.75)"
          : "1px solid rgba(255,255,255,0.14)",
        background: selected
          ? "rgba(255,255,255,0.9)"
          : "rgba(255,255,255,0.08)",
        color: selected ? "#0f172a" : "white",
        fontWeight: 600,
        cursor: "pointer",
        backdropFilter: "blur(10px)",
        transition: "all 0.2s ease",
        boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "12px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
      }}
    >
      <div>{label}</div>
      {hint ? (
        <div style={{ marginTop: "6px", fontSize: "11px", opacity: 0.75 }}>
          {hint}
        </div>
      ) : null}
    </button>
  );
}

function Screen({ title, subtitle, children, onBack, showBack = true, backLabel = "Back" }) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1e293b 0%, #0f172a 45%, #020617 100%)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          width: "100%",
          margin: "0 auto",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {showBack ? (
            <button
              onClick={onBack}
              style={{
                padding: "10px 18px",
                borderRadius: "999px",
                border: "1px solid rgba(143, 137, 137, 0.14)",
                background: "rgba(0, 0, 0, 0.05)",
                color: "white",
                cursor: "pointer",
              }}
            >
              Back
            </button>
          ) : (
            <div />
          )}

          <div
            style={{
              padding: "10px 16px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            AI Travel Planner
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "54px", marginBottom: "14px", fontWeight: 700 }}>
            {title}
          </h1>
          <p
            style={{
              maxWidth: "760px",
              marginBottom: "40px",
              color: "rgba(255,255,255,0.68)",
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "24px",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "920px",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Page() {
  const [language, setLanguage] = useState("en");
  useEffect(() => {
  const browserLang = navigator.language || "";

  if (browserLang.startsWith("ko")) {
    setLanguage("ko");
  } else if (browserLang.startsWith("ja")) {
    setLanguage("ja");
  } else {
    setLanguage("en");
  }
}, []);

  const t = UI_TEXT[language] || UI_TEXT.en;

  const [step, setStep] = useState(1);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [days, setDays] = useState(null);
  const [budget, setBudget] = useState("");
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);


  const cities = useMemo(() => DESTINATIONS[country] || [], [country]);

  function toggleInterest(value) {
    setInterests((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  }

  async function generateTrip() {
    if (!country || !city || !days || !budget || interests.length === 0) {
      alert("Please complete all steps first.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        destination: city || country,
        days,
        budget: budget === "budget" ? 100 : budget === "comfort" ? 180 : 300,
        foodNotes: interests.includes("Food") ? "Interested in good local food" : "",
        groupType: "Traveler",
        goal: "Balanced travel plan",
        interests,
        language,
      };

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate itinerary.");
      }

      if (!data.plan) {
        throw new Error("No itinerary was returned.");
      }

      localStorage.setItem(
        "travelForm",
        JSON.stringify({ country, city, days, budget, interests })
      );
      localStorage.setItem("travelPlan", data.plan);

      window.location.href = "/result";
    } catch (error) {
      alert(error.message || "Something went wrong.");
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Screen
        title={t.loadingTitle}
        subtitle={t.loadingSubtitle}
        showBack={false}
      >
        <div
          style={{
            padding: "28px 34px",
            borderRadius: "32px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.08)",
            minWidth: "320px",
            lineHeight: 2,
            fontSize: "18px",
          }}
        >
        <div>{t.planning}</div>
        <div>{t.food}</div>
        <div>{t.route}</div>
        </div>
      </Screen>
    );
  }

  if (step === 1) {
    return (
      <Screen
        title={t.titleCountry}
        subtitle={t.subtitleCountry}
        showBack={false}
      >
         <div 
            style={{ 
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "24px", 
              }}
              >
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: "12px 18px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.08)",
            color: "white",
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
            outline: "none",
            cursor: "pointer",
            minWidth: "160px",
           textAlign: "center",
  }}
>
  {LANGUAGE_OPTIONS.map((l) => (
          <option
            key={l.value}
            value={l.value}
            style={{
              backgroundColor: "#0f172a",
              color: "white",
      }}
    >
        {l.label}
    </option>
  ))}
</select>
      </div>

        {COUNTRY_OPTIONS.map((item) => (
          <Bubble
            key={item.name}
            label={t.countries[item.name] || item.name}
            popularity={item.popularity}
            selected={country === item.name}
            onClick={() => {
              setCountry(item.name);
              setCity("");
              setStep(2);
            }}
          />
        ))}
      </Screen>
    );
  }

  if (step === 2) {
    return (
      <Screen
        title={t.titleCity}
        subtitle={t.subtitleCity}
        onBack={() => setStep(1)}
      >
        {cities.map((item) => (
          <Bubble
            key={item.name}
            label={t.cities[item.name] || item.name}
            popularity={item.popularity}
            selected={city === item.name}
            onClick={() => {
              setCity(item.name);
              setStep(3);
            }}
          />
        ))}
      </Screen>
    );
  }

  if (step === 3) {
    return (
      <Screen
        title={t.titleDays}
        subtitle={t.subtitleDays}
        onBack={() => setStep(2)}
      >
        {DAY_OPTIONS.map((item) => (
          <Bubble
            key={item.value}
            label={item.label}
            popularity={item.popularity}
            selected={days === item.value}
            onClick={() => {
              setDays(item.value);
              setStep(4);
            }}
          />
        ))}
      </Screen>
    );
  }

  if (step === 4) {
    return (
      <Screen
        title={t.titleBudget}
        subtitle={t.subtitleBudget}
        onBack={() => setStep(3)}
      >
        {BUDGET_OPTIONS.map((item) => (
          <Bubble
            key={item.value}
            label={t.budgets[item.label] || item.label}
            hint={item.hint}
            popularity={item.popularity}
            selected={budget === item.value}
            onClick={() => {
              setBudget(item.value);
              setStep(5);
            }}
          />
        ))}
      </Screen>
    );
  }

  return (
    <Screen
      title={t.titleInterests}
      subtitle={t.subtitleInterests}
      onBack={() => setStep(4)}
       backLabel={t.back}
    >
      {INTEREST_OPTIONS.map((item) => (
        <Bubble
          key={item.value}
          label={t.interests[item.value] || item.label}
          popularity={item.popularity}
          selected={interests.includes(item.value)}
          onClick={() => toggleInterest(item.value)}
        />
      ))}

      <div style={{ width: "100%", marginTop: "20px" }}>
        <button
          onClick={generateTrip}
          style={{
            padding: "16px 30px",
            borderRadius: "999px",
            border: "none",
            background: "white",
            color: "#0f172a",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {t.generate}
        </button>
      </div>
    </Screen>
  );
}