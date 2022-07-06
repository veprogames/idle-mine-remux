import Decimal from "break_infinity.js"

export default class ContentMoney{
    constructor(){
        this.amount = new Decimal(0);
        this.highestMoney = new Decimal(0);
        this.upgrades = {};
    }
}