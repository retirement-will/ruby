"use client";
import { useState } from "react";
import { locations } from "@/lib/locations";
import { scoreCountry } from "@/lib/score";

function getExplanation(country: any, prefs: any) {
  const factors = [];
  if (prefs.healthcare > 0.2 && country.healthcare >= 8) {
    factors.push("strong healthcare");
  }
  if (prefs.cost > 0.2 && country.cost >= 8) {
    factors.push("low cost of living");
  }
  if (prefs.surfing > 0.2 && country.surfing >= 8) {
    factors.push("great for surfing");
  }
  if (prefs.airports > 0.2 && country.airports >= 8) {
    factors.push("excellent airport access");
  }
  return factors.join(", ");
}

export default function Home() {
  const [results, setResults] = useState<any[]>([]);
  const [prefs, setPrefs] = useState({
    surfing: 0.2,
    bjj: 0.1,
    cost: 0.2,
    healthcare: 0.3,
    airports: 0.2,
  });

  const runMatch = () => {
    const scored = locations.map((c) => ({
      ...c,
      score: scoreCountry(c, prefs),
    }));
    const sorted = scored.sort((a, b) => b.score - a.score);
    setResults(sorted);
  };

  return (
    <main className="p-10">
      <h1 className="text-2xl mb-4">Retirement Matcher</h1>
      <div className="space-y-3 mb-4">
        <div>
          <label className="block">Surfing: {prefs.surfing.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={prefs.surfing}
            onChange={(e) =>
              setPrefs({ ...prefs, surfing: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <label className="block">BJJ: {prefs.bjj.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={prefs.bjj}
            onChange={(e) => setPrefs({ ...prefs, bjj: Number(e.target.value) })}
          />
        </div>
        <div>
          <label className="block">Cost: {prefs.cost.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={prefs.cost}
            onChange={(e) => setPrefs({ ...prefs, cost: Number(e.target.value) })}
          />
        </div>
        <div>
          <label className="block">Healthcare: {prefs.healthcare.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={prefs.healthcare}
            onChange={(e) =>
              setPrefs({ ...prefs, healthcare: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <label className="block">Airports: {prefs.airports.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={prefs.airports}
            onChange={(e) =>
              setPrefs({ ...prefs, airports: Number(e.target.value) })
            }
          />
        </div>
      </div>
      <button onClick={runMatch} className="bg-black text-white px-4 py-2">
        Find Best Countries
      </button>
      <div className="mt-6 space-y-4">
        {results.map((r) => (
          <div key={r.name} className="border p-4">
            <h2 className="text-xl">
              {r.name}, {r.country}
            </h2>
            <p>Score: {r.score.toFixed(2)}</p>
            <p>{getExplanation(r, prefs)}</p>
            <p>Activities: {r.activities.join(", ")}</p>
            <p>BJJ Gyms: {r.bjjGyms.join(", ")}</p>
            <p>{r.vibe}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
