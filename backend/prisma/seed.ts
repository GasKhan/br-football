import { PrismaClient, TeamColor } from '../generated/prisma';
const prisma = new PrismaClient();

async function main() {
  const game = await prisma.game.create({
    data: {
      teams: {
        create: [
          {
            teamColor: TeamColor.RED,
            points: 2,
            players: {
              create: [
                {
                  name: 'John Doe',
                },
                {
                  name: 'John De',
                },
                {
                  name: 'John Do',
                },
                {
                  name: 'John oe',
                },
                {
                  name: 'John',
                },
                {
                  name: 'John O',
                },
              ],
            },
          },
          {
            teamColor: TeamColor.BLUE,
            points: 3,
            players: {
              create: [
                {
                  name: 'John Doe',
                },
                {
                  name: 'John De',
                },
                {
                  name: 'John Do',
                },
                {
                  name: 'John oe',
                },
                {
                  name: 'John',
                },
                {
                  name: 'John O',
                },
              ],
            },
          },
          {
            teamColor: TeamColor.YELLOW,
            points: 5,
            players: {
              create: [
                {
                  name: 'John Doe',
                },
                {
                  name: 'John De',
                },
                {
                  name: 'John Do',
                },
                {
                  name: 'John oe',
                },
                {
                  name: 'John',
                },
                {
                  name: 'John O',
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('Created game:', game);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
