import React, { Component } from 'react';
import './styles.css';
import '../../../bootstrap.min.css';
import DataFetcher from './DataFetcher';
import { html } from 'd3';

class TableCreator extends Component {

    htmlCode = '';
    responseObject = null;

    constructor(props) {
        super(props);
        console.log("Consturctor:")
        console.log(props);
        this.responseObject = new DataFetcher();
    }

    renderData(promise) {
        let veriefied = promise.isVerified === true ? "verified" : "not verified";
        let transactions = promise.transactionList;
        console.log("Transactions")
        console.log(transactions);

        document.getElementById("type").innerHTML = promise.type;
        document.getElementById("name").innerHTML = promise.name;
        document.getElementById("address").innerHTML = promise.address;
        document.getElementById("verified").innerHTML = veriefied;

        if (promise.name === null) {
            document.getElementById("name").style.visibility = "hidden";
        } else {
            document.getElementById("name").style.visibility = "visible";
        }
        if (promise.isVerified === null) {
            document.getElementById("verified").style.visibility = "hidden";
        } else {
            document.getElementById("verified").style.visibility = "visible";
        }        
        
        /*
        let table = 
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </table>;
        */

        let headlines = this.getTableHeadlines(transactions);

        this.addToHTMLCode(
            '<table class="table" style="table-layout:fixed; word-wrap:break-word;">'
            + '<thead class="thead-dark">' 
                + '<tr>'
                );

        this.addToHTMLCode('<th scope="col">#</th>');

        for(let i = 0; i < headlines.length; i++) {
            
            this.addToHTMLCode('<th scope="col">' + headlines[i] + '</th>');
        }

        this.addToHTMLCode(
            '</tr>'
                + '</thead>'
                + '<tbody>');
        
        for (let i = 0; i < transactions.length; i++) {
            this.addToHTMLCode(
                '<tr>'
                    + '<th scope="row">' + (i + 1) + '</th>'
                    + '<td>' + transactions[i].from + '</td>'
                    + '<td>' + transactions[i].to + '</td>'
                    + '<td>' + transactions[i].time + '</td>'
                    + '<td>' + transactions[i].input + '</td>'
                + '</tr>'
            );
        }

        this.addToHTMLCode(
            '</tbody>'
                + '</table>'
        ); 
    
        document.getElementById("table").innerHTML = this.htmlCode;
    }

    addToHTMLCode(code) {
        this.htmlCode = this.htmlCode + code;
    }

    getTableHeadlines(transactions) {
        let headlines = [];
        
        Object.keys(transactions[0]).forEach(function(key) {
            headlines.push(key);
        });

        return headlines;
    }
    
    scrollAnimation() {
        document.getElementById("type").scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
    }

    componentWillMount() {

    }

    componentDidMount() {
        let promise = this.responseObject.fetchData(this.props.address);
        promise.then((promise) => {
            this.renderData(promise);
            this.scrollAnimation();
        });
    }

    componentWillUpdate(nextProps) {
        let promise = this.responseObject.fetchData(nextProps.address);
        promise.then((promise) => {
            this.renderData(promise);
            this.scrollAnimation();
        });
    }

    componentDidUpdate() {

    }

    render() {

        

        return (
            <div className="TableCreator">
                <h2 id="type"></h2>
                <p id="name"></p>
                <p id="address"></p>
                <p id="verified"></p>
                <div id="table"></div>
            </div>
        );
    }
}

export default TableCreator;