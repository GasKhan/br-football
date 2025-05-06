import { PrismaClient, TeamColor } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (optional)
  await prisma.player.deleteMany();
  await prisma.team.deleteMany();
  await prisma.game.deleteMany();

  // Create game with teams and unique players
  const game = await prisma.game.create({
    data: {
      teams: {
        create: [
          {
            teamColor: TeamColor.RED,
            points: 2,
            players: {
              create: generatePlayers('Red', 6),
            },
          },
          {
            teamColor: TeamColor.BLUE,
            points: 3,
            players: {
              create: generatePlayers('Blue', 6),
            },
          },
          {
            teamColor: TeamColor.YELLOW,
            points: 5,
            players: {
              create: generatePlayers('Yellow', 6),
            },
          },
        ],
      },
    },
    include: {
      teams: {
        include: {
          players: true,
        },
      },
    },
  });

  console.log('Successfully created game with teams and players:');
  console.log(JSON.stringify(game, null, 2));
}

// Helper function to generate unique players
function generatePlayers(teamPrefix: string, count: number) {
  return Array.from({ length: count }, (_, i) => ({
    name: `${teamPrefix} Player ${i + 1}`,
    // You can add more player properties here
    // email: `${teamPrefix.toLowerCase()}.player${i+1}@example.com`,
  }));
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
