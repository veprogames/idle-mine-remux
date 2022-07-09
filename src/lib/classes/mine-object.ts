// @ts-ignore
import Decimal from "break_infinity.js"
import game from "$lib/store/gamestore"

export default class MineObject{
    name: String
    hp: Decimal
    maxHp: Decimal
    def: Decimal
    value: Decimal

    constructor(name: String, hp: Decimal, def: Decimal, value: Decimal){
        this.name = name;
        this.hp = hp;
        this.maxHp = new Decimal(this.hp);
        this.def = def;
        this.value = value;
    }

    static clone(from: MineObject){
        return new MineObject(from.name, from.hp, from.def, from.value);
    }

    damage(dmg: Decimal){
        this.hp = this.hp.sub(dmg);
        if(this.hp.lte(0)){
            this.hp = this.maxHp;
            this.onDestroy();
        }
    }
    
    onDestroy(){
        game.update(g => {
            g.money.amount = g.money.amount.add(this.value);
            return g;
        });
    }
}