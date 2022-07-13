// @ts-ignore
import Decimal from "break_infinity.js"
import game from "$lib/store/gamestore"
import { Image } from "canvas"

/** The Options how a MineObject should appear visually (textures, colors) */
export interface VisualDefintion{
    image: Image,
    /** e. g. `0xff0000` -> `red` */
    colors: Array<number>
}

export default class MineObject{
    name: string
    hp: Decimal
    maxHp: Decimal
    def: Decimal
    value: Decimal
    visuals: VisualDefintion

    constructor(name: string, hp: Decimal, def: Decimal, value: Decimal, visuals: VisualDefintion){
        this.name = name;
        this.hp = hp;
        this.maxHp = new Decimal(this.hp);
        this.def = def;
        this.value = value;
        this.visuals = visuals;
    }

    static get NO_VISUALS(): VisualDefintion{
        return {
            image: new Image(),
            colors: []
        };
    }

    static clone(from: MineObject){
        return new MineObject(from.name, from.hp, from.def, from.value, from.visuals);
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
            if(g.mineObjects.currentId == g.mineObjects.highestId){
                g.mineObjects.highestId++;
            }
            return g;
        });
    }
}