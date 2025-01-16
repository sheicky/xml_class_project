"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MovieCard from "@/components/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { Movie, Screening } from "@prisma/client";

type MovieWithScreenings = Movie & {
  screenings: Screening[];
};

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [minDuration, setMinDuration] = useState("");
  const [maxDuration, setMaxDuration] = useState("");

  const { data: movies = [], isLoading } = useQuery<MovieWithScreenings[]>({
    queryKey: ["movies"],
    queryFn: async () => {
      const response = await fetch("/api/movies");
      return response.json();
    },
  });

  const uniqueCities = [
    ...new Set(movies.flatMap((movie) => movie.screenings.map((s) => s.city))),
  ].sort();

  const uniqueLanguages = [
    ...new Set(movies.map((movie) => movie.language)),
  ].sort();

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.actors.some((actor) =>
        actor.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCity =
      !selectedCity ||
      movie.screenings.some(
        (s) => s.city.toLowerCase() === selectedCity.toLowerCase()
      );
    const matchesLanguage =
      !selectedLanguage ||
      movie.language.toLowerCase() === selectedLanguage.toLowerCase();
    const matchesDuration =
      (!minDuration || movie.duration >= parseInt(minDuration)) &&
      (!maxDuration || movie.duration <= parseInt(maxDuration));

    return matchesSearch && matchesCity && matchesLanguage && matchesDuration;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Rechercher un film
        </h1>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Rechercher par titre, réalisateur ou acteur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
            />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
            >
              <option value="">Toutes les villes</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
            >
              <option value="">Toutes les langues</option>
              {uniqueLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Durée min"
                value={minDuration}
                onChange={(e) => setMinDuration(e.target.value)}
                className="w-1/2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
              />
              <input
                type="number"
                placeholder="Durée max"
                value={maxDuration}
                onChange={(e) => setMaxDuration(e.target.value)}
                className="w-1/2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
              />
            </div>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {filteredMovies.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <p className="text-2xl text-gray-400 mb-2">
                Aucun film ne correspond à votre recherche
              </p>
              <p className="text-gray-500">
                Essayez de modifier vos critères de recherche ou revenez plus
                tard pour découvrir de nouveaux films !
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
