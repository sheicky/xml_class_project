"use client";

import { useQuery } from "@tanstack/react-query";
import { Movie, Screening } from "@prisma/client";
import MovieCard from "./MovieCard";

type MovieWithScreenings = Movie & {
  screenings: Screening[];
};

export default function MovieList() {
  const { data: movies = [], isLoading } = useQuery<MovieWithScreenings[]>({
    queryKey: ["movies"],
    queryFn: async () => {
      const response = await fetch("/api/movies");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}

      {movies.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          Aucun film n'a été ajouté pour le moment
        </div>
      )}
    </div>
  );
}
