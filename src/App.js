import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css';
import Main from './components/main'
import Search from './components/searchbar'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: null,
      gameIds: [],
      matchDetails: [],
      champRef: [],
      cardOutputArr: []
    }
  }

  findSummoner = async (e, summonerName) => {
    e.preventDefault()
    const response = await axios.post(`http://localhost:8080/summoner`, {
      summonerName
    })
    const gameIds = response.data.gameIds
    const champRef = response.data.champRef
    this.matchDetails(gameIds)
    this.setState({
      searchQuery: summonerName,
      gameIds: gameIds,
      champRef: champRef
    })
  }

  async componentWillMount() {
    await this.state.gameIds.map(id => {
      return this.matchDetails(id)
    })
  }

  matchDetails = async (gameIds) => {
    const response = await axios.post(`http://localhost:8080/details`, {
      gameIds
    })
    this.setState({ matchDetails: response.data })

    function OutputObj(length, outcome, champion, KDA, runes, spells, items, level) {
      this.length = length
      this.outcome = outcome
      this.champion = champion
      this.KDA = KDA
      this.runes = runes
      this.spells = spells
      this.items = items
      this.level = level
    }
    
    let cardOutput = new OutputObj()
    await Object.values(this.state.matchDetails).forEach(data => {
      this.state.champRef.forEach(ref => {
        if (data.gameId === ref.gameId) {
          cardOutput.length = data.gameDuration
          data.participants.forEach(summoner => {
            if (summoner.championId === ref.champion) {
              cardOutput.win = summoner.stats.win
              cardOutput.champion = summoner.championId
              cardOutput.KDA = { kills: summoner.stats.kills, deaths: summoner.stats.deaths, assists: summoner.stats.assists }
              cardOutput.runes = summoner.runes
              cardOutput.spells = { spell1Id: summoner.spell1Id, spell2Id: summoner.spell2Id }
              cardOutput.items = { item0: summoner.stats.item0, item1: summoner.stats.item1, item2: summoner.stats.item2, item3: summoner.stats.item3, item4: summoner.stats.item4, item5: summoner.stats.item5 }
              cardOutput.level = summoner.stats.champLevel
              //Not sure why these aren't updating on the object cardOutput, always the same in the array but I can see the different values in this console log
              console.log(cardOutput.KDA)
              
            }
          })
        }
      })
      //console.log(cardOutput)
      this.setState({ cardOutputArr: this.state.cardOutputArr.concat(cardOutput) })
    })
    //console.log(this.state.cardOutputArr)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 id="battlefy">
            <span>BATTLE</span><span style={{ color: "red" }}>FY</span>
          </h1>
          <Switch>

            <Route exact path="/" render={() => {
              return <div id="main">
                <Search findSummoner={this.findSummoner} />
                <Main summoner={this.state.searchQuery}
                  gameIds={this.state.gameIds}
                  matchDetails={this.state.matchDetails} 
                  cardOutputArr={this.state.cardOutputArr}/>
              </div>
            }}
            />
          </Switch>

        </header>


      </div>
    );
  }
}

