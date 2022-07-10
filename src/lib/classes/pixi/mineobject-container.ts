import * as PIXI from "pixi.js";

export default class MineObjectContainer extends PIXI.Container{
    private sprites: Array<PIXI.Sprite>;
    
    constructor(sprites: Array<PIXI.Sprite>){
        super();
        this.sprites = sprites;
        for(const sprite of sprites){
            this.addChild(sprite);
        }
    }
}