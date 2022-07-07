import Decimal from "break_infinity.js"

/** Pickaxes are used to deal Damage to `MineObject`s. */
export default class Pickaxe{
    name: String
    /** The base Power of the Pickaxe. Will be multiplied by `quality` */
    pow: Decimal
    /** The Quality of the Pickaxe. Acts as a multiplier to `pow` */
    quality: Decimal
    
    constructor(name: String, pow: Decimal, quality: Decimal){
        this.name = name;
        this.pow = pow;
        this.quality = quality;
    }

    static craft(){
        return new Pickaxe("Toy Pickaxe", new Decimal(20), new Decimal(1));
    }

    get damage(){
        return this.pow.mul(this.quality);
    }
}