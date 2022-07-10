import Decimal from "break_infinity.js"
import MineObject from "../mine-object";
import * as PIXI from "pixi.js";
import type { LoaderResource } from "pixi.js";

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
        const texArray = (obj: LoaderResource|undefined) => Object.values(obj?.textures ?? {});

        for(const k of ["default", "dirty"]){
            const tex = texArray(resources[k]);
            for(let i = 0; i < tex.length; i++){
                this.spriteCache[k][i].texture = tex[i];
            }
        }
    }

    setCurrent(id: number){
        this.currentId = id;
        this.current = this.objects[this.currentId] ?? 
            new MineObject("Unknown", new Decimal(0), new Decimal(0), new Decimal(0), MineObject.NO_VISUALS);
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