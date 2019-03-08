import React, { Component } from 'react';
import '../App.css';

export default class Searchbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchString: "",
    }
  }

  searchInput = e => {
    this.setState({ searchString: e.target.value })
  }

  render() {
    return (
      <div id="searchbar">
        <div className="searchBarQuery2">
          <form id="addItemForm">
            <input
              type="text"
              placeholder="Search for summoner..."
              onKeyUp={this.searchInput}
            />
            <button
              onClick={(e) => {
                this.props.findSummoner(e, this.state.searchString)
              }}>
              Search
        </button>
          </form>
        </div>
      </div>
    );
  }
}

