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
    paper: Array<PIXI.Sprite>,
    salt: Array<PIXI.Sprite>,
    bone: Array<PIXI.Sprite>,
    [key: string]: Array<PIXI.Sprite>
};

export default class ContentMineObjects {
    objects: MineObjectsDefinition;
    currentId: number
    highestId: number
    current: MineObject

    spriteCache: SpriteCache = {
        default: [new PIXI.Sprite(), new PIXI.Sprite()],
        dirty: [new PIXI.Sprite(), new PIXI.Sprite()],
        paper: [new PIXI.Sprite(), new PIXI.Sprite(), new PIXI.Sprite(), new PIXI.Sprite()],
        salt: [new PIXI.Sprite(), new PIXI.Sprite()],
        bone: [new PIXI.Sprite(), new PIXI.Sprite()]
    };

    constructor(){
        this.objects = {
            0: new MineObject("Mud", new Decimal(100), new Decimal(0), new Decimal(2), {sprites: this.spriteCache.default, colors: [0x100800, 0x663300]}),
            1: new MineObject("Paper", new Decimal(400), new Decimal(3), new Decimal(10), {sprites: this.spriteCache.paper, colors: [0x000000, 0x00ccff, 0xcc0033, 0xffffff]}),
            2: new MineObject("Salt", new Decimal(700), new Decimal(15), new Decimal(22), {sprites: this.spriteCache.salt, colors: [0x000000, 0xffffff]}),
            3: new MineObject("Clay", new Decimal(1400), new Decimal(35), new Decimal(50), {sprites: this.spriteCache.default, colors: [0x000000, 0x663333]})
        };

        this.currentId = 0;
        this.highestId = 0;

        this.current = this.objects[this.currentId];
    }

    createSpriteCache(resources: PIXI.utils.Dict<PIXI.LoaderResource>){
        const texArray = (obj: LoaderResource|undefined) => Object.values(obj?.textures ?? {});

        for(const k of ["default", "dirty", "paper", "salt", "bone"]){
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