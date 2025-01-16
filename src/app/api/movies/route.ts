import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const movies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });
  return NextResponse.json(movies);
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ message: "Non autorisé" }), {
        status: 401,
      });
    }

    const data = await request.json();

    // Validation des données
    if (
      !data.title ||
      !data.duration ||
      !data.language ||
      !data.director ||
      !data.actors
    ) {
      return new NextResponse(
        JSON.stringify({ message: "Données manquantes" }),
        { status: 400 }
      );
    }

    const movie = await prisma.movie.create({
      data: {
        title: data.title,
        duration: data.duration,
        language: data.language,
        subtitles: data.subtitles,
        director: data.director,
        actors: Array.isArray(data.actors) ? data.actors : [data.actors],
        minAge: data.minAge,
        poster: data.poster,
        userId: session.user.id,
        screenings: {
          create: {
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            weekDays: data.weekDays,
            startTime: data.startTime,
            city: data.city,
            address: data.address,
          },
        },
      },
    });

    return NextResponse.json(movie);
  } catch (error) {
    console.error("Erreur création film:", error);
    return new NextResponse(
      JSON.stringify({ message: "Erreur serveur lors de la création du film" }),
      { status: 500 }
    );
  }
}
