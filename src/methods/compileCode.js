import axios from "axios";
import qs from "qs";

export default async function compileCode(newCode, language) {
  const data = qs.stringify({
    code: newCode,
    language,
  });

  const config = {
    method: "post",
    url: "https://api.codex.jaagrav.in",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  return await axios(config);
}
