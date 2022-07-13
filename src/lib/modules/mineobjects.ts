import MineObject, { type VisualDefintion } from "$lib/classes/mine-object";
import Decimal from "break_infinity.js";
import { Image, loadImage, CanvasRenderingContext2D } from "canvas";

interface MineObjectsDefinition{
    [key: number]: MineObject
};

interface ImageCache{
    [key: string]: Image
};

async function loadImages(): Promise<ImageCache>{
    return {
        default: await loadImage("src/lib/images/mineobjects/default.png"),
        paper: await loadImage("src/lib/images/mineobjects/paper.png"),
        salt: await loadImage("src/lib/images/mineobjects/salt.png"),
        bone: await loadImage("src/lib/images/mineobjects/bone.png"),
        orb: await loadImage("src/lib/images/mineobjects/orb.png"),
        ingot: await loadImage("src/lib/images/mineobjects/ingot.png"),
        gem: await loadImage("src/lib/images/mineobjects/gem.png"),
        cursed: await loadImage("src/lib/images/mineobjects/cursed.png"),
        essence: await loadImage("src/lib/images/mineobjects/essence.png")
    }
} 

export const imageCache: ImageCache = await loadImages();

export const objects: MineObjectsDefinition = {
    0: new MineObject("Mud", new Decimal(100), new Decimal(0), new Decimal(2), {image: imageCache.default, colors: [0x100800, 0x663300]}),
    1: new MineObject("Paper", new Decimal(400), new Decimal(3), new Decimal(10), {image: imageCache.paper, colors: [0x000000, 0x00ccff, 0xcc0033, 0xffffff]}),
    2: new MineObject("Salt", new Decimal(700), new Decimal(15), new Decimal(22), {image: imageCache.salt, colors: [0x000000, 0xffffff]}),
    3: new MineObject("Clay", new Decimal(1400), new Decimal(35), new Decimal(50), {image: imageCache.default, colors: [0x000000, 0x663333]}),
    4: new MineObject("Rock", new Decimal(2200), new Decimal(90), new Decimal(120), {image: imageCache.default, colors: [0x000000, 0x666666]}),
    5: new MineObject("Coal", new Decimal(4000), new Decimal(200), new Decimal(275), {image: imageCache.default, colors: [0x000000, 0x121212]}),
    6: new MineObject("Bone", new Decimal(7000), new Decimal(380), new Decimal(580), {image: imageCache.bone, colors: [0x000000, 0xffff99]}),
    7: new MineObject("Lead", new Decimal(12400), new Decimal(700), new Decimal(1100), {image: imageCache.ingot, colors: [0x242424, 0x000000]}),
    8: new MineObject("Iron", new Decimal(16000), new Decimal(1140), new Decimal(1850), {image: imageCache.ingot, colors: [0x333333, 0x000000]}),
    9: new MineObject("Copper", new Decimal(25000), new Decimal(1600), new Decimal(3200), {image: imageCache.ingot, colors: [0x994400, 0x100500]}),
    10: new MineObject("Carbonite", new Decimal(40000), new Decimal(2500), new Decimal(5200), {image: imageCache.default, colors: [0x000000, 0x262626]})
};

export function draw(ctx: CanvasRenderingContext2D, visuals: VisualDefintion){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const FRAME_WIDTH = 256;
    const w = visuals.image.width;
    const h = visuals.image.height;
    for(let i = 0; i < visuals.colors.length; i++){
        ctx.drawImage(visuals.image, FRAME_WIDTH * i, 0, w, h, 0, 0, w, h);
    }
}

export function get(id: number){
    if(id in objects){
        return MineObject.clone(objects[id]);
    }
    return new MineObject("Placeholder", new Decimal(0), new Decimal(0), new Decimal(0), MineObject.NO_VISUALS);
}