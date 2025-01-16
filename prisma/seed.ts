const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

export const prisma = new PrismaClient();

async function main() {
  // Supprime les données existantes dans l'ordre correct
  await prisma.screening.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.user.deleteMany();

  // Crée un compte administrateur par défaut
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@cineparis.fr",
      password: hashedPassword,
      name: "Administrateur",
      cinemaName: "CinéParis",
      cinemaAddress: "123 Avenue des Champs-Élysées, 75008 Paris",
    },
  });

  console.log({ admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
