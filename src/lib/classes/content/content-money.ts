import Decimal from "break_infinity.js"

export default class ContentMoney{
    amount: Decimal
    highestMoney: Decimal
    upgrades: Object

    constructor(){
        this.amount = new Decimal(0);
        this.highestMoney = new Decimal(0);
        this.upgrades = {};
    }
}