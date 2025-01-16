"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface MovieFormData {
  title: string;
  duration: number;
  language: string;
  subtitles?: string;
  director: string;
  actors: string[];
  minAge?: number;
  poster?: string;
  startDate: string;
  endDate: string;
  weekDays: string[];
  startTime: string;
  city: string;
  address: string;
}

export default function MovieForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string>("");

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPosterFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPosterPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData(e.currentTarget);
      const weekDays = [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ].filter((day) => formData.get(day) === "on");

      if (weekDays.length === 0) {
        throw new Error("Sélectionnez au moins un jour de projection");
      }

      const movieData: MovieFormData = {
        title: formData.get("title") as string,
        duration: parseInt(formData.get("duration") as string),
        language: formData.get("language") as string,
        subtitles: formData.get("subtitles") as string,
        director: formData.get("director") as string,
        actors: (formData.get("actors") as string)
          .split(",")
          .map((a) => a.trim()),
        minAge: parseInt(formData.get("minAge") as string) || undefined,
        poster: posterPreview || undefined,
        startDate: formData.get("startDate") as string,
        endDate: formData.get("endDate") as string,
        weekDays,
        startTime: formData.get("startTime") as string,
        city: formData.get("city") as string,
        address: formData.get("address") as string,
      };

      const response = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'ajout du film");
      }

      setSuccess(true);
      formRef.current?.reset();
      setPosterFile(null);
      setPosterPreview("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Impossible d'ajouter le film"
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold mb-6">Informations du film</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Titre
            </label>
            <input
              type="text"
              name="title"
              required
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Durée (minutes)
            </label>
            <input
              type="number"
              name="duration"
              required
              min="1"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Langue
            </label>
            <input
              type="text"
              name="language"
              required
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sous-titres
            </label>
            <input
              type="text"
              name="subtitles"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Réalisateur
            </label>
            <input
              type="text"
              name="director"
              required
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Acteurs (séparés par des virgules)
            </label>
            <input
              type="text"
              name="actors"
              required
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Âge minimum
            </label>
            <input
              type="number"
              name="minAge"
              min="0"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Affiche du film
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handlePosterChange}
                className="block w-full text-sm text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-purple-500/10 file:text-purple-400
                  hover:file:bg-purple-500/20
                  file:cursor-pointer"
              />
              {posterPreview && (
                <img
                  src={posterPreview}
                  alt="Aperçu de l'affiche"
                  className="w-24 h-36 object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold mb-6">Programmation</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Date de début
            </label>
            <input
              type="date"
              name="startDate"
              required
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Date de fin
            </label>
            <input
              type="date"
              name="endDate"
              required
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Horaire
            </label>
            <input
              type="time"
              name="startTime"
              required
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Ville
            </label>
            <input
              type="text"
              name="city"
              required
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Adresse
            </label>
            <input
              type="text"
              name="address"
              required
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-4">
              Jours de projection
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY",
                "SUNDAY",
              ].map((day) => (
                <label key={day} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={day}
                    className="w-4 h-4 rounded border-white/10 bg-white/5 text-purple-500 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-300">
                    {day.charAt(0) + day.slice(1).toLowerCase()}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="text-green-400 text-sm bg-green-500/10 p-3 rounded-lg">
          Film ajouté avec succès !
        </div>
      )}

      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Ajout en cours..." : "Ajouter le film"}
        </motion.button>
        <motion.button
          type="button"
          onClick={() => window.history.back()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
        >
          Retour
        </motion.button>
      </div>
    </form>
  );
}
