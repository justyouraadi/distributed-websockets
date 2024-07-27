import { WebSocketServer } from "ws";
import prisma from "../config/prisma.client";
import { ForChat } from "../types/chat.types";
import findRoom from "../respository/socket.repository";

export const setupWebSocketServer = (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", async (ws, req) => {
    ws.on("message", async (message) => {
      try {
        const { event, data } = JSON.parse(message.toString());
        if (event === "chat") {
          const seller_id = parseInt(data.seller_id);
          const buyer_id = parseInt(data.buyer_id);

          const roomId = await findRoom(seller_id, buyer_id);
        }
      } catch (error) {
        console.error("Error processing message:", error);
        ws.send("Error processing message");
      }
    });

    ws.on("chat", async (details: ForChat) => {
      console.log("received: %s", details);
      const seller_id = parseInt(details.seller_id, 10);
      const buyer_id = parseInt(details.buyer_id, 10);

      const roomId: string | null = await findRoom(seller_id, buyer_id);
      console.log(roomId);
    });
  });

  return wss;
};
