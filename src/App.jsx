import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );
        const data = await response.json();

        // ✅ Map data safely (API usually returns { name, flag, code })
        const formatted = data.map((c) => ({
          name: c.name || c.country || "Unknown",
          flag: c.flag || "",
          code: c.code || c.name || Math.random().toString(),
        }));

        setCountries(formatted);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // ✅ Filter countries case-insensitively
  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Countries</h1>
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div
        className="countries-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        {filtered.length > 0 ? (
          filtered.map((c) => (
            <div key={c.code} className="countryCard">
              <img src={c.flag} alt={c.name} width="100" height="60" />
              <p>{c.name}</p>
            </div>
          ))
        ) : (
          <p>No countries found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
