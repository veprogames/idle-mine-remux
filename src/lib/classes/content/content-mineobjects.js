import Decimal from "break_infinity.js"
import MineObject from "../mine-object"

export default class ContentMineObjects {
    constructor(){
        this.objects = {
            0: new MineObject("Dirt", new Decimal(100), new Decimal(0), new Decimal(2)),
            1: new MineObject("Paper", new Decimal(400), new Decimal(3), new Decimal(10))
        };

        /** @var {Number} */
        this.currentId = 0;
        /** @var {Number} */
        this.highestId = 0;

        /** @var {MineObject} */
        this.current = this.objects[this.currentId];
    }
}