import { generatePickaxe } from "$lib/modules/pickaxe-generator";
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
        return generatePickaxe(new Decimal(1));
    }

    /** Base Damage calculated by `power * quality`. Does not include Upgrade effects. */
    get baseDamage(){
        return this.pow.mul(this.quality);
    }
}