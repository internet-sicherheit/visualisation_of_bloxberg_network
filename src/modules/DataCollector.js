import { transition } from 'd3';
import React from 'react';

class DataCollector extends React.Component {

    constructor(props) {
        super(props);
    }

    async getData(page, offset, stage) {

        // get contract list
        let contractList = await this.getContractList(page, offset);
        console.log("Get contractlist:");
        console.log(contractList);

        // get transactions from contract list
        let transactionList = await this.getTransactionFromContractList(contractList);
        console.log("Get transactionlist from contractlist:");
        console.log(transactionList);

        return transactionList;

        // iterate over accounts
        //for (let i = 0; i < offset; i++) {

        //}
    }

    async getContractList(page, offset) {

        const url = 'https://blockexplorer.bloxberg.org/api/api?module=contract&action=listcontracts&page=' + page + '&offset=' + offset;

        let contractList = await fetch(url).then(response => response.json());

        return contractList.result;
    }

    async getTransactionList(contract) {

        let url = 'https://blockexplorer.bloxberg.org/api/api?module=account&action=txlist&address=' + contract;

        let transactionList = await fetch(url).then(response => response.json());

        console.log("getTransactionList: " + transactionList);

        return null;
    }

    async getTransactionFromContractList(contractList) {  // 0x97c314818fbe22b4b5d5Ea75E52E726271aFAE3b  

        let transactions = [];

        let counter = 0;
        for(const contract of contractList) {
            let url = 'https://blockexplorer.bloxberg.org/api/api?module=account&action=txlist&address=';
            //console.log("ContractAddress: " + contract.Address);
            url = url + contract.Address;

            let arrays = await fetch(url).then(contractList => contractList.json());
            //let transactions = [];

            let length = Object.keys(arrays.result).length;
            let array = arrays.result;

            for (let i = 0; i < length; i++) {

                if (transactions.length === 0) {
                    transactions.push({ source: array[i].from, target: array[i].to, type: "contract" });

                }

                let found = 0;
                for (let j = 0; j < transactions.length; j++) {

                    if (transactions[j].source === array[i].from && transactions[j].target === array[i].to) {
                        found = 1;
                    }

                }
                if (found === 0 && array[i].to !== "") {
                    transactions.push({ source: array[i].from, target: array[i].to, type: "contract" });
                }

            }

            counter++;
            //Array.prototype.push.apply(transactionList, transactions);
            //transactionList.push(transactions);
            console.log(transactions);

            let p = Math.round( counter * 100 /  contractList.length * 100 ) / 100;
            document.getElementById("progress").innerHTML = p + "%";
            document.getElementById("progress").style.width = p + "%";
        }

        //console.log("transactions");
        //console.log(transactions);

        return transactions;
    }

    parseHTTPResponse(response) {

        console.log("parseHTTPresponse");

        let transactions = [];

        let length = Object.keys(response).length;
        let array = response;

        /*
        for(let i = 0; i < length; i++) {
            transactions.push({ source: array[i].from, target: array[i].to });
        } */

        for (let i = 0; i < length; i++) {

            if (transactions.length === 0) {
                transactions.push({ source: array[i].from, target: array[i].to });

            }

            let found = 0;
            for (let j = 0; j < transactions.length; j++) {

                if (transactions[j].source === array[i].from && transactions[j].target === array[i].to) {
                    found = 1;
                }

            }
            if (found === 0 && array[i].to !== "") {
                transactions.push({ source: array[i].from, target: array[i].to });
            }

        }
        /*
                    for(let i = 0; i < this.transactions.length; i++) {
                        let count = 0;
                        for(let j = 0; j < length; j++) {
                            if(this.transactions[i].source === array[j].from && this.transactions[i].target === array[j].to) {
                                count++;
                            }
                        }
                        this.transactions[i].count = count;
                    }*/

        return transactions;
    }
}

export default DataCollector;