import React from 'react';
import web3 from 'web3';

class DataCollector extends React.Component {

    transactionMap = null;
    tempMap = null;

    constructor(props) {
        super(props);

        this.transactionMap = new Map();
        this.tempMap = new Map();
    }

    async getData(page, offset, depth) {

        this.setLoadingbar(0);

        this.transactionMap = new Map();
        this.tempMap = new Map();

        // get contract list
        console.log("Function - getContractList(page, offsett):");
        let contractList = await this.getContractList(page, offset);
        console.log("CONTRACTLIST:");
        console.log(contractList);

        // get transactions from contract list
        console.log("Function - getTransactionFromContractList(contractList):");
        await this.getTransactionFromContractList(contractList);
        console.log("TRANSACTIONMAP BEFORE DEEEP SEARCH:");
        console.log(this.transactionMap);

        // search deeper into network
        console.log("Function - deepSearch(depth, round):");
        this.tempMap = await this.copyMap(this.transactionMap);
        if (depth != 0) {
            for (let round = 1; round <= depth; round++) {
                await this.deepSearch(depth, round);
            }
            console.log("TRANSACTIONMAP AFTER DEEEP SEARCH:");
            console.log(this.transactionMap);
        }

        document.getElementById("loading_informaiton").innerHTML = "Loading...";

        return this.convertMapToArray(this.transactionMap);
    }

    async getContractList(page, offset) {

        const url = 'https://blockexplorer.bloxberg.org/api/api?module=contract&action=listcontracts&page=' + page + '&offset=' + offset;

        let contractList = await fetch(url).then(response => response.json());

        return contractList.result;
    }

    async getTransactionFromContractList(contractList) {

        console.log("Searching for contract transactions:");
        
        let counter = 1;
        for (const contract of contractList) {
            let url = 'https://blockexplorer.bloxberg.org/api/api?module=account&action=txlist&address=';
            url = url + contract.Address;

            let arrays = await fetch(url).then(json => json.json());

            let length = Object.keys(arrays.result).length;
            let array = arrays.result;

            console.log("   Recived " + length + " Transaction entries.");

            for (let i = 0; i < length; i++) {

                if (array[i].from !== "" && array[i].to !== "" && !this.mapContains(this.transactionMap, array[i].from, array[i].to)) {
                    this.transactionMap.set(
                        array[i].from + array[i].to,
                        {
                            source: array[i].from,
                            target: array[i].to,
                            sourceType: ((await this.isContract(array[i].from)) ? "Contract" : "Account"),
                            targetType: "Contract"
                        }
                    )
                    console.log("      Transaction entry number " + (i + 1) + " added.");
                }
            }

            let p = Math.round(counter * 100 / contractList.length * 100) / 100;
            this.setLoadingbar(p);

            counter++;
        }
        
        this.setLoadingbar(0);
    }

    async deepSearch(depth, round) {

        let map = this.copyMap(this.tempMap);
        this.tempMap = new Map();

        let counter = 1;

        console.log("DEEP SEARCH ROUND " + round + "/" + depth);

        for (const entry of map) {

            console.log("   Look up for map entry " + counter + " of " + map.size);

            document.getElementById("loading_informaiton").innerHTML = "Address look up (" + counter + "/" + map.size + ")<br>Depth search level (" + round + "/" + depth + ")";

            let url = 'https://blockexplorer.bloxberg.org/api/api?module=account&action=txlist&address=';
            url = url + entry[1].source;

            console.log("      Searching transactions for address " + entry[1].source + " ...");

            let arrays = await fetch(url).then(json => json.json());

            let length = Object.keys(arrays.result).length;
            let array = arrays.result;

            console.log("         Recived " + length + " Transaction entries.");

            let addCounter = 1;
            for (let i = 0; i < length; i++) {

                if (array[i].to !== entry[1].source) {
                    let temp = array[i].from;
                    array[i].from = array[i].to;
                    array[i].to = temp;
                }

                if (array[i].from !== "" && array[i].to !== "" && !this.mapContains(this.transactionMap, array[i].from, array[i].to)) {

                    this.transactionMap.set(
                        array[i].from + array[i].to,
                        {
                            source: array[i].from,
                            target: array[i].to,
                            sourceType: (await this.isContract(array[i].from) ? "Contract" : "Account"),
                            targetType: (await this.isContract(array[i].to) ? "Contract" : "Account")
                        }
                    );
                    this.tempMap.set(
                        array[i].from + array[i].to,
                        {
                            source: array[i].from,
                            target: array[i].to,
                            sourceType: (await this.isContract(array[i].from) ? "Contract" : "Account"),
                            targetType: (await this.isContract(array[i].to) ? "Contract" : "Account")
                        }
                    );
                    console.log("            Transaction entry number " + addCounter + " added.");

                    let p = Math.round(addCounter * 100 / length * 100) / 100;
                    this.setLoadingbar(p);
                }
                addCounter++;
            }
            addCounter = 1;
            counter++;

            this.setLoadingbar(0);
        }

        console.log("----- MAP for round " + round + " -----");
        console.log(map);
        console.log("---------------------------");
    }

    async isContract(address) {

        let isContract = true;

        const Web3 = require('web3');
        const web3 = new Web3(new Web3.providers.HttpProvider('https://core.bloxberg.org/'));
        let result = await web3.eth.getCode(address);

        if(result === "0x") {
            isContract = false;
        }

        return isContract;
    }

    convertMapToArray(map) {
        let array = new Array();

        map.forEach((value, key) => {
            array.push({ source: value.source, target: value.target, sourceType: value.sourceType, targetType: value.targetType });
        });

        return array;
    }

    copyMap(sourceMap) {
        let map = new Map();

        for (const entry of sourceMap) {
            map.set(entry[1].source + entry[1].target, { source: entry[1].source, target: entry[1].target, sourceType: entry[1].sourceType, targetType: entry[1].targetType });
        }

        return map;
    }

    mapContains(map, x, y) {
        return map.has(x + y) || map.has(y + x);
    }

    setLoadingbar(prozent) {
        document.getElementById("progress").style.width = prozent + "%";
        document.getElementById("progress").innerHTML = prozent + "%";
    }

}

export default DataCollector;