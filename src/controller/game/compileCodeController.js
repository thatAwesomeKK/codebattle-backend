import Questions from "../../lib/Questions.js";
import compileCode from "../../methods/compileCode.js";

export default async function (req, res) {
  try {
    const { code, language, questionId } = req.body;

    const question = Questions.find((q) => q.id === questionId);

    const newCode = `const nums = ${question.input[0].nums};
const target = ${question?.input[0]?.target} || undefined; ${code} `;

    const payload = await compileCode(newCode, language);

    return res.status(200).json({ success: true, message: payload.data });
  } catch (error) {
    console.log(error);
  }
}
