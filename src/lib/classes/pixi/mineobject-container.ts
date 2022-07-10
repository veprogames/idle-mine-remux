import * as PIXI from "pixi.js";
import type { VisualDefintion } from "../mine-object";

export default class MineObjectContainer extends PIXI.Container{
    private _definition: VisualDefintion = {sprites: [], colors: []};
    
    constructor(definition: VisualDefintion){
        super();
        this.visuals = definition;
    }

    set visuals(definition: VisualDefintion){
        this._definition = definition;
        this.removeChildren();
        for(let i = 0; i < this.sprites.length; i++){
            const sprite = this.sprites[i];
            const color = this.colors[i] ?? 0xffffff;

            sprite.tint = color;
            this.addChild(sprite);
        }
    }

    get sprites(){
        return this._definition.sprites;
    }

    get colors(){
        return this._definition.colors;
    }
}