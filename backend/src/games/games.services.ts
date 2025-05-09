import { Team } from '../types/team.model';
import { GameResult } from '../models';

import { PrismaClient } from '../../generated/prisma';
import { NotFoundError } from '../shared/errors/notFoundError';

const prisma = new PrismaClient();

export const getGamesService = async () => {
  return await prisma.game.findMany();
};

const fetchGameById = async (id: number) => {
  return await prisma.game.findFirst({
    where: { id },
    include: {
      teams: {
        include: {
          players: {
            select: {
              id: true,
              name: true,
              ratings: {
                select: {
                  rating: true,
                },
                where: {
                  gameId: id,
                },
                take: 1,
              },
            },
          },
        },
      },
    },
  });
};

const fetchActiveGame = async () => {
  return await prisma.game.findFirst({
    where: { isActive: true },
    include: {
      teams: {
        include: {
          players: {
            select: {
              id: true,
              name: true,
              ratings: {
                select: {
                  rating: true,
                },
                where: {
                  game: {
                    isActive: true,
                  },
                },
                take: 1,
              },
            },
          },
        },
      },
    },
  });
};

//TODO: if id is not found should return 404 and not give active game
export const getGameService = async (id?: number) => {
  let game = null;

  if (id) {
    game = await fetchGameById(id);
  }

  if (!game) {
    game = await fetchActiveGame();
  }

  if (!game) {
    throw new NotFoundError({
      message: 'No game found with the given ID and no active games available',
    });
  }

  return game;
};
export const setGameService = async (teams: Team[]) => {
  const game = await prisma.game.create({
    data: {
      isActive: true,
    },
  });

  const teamPromises = teams.map((team) =>
    prisma.team.create({
      data: {
        teamColor: team.teamColor,
        gameId: game.id,
        points: 0,
        players: {
          connect: team.players.map((player) => ({
            id: player.id,
          })),
        },
      },
    })
  );

  const ratingPromises = teams.flatMap((team) =>
    team.players.map((player) => ({
      gameId: game.id,
      playerId: player.id,
      rating: 0,
    }))
  );

  await Promise.all([
    prisma.rating.createMany({ data: ratingPromises }),
    ...teamPromises,
  ]);

  return game;
};

export const setGameResultService = async (gameResults: GameResult) => {
  await prisma.$transaction(async (transaction) => {
    await transaction.game.update({
      where: { id: gameResults.gameId },
      data: { isActive: false },
    });

    const updatePromises = gameResults.results.map((result) =>
      transaction.team.update({
        where: { id: result.teamId },
        data: { points: result.points },
      })
    );

    const ratingPromises = gameResults.ratings.map((result) =>
      transaction.rating.create({
        data: {
          gameId: gameResults.gameId,
          playerId: result.playerId,
          rating: result.rating,
        },
      })
    );

    await Promise.all([...updatePromises, ...ratingPromises]);
  });
};

export const checkIsActiveGameService = async () => {
  const game = await prisma.game.findFirst({
    where: { isActive: true },
  });
  return !!game;
};
