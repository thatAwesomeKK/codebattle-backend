import { v4 as uuid } from "uuid";
import { redis } from "../../config/redis.js";
import Game from "../../models/game.js";

export default async function (username, io, socket, cb) {
  const roomId = uuid();
  const matchExists = await redis.llen("open-match");

  if (matchExists > 0) {
    const matchFound = await redis.rpop("open-match");
    await socket.join(matchFound.roomId);

    await io.to(matchFound.roomId).emit("setup-game", {
      roomId: matchFound.roomId,
    });

    const newGame = new Game({
      player1: {
        username: matchFound.player1.username,
        socketId: matchFound.player1.socketId,
      },
      player2: { username, socketId: socket.id },
      questionId: matchFound.questionId,
      roomId: matchFound.roomId,
    });

    await newGame.save();

    // io.in(matchFound.roomId).disconnectSockets();
  } else {
    const matchInfo = {
      roomId,
      player1: { username, socketId: socket.id },
      questionId: getRandomCodeProblem().toString(),
    };

    await redis.rpush("open-match", matchInfo);
    await socket.join(roomId);

    cb(`Created Match ${roomId}`);
  }
}

const getRandomCodeProblem = (min = 1, max = 3) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
