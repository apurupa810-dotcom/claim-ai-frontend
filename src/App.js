import React, { useState } from 'react';

function App() {
  const [claimText, setClaimText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runMultiAgentAnalysis = () => {
    if (!claimText.trim()) {
      alert("Please enter a claim description!");
      return;
    }

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setResult({
        intake: claimText.substring(0, 140) + (claimText.length > 140 ? "..." : ""),
        fraud: "7% Risk",
        policy: "High Match",
        validation: "Valid",
        recommendation: "AUTO APPROVE",
        confidence: "93%"
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-950 via-rose-950 to-fuchsia-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">

        <h1 className="text-6xl font-bold tracking-tighter text-white mb-2">ClaimAI</h1>
        <p className="text-2xl text-pink-300 mb-12">Multi-Agent AI Claims Orchestra</p>

        <div className="bg-white/10 backdrop-blur-2xl border border-pink-300/30 rounded-3xl p-8 md:p-12">
          <textarea
            value={claimText}
            onChange={(e) => setClaimText(e.target.value)}
            rows="5"
            className="w-full bg-white/5 border border-pink-300/50 rounded-2xl p-6 text-white placeholder-pink-200 focus:outline-none focus:border-pink-400"
            placeholder="Describe the claim here... (e.g. Patient had knee surgery after car accident...)"
          />

          <button
            onClick={runMultiAgentAnalysis}
            disabled={loading}
            className="mt-8 w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold py-6 rounded-2xl text-xl hover:brightness-110 transition disabled:opacity-70"
          >
            {loading ? "🤖 Agents are working..." : "🚀 Run Multi-Agent Orchestra"}
          </button>

          {result && (
            <div className="mt-12 bg-white/10 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-6 text-pink-300">Analysis Result</h3>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div><strong className="text-pink-400">Intake:</strong> {result.intake}</div>
                <div><strong className="text-red-400">Fraud:</strong> {result.fraud}</div>
                <div><strong className="text-emerald-400">Policy:</strong> {result.policy}</div>
                <div><strong className="text-amber-400">Validation:</strong> {result.validation}</div>
              </div>
              <div className="mt-8 text-4xl font-bold text-white">
                {result.recommendation} <span className="text-2xl">({result.confidence}%)</span>
              </div>
            </div>
          )}
        </div>

        <p className="text-pink-200/60 mt-8 text-sm">Fully Responsive • Works on Mobile, Tablet & Desktop</p>
      </div>
    </div>
  );
}

export default App;
