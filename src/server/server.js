
const port = process.argv[2] || 8080

require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')

const { Kayn, REGIONS } = require('kayn')
const kayn = Kayn(process.env.API_KEY)()

//CORS code, delete if no cross-origin in the server plan
app.use(
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    next();
  },
  bodyParser.json()
);

app.post(`/summoner`, async (req, res) => {
  try {
    const { accountId } = await kayn.Summoner.by.name(req.body.summonerName)
    const { matches } = await kayn.Matchlist.by
      .accountID(accountId)
    const gameIds = matches.slice(0, 5).map(({ gameId }) => gameId)
    
    //Point of reference for which Champ was played by the summoner (confusing API layout, manual pull unsure how to access this with Kayn)
    const matchData = await axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}/?api_key=${process.env.API_KEY}`)
    const output = matchData.data.matches.slice(0, 5)
    console.log(output)
    res.send({
      champRef: output,
      summonerName: req.body.summonerName,
      gameIds: gameIds,
    })
  }
  
  catch (err) {
    console.error(err)
    // console.error(err.response.statusText)
  }
})

app.post(`/details`, async (req, res) => {
  try {
    const { gameIds } = req.body
    const requests = gameIds.map(kayn.Match.get)
    const results = await Promise.all(requests)
    res.send(results)
  }
  catch (err) {
    console.log(err)
  }
})

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

