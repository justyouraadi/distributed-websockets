import prisma from "../config/prisma.client";

/**
 * Finds the room for one-to-one communication between a seller and a buyer.
 *
 * @param {number} seller_id - The ID of the seller.
 * @param {number} buyer_id - The ID of the buyer.
 * @returns {Promise<string | null>} - The room ID if found, otherwise null.
 */
export const findRoom = async (seller_id, buyer_id) => {
  try {
    const response = await prisma.room.findFirst({
      where: {
        seller_id: seller_id,
        buyer_id: buyer_id,
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

export default findRoom;
