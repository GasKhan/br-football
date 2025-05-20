import { Team } from '../types/team.model';
import { GameResult } from '../models';

import { PrismaClient } from '../../generated/prisma';
import { NotFoundError } from '../shared/errors/notFoundError';

const prisma = new PrismaClient();

export const getGamesService = async () => {
  return await prisma.game.findMany();
};

export const fetchGameById = async (id: number) => {
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

export const fetchActiveGame = async () => {
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
      transaction.rating.updateMany({
        where: {
          gameId: gameResults.gameId,
          playerId: result.playerId,
        },
        data: { rating: result.rating },
      })
    );

    await Promise.all([...updatePromises, ...ratingPromises]);
  });
};

export const getGameDatesService = async () => {
  const games = await prisma.game.findMany({
    where: { isActive: false },
    select: {
      id: true,
      createdAt: true,
    },
  });
  return games;
};

export const checkIsActiveGameService = async () => {
  const game = await prisma.game.findFirst({
    where: { isActive: true },
  });
  return !!game;
};
