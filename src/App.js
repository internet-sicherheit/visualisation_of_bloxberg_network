import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import AddressViewer from './modules/address_viewer/code/AddressViewer';
import VBN from './modules/vbn/code/VBN';

class App extends Component {

  render() {

    return (
      <Router>

        <div className="App">

        <div id="navigation">
              <ul id="nav-links">
                <Link to="/AddressViewer" class="link">
                  <li>AddressViewer</li>
                </Link>
                <Link to="/VBN" class="link">
                  <li>VBN</li>
                </Link>
              </ul>

          </div>

          <Switch>
            <Route path="/AddressViewer" exact component={AddressViewer} />
            <Route path="/VBN" exact component={VBN} />
          </Switch>

        </div>

      </Router>
    );
  }

}

export default App;
