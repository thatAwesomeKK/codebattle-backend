require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')

app.use(cors())
app.use(express.json({ limit: '1000mb' }))

//routes
app.use('/matchmaking', require('./routes/matchmaking'))
app.use('/game', require('./routes/game'))

app.get('/', async (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Application started on Port : ${port}`);
})