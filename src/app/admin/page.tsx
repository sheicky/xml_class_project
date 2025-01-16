"use client";

import MovieList from "@/components/MovieList";
import MovieForm from "@/components/MovieForm";
import { useState } from "react";

export default function AdminPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Gestion des films</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
        >
          {showForm ? "Voir la liste" : "Ajouter un film"}
        </button>
      </div>

      {showForm ? <MovieForm /> : <MovieList />}
    </div>
  );
}
