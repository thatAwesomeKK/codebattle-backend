import Questions from "../../lib/Questions.js";
import compileCode from "../../methods/compileCode.js";
import Game from "../../models/game.js";

export default async function (
  code,
  language,
  questionId,
  answer,
  roomId,
  socket,
  io,
  cb
) {
  try {
    const question = Questions.find((q) => q.id === questionId);

    const newCode = `const nums = ${question.input[0].nums};
const target = ${question?.input[0]?.target} || undefined; ${code} `;

    const payload = await compileCode(newCode, language);
    const game = await Game.findOne({ roomId });

    let winner =
      game.player1.socketId === socket.id
        ? game.player1.username
        : game.player2.username;

    if (payload.data.output === answer) {
      await io.to(roomId).emit("winner", {
        user: winner,
      });
    }
    io.in(roomId).disconnectSockets();
  } catch (error) {
    console.log(error);
  }
}
