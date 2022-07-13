import MineObject from "$lib/classes/mine-object";
import Decimal from "break_infinity.js";
import * as PIXI from "pixi.js";

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

function emptySprites(amount: number){
    return new Array(amount).fill(0).map(v => new PIXI.Sprite());
}

export function loadTextures(){
    const addSafe = (name: string, url: string) => {
        if(PIXI.Loader.shared.resources[name] === undefined && PIXI.utils.TextureCache[name] === undefined){
            PIXI.Loader.shared.add(name, url);
        }
        return PIXI.Loader.shared;
    }

    return new Promise((resolve, reject) => {
        addSafe("default", "images/mineobjects/default.json");
        addSafe("dirty", "images/mineobjects/dirty.json");
        addSafe("paper", "images/mineobjects/paper.json");
        addSafe("salt", "images/mineobjects/salt.json");
        addSafe("bone", "images/mineobjects/bone.json");
        addSafe("orb", "images/mineobjects/orb.json");
        addSafe("ingot", "images/mineobjects/ingot.json");
        addSafe("gem", "images/mineobjects/gem.json");
        addSafe("cursed", "images/mineobjects/cursed.json");
        addSafe("essence", "images/mineobjects/essence.json");
        PIXI.Loader.shared.load((loader, resources) => {
            createSpriteCache(resources);
            resolve(resources);
        });
    });
}

function createSpriteCache(resources: PIXI.utils.Dict<PIXI.LoaderResource>){
    const texArray = (obj: PIXI.LoaderResource|undefined) => Object.values(obj?.textures ?? {});

    for(const k of ["default", "dirty", "paper", "salt", "bone", "orb", "ingot", "gem", "cursed", "essence"]){
        const tex = texArray(resources[k]);
        for(let i = 0; i < tex.length; i++){
            spriteCache[k][i].texture = tex[i];
        }
    }
}

export let spriteCache: SpriteCache = {
    default: emptySprites(2),
    dirty: emptySprites(2),
    paper: emptySprites(4),
    salt: emptySprites(2),
    bone: emptySprites(2),
    orb: emptySprites(3),
    ingot: emptySprites(2),
    gem: emptySprites(2),
    cursed: emptySprites(1),
    essence: emptySprites(1)
};

export const objects: MineObjectsDefinition = {
    0: new MineObject("Mud", new Decimal(100), new Decimal(0), new Decimal(2), {sprites: spriteCache.default, colors: [0x100800, 0x663300]}),
    1: new MineObject("Paper", new Decimal(400), new Decimal(3), new Decimal(10), {sprites: spriteCache.paper, colors: [0x000000, 0x00ccff, 0xcc0033, 0xffffff]}),
    2: new MineObject("Salt", new Decimal(700), new Decimal(15), new Decimal(22), {sprites: spriteCache.salt, colors: [0x000000, 0xffffff]}),
    3: new MineObject("Clay", new Decimal(1400), new Decimal(35), new Decimal(50), {sprites: spriteCache.default, colors: [0x000000, 0x663333]}),
    4: new MineObject("Rock", new Decimal(2200), new Decimal(90), new Decimal(120), {sprites: spriteCache.default, colors: [0x000000, 0x666666]}),
    5: new MineObject("Coal", new Decimal(4000), new Decimal(200), new Decimal(275), {sprites: spriteCache.default, colors: [0x000000, 0x121212]}),
    6: new MineObject("Bone", new Decimal(7000), new Decimal(380), new Decimal(580), {sprites: spriteCache.bone, colors: [0x000000, 0xffff99]}),
    7: new MineObject("Lead", new Decimal(12400), new Decimal(700), new Decimal(1100), {sprites: spriteCache.ingot, colors: [0x242424, 0x000000]}),
    8: new MineObject("Iron", new Decimal(16000), new Decimal(1140), new Decimal(1850), {sprites: spriteCache.ingot, colors: [0x333333, 0x000000]}),
    9: new MineObject("Copper", new Decimal(25000), new Decimal(1600), new Decimal(3200), {sprites: spriteCache.ingot, colors: [0x994400, 0x100500]}),
    10: new MineObject("Carbonite", new Decimal(40000), new Decimal(2500), new Decimal(5200), {sprites: spriteCache.default, colors: [0x000000, 0x262626]})
};

export function get(id: number){
    if(id in objects){
        return MineObject.clone(objects[id]);
    }
    return new MineObject("Placeholder", new Decimal(0), new Decimal(0), new Decimal(0), MineObject.NO_VISUALS);
}