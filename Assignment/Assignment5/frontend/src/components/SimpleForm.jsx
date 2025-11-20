import React, { useState } from "react";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle HTTP errors
        throw new Error(data.error || "Failed to submit data");
      }

      console.log("Response:", data);
      alert("User added successfully!");
      
      // Reset form
      setFormData({
        name: "",
        Age: "",
        email: "",
        password: ""
      });
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
      alert("Failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "340px", margin: "auto", padding: "20px" }}>
      <h2>User Registration</h2>

      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="number"
          name="Age"
          placeholder="Enter Age" 
          value={formData.Age}
          onChange={handleChange}
          required
          min={0}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}     
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password (min 6 chars)"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: "100%", 
            padding: "10px", 
            backgroundColor: loading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;