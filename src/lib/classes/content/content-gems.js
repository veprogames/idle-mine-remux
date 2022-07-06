import Decimal from "break_infinity.js"

export default class ContentGems{
    constructor(){
        this.amount = new Decimal(0);
        this.highestMoney = new Decimal(0);
        this.upgrades = {};
    }
}