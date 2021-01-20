import React from 'react';
import AddressManager from './model/AddressManager';

class DataFetcher extends React.Component {

    Web3Url = null;
    URLTransactionList = null;
    URLTransactionInfo = null;
    addressManager = null;
    addressLookUpMap = null;

    constructor(props) {
        super(props);

        this.web3Url = "https://core.bloxberg.org/";
        this.URLTransactionList = "https://blockexplorer.bloxberg.org/api/api?module=account&action=txlist&address=";
        this.URLTransactionInfo = "https://blockexplorer.bloxberg.org/api/api?module=transaction&action=gettxinfo&txhash=";
        this.URLContractSourceCode = "https://blockexplorer.bloxberg.org/api/api?module=contract&action=getsourcecode&address=";
        this.addressManager = null;
        this.addressLookUpMap = new Map();
    }

    async fetchData(address) {

        console.log(this.convertTime(1559567750));

        /* console.log("getAddressName");
        console.log(await this.getAccountName("0xE5a9654C7e190701016EBf18206020bf16D8Beab"));
        console.log("getTransactions");
        console.log(await this.getTransactions("0xE5a9654C7e190701016EBf18206020bf16D8Beab"));
        console.log("getTransacitonInfo");
        console.log(await this.getTransactionInfo("0x7aa439813cc35a3bf7d5802f0732bb5fef37173f09ef3146a6755df5692a58fe"));
        console.log("isContract?");
        console.log(await this.isContract("0xE5a9654C7e190701016EBf18206020bf16D8Beab"));
        console.log("isVerifiedContract?");
        console.log(await this.isVerifiedContract("0xE5a9654C7e190701016EBf18206020bf16D8Beab"));
        console.log("getContractName");
        console.log(await this.getContractName("0xE5a9654C7e190701016EBf18206020bf16D8Beab")); */

        this.addressManager = await this.initAddressManager(address);
        await this.saveTransactions(address);

        return this.addressManager;
    }

    async initAddressManager(address) {

        let addressManager = null;

        let isContract = await this.isContract(address);
        let isVerified = await this.isVerifiedContract(address);
        let contractName = await this.getContractName(address);
        let accountName = await this.getAccountName(address);

        console.log(isContract);
        console.log(isVerified);
        console.log(contractName);
        console.log(accountName);
        console.log(address);

        if (isContract) {
            addressManager = new AddressManager("Contract", contractName, address, isVerified);
            this.addressLookUpMap.set(address, contractName);
        } else {
            addressManager = new AddressManager("Account", accountName, address, null);
            this.addressLookUpMap.set(address, accountName);
        }

        return addressManager;
    }

    async getAccountName(address) {

        let response = await fetch("https://blockexplorer.bloxberg.org/address/" + address + "/transactions");
        let httpText = await response.text();

        let regex = '<strong class="mr-4 mb-2 text-dark" title="[a-zA-Z0-9. ]*">';

        let result = httpText.match(regex);

        let accountName = null;

        if (result !== null) {
            accountName = result[0].substring(43, result[0].length - 2);
        }

        return accountName;
    }

    async getTransactions(adderss) {
        let result = await fetch(this.URLTransactionList + adderss).then(response => response.json());

        return result;
    }


    async getTransactionInfo(transactionHash) {
        let result = await fetch(this.URLTransactionInfo + transactionHash).then(response => response.json());
        console.log(result);

        return result;
    }

    async lookUpName(address) {
        let resolvedAddress = this.addressLookUpMap.get(address);
        if (typeof resolvedAddress === "undefined") {
            let isContract = await this.isContract(address);
            if (isContract) {
                let contractName = await this.getContractName(address);
                resolvedAddress = (contractName !== null) ? contractName : address;
                this.addressLookUpMap.set(address, resolvedAddress);
            } else {
                let accountName = await this.getAccountName(address);
                resolvedAddress = (accountName !== null) ? accountName : address;
                this.addressLookUpMap.set(address, resolvedAddress);
            }
        }

        return resolvedAddress;
    }

