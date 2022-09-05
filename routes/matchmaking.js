const { API } = require("@onehop/js");
const express = require("express");
const router = express.Router();
const { checkMatch, createForMatch, createMatch, checkIfMatch } = require("../lib/db");
const { hop } = require("../lib/Hop");
const Questions = require("../Questions");
const state = API.Channels.ChannelType['state']

//Start the Matchmaking
router.post('/start', async (req, res) => {
    try {
        const { player } = req.body

        const isMatchAvailable = await checkMatch() //checking if match is available
        if (!isMatchAvailable) {
            const channel = await hop.channels.create(
                "private",
                createRandom(),
            )

            const token = await hop.channels.tokens.create(state) //creating token for private channel
            await hop.channels.subscribeToken(channel.id, token.id); //assiging token to the channel

            const random = Math.floor(Math.random() * Questions.length);
            const randomQuestion = Questions[random]

            await createForMatch(channel.id, token.id, player ,randomQuestion) //creating matchRequchannel.idest
            return res.status(200).send({ channelID: channel.id, channelToken: token.id, question: randomQuestion })
        } else {
            const { channelToken, channelID, question } = await createMatch(player) //creating match if available
            return res.status(200).send({ channelID, channelToken, question })
        }
    } catch (error) {
        return res.status(400).send({ error: "Internal Server Error" })
    }
})

router.post('/check', async (req, res) => {

    const { channelToken } = req.body

    const checkMatch = await checkIfMatch(channelToken)

    if (checkMatch) {
        return res.status(200).send({ route: true })
    }

    return res.status(200).send({ route: false })

})



//Creating the a random HOP ChannelID
const createRandom = () => {
    return `matchmaking${Math.floor(Math.random() * 1000000).toString()}`
}

module.exports = router