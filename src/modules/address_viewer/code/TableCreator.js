import React, { Component } from 'react';
import './styles.css';
import '../../../bootstrap.min.css';
import DataFetcher from './DataFetcher';

class TableCreator extends Component {

  url_website = 'https://internet-sicherheit.github.io/visualisation_of_bloxberg_network/#/visualisation_of_bloxberg_network/AddressViewer?address=';
  //url_website = 'http://localhost:3000/visualisation_of_bloxberg_network/#/visualisation_of_bloxberg_network/AddressViewer?address=';
  url_bloxberg_tx = 'https://blockexplorer.bloxberg.org/tx/';
  url_bloxberg_addr = 'https://blockexplorer.bloxberg.org/address/';

  MODE_SUMMARY = "mode_transaction_summary";
  MODE_ALLTRANSACTIONS = "mode_all_transactions";
  MODE_SELECTEDTRANSACTIONS = "mode_selected_transactions";

  sortMode = "asc";
  sortButton = "sender";

  PAGE_FIRST = "page_first";
  PAGE_LAST = "page_last";
  PAGE_INCREASE = "page_increase";
  PAGE_DECREASE = "page_decrease";

  htmlCode = '';
  responseObject = null;
  promise = null;

  transactionList = null;

  mode = null;
  page = 1;
  pageFaktor = 100;

  checkedAddresses = null;

  constructor(props) {
    super(props);
    console.log("Consturctor:")
    console.log(props);

    this.responseObject = new DataFetcher();
    this.checkedAddresses = new Map();
  }

  renderData(promise) {

    // Save promise localy
    this.promise = promise;

    // Show information of source address
    document.getElementById("type").innerHTML = this.promise.type;
    document.getElementById("name").innerHTML = '<a href="' + this.url_bloxberg_addr + this.promise.address + '/transactions" target="_blank">' + this.promise.name + '</a>';
    document.getElementById("status").innerHTML = this.promise.status;

    // Show initially transaction summary of source address
    this.renderTableSummary(1);
  }

  getMaxPages() {

    let maxPages = 1;
    if (this.transactionList.length !== 0) { // needed if selectedTransactions are empty
      let rest = this.transactionList.length % this.pageFaktor !== 0;
      maxPages = rest ? Math.floor(this.transactionList.length / this.pageFaktor) + 1 : Math.floor(this.transactionList.length / this.pageFaktor);
    }
    return maxPages;
  }

  getRowCounterStart(page) {

    let rowCounterStart = (page === 1)
      ? 0
      : (page - 1) * this.pageFaktor;

    return rowCounterStart;
  }

  getRowCounterEnd(page) {

    let maxPages = this.getMaxPages();

    let rowCounterEnd = (page === maxPages)
      ? this.transactionList.length
      : page * this.pageFaktor;

    return rowCounterEnd;
  }

  renderTable(pageControl) {

    //console.log("CHECKED ADDRESSES ARE:");
    //console.log(this.checkedAddresses);

    let maxPages = this.getMaxPages();

    switch (pageControl) {
      case this.PAGE_INCREASE:
        if (this.page < maxPages) {
          this.page++;
        }
        break;
      case this.PAGE_DECREASE:
        if (this.page > 1) {
          this.page--;
        }
        break;
      case this.PAGE_FIRST:
        this.page = 1;
        break;
      case this.PAGE_LAST:
        this.page = maxPages;
        break;
      default:
        break;
    }

    switch (this.mode) {
      case this.MODE_SUMMARY:
        this.renderTableSummary(this.page);
        break;
      case this.MODE_ALLTRANSACTIONS:
        this.renderTableAllTransactions(this.page);
        break;
      case this.MODE_SELECTEDTRANSACTIONS:
        this.renderTableSelectedTransactions(this.page, false);
        break;
      default:
        break;
    }
  }

