import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

//TODO: remove 4
export const getPlayerRatingsByMonthService = async (month: number = 4) => {
  const playersWithRatings = await prisma.player.findMany({
    select: {
      name: true,
      ratings: {
        select: {
          rating: true,
        },
        where: {
          game: {
            date: {
              gte: new Date(new Date().getFullYear(), month - 1, 1),
              lt: new Date(new Date().getFullYear(), month, 1),
            },
          },
        },
      },
    },
  });

  const playerRatings = playersWithRatings.map((player) => {
    const averageRating =
      player.ratings.length > 0
        ? player.ratings.reduce((acc, r) => acc + r.rating, 0) /
          player.ratings.length
        : 0;

    return {
      playerName: player.name,
      rating: averageRating,
    };
  });

  return playerRatings.sort((a, b) => b.rating - a.rating);
};

export const getRatingService = async (
  playerId: number,
  month: number,
  year: number
) => {
  const avgRating = prisma.rating.aggregate({
    where: {
      id: playerId,
    },
    _avg: {
      rating: true,
    },
  });
  return avgRating;
};

// export const getRatingsService = async (month?: number) => {
//   month = month || 4 || new Date().getMonth();

//   const playerRatingsWithGames = await dbPool.query(
//     `SELECT
//        p.player_name AS playerName,
//        AVG(r.rating) AS rating
//      FROM players AS p
//      INNER JOIN teams_players AS t_p ON p.player_id = t_p.player_id
//      INNER JOIN ratings AS r ON t_p.team_player_id = r.team_player_id
//      INNER JOIN teams AS t ON t_p.team_id = t.team_id
//      INNER JOIN games AS g ON t.game_id = g.game_id
//      WHERE MONTH(g.date) = ?
//      GROUP BY p.player_id
//      ORDER BY AVG(r.rating) DESC
//     `,
//     [month]
//   );

//   return playerRatingsWithGames[0];
// };

// export const getWinsInfoByPlayerId = async (playerId: number) => {
//   const winsRatingForPlayer = await dbPool.query(
//     `
//     SELECT g.game_id AS gameId, g.winner_team_id AS winnerTeamId
//     FROM games AS g
//     LEFT JOIN teams AS t ON g.game_id = t.game_id
//     LEFT JOIN teams_players AS t_p ON t.team_id = t_p.team_id
//     LEFT JOIN players as p ON p.player_id = t_p.team_player_id
//     WHERE p.player_id = ?
//     `,
//     [playerId]
//   );

//   return winsRatingForPlayer[0];
// };
