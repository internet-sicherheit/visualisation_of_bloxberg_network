import React, { Component } from 'react';
import './styles.css';
import '../../../bootstrap.min.css';
import TableCreator from './TableCreator';

class AddressViewer extends Component {

  state = {
    address: null
  };

  render() {

    let table = (this.state.address !== "") ? <TableCreator address={this.state.address} /> : null;

    return (
      <div className="AddressViewer">

        <div id="banner">
          <h1 className="title">Adderss Viewer</h1>
        </div>

        <div id="searchbar">
          <div id="address_input">
            <div class="input-group mb-3">
              <input type="text" id="input" class="form-control" placeholder="Enter address..." aria-label="Enter address..." aria-describedby="button-addon2" />
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => {

                  let address = document.getElementById("input").value;

                  if(address != "") {
                    console.log("address -> " + address);

                    this.setState({ address: address });

                  } else {
                    window.alert("Inputfield is empty.");
                  }

                }}>Search</button>
              </div>
            </div>
          </div>
        </div>

        <div id="table_box">
          {table}
        </div>

      </div>
    );
  }

}

export default AddressViewer;