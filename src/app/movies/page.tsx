"use client";

import { useQuery } from "@tanstack/react-query";
import MovieCard from "@/components/MovieCard";
import { Movie, Screening } from "@prisma/client";

type MovieWithScreenings = Movie & {
  screenings: Screening[];
};

export default function MoviesPage() {
  const { data: movies = [], isLoading } = useQuery<MovieWithScreenings[]>({
    queryKey: ["movies"],
    queryFn: async () => {
      const response = await fetch("/api/movies");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Films à l'affiche
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {movies.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            Aucun film n'est actuellement à l'affiche
          </div>
        )}
      </div>
    </div>
  );
}
