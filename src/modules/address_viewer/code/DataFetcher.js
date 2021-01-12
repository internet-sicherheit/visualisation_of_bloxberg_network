import React from 'react';

class DataFetcher extends React.Component {

    transactionMap = null;

    constructor(props) {
        super(props);

        this.transactionMap = new Map();
    }

    async fetchData(address) {

        let some = await this.getTransactions(address);

    }

    async getTransactions(address) {
        return null;
    }

}

export default DataFetcher;