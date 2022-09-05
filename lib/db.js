const { FieldValue } = require("firebase-admin/firestore")
const { firebaseDB } = require("./firebase-admin")

//Open Matchmaking 
const createForMatch = async (channelID, channelToken, player1, question) => {
    await firebaseDB.collection('formatch').doc().set({
        channelID,
        channelToken,
        player1,
        question,
        createdAt: FieldValue.serverTimestamp()
    }, { merge: true })
}

//Check if there is any Match
const checkMatch = async () => {
    let checker = true
    await firebaseDB.collection('formatch').get().then((snapshot) => {
        if (snapshot.docs.length === 0) {
            checker = false
        }
    })
    return checker
}

//Create the Match with the 2 Players
const createMatch = async (player2) => {
    let channelID = ""
    let channelToken = ""
    let player1 = ""
    let id = ""
    let question = null
    //Getting the details from formatch
    const ref = firebaseDB.collection('formatch').limit(1)
    await ref.get().then((snapshot) => {
        snapshot.docs.forEach((match) => {
            channelID = match.data().channelID
            channelToken = match.data().channelToken
            player1 = match.data().player1
            id = match.id
            question = match.data().question
        })
    })

    //Creating the Match!
    await firebaseDB.collection('match').doc(channelToken).set({
        channelID,
        channelToken,
        players: [player1, player2]
    }, { merge: true })

    //Deleting the ForMatch
    await firebaseDB.collection('formatch').doc(id).delete()

    return { channelToken, channelID, question }
}

//Finishing The Game!
const finishGame = async (channelToken) => {
    let players = []
    const ref = firebaseDB.collection('match').doc(channelToken)
    await ref.get().then((snapshot) => {
        players = snapshot.data().players
    })

    await firebaseDB.collection('finMatches').doc().set({
        channelToken,
        players,
        createdAt: FieldValue.serverTimestamp()
    }, { merge: true })
}

const checkIfMatch = async (channelToken) => {
    let checker = false
    const ref = firebaseDB.collection("match").where('channelToken', '==', channelToken)
    await ref.get().then((match) => {
        if (match.docs.length !== 0) {
            checker = true
        }
    })
    return checker
}

module.exports = { createForMatch, checkMatch, createMatch, finishGame, checkIfMatch }