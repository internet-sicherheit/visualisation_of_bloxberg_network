import React from 'react';

class DataCollector extends React.Component {

    constructor(props) {
        super(props);
    }

    async getData(address, mode) {

        const Http = new XMLHttpRequest();
        const url = 'https://blockexplorer.bloxberg.org/api/api?module=account&action=txlist&address=' + address;  
                                                                                                                                                   
        let transactions = await fetch(url).then(response => response.json());

        let result = null;

        switch(mode) {
            case "contract":
                result = this.parseHTTPResponseForContract(transactions.result);
                break;
            case "account":
                result = this.parseHTTPResponseForNetwork(transactions.result);
                break;
        }

        return result;
    }

    parseHTTPResponseForContract(response) {

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

    parseHTTPResponseForNetwork(response) {  // 0x97c314818fbe22b4b5d5Ea75E52E726271aFAE3b  
        console.log("network vis");

        let page = 2;
        let offset = 100;

        const Http = new XMLHttpRequest();
        const url = 'https://blockexplorer.bloxberg.org/api/api?module=contract&action=listcontracts&page=' + page + '&offset=' + offset;  
                                                                                                                                                   
        let contracts = fetch(url).then(response => response.json());


        contracts.then((promise) => {

            let list = promise.result;
            let contractList = [];

            list.forEach(function(contract) {
                contractList.push({contractAddress: contract.Address});
            });

            console.log("contractList");
            console.log(contractList);


        }).catch((err) => {
            console.error(err);
        });
        
    }
}

export default DataCollector;