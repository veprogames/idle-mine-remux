<script lang="ts">
    import type MineObject from "$lib/classes/mine-object";
    import Decimal from "break_infinity.js";
    import * as PIXI from "pixi.js";
    import game from "$lib/store/gamestore"
    import { onMount } from "svelte";
    
    let canvas: HTMLCanvasElement;
    export let mineobject: MineObject|null = null;

    $: name = mineobject?.name ?? "Unknown";
    $: hp = mineobject?.hp ?? new Decimal(0);
    $: def = mineobject?.def ?? new Decimal(0);
    $: value = mineobject?.value ?? new Decimal(0);

    function damage(){
        game.update(game => {
            game.mineObjects.current.damage(game.pickaxe.baseDamage);
            return game;
        });
    }

    onMount(() => {
        const w = 256;
        const h = 224;
        const app = new PIXI.Application({width: w, height: h, view: canvas, backgroundAlpha: 0});
        app.loader
            .add("stone", "images/mineobjects/dirt_temp.png") //temporary sprite
            .load((loader, resources) => {
                const sprite = new PIXI.Sprite(resources.stone.texture);
                sprite.anchor.set(0.5);
                sprite.position.set(w / 2, h / 2);
                sprite.tint = 0xff0000;

                app.stage.addChild(sprite);
        })
    });
</script>

<div class="w-72 text-lg flex flex-col items-center justify-center">
    <canvas class="cursor-pointer active:scale-x-105 active:scale-y-95 transition-transform" on:click={damage} bind:this={canvas} width="256" height="224"></canvas>
    <p class="font-extrabold">{name}</p>
    <p><span class="text-orange-500 font-extrabold">HP</span> <span class="font-mono">{hp}</span></p>
    <p><span class="text-gray-700 dark:text-gray-300 font-extrabold">DEF</span> <span class="font-mono">{def}</span></p>
    <p><span class="text-green-500 font-extrabold">$</span> <span class="font-mono">{value}</span></p>
</div>

