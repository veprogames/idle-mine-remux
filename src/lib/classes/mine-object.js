// @ts-ignore
import Decimal from "break_infinity.js"
import game from "$lib/store/gamestore"

export default class MineObject{
    /**
     * @param {String} name
     * @param {Decimal} hp
     * @param {Decimal} def
     * @param {Decimal} value
     */
    constructor(name, hp, def, value){
        this.name = name;
        this.hp = hp;
        /** @var {Decimal} */
        this.maxHp = new Decimal(this.hp);
        this.def = def;
        this.value = value;
    }

    /**
     * @param {MineObject} from
     * @return {MineObject}
     */
    static clone(from){
        return new MineObject(from.name, from.hp, from.def, from.value);
    }

    /**
     * @param {Decimal} dmg
     * 
     * @return {void}
     */
    damage(dmg){
        this.hp = this.hp.sub(dmg);
        if(this.hp.lte(0)){
            this.hp = this.maxHp;
            this.onDestroy();
        }
    }

    /**
     * @return {void}
     */
    onDestroy(){
        game.update(g => {
            g.money.amount = g.money.amount.add(this.value);
            return g;
        });
    }
}