  renderTableSummary(page, resetMap) {

    console.log("Transaction Summary -->");

    this.transactionList = this.promise.getTransactionSummaryMap();
    //this.transactionList = this.testTableSummary();

    if(this.sortButton === "sender") {
      this.transactionList = this.promise.sortByAddress(this.sortMode, this.sortButton, this.transactionList);
    }
    if(this.sortButton === "receiver") {
      this.transactionList = this.promise.sortByAddress(this.sortMode, this.sortButton, this.transactionList);
    }
    if(this.sortButton === "txcount") {
      this.transactionList = this.promise.sortByTxCount(this.sortMode, this.transactionList);
    }

    this.mode = this.MODE_SUMMARY;
    this.page = (page === 1) ? this.page = 1 : page;
    this.setPageButtons();

    this.htmlCode = "";

    this.checkedAddresses = (resetMap) ? new Map() : this.checkedAddresses;

    this.addToHTMLCode(
      '<table class="table" style="table-layout:fixed; word-wrap:break-word;">'
      + '<thead class="thead-dark">'
      + '<tr>'
    );

    this.addToHTMLCode('<th scope="col">#</th>');
    this.addToHTMLCode('<th scope="col" id="sender">Sender</th>');
    this.addToHTMLCode('<th scope="col" id="receiver">Receiver</th>');
    this.addToHTMLCode('<th scope="col" id="txcount">TxCount</th>');

    this.addToHTMLCode(
      '</tr>'
      + '</thead>'
      + '<tbody>');

    let rowCounterEnd = this.getRowCounterEnd(page);
    let rowCounterStart = this.getRowCounterStart(page);

    console.log("        MaxPages: " + this.getMaxPages());
    console.log("        Page: " + page);
    console.log("        Start: " + rowCounterStart);
    console.log("        End: " + rowCounterEnd);

    for (rowCounterStart; rowCounterStart < rowCounterEnd; rowCounterStart++) {
      let value = this.transactionList[rowCounterStart];
      //console.log("        " + rowCounterStart + ", " + value.senderName + ", " + value.receiverName + ", " + value.txCount);

      let isChecked = (typeof this.checkedAddresses.get(value.senderAddress) === 'undefined')
                      ? ''
                      : 'checked';

      this.addToHTMLCode(
        '<tr id="' + value.senderAddress + '">'
        + '<th scope="row"><input class="checkBox" type="checkbox" value="' + value.senderAddress + '" ' + isChecked + ' /></th>'
        + '<td><a href="' + this.url_website + value.senderAddress + '" target="_blank">' + value.senderName + '</a></td>'
        + '<td><a href="' + this.url_website + value.receiverAddress + '" target="_blank">' + value.receiverName + '</a></td>'
        + '<td>' + value.txCount + '</td>'
        + '</tr>'
      );
    }

    this.addToHTMLCode(
      '</tbody>'
      + '</table>'
    );

    document.getElementById("entryCount").innerHTML = this.transactionList.length + " entries";
    document.getElementById("table").innerHTML = this.htmlCode;

    for (let [key, value] of this.checkedAddresses) {
      let trRow = document.getElementById(value);
      if(trRow !== null) {
        trRow.style.backgroundColor="lightgray";
      }
    }

    this.addListenerToCheckBoxes();

    this.addTableSortButtonSender();
    this.addTableSortButtonReceiver();
    this.addTableSortButtonTxCount();
  }

