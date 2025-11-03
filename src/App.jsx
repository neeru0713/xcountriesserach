import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );
        const data = await response.json();
        setCountries(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // Prevent crashing if name is missing
  const filteredCountries = countries.filter((country) =>
    (country?.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-400 rounded-lg px-4 py-2 w-1/2"
        />
      </div>

      {/* 🌍 Country Grid */}
      <div className="grid grid-cols-7 gap-6">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div
              key={country.name}
              className="border rounded-lg shadow p-2 text-center hover:scale-105 transition"
            >
              <img
                src={country.flag}
                alt={country.name}
                className="w-full h-24 object-cover rounded-md"
              />
              <p className="mt-2 font-semibold text-sm">{country.name}</p>
            </div>
          ))
        ) : (
          <p className="col-span-7 text-center text-gray-600">
            No results found
          </p>
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
