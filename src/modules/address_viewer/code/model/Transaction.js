export default class Transaction {

    transactionHash = null;

    senderAddress = null;
    senderName = null;
    senderStatus = null;

    receiverAddress = null;
    receiverName = null;
    receiverStatus = null;

    timeStamp = null;
    input = null;

    constructor(transactionHash, senderAddress, senderName, receiverAddress, receiverName, timeStamp, input) {
        this.transactionHash = transactionHash;
        this.senderAddress = senderAddress;
        this.senderName = senderName;
        this.receiverAddress = receiverAddress;
        this.receiverName = receiverName;
        this.timeStamp = timeStamp;
        this.input = input;

        this.senderStatus = (this.senderAddress === this.senderName) ? "not verified" : "verified";
        this.receiverStatus = (this.receiverAddress === this.receiverName) ? "not verified" : "verified";
    }
}