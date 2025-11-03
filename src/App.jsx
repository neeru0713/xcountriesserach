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
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // ✅ Safe filtering with optional chaining
  const filteredCountries = countries.filter((country) =>
    country?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Countries Display */}
      <div className="countries-container" style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(7, 1fr)", 
        gap: "1rem", 
        marginTop: "2rem" 
      }}>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.code} className="countryCard">
              <img
                src={country.flag}
                alt={country.name}
                width="100"
                height="60"
              />
              <p>{country.name}</p>
            </div>
          ))
        ) : (
          <p>No countries found.</p>
        )}
      </div>
    </div>
  );
}

      <style>{`
        body {
          margin: 0;
          background-color: #1f2937;
          font-family: Arial, sans-serif;
          color: white;
        }

        .app {
          text-align: center;
          padding: 30px;
        }

        .title {
          margin-bottom: 20px;
          font-size: 24px;
        }

        .searchInput {
          padding: 10px;
          width: 60%;
          border-radius: 8px;
          border: none;
          font-size: 16px;
          margin-bottom: 20px;
          outline: none;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr); /* ✅ Exactly 7 columns */
          gap: 20px;
          justify-items: center;
          align-items: center;
          padding: 20px;
        }

        .countryCard {
          background-color: white;
          color: black;
          border-radius: 10px;
          width: 120px;
          padding: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
          text-align: center;
          transition: transform 0.2s ease-in-out;
        }

        .countryCard:hover {
          transform: scale(1.05);
        }

        .flag {
          width: 100%;
          height: 70px;
          object-fit: cover;
          border-radius: 6px;
        }

        .country-name {
          margin-top: 8px;
          font-weight: bold;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}

export default App;
