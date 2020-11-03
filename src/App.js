import React, { Component } from 'react';
import './App.css';
import GraphCreator from './modules/GraphCreator';

class App extends Component {

  state = {
    page: 0,
    offset: 0
  };

  render() {

    let graph = (this.state.page !== 0) ? <GraphCreator page={this.state.page} offset={this.state.offset} /> : null;

    const maxPage = 100;
    const maxOffset = 1800;

    const pageSelectedValue = 1;
    const offsetSelectedValue = 3;

    const pageSelectOptions = [];
    for(let i = 1; i <= maxPage; i++) {
      if(i === pageSelectedValue) {
        pageSelectOptions.push(<option key={i} value={i} selected>{i}</option>);
      } else {
        pageSelectOptions.push(<option key={i} value={i}>{i}</option>);
      }
    }

    const offsetSelectOptions = [];
    for(let i = 1; i <= maxOffset; i++) {
      if(i === offsetSelectedValue) {
        offsetSelectOptions.push(<option key={i} value={i} selected>{i}</option>);
      } else {
        offsetSelectOptions.push(<option key={i} value={i}>{i}</option>);
      }
    }

    return (
      <div className="App">
        <h1 className="title">Visualisation of Bloxsberg-Network</h1>
        <div id="input">
          <label>Page:</label>
          <select id="page_selection">
            {pageSelectOptions}
          </select>
          <label>Offset:</label>
          <select id="offset_selection">
            {offsetSelectOptions}
          </select>
          <input type="submit" id="button" value="Start" onClick={() => {

            let page = document.getElementById("page_selection").value;
            let offset = document.getElementById("offset_selection").value;

            console.log("page -> " + page);
            console.log("offset -> " + offset);

            this.setState({ page: page, offset: offset});
            
          }} />
        </div>
        <div id="graph_box">
          {graph}
        </div>
      </div>
    );
  }
}


export default App;
