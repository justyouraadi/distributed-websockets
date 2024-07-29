import { WebSocketServer } from "ws";
import { findRoom, countMessages, previousChats } from "../respository/socket.repository";

export const setupWebSocketServer = (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", async (ws, req) => {
    ws.on("message", async (message) => {
      try {
        const parsedMessage = JSON.parse(message.toString())
        const { event, data } = parsedMessage;

        if(event === "chatList"){
          
        }

        if (event === "preivousChats") {

          const roomId = await findRoom(data.room_id);

          if(!roomId || roomId==null) throw new Error('Room not found');

          const totalMessages = await countMessages(roomId);

          const previousMessages = await previousChats(roomId,data.cursor);
          
          ws.send(JSON.stringify({
            roomId,
            messages: previousMessages || [],
            totalMessages
          }));

        
        }


      } catch (error) {
        console.error("Error processing message:", error);
        ws.send("Error processing message");
      }
    });
  });

  return wss;
};
