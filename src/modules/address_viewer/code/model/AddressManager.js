export default class AddressManager {

    address = null;
    name = null;
    type = null;
    status = null;

    transactionMap = null;

    constructor(address, name, type, status) {
        this.address = address;
        this.name = name;
        this.type = type;
        this.status = status;

        this.transactionMap = new Map();
    }

    getTransactionSummaryMap() {

        console.log("    getTransactionSummaryMap:");

        let map = new Map();
        let array = [];

        // Save to map to avoid duplicates
        for (let [key, value] of this.transactionMap) {
            //console.log(key, value);
            if (typeof map.get(value.senderAddress) === 'undefined') {
                map.set(value.senderAddress, { senderAddress: value.senderAddress, senderName: value.senderName, receiverAddress: value.receiverAddress, receiverName: value.receiverName, txCount: 1 });
            } else {
                let obj = map.get(value.senderAddress);
                map.set(value.senderAddress, { senderAddress: value.senderAddress, senderName: value.senderName, receiverAddress: value.receiverAddress, receiverName: value.receiverName, txCount: obj.txCount + 1 });
            }
        }
        // Save result map to array for index usability
        for (let [key, value] of map) {
            array.push(value);
        }

        return array;
    }

    getTransactionsForAddress(addresses) {

        console.log("    getTransactionsForAddress:");

        let transactions = [];

        // Save result map to array for index usability
        for (let [k, v] of addresses) {

            for (let [key, value] of this.transactionMap) {
                //console.log(key, value);
                if (value.senderAddress === k) {
                    transactions.push(value);

                }
            }
        }
        return transactions;
    }

    getAllTransactions() {

        console.log("    getAllTransactions:");

        let transactions = [];

        for (let [key, value] of this.transactionMap) {
            //console.log(key, value);
            transactions.push(value);
        }

        return transactions;
    }

    sortByAddress(sortingMode, addressType, array) {
        console.log("sortByAddress mode " + sortingMode);

        let sortedArray = [];

        switch (sortingMode) {
            case "desc": // big to small

                while (array.length > 0) {
                    let element = array[0];
                    for (let i = 0; i < array.length; i++) {
                        
                        let address = null;
                        if(addressType === "sender") {
                            address = array[i].senderAddress;
                        }
                        if(addressType === "receiver") {
                            address = array[i].receiverAddress;
                        }

                        if (element.senderAddress.localeCompare(address) === -1) { // element > arrayElement
                            element = array[i];
                        }
                    }
                    sortedArray.push(element);

                    let index = array.indexOf(element);
                    if (index > -1) {
                        array.splice(index, 1);
                    }
                }

                break;
            case "asc": // small to big

                while (array.length > 0) {
                    let element = array[0];
                    for (let i = 0; i < array.length; i++) {
                        
                        let address = null;
                        if(addressType === "sender") {
                            address = array[i].senderAddress;
                        }
                        if(addressType === "receiver") {
                            address = array[i].receiverAddress;
                        }

                        if (element.senderAddress.localeCompare(address) === 1) { // element < arrayElement
                            element = array[i];
                        }
                    }
                    sortedArray.push(element);

                    let index = array.indexOf(element);
                    if (index > -1) {
                        array.splice(index, 1);
                    }
                }

                break;
        }

        console.log(sortedArray);

        return sortedArray;
    }

    sortByTxCount(sortingMode, array) {
        console.log("sortByTxCount mode " + sortingMode);

        let sortedArray = [];

        switch (sortingMode) {
            case "desc":

                while (array.length > 0) {
                    let element = array[0];
                    for (let i = 0; i < array.length; i++) {
                        if (element.txCount > array[i].txCount) { // element > arrayElement
                            element = array[i];
                        }
                    }
                    sortedArray.push(element);

                    let index = array.indexOf(element);
                    if (index > -1) {
                        array.splice(index, 1);
                    }
                }

                break;
            case "asc":

                while (array.length > 0) {
                    let element = array[0];
                    for (let i = 0; i < array.length; i++) {
                        if (element.txCount < array[i].txCount) { // element < arrayElement
                            element = array[i];
                        }
                    }
                    sortedArray.push(element);

                    let index = array.indexOf(element);
                    if (index > -1) {
                        array.splice(index, 1);
                    }
                }

                break;
        }

        console.log(sortedArray);

        return sortedArray;
    }

    sortByTimeStamp(sortingMode, array) {
        console.log("sortByTimeStamp " + sortingMode);

        let sortedArray = [];

        switch (sortingMode) {
            case "desc":

                while (array.length > 0) {
                    let element = array[0];
                    for (let i = 0; i < array.length; i++) {
                        if (element.timeStamp >= array[i].timeStamp) { // element > arrayElement
                            element = array[i];
                        }
                    }
                    sortedArray.push(element);

                    let index = array.indexOf(element);
                    if (index > -1) {
                        array.splice(index, 1);
                    }
                }

                break;
            case "asc":

                while (array.length > 0) {
                    let element = array[0];
                    for (let i = 0; i < array.length; i++) {
                        if (element.timeStamp <= array[i].timeStamp) { // element < arrayElement
                            element = array[i];
                        }
                    }
                    sortedArray.push(element);

                    let index = array.indexOf(element);
                    if (index > -1) {
                        array.splice(index, 1);
                    }
                }

                break;
        }

        console.log(sortedArray);

        return sortedArray;
    }
}