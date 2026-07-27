import React, { useState } from "react";
import "./App.css";

const initialForm = {
  claimId: "",
  description: "",
  amount: "",
  patientName: "",
  policyNumber: "",
  claimType: "MEDICAL",
};

function App() {
  const [formData, setFormData] =
    useState(initialForm);

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] =
    useState(false);

  const apiUrl =
    process.env.REACT_APP_CLAIM_API_URL
    || "http://localhost:8080/api/claims/analyze";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData(previous => ({
      ...previous,
      [name]: value,
    }));
  };

  const runMultiAgentAnalysis = async (
    event
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          claimId:
            formData.claimId.trim() || null,
          description:
            formData.description.trim(),
          patientName:
            formData.patientName.trim(),
          policyNumber:
            formData.policyNumber.trim(),
          amount: Number(formData.amount),
        }),
      });

      const body = await response.json();

      if (!response.ok) {
        const message = body.fieldErrors
          ? Object.values(
              body.fieldErrors
            ).join(" ")
          : body.message
            || "Claim analysis failed.";

        throw new Error(message);
      }

      setResult(body);

    } catch (requestError) {
      setError(
        requestError.message
        || "Unable to contact the backend."
      );
    } finally {
      setLoading(false);
    }
  };

  // Render form and result using result fields.
}
