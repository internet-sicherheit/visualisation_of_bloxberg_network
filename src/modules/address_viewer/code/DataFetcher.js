import React from 'react';

class DataFetcher extends React.Component {

    UrlApi = null;
    transactionMap = null;

    constructor(props) {
        super(props);

        this. UrlApi = "https://blockexplorer.bloxberg.org/api/api?module=account&action=txlist&address=";
        this.transactionMap = new Map();
    }

    async fetchData(address) {

        let some = await this.getTransactions(address);

    }

    async getTransactions(address) {
        console.log(address)

        let result = await fetch(this.UrlApi + address).then(response => response.json());
        console.log(result);

        return result;
    }

}

export default DataFetcher;