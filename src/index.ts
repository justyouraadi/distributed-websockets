import express from "express";
import http from "http";
import { setupWebSocketServer } from "./events/socket.manager";

const app = express();
const port = 3000;

const server = http.createServer(app);

setupWebSocketServer(server);

app.get("/ping", (req, res) => {
  res.json({ msg: "pong" });
});

server.listen(port, () => {
  console.log(`server started on ${port}`);
});
