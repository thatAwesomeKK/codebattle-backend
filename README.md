
# Code Battle!

This is the backend for code battle website, this backend handles everything from creating channels to checking the code and determining the winner.
All the API's are created with crash protection.
ExpressJS is used for the Creation of the Backend.



## Documentation

[Documentation](https://linktodocumentation)

Created For BuilderHacks S2 Hackathon

That's It Have Fun!
## Installation

Clone the Repo and
perform these commands in terminal

```bash
  yarn install
```

Create an env file with these written.
```bash
  HOP_TOKEN='your-token'
```  
## API Reference

#### Start Matchmaking

```http
  GET /matchmaking/start
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `player` | `string` | **Required**. username |

#### Start game

```http
  POST /game/start
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `channelID`      | `string` | **Required**. Id of HOP channel |
| `channelToken`      | `string` | **Required**. Token of HOP channel |

#### Get Question

```http
 POST /game/question
```

#### Check Code

```http
  POST /game/check-code
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `input`      | `string` | **Required**. Input for the code |
| `code`      | `string` | **Required**. Actual Code |
| `desiredOutput`      | `string` | **Required**. What should be the Output |

#### Submit Code

```http
  POST /game/submit
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `channelID`      | `string` | **Required**. Id of HOP channel |
| `channelToken`      | `string` | **Required**. Token of HOP channel |
| `username`      | `string` | **Required**. username |
