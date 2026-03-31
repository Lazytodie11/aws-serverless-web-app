import React, { useState } from "react";
import "./App.css";

const API_BASE = "https://s2y97oaed2.execute-api.us-east-2.amazonaws.com/prod";

function App() {
  const [num, setNum] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConvert = async () => {
    setError("");
    setResult(null);

    const trimmedNum = num.trim();

    if (!trimmedNum) {
      setError("Please enter a number first.");
      return;
    }

    if (!/^\d+$/.test(trimmedNum)) {
      setError("Please enter a non-negative integer.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/num2words?num=${encodeURIComponent(trimmedNum)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed.");
      }

      setResult(data);
      setNum("");

      const newRecord = {
        id: `${Date.now()}-${data.number}`,
        number: data.number,
        words: data.words,
        saved: data.saved,
        createdAt: new Date().toLocaleString(),
      };

      setHistory((prev) => [newRecord, ...prev].slice(0, 8));
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      handleConvert();
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="left-panel">
          <div className="hero">
            <div className="badge">AWS Serverless Web App</div>
            <h1>Num2Words Converter</h1>
            <p>
              Enter a non-negative integer, send it to your API Gateway + Lambda
              backend, and confirm the request is saved to DynamoDB.
            </p>
          </div>

          <div className="card">
            <h2>Convert a Number</h2>
            <div className="input-row">
              <input
                type="text"
                value={num}
                onChange={(e) => setNum(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Try 11, 123, or 999"
              />
              <button onClick={handleConvert} disabled={loading}>
                {loading ? "Converting..." : "Convert"}
              </button>
            </div>
            <p className="hint">Current backend limit: supports 0 to 999.</p>

            {error && <div className="error-box">{error}</div>}
          </div>

          <div className="card">
            <h2>Latest Result</h2>
            {result ? (
              <div className="result-grid">
                <div className="result-box">
                  <div className="label">Number</div>
                  <div className="value">{result.number}</div>
                </div>

                <div className="result-box wide">
                  <div className="label">Words</div>
                  <div className="value">{result.words}</div>
                </div>

                <div className="result-box full">
                  <div className="label">Saved to DynamoDB</div>
                  <div className="value">
                    {result.saved ? "Yes" : "No"}
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-box">
                No result yet. Submit a number to see the conversion result.
              </div>
            )}
          </div>
        </div>

        <div className="right-panel">
          <div className="card">
            <h2>Recent Requests</h2>
            {history.length === 0 ? (
              <div className="empty-box">
                Your recent conversions will appear here.
              </div>
            ) : (
              <div className="history-list">
                {history.map((item) => (
                  <div className="history-item" key={item.id}>
                    <div className="history-top">
                      <div>
                        <div className="history-number">{item.number}</div>
                        <div className="history-words">{item.words}</div>
                      </div>
                      <span className="status-badge">
                        {item.saved ? "saved" : "not saved"}
                      </span>
                    </div>
                    <div className="history-time">{item.createdAt}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;