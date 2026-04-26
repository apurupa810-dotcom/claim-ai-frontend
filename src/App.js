import React, { useState } from 'react';
import './App.css';

function App() {
  const [claimText, setClaimText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runMultiAgentAnalysis = async () => {
    if (!claimText.trim()) {
      alert("Please enter a claim description!");
      return;
    }

    setLoading(true);
    setResult(null);

    // Simulate calling your Java + Python backend
    setTimeout(() => {
      setResult({
        intake: claimText.length > 100 ? claimText.substring(0, 100) + "..." : claimText,
        fraudRisk: "7%",
        policyMatch: "High",
        validation: "Valid",
        recommendation: "AUTO-APPROVE",
        confidence: "93%"
      });
      setLoading(false);
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-900 via-blue-900 to-violet-900 text-white py-24 text-center">
        <h1 className="text-7xl font-bold tracking-tighter">ClaimAI</h1>
        <p className="text-4xl mt-4 text-blue-300">Multi-Agent AI Claims Orchestra</p>
        <p className="mt-6 text-xl max-w-3xl mx-auto px-6">
          Built with <strong>React Hooks</strong> • Java Spring Boot • Python AI Agents
        </p>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-semibold text-center mb-4">Try Multi-Agent Demo</h2>
        <p className="text-center text-slate-600 mb-12">Watch 4 specialized AI agents collaborate in real-time</p>

        <div className="bg-white rounded-3xl shadow-xl p-10">
          <textarea
            value={claimText}
            onChange={(e) => setClaimText(e.target.value)}
            rows="6"
            className="w-full border border-slate-300 focus:border-violet-500 rounded-2xl p-6 text-lg resize-y focus:outline-none"
            placeholder="Describe the claim... Example: Patient had knee surgery after a car accident on March 15..."
          />

          <button
            onClick={runMultiAgentAnalysis}
            disabled={loading}
            className="mt-8 w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white py-6 rounded-2xl font-semibold text-xl transition-all flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <span className="animate-spin">⟳</span>
                Agents Collaborating...
              </>
            ) : (
              <>
                <span>🚀</span> Run Multi-Agent Orchestra
              </>
            )}
          </button>

          {result && (
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-8 text-center">Multi-Agent Analysis Result</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-2xl">
                  <p className="font-medium text-violet-700">Intake Agent</p>
                  <p className="mt-3 text-slate-600 italic">"{result.intake}"</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl">
                  <p className="font-medium text-red-600">Fraud Agent</p>
                  <p className="mt-3 text-3xl font-bold text-red-600">{result.fraudRisk} Risk</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl">
                  <p className="font-medium text-emerald-600">Policy Agent</p>
                  <p className="mt-3 text-3xl font-bold text-emerald-600">{result.policyMatch}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl">
                  <p className="font-medium text-amber-600">Validation Agent</p>
                  <p className="mt-3 text-3xl font-bold text-amber-600">{result.validation}</p>
                </div>
              </div>

              <div className="mt-10 bg-emerald-50 border border-emerald-200 p-10 rounded-3xl text-center">
                <p className="text-4xl font-bold text-emerald-700">{result.recommendation}</p>
                <p className="text-2xl text-emerald-600 mt-3">{result.confidence} Confidence</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
