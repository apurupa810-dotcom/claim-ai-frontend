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
      const response = await axios.post('http://localhost:8080/api/claims/analyze', {
        description: claimText,
        amount: 12450.0,
        claimType: "medical"
      });

      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Backend not running → Showing demo mode");

      setResult({
        agents: {
          intake_agent: claimText.substring(0, 150) + "...",
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
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <header className="bg-gradient-to-br from-indigo-950 to-violet-950 text-white py-28 text-center">
        <h1 className="text-7xl font-bold tracking-tighter">ClaimAI</h1>
        <p className="text-4xl mt-4 text-violet-300">Multi-Agent AI Claims Orchestra</p>
        <p className="mt-6 text-xl max-w-2xl mx-auto px-6">
          React Hooks + Java Spring Boot + Python AI Agents
        </p>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-semibold text-center mb-4">Live Multi-Agent Demo</h2>
        <p className="text-center text-slate-600 mb-12">4 AI Agents working together in real-time</p>

        <div className="bg-white rounded-3xl shadow-2xl p-10">
          <textarea
            value={claimText}
            onChange={(e) => setClaimText(e.target.value)}
            rows="5"
            className="w-full border border-slate-300 focus:border-violet-500 rounded-2xl p-6 text-lg focus:outline-none"
            placeholder="Enter a detailed claim description..."
          />

          <button
            onClick={runMultiAgentAnalysis}
            disabled={loading}
            className="mt-8 w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white py-6 rounded-2xl font-semibold text-xl flex items-center justify-center gap-3"
          >
            {loading ? "🤖 Agents Collaborating..." : "🚀 Run Multi-Agent Orchestra"}
          </button>

          {error && <p className="text-amber-600 text-center mt-4">{error}</p>}

          {result && (
            <div className="mt-12 space-y-8">
              <h3 className="text-2xl font-semibold text-center">Agent Analysis Results</h3>

              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(result.agents || {}).map(([key, value]) => (
                  <div key={key} className="agent-card bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <p className="font-semibold text-violet-700 capitalize">{key.replace('_', ' ')}</p>
                    <p className="mt-3 text-slate-700">{value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-50 border-2 border-emerald-200 p-10 rounded-3xl text-center">
                <p className="text-5xl font-bold text-emerald-700">{result.final_recommendation}</p>
                <p className="text-2xl text-emerald-600 mt-4">{result.confidence}% Confidence</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
