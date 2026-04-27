import React, { useState } from 'react';
import './App.css';

function App() {
  const [claimText, setClaimText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runMultiAgentAnalysis = () => {
    if (!claimText.trim()) {
      alert("Please describe the claim!");
      return;
    }

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setResult(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="App">
      <div className="main-container">
        <h1 className="title">ClaimAI</h1>
        <p className="subtitle">Multi-Agent AI Claims Orchestra</p>

        <div className="demo-card">
          <textarea
            value={claimText}
            onChange={(e) => setClaimText(e.target.value)}
            placeholder="Describe the claim here... (e.g., Patient had knee surgery after car accident...)"
          />

          <button 
            onClick={runMultiAgentAnalysis} 
            disabled={loading}
          >
            {loading ? "AI Agents Working..." : " Run Multi-Agent Orchestra"}
          </button>

          {result && (
            <div className="result">
              <h3>Analysis Complete!</h3>
              <div className="result-grid">
                <div className="result-item">Intake Agent: Claim summarized</div>
                <div className="result-item">Fraud Agent: 7% Risk</div>
                <div className="result-item">Policy Agent: High Match</div>
                <div className="result-item">Validation Agent: Valid</div>
              </div>
              <div className="final-result">
                AUTO APPROVE<br />
                <span>93% Confidence</span>
              </div>
            </div>
          )}
        </div>

        <p className="text-pink-200 mt-8">Modern • Colorful • Responsive</p>
      </div>
    </div>
  );
}

export default App;
