const express = require("express");
const { hop } = require("../lib/Hop");
const router = express.Router();
var qs = require("qs");
var axios = require("axios");
const { finishGame } = require("../lib/db");
const Questions = require("../Questions");

//Start the Game
router.post('/start', async (req, res) => {
    try {
        const { channelID, channelToken } = req.body
        if (!channelID) {
            return res.status(400).send({ error: "Internal Server Error" })
        }
        let counter = 60
        const interval = setInterval(timeIt, 1000)//Running Counter every 1s
        async function timeIt() {
            await hop.channels.publishMessage(channelID, "COUNTER", { message: counter }) //sending counter
            counter--
            if (counter === 0) {
                clearInterval(interval)
                await hop.channels.publishMessage(channelID, "WINNER", { message: "STOP!", winner: "" })
                return res.status(200).send("Counter Ended!")
            }
        }
        if (counter === 0) {
            await finishGame(channelToken)
        }
    } catch (error) {
        return res.status(400).send({ error: "Internal Server Error" })
    }
})


//Check Code
router.post('/check-code', async (req, res) => {
    try {
        const { input, code, desiredOutput } = req.body  //Getting Code Body
        console.log(input, desiredOutput, code);
        //Converting the arguments to string
        let data = qs.stringify({
            code: `const nums=${input.input};\n const target=${input.target};\n ${code}`,
            language: "js",
            input: ""
        });
        //config for axios
        let config = {
            method: "post",
            url: "https://codex-api.herokuapp.com/",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: data,
        };

        //axios request
        const resOutput = await axios(config)
        console.log(resOutput.data);
        const jsonOutput = resOutput.data.output
        const check = `${desiredOutput}\n`
        console.log(jsonOutput, check);
        if (jsonOutput == check) {
            return res.status(200).send({ correct: true, output: jsonOutput })
        } else {
            return res.status(200).send({ correct: false, output: jsonOutput })
        }
    } catch (error) {
        return res.status(400).send("Internal Server Error")
    }
})

//When the User Submits after Checking
router.post('/submit', async (req, res) => {
    try {
        const { channelID, channelToken, username } = req.body //Getting Code Body
        console.log(channelID, channelToken, username);
        await finishGame(channelToken)

        await hop.channels.publishMessage(channelID, "WINNER", { message: "STOP!", winner: username })

        return res.status(200).send({ message: "Winner Has been Chosen!" })
    } catch (error) {
        return res.status(400).send("Internal Server Error")
    }
})

module.exports = router
