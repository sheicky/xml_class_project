const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  // Créer un utilisateur de test
  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.create({
    data: {
      email: "cinema@test.com",
      password: hashedPassword,
      name: "Cinéma Test",
      cinemaName: "Grand Rex",
      cinemaAddress: "1 Boulevard Poissonnière, 75002 Paris",
    },
  });

  // Créer un film de test
  const movie = await prisma.movie.create({
    data: {
      title: "Inception",
      duration: 148,
      language: "Anglais",
      subtitles: "Français",
      director: "Christopher Nolan",
      actors: ["Leonardo DiCaprio", "Ellen Page", "Tom Hardy"],
      minAge: 12,
      poster: "https://example.com/inception-poster.jpg",
      userId: user.id,
      screenings: {
        create: [
          {
            startDate: new Date("2024-03-01"),
            endDate: new Date("2024-03-31"),
            weekDays: ["MONDAY", "WEDNESDAY", "FRIDAY"],
            startTime: "20:00",
            city: "Paris",
            address: "1 Boulevard Poissonnière, 75002 Paris",
          },
        ],
      },
    },
  });

  console.log({ user, movie });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
