import Questions from "../../lib/Questions.js";
import Game from "../../models/game.js";

export default async function (req, res) {
  const { roomId } = req.query;
  //   console.log(params);
  if (!roomId) {
    return res.status(400).send({ error: "Internal Server Error" });
  }

  const matchInfo = await Game.findOne({ roomId });
  const question = Questions.find(
    (question) => question.id === parseInt(matchInfo.questionId)
  );

  if (!matchInfo) {
    return res.status(400).send({ error: "Room Not Found!" });
  }

  return res
    .status(200)
    .send({ success: true, message: { matchInfo, question } });
}