  renderTableAllTransactions(page) {

    console.log("AllTransactions -->");

    this.transactionList = this.promise.getAllTransactions();

    if(this.sortButton === "sender") {
      this.transactionList = this.promise.sortByAddress(this.sortMode, this.sortButton, this.transactionList);
    }
    if(this.sortButton === "receiver") {
      this.transactionList = this.promise.sortByAddress(this.sortMode, this.sortButton, this.transactionList);
    }
    if(this.sortButton === "timestamp") {
      this.transactionList = this.promise.sortByTimeStamp(this.sortMode, this.transactionList);
    }

    this.mode = this.MODE_ALLTRANSACTIONS;
    this.page = (page === 1) ? this.page = 1 : page;
    this.setPageButtons();

    this.htmlCode = "";

    this.checkedAddresses = new Map();

    this.addToHTMLCode(
      '<table class="table" style="table-layout:fixed; word-wrap:break-word;">'
      + '<thead class="thead-dark">'
      + '<tr>'
    );

    this.addToHTMLCode('<th scope="col">#</th>');
    this.addToHTMLCode('<th scope="col" id="sender">Sender</th>');
    this.addToHTMLCode('<th scope="col" id="receiver">Receiver</th>');
    this.addToHTMLCode('<th scope="col" id="timestamp">TimeStamp</th>');
    this.addToHTMLCode('<th scope="col">Input</th>');

    this.addToHTMLCode(
      '</tr>'
      + '</thead>'
      + '<tbody>');

    let rowCounterEnd = this.getRowCounterEnd(page);
    let rowCounterStart = this.getRowCounterStart(page);

    console.log("        MaxPages: " + this.getMaxPages());
    console.log("        Page: " + page);
    console.log("        Start: " + rowCounterStart);
    console.log("        End: " + rowCounterEnd);

    for (rowCounterStart; rowCounterStart < rowCounterEnd; rowCounterStart++) {
      let value = this.transactionList[rowCounterStart];
      //console.log("        " + rowCounterStart + ", " + value.senderName + ", " + value.receiverName + ", " + value.timeStamp + ", " + value.input);
      this.addToHTMLCode(
        '<tr>'
        + '<th scope="row">' + (rowCounterStart + 1) + '</th>'
        + '<td><a href="' + this.url_website + value.senderAddress + '" target="_blank">' + value.senderName + '</a></td>'
        + '<td><a href="' + this.url_website + value.receiverAddress + '" target="_blank">' + value.receiverName + '</a></td>'
        + '<td><a href="' + this.url_bloxberg_tx + value.transactionHash + '/internal_transactions" target="_blank">' + this.convertTime(parseInt(value.timeStamp)) + '</a></td>'
        + '<td>' + value.input + '</td>'
        + '</tr>'
      );
    }

    this.addToHTMLCode(
      '</tbody>'
      + '</table>'
    );

    document.getElementById("entryCount").innerHTML = this.transactionList.length + " entries";
    document.getElementById("table").innerHTML = this.htmlCode;

    this.addTableSortButtonSender();
    this.addTableSortButtonReceiver();
    this.addTableSortButtonTimeStamp();
  }

  renderTableSelectedTransactions(page) {

    console.log("SelectedTransactions -->");

    this.transactionList = this.promise.getTransactionsForAddress(this.checkedAddresses);

    if(this.sortButton === "sender") {
      this.transactionList = this.promise.sortByAddress(this.sortMode, this.sortButton, this.transactionList);
    }
    if(this.sortButton === "receiver") {
      this.transactionList = this.promise.sortByAddress(this.sortMode, this.sortButton, this.transactionList);
    }
    if(this.sortButton === "timestamp") {
      this.transactionList = this.promise.sortByTimeStamp(this.sortMode, this.transactionList);
    }

    this.mode = this.MODE_SELECTEDTRANSACTIONS;
    this.page = (page === 1) ? this.page = 1 : page;
    this.setPageButtons();

    this.htmlCode = "";

    this.addToHTMLCode(
      '<table class="table" style="table-layout:fixed; word-wrap:break-word;">'
      + '<thead class="thead-dark">'
      + '<tr>'
    );

    this.addToHTMLCode('<th scope="col">#</th>');
    this.addToHTMLCode('<th scope="col" id="sender">Sender</th>');
    this.addToHTMLCode('<th scope="col" id="receiver">Receiver</th>');
    this.addToHTMLCode('<th scope="col" id="timestamp">TimeStamp</th>');
    this.addToHTMLCode('<th scope="col">Input</th>');

    this.addToHTMLCode(
      '</tr>'
      + '</thead>'
      + '<tbody>');

    let rowCounterEnd = this.getRowCounterEnd(page);
    let rowCounterStart = this.getRowCounterStart(page);

    console.log("        MaxPages: " + this.getMaxPages());
    console.log("        Page: " + page);
    console.log("        Start: " + rowCounterStart);
    console.log("        End: " + rowCounterEnd);


    if (typeof this.checkedAddresses.length === 'undefined') {
      for (rowCounterStart; rowCounterStart < rowCounterEnd; rowCounterStart++) {
        let value = this.transactionList[rowCounterStart];
        //console.log("        " + rowCounterStart + ", " + value.senderName + ", " + value.receiverName + ", " + value.timeStamp + ", " + value.input);
        this.addToHTMLCode(
          '<tr>'
          + '<th scope="row">' + (rowCounterStart + 1) + '</th>'
          + '<td><a href="' + this.url_website + value.senderAddress + '" target="_blank">' + value.senderName + '</a></td>'
          + '<td><a href="' + this.url_website + value.receiverAddress + '" target="_blank">' + value.receiverName + '</a></td>'
          + '<td><a href="' + this.url_bloxberg_tx + value.transactionHash + '/internal_transactions" target="_blank">' + this.convertTime(parseInt(value.timeStamp)) + '</a></td>'
          + '<td>' + value.input + '</td>'
          + '</tr>'
        );
      }
    }

    this.addToHTMLCode(
      '</tbody>'
      + '</table>'
    );

    document.getElementById("entryCount").innerHTML = this.transactionList.length + " entries";
    document.getElementById("table").innerHTML = this.htmlCode;

    this.addTableSortButtonSender();
    this.addTableSortButtonReceiver();
    this.addTableSortButtonTimeStamp();
  }

