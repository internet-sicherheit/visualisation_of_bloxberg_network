import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './modules/styles.css';
import GraphCreator from './modules/GraphCreator';

class App extends Component {

  state = {
    page: 0,
    offset: 0,
    stage: 0
  };

  render() {

    let graph = (this.state.page !== 0) ? <GraphCreator page={this.state.page} offset={this.state.offset} stage={this.state.stage} /> : null;

    const maxPage = 100;
    const maxOffset = 1800;
    const maxDepth = 5;

    const pageSelectedValue = 2;
    const offsetSelectedValue = 1;
    const depthSelectedValue = 0;

    const pageSelectOptions = [];
    for(let i = 1; i <= maxPage; i++) {
      pageSelectOptions.push(<option key={i} value={i}>{i}</option>);
    }
    const offsetSelectOptions = [];
    for(let i = 1; i <= maxOffset; i++) {
      offsetSelectOptions.push(<option key={i} value={i}>{i}</option>);
    }
    const depthSelectOptions = [];
    for(let i = 0; i <= maxDepth; i++) {
      depthSelectOptions.push(<option key={i} value={i}>{i}</option>);
    }

    return (
      <div className="App">
        <div id="banner">
          <h1 className="title">Visualisation of Bloxsberg-Network</h1>
        </div>
        <div id="site_informaiton">
          <p>This website will produce a force directed d3 graph that will visualizise the Bloxberg Network by using the <a href="https://blockexplorer.bloxberg.org/api_docs">Bloxberg RPC API</a>.</p>
        </div>
        <div id="values_informaiton">
          <p id="text">
            <b>Page</b> represents the page number to be used for pagination.
          </p>
          <p id="text">
            <b>Offset</b> represents the maximum number of records to return when paginating.
          </p>
          <p id="text">
            <b>Depth</b> represents how deep the http requests will search into to network.
          </p>
        </div>
        <div id="control">
          <label>Page:</label>
          <select id="page_selection" defaultValue={pageSelectedValue}>
            {pageSelectOptions}
          </select>
          <label>Offset:</label>
          <select id="offset_selection" defaultValue={offsetSelectedValue}>
            {offsetSelectOptions}
          </select>
          <label>Depth:</label>
          <select id="depth_selection" defaultValue={depthSelectedValue}>
            {depthSelectOptions}
          </select>
          <input type="submit" id="button" value="Create Graph" onClick={() => {

            let page = document.getElementById("page_selection").value;
            let offset = document.getElementById("offset_selection").value;
            let depth = document.getElementById("depth_selection").value;

            console.log("page -> " + page);
            console.log("offset -> " + offset);
            console.log("depth -> " + depth);

            this.setState({ page: page, offset: offset, depth: depth});
            
          }} />
        </div>
        <div id="loader" style={{visibility: "visable"}}>
          <div id="progressbar">
            <div id="progress"></div>
            <p>Loading...</p>
          </div>
        </div>
        <div id="address_information">
          <p class="labels">Select a node for node information.</p>
        </div>
        <div id="graph_box">
          {graph}
        </div>
      </div>
    );
  }
}


export default App;
