"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CitySearchProps {
  onCitySelect: (city: string) => void;
}

export default function CitySearch({ onCitySelect }: CitySearchProps) {
  const [cities, setCities] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Charger la liste des villes depuis l'API
    fetch("/api/cities")
      .then((res) => res.json())
      .then((data) => setCities(data));
  }, []);

  return (
    <div className="mb-8">
      <div className="max-w-md mx-auto">
        <label htmlFor="city" className="block text-lg font-medium mb-2">
          Sélectionnez une ville
        </label>
        <div className="relative">
          <input
            type="text"
            id="city"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Paris, Lyon, Marseille..."
          />

          {search && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10"
            >
              {cities
                .filter((city) =>
                  city.toLowerCase().includes(search.toLowerCase())
                )
                .map((city, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearch(city);
                      onCitySelect(city);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors"
                  >
                    {city}
                  </button>
                ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