  addToHTMLCode(code) {
    this.htmlCode = this.htmlCode + code;
  }

  setPageButtons() {
    let pageButtons = document.getElementsByClassName("pageButton");
    for (let i = 0; i < pageButtons.length; i++) {
      pageButtons[i].innerHTML = "Page " + this.page;
    }
  }

  addListenerToCheckBoxes() {
    let checkBoxes = document.getElementsByClassName("checkBox");
    for (let i = 0; i < checkBoxes.length; i++) {
      checkBoxes[i].addEventListener("change", (event) => {
        if (event.currentTarget.checked) {
          this.checkedAddresses.set(event.currentTarget.value, event.currentTarget.value);
          document.getElementById(event.currentTarget.value).style.backgroundColor = "lightgray";
        } else {
          this.checkedAddresses.delete(event.currentTarget.value);
          document.getElementById(event.currentTarget.value).style.backgroundColor = "white";
        }
      });
    }
  }

  addTableSortButtonSender() {
    let senderTableHead = document.getElementById("sender");
    senderTableHead.addEventListener("click", (event) => {
      this.sortButton = "sender";

      if(this.sortMode === "asc") {
        this.sortMode = "desc";
      } else {
        this.sortMode = "asc";
      }

      if(this.mode === this.MODE_SUMMARY) {
        this.renderTableSummary(this.page, true);
      }
      if(this.mode === this.MODE_ALLTRANSACTIONS) {
        this.renderTableAllTransactions(this.page);
      }
      if(this.mode === this.MODE_SELECTEDTRANSACTIONS) {
        this.renderTableSelectedTransactions(this.page);
      }
    });
  }
  addTableSortButtonReceiver() {
    let receiverTableHead = document.getElementById("receiver");
    receiverTableHead.addEventListener("click", (event) => {
      this.sortButton = "receiver";

      if(this.sortMode === "asc") {
        this.sortMode = "desc";
      } else {
        this.sortMode = "asc";
      }

      if(this.mode === this.MODE_SUMMARY) {
        this.renderTableSummary(this.page, true);
      }
      if(this.mode === this.MODE_ALLTRANSACTIONS) {
        this.renderTableAllTransactions(this.page);
      }
      if(this.mode === this.MODE_SELECTEDTRANSACTIONS) {
        this.renderTableSelectedTransactions(this.page);
      }
    });
  }
  addTableSortButtonTxCount() {
    let txcountTableHead = document.getElementById("txcount");
    txcountTableHead.addEventListener("click", (event) => {
      this.sortButton = "txcount";

      if(this.sortMode === "asc") {
        this.sortMode = "desc";
      } else {
        this.sortMode = "asc";
      }

      if(this.mode === this.MODE_SUMMARY) {
        this.renderTableSummary(this.page, true);
      }
      if(this.mode === this.MODE_ALLTRANSACTIONS) {
        this.renderTableAllTransactions(this.page);
      }
      if(this.mode === this.MODE_SELECTEDTRANSACTIONS) {
        this.renderTableSelectedTransactions(this.page);
      }
    });
  }
  addTableSortButtonTimeStamp() {
    let timeStampTableHead = document.getElementById("timestamp");
    timeStampTableHead.addEventListener("click", (event) => {
      this.sortButton = "timestamp";

      if(this.sortMode === "asc") {
        this.sortMode = "desc";
      } else {
        this.sortMode = "asc";
      }

      if(this.mode === this.MODE_SUMMARY) {
        this.renderTableSummary(this.page, true);
      }
      if(this.mode === this.MODE_ALLTRANSACTIONS) {
        this.renderTableAllTransactions(this.page);
      }
      if(this.mode === this.MODE_SELECTEDTRANSACTIONS) {
        this.renderTableSelectedTransactions(this.page);
      }
    });
  }

