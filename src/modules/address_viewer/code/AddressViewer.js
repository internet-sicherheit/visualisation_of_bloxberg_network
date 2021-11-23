import React, { Component } from 'react';
import './styles.css';
import '../../../bootstrap.min.css';
import TableCreator from './TableCreator';
import queryString from 'query-string';

class AddressViewer extends Component {

  state = {
    address: null
  };

  componentDidMount() {

    const regex = "^0x[a-fA-F0-9]{40}$";
    const query = this.props.location.search;

    console.log(query);

    if(query !== '') {
      const values = queryString.parse(this.props.location.search);
      const addr = values.address;
      if(addr.match(regex)) {
        this.setState({ address: addr });
        document.getElementById("address_input").value = addr;
      }
    }
  }

  render() {

    let table = (this.state.address !== null) ? <TableCreator address={this.state.address} /> : null;

    return (
      <div className="AddressViewer">

        <div class="window" id="search_window">
          <table id="search_table">
            <tbody>
            <tr>
              <td>
                <label class="black_label">Address</label>
              </td>
              <td>                
                <div class="input-group-append">
                  <input type="text" id="address_input" class="form-control form-control-lg" placeholder="Enter address..." autoFocus/>
                  <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => {

                    let address = document.getElementById("address_input").value;

                    const regex = "^0x[a-fA-F0-9]{40}$";
                    if(address !== "") {
                      if(address.match(regex)) {
                        console.log("address -> " + address);
                        this.setState({ address: address });
                      } else {
                        window.alert("Invalid address.");
                      }
                    } else {
                      window.alert("Inputfield is empty.");
                    }

                  }}>Search</button>
              </div>
              </td>
            </tr>
            <tr class="info">
              <td>
                <label class="black_label">Type</label>
              </td>
              <td>
                <label id="type"></label>
              </td>
            </tr>
            <tr class="info">
              <td>
                <label class="black_label">Name</label>
              </td>
              <td>
                <label id="name"></label>
              </td>
            </tr>
            <tr class="info">
              <td>
                <label class="black_label">Status</label>
              </td>
              <td>
                <label id="status"></label>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="window" id="loader_window">
          <div id="pb">
            <div id="p">
              0.0%
            </div>
          </div>
          <label id="loader_info"></label>
        </div>

        <div class="window" id="table_window">
          {table}
        </div>
      </div>
    );
  }

}

export default AddressViewer;