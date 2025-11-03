import React, { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags"
        );
        const data = await response.json();

        console.log("Fetched countries:", data); // ✅ check array

        const formattedData = data.map((country) => ({
          name: country?.name?.common || "Unknown",
          flag: country?.flags?.svg || country?.flags?.png || "",
        }));

        setCountries(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1 className="title">Countries and Flags</h1>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchInput"
      />

      <div className="grid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.name} className="countryCard">
              <img src={country.flag} alt={country.name} className="flag" />
              <h2 className="country-name">{country.name}</h2>
            </div>
          ))
        ) : (
          <p className="noResults">No countries found</p>
        )}
      </div>

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
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
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

        .noResults {
          grid-column: 1 / -1;
          font-size: 18px;
          color: #ff6666;
        }
      `}</style>
    </div>
  );
}

export default App;
