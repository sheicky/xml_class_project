"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

interface Screening {
  id: string;
  startDate: Date;
  endDate: Date;
  weekDays: string[];
  startTime: string;
  city: string;
  address: string;
}

interface ScreeningsListProps {
  movieId: string;
  screenings: Screening[];
}

const weekDaysFr = {
  MONDAY: "Lundi",
  TUESDAY: "Mardi",
  WEDNESDAY: "Mercredi",
  THURSDAY: "Jeudi",
  FRIDAY: "Vendredi",
  SATURDAY: "Samedi",
  SUNDAY: "Dimanche",
};

export default function ScreeningsList({
  movieId,
  screenings,
}: ScreeningsListProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleDelete = async (screeningId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette séance ?")) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/screenings/${screeningId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      // Recharger la page pour mettre à jour la liste
      window.location.reload();
    } catch (err) {
      setError("Impossible de supprimer la séance");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-white mb-4">
        Séances programmées
      </h4>

      {error && (
        <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {screenings.map((screening) => (
          <motion.div
            key={screening.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 p-4 rounded-lg border border-white/10"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-purple-400">
                <CalendarIcon className="w-5 h-5" />
                <span>
                  Du {formatDate(screening.startDate)} au{" "}
                  {formatDate(screening.endDate)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-pink-400">
                <ClockIcon className="w-5 h-5" />
                <span>{screening.startTime}</span>
              </div>

              <div className="flex items-center gap-2 text-purple-400">
                <MapPinIcon className="w-5 h-5" />
                <span>
                  {screening.city} - {screening.address}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {screening.weekDays.map((day) => (
                  <span
                    key={day}
                    className="px-2 py-1 text-sm bg-white/5 rounded-md"
                  >
                    {weekDaysFr[day as keyof typeof weekDaysFr]}
                  </span>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDelete(screening.id)}
                disabled={loading}
                className="mt-4 w-full py-2 text-sm text-red-400 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50"
              >
                {loading ? "Suppression..." : "Supprimer"}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {screenings.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          Aucune séance programmée
        </div>
      )}
    </div>
  );
}
