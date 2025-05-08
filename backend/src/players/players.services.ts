import { PrismaClient } from '../../generated/prisma';
import { NotFoundError } from '../shared/errors/notFoundError';
const prisma = new PrismaClient();

export const getPlayersService = async () => {
  const players = await prisma.player.findMany();
  return players || [];
};

export const getPlayerByIdService = async (id: number) => {
  const player = await prisma.player.findUnique({
    where: { id },
  });

  if (!player) {
    throw new NotFoundError({ message: 'Player not found' });
  }
  return player;
};

export const createPlayerService = async (playerData: { name: string }) => {
  const player = await prisma.player.create({
    data: { name: playerData.name },
  });
  return player;
};

export const editPlayerService = async (
  id: number,
  updateFields: { playerName: string }
) => {
  const player = await prisma.player.update({
    where: { id },
    data: { name: updateFields.playerName },
  });

  return player;
};

export const deletePlayerService = async (id: number) => {
  const player = await prisma.player.delete({
    where: { id },
  });
  return;
};
