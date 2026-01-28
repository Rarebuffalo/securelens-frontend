"use client";
import { useState , useEffect} from "react";
import ScoreGauge from "./components/ScoreGauge";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const saved = localStorage.getItem("scanHistory");
    if (saved) setHistory(JSON.parse(saved));
    }, []);


  const generateSummary = (result) => {
  if (!result) return "";

  const score = result.security_score;
  const serverIssues = result.layers["Server Config Layer"].issues;
  const exposureIssues = result.layers["Exposure Layer"].issues;

  let summary = "";

  if (score >= 80) {
    summary = "Your application has a strong security posture with only minor improvements recommended.";
  } else if (score >= 50) {
    summary = "Your application is moderately secure but has some security gaps that should be addressed.";
  } else {
    summary = "Your application has critical security weaknesses that require immediate attention.";
  }

  if (serverIssues > 0) {
    summary += " Several important security headers are missing, which can expose users to browser-based attacks.";
  }

  if (exposureIssues > 0) {
    summary += " Sensitive paths are publicly accessible, increasing the risk of data exposure.";
  }

  return summary;
};

  const handleScan = async () => {
    setLoading(true);
    const res = await fetch("http://127.0.0.1:8000/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setResult(data);
    const newEntry = { url, score: data.security_score };
    const updatedHistory = [newEntry, ...history].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem("scanHistory", JSON.stringify(updatedHistory));

    setLoading(false);
  };

  // ✅ Risk level logic (MUST be here, not inside handleScan)
  const getRiskLevel = (score) => {
    if (score >= 80)
      return { label: "Low Risk", color: "bg-green-100 text-green-700" };
    if (score >= 50)
      return { label: "Moderate Risk", color: "bg-yellow-100 text-yellow-700" };
    return { label: "High Risk", color: "bg-red-100 text-red-700" };
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc] p-8 font-sans">
      <h1 className="text-2xl font-bold mb-6">SecureLens AI</h1>
      <h1 className="text-6xl font-bold text-blue-600">SecureLens Working</h1>

      {/* Scan Input */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <div className="flex gap-3">
          <input
            type="url"
            placeholder="https://example.com"
            className="border p-3 rounded w-full"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={handleScan}
            className="bg-blue-600 text-white px-6 py-3 rounded font-semibold"
          >
            {loading ? "Scanning..." : "Scan"}
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow mb-8">
        <h3 className="font-bold mb-3">Recent Scans</h3>
        {history.length === 0 && <p className="text-sm text-gray-400">No scans yet</p>}
        {history.map((item, i) => (
            <div key={i} className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 truncate max-w-[200px]">{item.url}</span>
            <span className="font-semibold">{item.score}/100</span>
            </div>
        ))}
      </div>


      {result && (
        <>
          {/* Score */}
          <div className="bg-white p-6 rounded-xl shadow mb-8 flex flex-col items-center">
            <ScoreGauge score={result.security_score} />

            {/* Risk Label */}
            <div
              className={`mt-4 px-4 py-2 rounded-full text-sm font-bold ${
                getRiskLevel(result.security_score).color
              }`}
            >
              {getRiskLevel(result.security_score).label}
            </div>
          </div>

          {/* Layers */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {Object.entries(result.layers).map(([layer, data]) => (
              <div
                key={layer}
                className={`p-5 rounded-xl shadow bg-white border ${
                  data.status === "green"
                    ? "border-green-200"
                    : data.status === "yellow"
                    ? "border-yellow-200"
                    : "border-red-200"
                }`}
              >
                <h3 className="font-bold mb-1 text-lg">{layer}</h3>
                <p className="text-sm text-gray-500">{data.issues} Issues</p>
                <div
                  className={`mt-3 h-2 rounded ${
                    data.status === "green"
                      ? "bg-green-500"
                      : data.status === "yellow"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* AI Risk Summary */}
          <div className="bg-blue-50 border border-blue-200 text-blue-900 p-5 rounded-xl mb-8">
            <h3 className="font-bold mb-2">Security Analysis Summary</h3>
            <p className="text-sm leading-relaxed">
                {generateSummary(result)}
            </p>
          </div>


          {/* Issues */}
          <div className="bg-white rounded-xl shadow">
            <h3 className="p-5 font-bold border-b">Actionable Issues</h3>

            {result.issues.map((issue, i) => (
              <div key={i} className="p-5 border-b hover:bg-gray-50 transition">
                <div className="flex justify-between mb-1">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded ${
                      issue.severity === "Critical"
                        ? "bg-red-100 text-red-600"
                        : issue.severity === "Warning"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {issue.severity}
                  </span>
                  <span className="text-xs text-gray-400">{issue.layer}</span>
                </div>
                <h4 className="font-semibold text-lg">{issue.issue}</h4>
                <div className="mt-3 bg-gray-50 border rounded-lg p-3">
                  <p className="text-xs font-bold text-gray-600 mb-1">
                    Fix Suggestion
                  </p>
                  <code className="text-sm text-blue-700 font-mono">
                    {issue.fix || "No fix available"}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
