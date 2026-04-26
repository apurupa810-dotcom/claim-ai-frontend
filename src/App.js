import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [claimText, setClaimText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runMultiAgentAnalysis = async () => {
    if (!claimText.trim()) {
      alert("Please enter a claim description!");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Call your Java Backend (which calls Python AI Service)
      const response = await axios.post('http://localhost:8080/api/claims/analyze', {
        description: claimText,
        amount: 12450.0,
        claimType: "medical"
      });

      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Backend is not running. Showing demo result.");
      
      // Fallback demo result
      setResult({
        agents: {
          intake_agent: claimText.substring(0, 120) + "...",
          fraud_agent: "Fraud Risk: 7%",
          policy_agent: "Policy Match: High",
          validation_agent: "Medical Validation: Valid"
        },
        final_recommendation: "AUTO-APPROVE",
        confidence: 93
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <header className="bg-gradient-to-r from-indigo-900 via-blue-900 to-violet-900 text-white py-24 text-center">
        <h1 className="text-7xl font-bold tracking-tighter">ClaimAI</h1>
        <p className="text-4xl mt-4 text-blue-300">Multi-Agent AI Claims Orchestra</p>
        <p className="mt-6 text-xl">React + Java Spring Boot + Python AI</p>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-semibold text-center mb-8">Try Multi-Agent Demo</h2>

        <div className="bg-white rounded-3xl shadow-xl p-10">
          <textarea
            value={claimText}
            onChange={(e) => setClaimText(e.target.value)}
            rows="6"
            className="w-full border border-slate-300 focus:border-violet-500 rounded-2xl p-6 text-lg resize-y focus:outline-none"
            placeholder="Enter claim description here..."
          />

          <button
            onClick={runMultiAgentAnalysis}
            disabled={loading}
            className="mt-8 w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white py-6 rounded-2xl font-semibold text-xl transition-all flex items-center justify-center gap-3"
          >
            {loading ? "Agents Collaborating..." : "🚀 Run Multi-Agent Orchestra"}
          </button>

          {error && <p className="text-amber-600 text-center mt-4">{error}</p>}

          {result && (
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-8 text-center">Multi-Agent Analysis Result</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-2xl">
                  <p className="font-medium text-violet-700">Intake Agent</p>
                  <p className="mt-3 text-slate-600">"{result.agents?.intake_agent || result.intake}"</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl">
                  <p className="font-medium text-red-600">Fraud Agent</p>
                  <p className="mt-3 text-3xl font-bold text-red-600">{result.agents?.fraud_agent || "7%"}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl">
                  <p className="font-medium text-emerald-600">Policy Agent</p>
                  <p className="mt-3 text-3xl font-bold text-emerald-600">{result.agents?.policy_agent || "High"}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl">
                  <p className="font-medium text-amber-600">Validation Agent</p>
                  <p className="mt-3 text-3xl font-bold text-amber-600">{result.agents?.validation_agent || "Valid"}</p>
                </div>
              </div>

              <div className="mt-10 bg-emerald-50 border border-emerald-200 p-10 rounded-3xl text-center">
                <p className="text-4xl font-bold text-emerald-700">
                  {result.final_recommendation || result.recommendation}
                </p>
                <p className="text-2xl text-emerald-600 mt-3">
                  {result.confidence}% Confidence
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
