"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Movie, Screening } from "@prisma/client";

type MovieWithScreenings = Movie & {
  screenings: Screening[];
};

interface MovieCardProps {
  movie: MovieWithScreenings;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden"
    >
      <div
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="p-6">
          <div className="flex gap-4">
            {movie.poster && (
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-24 h-36 object-cover rounded-lg"
              />
            )}
            <div>
              <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
              <p className="text-gray-400">{movie.duration} min</p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/10"
          >
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <p>
                  <span className="text-gray-400">Langue:</span>{" "}
                  {movie.language}
                </p>
                {movie.subtitles && (
                  <p>
                    <span className="text-gray-400">Sous-titres:</span>{" "}
                    {movie.subtitles}
                  </p>
                )}
                <p>
                  <span className="text-gray-400">Réalisateur:</span>{" "}
                  {movie.director}
                </p>
                <p>
                  <span className="text-gray-400">Acteurs:</span>{" "}
                  {movie.actors.join(", ")}
                </p>
                {movie.minAge && (
                  <p>
                    <span className="text-gray-400">Âge minimum:</span>{" "}
                    {movie.minAge} ans
                  </p>
                )}
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Séances</h3>
                {movie.screenings.map((screening, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4 mb-2">
                    <p className="font-medium">{screening.city}</p>
                    <p className="text-sm text-gray-400">{screening.address}</p>
                    <p className="text-sm text-gray-400">
                      {screening.startTime} - {screening.weekDays.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
