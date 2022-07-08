import Decimal from "break_infinity.js"
import { MoneyUpgrade, Upgrade } from "../upgrade/upgrade";

export default class ContentMoney{
    amount: Decimal
    highestMoney: Decimal
    upgrades: {blacksmith: Upgrade}

    constructor(){
        this.amount = new Decimal(0);
        this.highestMoney = new Decimal(0);
        this.upgrades = {
            blacksmith: new MoneyUpgrade({
                getPrice: level => Decimal.pow(1.2, level).mul(30).add(level * 75),
                getEffect: level => Decimal.pow(1.09, level).mul(20).add(level * 10)
            })
        };
    }
}