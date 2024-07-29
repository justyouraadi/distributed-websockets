import prisma from "../config/prisma.client";

/**
 * Finds the room for one-to-one communication between a seller and a buyer.
 *
 * @param {number} seller_id - The ID of the seller.
 * @param {number} buyer_id - The ID of the buyer.
 * @returns {Promise<string | null>} - The room ID if found, otherwise null.
 */
export const findRoom = async (room_id) => {
  try {
    const response = await prisma.room.findFirst({
      where: {
        room_id: room_id,
        status: true,
      },
    });

    if (!response) {
      throw new Error("Room not found");
    }

    return response.room_id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Find the total count of messages of a particular room.
 *
 * @param {string} roomId - The ID of the room.
 * @returns {Promise<number | null>} - The total count of messages if found, otherwise null.
 */
export const countMessages = async (roomId) => {
  try {
    const totalCount = await prisma.message.count({
      where: {
        room_id: roomId,
      },
    });
    return totalCount;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Find the previous chat of a particular room.
 *
 * @param {string} roomId - The ID of the room.
 * @param {string} cursor - The ID of the last message from the preivous data.
 * @returns {Promise<Array<object> | null>} - The list of previous messages if found, otherwise null.
 */
export const previousChats = async (roomId,cursor=null) => {
   try {
    const queryOptions: any = {
      select: {
        id: true,
        message_type: true,
        message_from: true,
        message: true,
        createdAt: true,
        seen: true,
      },
      where: {
        room_id: roomId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    };

    if (cursor) {
      queryOptions.skip = 1;
      queryOptions.cursor = { id: cursor };
    }

    const previousMessages = await prisma.message.findMany(queryOptions);

    return previousMessages;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default {
  findRoom,
  countMessages,
  previousChats,
};