    async saveTransactions(address) {
        let transactions = await this.getTransactions(address);

        let length = Object.keys(transactions.result).length;
        let resultArray = transactions.result;

        /*
        console.log("RESULTARRAY:");
        console.log(resultArray);
        */

        for (let i = 0; i < length; i++) {

            let from = await this.lookUpName(resultArray[i].from);
            let to = await this.lookUpName(resultArray[i].to);

            console.log("from: " + from + ", to: " + to);

            this.addressManager.transactionList.push({ from: from, to: to, time: this.convertTime(parseInt(resultArray[i].timeStamp)), input: resultArray[i].input });
        }
    }

    async isContract(address) {

        let isContract = true;

        if (address === "") { // special case
            isContract = false;
        } else {
            const Web3 = require('web3');
            const web3 = new Web3(new Web3.providers.HttpProvider(this.web3Url));
            let result = await web3.eth.getCode(address);

            if (result === "0x") {
                isContract = false;
            }
        }
        return isContract;
    }

    async isVerifiedContract(address) {
        let isVerifiedContract = true;

        let result = await fetch(this.URLContractSourceCode + address).then(response => response.json());

        if (typeof result.result[0].ContractName === "undefined") {
            isVerifiedContract = false;
        }

        return isVerifiedContract;
    }

    async getContractName(address) {
        let result = await fetch(this.URLContractSourceCode + address).then(response => response.json());

        let contractName = result.result[0].ContractName;

        return (typeof contractName !== "undefined") ? contractName : null;
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

        //return new Date(timeStamp * 1000).toLocaleString();

        return timeString;
    }

    test() {

        /*
        ISCC Base58 encoding: 0x00f71201ad85f5a189102b2a76b05434d95a204f077f99ee368d213022628ba1e4fa5686
        → Resolves to: 
        Meta-ID: CCLYJLQWKidp1
        Content-ID: CT8ZSFJGhmUcM
        Data-ID: CDEZgdCTV5Tum
        Instance-ID: CR6kNU6eVKkLM
        Tophash: 22628ba1e4fa56864075e614b5930086 944d530ec775adfcc5191ed8e4b38cc6
        */

        let data = "0x989cda35000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000002400f71201ad85f5a189102b2a76b05434d95a204f077f99ee368d213022628ba1e4fa568600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002022628ba1e4fa56864075e614b5930086944d530ec775adfcc5191ed8e4b38cc6";

        const InputDataDecoder = require('ethereum-input-data-decoder');

        const abi = [{ "type": "event", "name": "ISCC", "inputs": [{ "type": "address", "name": "actor", "internalType": "address", "indexed": true }, { "type": "bytes", "name": "iscc", "internalType": "bytes", "indexed": false }, { "type": "bytes", "name": "tophash", "internalType": "bytes", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "declare", "inputs": [{ "type": "bytes", "name": "iscc", "internalType": "bytes" }, { "type": "bytes", "name": "tophash", "internalType": "bytes" }] }];
        const decoder = new InputDataDecoder(abi);
        const result = decoder.decodeData(data);

        console.log(result);

        let bytes = "0 247 18 1 173 133 245 161 137 - 16 43 42 118 176 84 52 217 90 - 32 79 7 127 153 238 54 141 33 - 48 34 98 139 161 228 250 86 134";
        let encodedString = "00f71201ad85f5a189 - 102b2a76b05434d95a204f077f99ee368d213022628ba1e4fa5686";

        let array = [0,
            247,
            18,
            1,
            173,
            133,
            245,
            161,
            137,
            16,
            43,
            42,
            118,
            176,
            84,
            52,
            217,
            90,
            32,
            79,
            7,
            127,
            153,
            238,
            54,
            141,
            33,
            48,
            34,
            98,
            139,
            161,
            228,
            250,
            86,
            134];

        let base62 = require("base62/lib/custom");

        let charset1 = "C23456789rB1ZEFGTtYiAaVvMmHUPWXKDNbcdefghLjkSnopRqsJuQwxyz";
        let charset2 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
        charset1 = base62.indexCharset(charset1);
        console.log(base62.encode(247, charset1));


        let str = "";

        for (let i = 0; i < array.length; i++) {
            console.log(i)
            if (i !== 0 && i % 8 == 0) {
                str = str + "-";
            }
            str = str + base62.encode(array[i], charset1);
        }

        console.log("String");
        console.log(str);

        console.log(this.byteToHex(array));
    }

    byteToHex(byteArray) {
        return Array.from(byteArray, function (byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');
    }

}

export default DataFetcher;