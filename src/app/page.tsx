"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FilmIcon,
  MapPinIcon,
  SparklesIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      {/* Effet de particules interactif */}
      <div
        className="fixed inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(139,92,246,0.15)_0%,rgba(30,27,75,0.2)_25%,rgba(0,0,0,1)_50%)]"
        style={
          {
            "--x": `${(mousePosition.x / window.innerWidth) * 100}%`,
            "--y": `${(mousePosition.y / window.innerHeight) * 100}%`,
          } as any
        }
      ></div>

      {/* Grille animée */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] bg-repeat"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      </div>

      {/* Orbes lumineux animés */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.1, 0.2],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[100px]"
        />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          {/* Hero Section avec animations avancées */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center mb-20 relative"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative inline-block"
            >
              <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tighter relative z-10">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-500 to-pink-500 animate-gradient-x">
                  CinéParis
                </span>
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur-3xl -z-10 transform scale-150"></div>
            </motion.div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300/90 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Découvrez la magie du cinéma dans les plus belles salles
              parisiennes
            </motion.p>

            {/* Bouton principal avec effet de brillance */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center"
            >
              <Link href="/movies">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium text-white overflow-hidden shadow-2xl transition-all duration-300"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  <span className="relative flex items-center gap-2">
                    <StarIcon className="w-5 h-5" />
                    Découvrir les films
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Cartes de navigation avec effet de verre amélioré */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          >
            <Link href="/login">
              <motion.div
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-8 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <FilmIcon className="w-12 h-12 text-purple-400 mb-6 group-hover:text-purple-300 transition-colors" />
                <h2 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors">
                  Espace Cinéma
                </h2>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Gérez vos projections et programmations de films
                </p>
              </motion.div>
            </Link>

            {/* Carte Films par Ville */}
            <Link href="/movies">
              <motion.div
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-8 transition-all duration-300 hover:bg-white/10 hover:border-pink-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <MapPinIcon className="w-12 h-12 text-pink-400 mb-6 group-hover:text-pink-300 transition-colors" />
                <h2 className="text-2xl font-bold mb-4 text-white group-hover:text-pink-300 transition-colors">
                  Films par Ville
                </h2>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Explorez les films à l'affiche dans votre ville
                </p>
              </motion.div>
            </Link>

            {/* Carte À l'affiche */}
            <Link href="/movies">
              <motion.div
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-8 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <SparklesIcon className="w-12 h-12 text-purple-400 mb-6 group-hover:text-purple-300 transition-colors" />
                <h2 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors">
                  À l'affiche
                </h2>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Découvrez les dernières sorties cinéma
                </p>
              </motion.div>
            </Link>
          </motion.div>

          {/* Section Caractéristiques avec icônes animées */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="py-16"
          >
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Une expérience cinéma unique
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              {/* Programmation */}
              <motion.div
                whileHover={{ y: -5 }}
                className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FilmIcon className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white/90">
                  Programmation Riche
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300">
                  Des films soigneusement sélectionnés pour tous les goûts
                </p>
              </motion.div>

              {/* Localisation */}
              <motion.div
                whileHover={{ y: -5 }}
                className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MapPinIcon className="w-8 h-8 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white/90">
                  Géolocalisation
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300">
                  Trouvez facilement les cinémas près de chez vous
                </p>
              </motion.div>

              {/* Expérience */}
              <motion.div
                whileHover={{ y: -5 }}
                className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <SparklesIcon className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white/90">
                  Interface Intuitive
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300">
                  Une expérience utilisateur fluide et agréable
                </p>
              </motion.div>
            </div>

            {/* Bannière finale avec appel à l'action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-20 text-center"
            >
              <div className="relative p-8 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl"></div>
                <h3 className="relative text-2xl md:text-3xl font-bold mb-6 text-white">
                  Prêt à découvrir le cinéma autrement ?
                </h3>
                <Link href="/movies">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-8 py-4 bg-white text-gray-900 rounded-full font-medium hover:shadow-xl hover:shadow-white/20 transition-all duration-300"
                  >
                    Explorer les films
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
