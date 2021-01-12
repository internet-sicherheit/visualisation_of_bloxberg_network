import React from 'react';

class DataFetcher extends React.Component {

    transactionMap = null;

    constructor(props) {
        super(props);

        this.transactionMap = new Map();
    }

    async fetchData(address) {

        await getTransactionList(address);

    }

    async getTransactionList(address) {

    }

}

export default DataFetcher;