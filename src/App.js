import React, { Component } from "react";
import { BrowserRouter as Router, HashRouter, Switch, Route, Link } from 'react-router-dom'; // maybe switch HashRouter to Router
import './App.css';
import AddressViewer from './modules/address_viewer/code/AddressViewer';
import VBN from './modules/vbn/code/VBN';

class App extends Component {

  render() {
    return (
      <HashRouter basename='/visualisation_of_bloxberg_network/'>

        <div className="App">

        <div id="navigation">
              <ul id="nav-links">
                <Link to="/AddressViewer" className="link">
                  <li>AddressViewer</li>
                </Link>
                <Link to="/VBN" className="link">
                  <li>VBN</li>
                </Link>
              </ul>

          </div>

          <Switch>
            <Route path="/AddressViewer" exact component={AddressViewer} />
            <Route path="/VBN" exact component={VBN} />
          </Switch>

        </div>

      </HashRouter>
    );
  }

}

export default App;
