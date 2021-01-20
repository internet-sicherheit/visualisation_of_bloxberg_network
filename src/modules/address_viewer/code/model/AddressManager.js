export default class AddressManager {

    type = null;
    name = null;
    address = null;
    isVerified = null;

    transactionList = null;

    constructor(type, name, address, isVerified) {
        this.type = type;
        this.name = name;
        this.address = address;
        this.isVerified = isVerified;

        this.transactionList = [];
    }
}