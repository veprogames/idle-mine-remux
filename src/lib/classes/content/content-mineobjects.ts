import type MineObject from "../mine-object";
import { get } from "$lib/modules/mineobjects";

export default class ContentMineObjects {
    currentId: number
    highestId: number
    current: MineObject

    constructor(){
        this.currentId = 0;
        this.highestId = 10;

        this.current = get(this.currentId);
    }

    setCurrent(id: number){
        this.currentId = id;
        this.current = get(id);
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