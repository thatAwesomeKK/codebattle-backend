import app from "./app.js";
import { Server } from "socket.io";
import { connectToMongo } from "./config/db.js";
import findMatch from "./controller/matchmaking/findMatch.js";
import startController from "./controller/game/startController.js";
import submitCodeController from "./controller/game/submitCodeController.js";

const PORT = process.env.PORT || 5000;

await connectToMongo();

const expressServer = app.listen(PORT, () => {
  console.log(`Server is running on : http://localhost:${PORT}`);
});

const io = new Server(expressServer, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
  // io.disconnectSockets();

  socket.on("find-match", async ({ username }, cb) => {
    await findMatch(username, io, socket, cb);
  });

  socket.on("start-game", async ({ username, roomId }, cb) => {
    await startController(username, roomId, io, cb);
  });

  socket.on(
    "submit-answer",
    async ({ code, language, questionId, output, roomId }, cb) => {
      await submitCodeController(
        code,
        language,
        questionId,
        output,
        roomId,
        socket,
        io,
        cb
      );
    }
  );
});
