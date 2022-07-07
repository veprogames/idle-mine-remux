import Decimal from "break_infinity.js";

interface UpgradeDefinition{
    name: String,
    description: String,
    getPrice: ((level: number) => Decimal),
    getEffect: ((level: number) => Decimal),
    maxLevel: number
}

export enum UpgradeResource{
    NONE, MONEY
}

export class Upgrade{
    name: String
    description: string
    /** return the `price` for a given `upgrade level` */
    getPrice: ((level: number) => Decimal)
    /** return the `price` for a given `upgrade level` */
    getEffect: ((level: number) => Decimal)

    level: number = 0
    resource: UpgradeResource = UpgradeResource.NONE

    price: Decimal = new Decimal(0)
    nextLevelPrice: Decimal = new Decimal(0)
    effect: Decimal = new Decimal(0)
    nextLevelEffect: Decimal = new Decimal(0)

    constructor(name: string, description: string, getPrice: ((level: number) => Decimal), getEffect: ((level: number) => Decimal)){
        this.name = name;
        this.description = description;
        this.getPrice = getPrice;
        this.getEffect = getEffect;
    }

    /** Cache Prices and Effects into class members to save recalculations */
    update(){
        this.price = this.getPrice(this.level);
        this.nextLevelPrice = this.getPrice(this.level + 1);
        this.effect = this.getEffect(this.level);
        this.nextLevelEffect = this.getEffect(this.level + 1);
    }
}

/*export class MoneyUpgrade extends Upgrade{
    constructor(){
        super("", "", () => null, () => null);
        this.resource = UpgradeResource.MONEY
    }
}*/