import React, { useState } from 'react';

function App() {
  const [claimText, setClaimText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runMultiAgentAnalysis = () => {
    if (!claimText.trim()) {
      alert("Please describe the claim first!");
      return;
    }

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setResult({
        intake: claimText.substring(0, 130) + (claimText.length > 130 ? "..." : ""),
        fraud: "7% Risk",
        policy: "High Match",
        validation: "Valid",
        recommendation: "AUTO APPROVE",
        confidence: "93%"
      });
      setLoading(false);
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-950 via-rose-950 to-fuchsia-950 text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">

        <h1 className="text-7xl font-bold tracking-tighter mb-2">ClaimAI</h1>
        <p className="text-3xl text-pink-300 mb-8">Multi-Agent AI Claims Orchestra</p>

        <div className="bg-white/10 backdrop-blur-2xl border border-pink-300/30 rounded-3xl p-10 shadow-2xl">
          <textarea
            value={claimText}
            onChange={(e) => setClaimText(e.target.value)}
            rows="5"
            className="w-full bg-white/5 border border-pink-300/50 focus:border-pink-400 rounded-2xl p-6 text-lg placeholder-pink-200 focus:outline-none"
            placeholder="Describe the claim here... (e.g., Patient had knee surgery after car accident...)"
          />

          <button
            onClick={runMultiAgentAnalysis}
            disabled={loading}
            className="mt-8 w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold py-6 rounded-2xl text-xl hover:brightness-110 transition disabled:opacity-70"
          >
            {loading ? "🤖 Agents are working..." : "🚀 Run Multi-Agent Orchestra"}
          </button>

          {result && (
            <div className="mt-12 p-8 bg-white/10 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-pink-300">Analysis Result</h3>
              <div className="grid grid-cols-2 gap-6 text-left">
                <div><strong>Intake:</strong> {result.intake}</div>
                <div><strong>Fraud:</strong> {result.fraud}</div>
                <div><strong>Policy:</strong> {result.policy}</div>
                <div><strong>Validation:</strong> {result.validation}</div>
              </div>
              <div className="mt-8 text-4xl font-bold text-pink-300">
                {result.recommendation} ({result.confidence}%)
              </div>
            </div>
          )}
        </div>

        <p className="text-pink-200 mt-8">Beautiful • Responsive • Modern</p>
      </div>
    </div>
  );
}

export default App;
