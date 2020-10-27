import React from 'react';

class DataCollector extends React.Component {

    constructor(props) {
        super(props);
    }

    async getData(contractAddress) {

        const Http = new XMLHttpRequest();
        const url = 'https://blockexplorer.bloxberg.org/api/api?module=account&action=txlist&address=' + contractAddress;  
                                                                                                                                                   
        let transactions = await fetch(url).then(response => response.json());

        return this.parseHTTPResponse(transactions.result);
    }

    parseHTTPResponse(response) {

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