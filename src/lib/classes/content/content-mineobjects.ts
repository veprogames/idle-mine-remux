import Decimal from "break_infinity.js"
import MineObject from "../mine-object";
import * as PIXI from "pixi.js";

interface MineObjectsDefinition{
    [key: number]: MineObject
};

interface SpriteCache{
    default: Array<PIXI.Sprite>,
    dirty: Array<PIXI.Sprite>,
    [key: string]: Array<PIXI.Sprite>
};

export default class ContentMineObjects {
    objects: MineObjectsDefinition;
    currentId: number
    highestId: number
    current: MineObject

    spriteCache: SpriteCache = {
        default: [new PIXI.Sprite(), new PIXI.Sprite()],
        dirty: [new PIXI.Sprite(), new PIXI.Sprite()]
    };

    constructor(){
        this.objects = {
            0: new MineObject("Dirt", new Decimal(100), new Decimal(0), new Decimal(2), {sprites: this.spriteCache.dirty, colors: [0x700000, 0x400000]}),
            1: new MineObject("Paper", new Decimal(400), new Decimal(3), new Decimal(10), {sprites: this.spriteCache.default, colors: [0xffffff, 0xffffff]})
        };

        this.currentId = 0;
        this.highestId = 0;

        this.current = this.objects[this.currentId];
    }

    createSpriteCache(resources: PIXI.utils.Dict<PIXI.LoaderResource>){
        const tex = Object.values(resources.default?.textures ?? {});
        const texDirty = Object.values(resources.dirty?.textures ?? {});
        for(let i = 0; i < tex.length; i++){
            this.spriteCache.default[i].texture = tex[i];
        }
        for(let i = 0; i < texDirty.length; i++){
            this.spriteCache.dirty[i].texture = texDirty[i];
        }
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