import Decimal from "break_infinity.js"

export default class ContentGems{
    amount: Decimal
    highestGems: Decimal
    upgrades: Object

    constructor(){
        this.amount = new Decimal(0);
        this.highestGems = new Decimal(0);
        this.upgrades = {};
    }
}