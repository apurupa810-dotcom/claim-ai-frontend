import React, { useState } from 'react';

function App() {
  const [claimText, setClaimText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runMultiAgentAnalysis = () => {
    if (!claimText.trim()) {
      alert("Please describe the claim first! 😊");
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
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 p-4 flex items-center justify-center">
      <div className="max-w-3xl w-full">

        {/* Fun Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-5xl">🤖</span>
            <h1 className="text-6xl font-bold text-white tracking-tighter">ClaimAI</h1>
          </div>
          <p className="text-2xl text-white/90">Multi-Agent AI Claims Orchestra</p>
          <p className="text-pink-200 mt-2">React • Java • Python • AI Magic</p>
        </div>

        {/* Main Interactive Card */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/30 rounded-3xl p-8 md:p-12 shadow-2xl">
          <textarea
            value={claimText}
            onChange={(e) => setClaimText(e.target.value)}
            rows="5"
            className="w-full bg-white/10 border border-white/40 focus:border-pink-300 rounded-2xl p-6 text-white placeholder-white/60 focus:outline-none text-lg resize-y"
            placeholder="Tell me about the claim... (e.g., Patient had knee surgery after car accident...)"
          />

          <button
            onClick={runMultiAgentAnalysis}
            disabled={loading}
            className="mt-8 w-full bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 hover:from-pink-400 hover:via-rose-400 hover:to-fuchsia-400 text-white font-bold py-6 rounded-2xl text-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 hover:scale-105"
          >
            {loading ? (
              <>🤖 AI Agents are thinking...</>
            ) : (
              <>🚀 Run Multi-Agent Orchestra</>
            )}
          </button>

          {/* Result Section - Interactive */}
          {result && (
            <div className="mt-12 animate-fade-in">
              <h3 className="text-3xl font-bold text-center text-white mb-8">🎉 Analysis Complete!</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
                  <p className="text-pink-300 font-medium">Intake Agent</p>
                  <p className="mt-3 text-white/90">"{result.intake}"</p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
                  <p className="text-red-300 font-medium">Fraud Agent</p>
                  <p className="mt-3 text-4xl font-bold text-red-300">{result.fraud}</p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
                  <p className="text-emerald-300 font-medium">Policy Agent</p>
                  <p className="mt-3 text-4xl font-bold text-emerald-300">{result.policy}</p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
                  <p className="text-amber-300 font-medium">Validation Agent</p>
                  <p className="mt-3 text-4xl font-bold text-amber-300">{result.validation}</p>
                </div>
              </div>

              <div className="mt-10 bg-gradient-to-r from-emerald-400 to-teal-400 p-10 rounded-3xl text-center text-black font-bold">
                <p className="text-5xl">{result.recommendation}</p>
                <p className="text-3xl mt-4 opacity-90">{result.confidence}% Confidence</p>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-white/60 mt-8 text-sm">
          Fully Responsive • Beautiful on Phone, Tablet & Desktop
        </p>
      </div>
    </div>
  );
}

export default App;
