import React, { Component } from 'react';
import './App.css';
import GraphCreator from './modules/GraphCreator';

class App extends Component {

  state = {
    address: null
  };


  render() {

    const graph = (this.state.address !== null) ? <GraphCreator address={this.state.address} /> : null;

    return (
      <div className="App">
        <h1 className="title">Visualisation of Bloxsberg-Network</h1>
        <div id="input">
          <input type="text" id="address" placeholder="Address..." /><input type="submit" id="button" value="Submit" onClick={() => {

            let addr = document.getElementById("address").value;
            
            if (addr === "") {
              alert("Enter an Address first.");
            } else if (!addr.match("^0x([A-Fa-f0-9]{40})$")) {
              alert("Your input is not an address.");
            } else {
              this.setState({ address: addr});
            }

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
