import { Team } from '../types/team.model';
import { GameResult } from '../models';

import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export const getGamesService = async () => {
  const games = await prisma.game.findMany();
  return games;
};

//TODO: maybe should split service to getbyid and getactive
export const getGameService = async (id?: number) => {
  let game = await prisma.game.findFirst({
    where: { id: id },
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

  if (!game) {
    game = await prisma.game.findFirst({
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
  }

  if (!game) {
    throw new Error(
      'No game found with the given ID and no active games available.'
    );
  }

  return game;
};

export const setGameService = async (teams: Team[]) => {
  const game = await prisma.game.create({
    data: {
      isActive: true,
    },
  });

  const teamPromises = teams.map(async (team) => {
    const createdTeam = await prisma.team.create({
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
    });
  });

  await Promise.all(teamPromises);

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
    await Promise.all(updatePromises);

    const ratingPromises = gameResults.ratings.map((result) =>
      transaction.rating.create({
        data: {
          gameId: gameResults.gameId,
          playerId: result.playerId,
          rating: result.rating,
        },
      })
    );
    await Promise.all(ratingPromises);
  });
};

export const checkIsActiveGameService = async () => {
  const game = await prisma.game.findFirst({
    where: { isActive: true },
  });
  return !!game;
};
