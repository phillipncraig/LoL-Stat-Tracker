import React, { Component } from 'react';
import { Card, Image, Grid, Icon, ItemDescription } from 'semantic-ui-react'
import '../App.css';

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = { 
     
      }
  }


  render() {

    let gameIdsJSX1 = this.props.cardOutputArr.map(function (item, i) {
      return (
        <Card fluid className="card" key={i}>
          <Grid columns={5} className="cardContent">
            <Grid.Row>
              <Grid.Column>
                Level: <br />
                {item.level}
              </Grid.Column>

              <Grid.Column>
                Win: <br />
                {String(item.win)}
              </Grid.Column>

              <Grid.Column>
                Spells: <br />
                {item.spells.spell1Id} <br />
                {item.spells.spell2Id} 
              </Grid.Column>
                
              <Grid.Column>
                K/D/A: <br />
                {item.KDA.kills} /
                {item.KDA.deaths} /
                {item.KDA.assists} 
              </Grid.Column>
                
            </Grid.Row>
          </Grid>
        </Card>
      )
    })


    let gameIdsJSX2 = this.props.matchDetails.map(function (item, i) {
      return (
        <Card fluid className="card" key={i}>
          <Grid columns={5} className="cardContent">
            <Grid.Row>
              <Grid.Column>            
                Game ID: <br/>
                {item.gameId}
                
              </Grid.Column>
              <Grid.Column>
                Game Duration: <br />
                {parseInt(item.gameDuration / 60)} mins
              </Grid.Column>
              <Grid.Column>    
                Summoner Name <br />     
                {/* {this.props.cardOutputArr.} */}
              </Grid.Column>
              <Grid.Column>   
                Summoner Spells <br />      
              
              </Grid.Column>
              <Grid.Column>   
                CS (Neuts/total/enemyJ/alliedJ) <br />      
              
              </Grid.Column>
              
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                Summoner Perks: <br />

              </Grid.Column>
              <Grid.Column>
                Champion Name <br />
                
              </Grid.Column>
              <Grid.Column>
                KDA <br />
                
              </Grid.Column>
              <Grid.Column>
                Items bought <br />
                
              </Grid.Column>
              <Grid.Column>
                CS/min <br />
                
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card>
      )
    })

    return (

      <div id="content">
        <h2>league stats</h2>
        {this.props.summoner ?
          <div>
            <p>Summoner: {this.props.summoner}</p>
            <h3>5 most recent game ID's:</h3>
            <div>
              {gameIdsJSX1}
              {gameIdsJSX2}
            </div>
          </div>
          :
          null
        }
      </div>

    );
  }
}