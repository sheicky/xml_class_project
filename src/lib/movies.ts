import { prisma } from "./prisma";

export async function getMovie(id: string) {
  return prisma.movie.findUnique({
    where: { id },
    include: {
      screenings: true,
      user: {
        select: {
          name: true,
          cinemaName: true,
        },
      },
    },
  });
}

export async function getMoviesByCity(city: string) {
  return prisma.movie.findMany({
    where: {
      screenings: {
        some: {
          city: {
            equals: city,
            mode: "insensitive",
          },
        },
      },
    },
    include: {
      screenings: true,
    },
  });
}
