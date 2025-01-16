import { notFound } from "next/navigation";
import { getMovie } from "@/lib/movies";
import ScreeningsList from "@/components/ScreeningsList";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovie(params.id);

  if (!movie) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl p-8 shadow-xl">
          {/* Movie Poster */}
          {movie.poster && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-[400px] object-cover"
              />
            </div>
          )}

          {/* Movie Details */}
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-purple-400">
                Informations
              </h2>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <span className="font-medium">Durée:</span> {movie.duration}{" "}
                  minutes
                </li>
                <li>
                  <span className="font-medium">Langue:</span> {movie.language}
                </li>
                <li>
                  <span className="font-medium">Sous-titres:</span>{" "}
                  {movie.subtitles || "Non"}
                </li>
                <li>
                  <span className="font-medium">Âge minimum:</span>{" "}
                  {movie.minAge} ans
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-purple-400">
                Équipe
              </h2>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <span className="font-medium">Réalisateur:</span>{" "}
                  {movie.director}
                </li>
                <li>
                  <span className="font-medium">Acteurs principaux:</span>
                  <ul className="list-disc list-inside ml-4">
                    {movie.actors.map((actor, index) => (
                      <li key={index}>{actor}</li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {/* Screenings */}
          <h2 className="text-2xl font-bold mb-4 text-purple-400">Séances</h2>
          <ScreeningsList movieId={movie.id} />
        </div>
      </div>
    </main>
  );
}
