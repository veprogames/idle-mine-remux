import Decimal from "break_infinity.js"
import MineObject from "../mine-object"

interface MineObjectsDefinition{
    [key: number]: MineObject
};

export default class ContentMineObjects {
    objects: MineObjectsDefinition;
    currentId: number
    highestId: number
    current: MineObject

    constructor(){
        this.objects = {
            0: new MineObject("Dirt", new Decimal(100), new Decimal(0), new Decimal(2)),
            1: new MineObject("Paper", new Decimal(400), new Decimal(3), new Decimal(10))
        };

        this.currentId = 0;
        this.highestId = 0;

        this.current = this.objects[this.currentId];
    }

    setCurrent(id: number){
        this.currentId = id;
        this.current = this.objects[this.currentId];
    }

    get isNextAvailable(){
        return this.highestId > this.currentId;
    }

    get isPreviousAvailable(){
        return this.currentId > 0;
    }

    next(){
        if(this.isNextAvailable){
            this.setCurrent(this.currentId + 1);
        }
    }
    
    previous(){
        if(this.isPreviousAvailable){
            this.setCurrent(this.currentId - 1);
        }
    }
}