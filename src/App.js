import React from 'react';
import './App.css';
import ContractVisualisation from './modules/ContractVisualisation';
import GraphCreator from './modules/GraphCreator';

function App() {
  return (
    <div className="App">
        <h1 className="title">Visualisation of Bloxsberg-Network</h1>
        <ContractVisualisation />
        <div id="graph_box">
          <GraphCreator />
        </div>
    </div>
  );
}

export default App;