  convertTime(timeStamp) {
    let date = new Date(timeStamp * 1000);

    let day = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
    let month = (date.getMonth() + 1 < 10) ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let year = date.getFullYear();

    let hours = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
    let minutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
    let seconds = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();

    let timeString = day + "." + month + "." + year + ", " + hours + ":" + minutes + ":" + seconds;

    return timeString;
}

  scrollAnimation() {
    document.getElementById("table_window").scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  showInformation(show) {
    if (show === true) {
      let infoElements = document.getElementsByClassName("info");
      for (let i = 0; i < infoElements.length; i++) {
        infoElements[i].style.display = "table-row";
      }
    } else {
      let infoElements = document.getElementsByClassName("info");
      for (let i = 0; i < infoElements.length; i++) {
        infoElements[i].style.display = "none";
      }
    }
  }
  showLoader(show) {
    if (show === true) {
      document.getElementById("loader_window").style.display = "block";
    } else {
      document.getElementById("loader_window").style.display = "none";
      document.getElementById("p").style.width = "0%";
      document.getElementById("p").innerHTML = "0.0%";
      document.getElementById("loader_info").innerHTML = "";
    }
  }
  showTable(show) {
    if (show === true) {
      document.getElementById("table_window").style.display = "block";
    } else {
      document.getElementById("table_window").style.display = "none";
    }
  }

  //componentWillMount() {
  //}

  componentDidMount() {

    this.showInformation(false);
    this.showLoader(true);
    this.showTable(false);
    this.promise = this.responseObject.fetchData(this.props.address);
    this.promise.then((promise) => {
      this.showLoader(false);
      this.showInformation(true);
      this.showTable(true);
      this.renderData(promise);
      this.scrollAnimation();
    });


  }

  componentWillUpdate(nextProps) {
    this.showInformation(false);
    this.showLoader(true);
    this.showTable(false);
    this.promise = this.responseObject.fetchData(nextProps.address);
    this.promise.then((promise) => {
      this.showLoader(false);
      this.showInformation(true);
      this.showTable(true);
      this.renderData(promise);
      this.scrollAnimation();
    });
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <div class="TableCreator">
        <div id="links">
          <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => this.renderTableSummary(1, true)}>Summary</button>
          <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => this.renderTableAllTransactions(1)}>All transactions</button>
          <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => this.renderTableSelectedTransactions(1)}>Selected transactions</button>
        </div>
        <table class="page_control">
          <tbody>
            <tr>
              <td id="entryCount"></td>
              <td id="paging">
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => this.renderTable(this.PAGE_FIRST)}>First</button>
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => this.renderTable(this.PAGE_DECREASE)}>&lt;</button>
                <button class="btn btn-outline-secondary pageButton" type="button" id="button-addon2">Page 1</button>
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => this.renderTable(this.PAGE_INCREASE)}>&gt;</button>
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => this.renderTable(this.PAGE_LAST)}>Last</button>
              </td>
              <td>
                <p id="placeholder">placeholder</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div id="table"></div>
        <table class="page_control">
          <tbody>
            <tr>
              <td>
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => this.renderTable(this.PAGE_FIRST)}>First</button>
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => this.renderTable(this.PAGE_DECREASE)}>&lt;</button>
                <button class="btn btn-outline-secondary pageButton" type="button" id="button-addon2">Page 1</button>
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => this.renderTable(this.PAGE_INCREASE)}>&gt;</button>
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => this.renderTable(this.PAGE_LAST)}>Last</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableCreator;