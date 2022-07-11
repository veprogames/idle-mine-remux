import Decimal from "break_infinity.js"
import MineObject from "../mine-object";
import type * as PIXI from "pixi.js";
import { Sprite, type LoaderResource } from "pixi.js";

interface MineObjectsDefinition{
    [key: number]: MineObject
};

interface SpriteCache{
    default: Array<PIXI.Sprite>,
    dirty: Array<PIXI.Sprite>,
    paper: Array<PIXI.Sprite>,
    salt: Array<PIXI.Sprite>,
    bone: Array<PIXI.Sprite>,
    orb: Array<PIXI.Sprite>,
    ingot: Array<PIXI.Sprite>,
    gem: Array<PIXI.Sprite>,
    cursed: Array<PIXI.Sprite>,
    essence: Array<PIXI.Sprite>,
    [key: string]: Array<PIXI.Sprite>
};

export default class ContentMineObjects {
    objects: MineObjectsDefinition;
    currentId: number
    highestId: number
    current: MineObject

    spriteCache: SpriteCache = {
        default: this.emptySprites(2),
        dirty: this.emptySprites(2),
        paper: this.emptySprites(4),
        salt: this.emptySprites(2),
        bone: this.emptySprites(2),
        orb: this.emptySprites(3),
        ingot: this.emptySprites(2),
        gem: this.emptySprites(2),
        cursed: this.emptySprites(1),
        essence: this.emptySprites(1)
    };

    constructor(){
        this.objects = {
            0: new MineObject("Mud", new Decimal(100), new Decimal(0), new Decimal(2), {sprites: this.spriteCache.default, colors: [0x100800, 0x663300]}),
            1: new MineObject("Paper", new Decimal(400), new Decimal(3), new Decimal(10), {sprites: this.spriteCache.paper, colors: [0x000000, 0x00ccff, 0xcc0033, 0xffffff]}),
            2: new MineObject("Salt", new Decimal(700), new Decimal(15), new Decimal(22), {sprites: this.spriteCache.salt, colors: [0x000000, 0xffffff]}),
            3: new MineObject("Clay", new Decimal(1400), new Decimal(35), new Decimal(50), {sprites: this.spriteCache.default, colors: [0x000000, 0x663333]}),
            4: new MineObject("Rock", new Decimal(2200), new Decimal(90), new Decimal(120), {sprites: this.spriteCache.default, colors: [0x000000, 0x666666]}),
            5: new MineObject("Coal", new Decimal(4000), new Decimal(200), new Decimal(275), {sprites: this.spriteCache.default, colors: [0x000000, 0x121212]}),
            6: new MineObject("Bone", new Decimal(7000), new Decimal(380), new Decimal(580), {sprites: this.spriteCache.bone, colors: [0x000000, 0xffff99]}),
            7: new MineObject("Lead", new Decimal(12400), new Decimal(700), new Decimal(1100), {sprites: this.spriteCache.ingot, colors: [0x242424, 0x000000]}),
            8: new MineObject("Iron", new Decimal(16000), new Decimal(1140), new Decimal(1850), {sprites: this.spriteCache.ingot, colors: [0x333333, 0x000000]}),
            9: new MineObject("Copper", new Decimal(25000), new Decimal(1600), new Decimal(3200), {sprites: this.spriteCache.ingot, colors: [0x994400, 0x100500]}),
            10: new MineObject("Carbonite", new Decimal(40000), new Decimal(2500), new Decimal(5200), {sprites: this.spriteCache.default, colors: [0x000000, 0x262626]})
        };

        this.currentId = 0;
        this.highestId = 10;

        this.current = this.objects[this.currentId];
    }

    createSpriteCache(resources: PIXI.utils.Dict<PIXI.LoaderResource>){
        const texArray = (obj: LoaderResource|undefined) => Object.values(obj?.textures ?? {});

        for(const k of ["default", "dirty", "paper", "salt", "bone", "orb", "ingot", "gem", "cursed", "essence"]){
            const tex = texArray(resources[k]);
            for(let i = 0; i < tex.length; i++){
                this.spriteCache[k][i].texture = tex[i];
            }
        }
    }

    private emptySprites(amount: number){
        return new Array(amount).fill(0).map(v => new Sprite());
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