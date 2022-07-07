<script lang="ts">
    import type MineObject from "$lib/classes/mine-object";
    import Decimal from "break_infinity.js";
    import * as PIXI from "pixi.js";
    import { onMount } from "svelte";
    
    let canvas: HTMLCanvasElement;
    export let mineobject: MineObject|null = null;

    $: hp = mineobject?.hp ?? new Decimal(0);
    $: def = mineobject?.def ?? new Decimal(0);
    $: value = mineobject?.value ?? new Decimal(0);

    onMount(() => {
        const w = 256;
        const h = 224;
        const app = new PIXI.Application({width: w, height: h, view: canvas, backgroundAlpha: 0});
        app.loader
            .add("stone", "images/mineobjects/default.png")
            .load((loader, resources) => {
                const sprite = new PIXI.Sprite(resources.stone.texture);
                sprite.anchor.set(0.5);
                sprite.position.set(w / 2, h / 2);
                sprite.tint = 0xff0000;

                app.stage.addChild(sprite);
        })
    })
</script>

<div class="w-72 bg-slate-700 rounded-lg text-lg flex flex-col items-center justify-center">
    <canvas on:click={() => mineobject?.damage(new Decimal(10))} bind:this={canvas} width="256" height="224"></canvas>
    <p>HP {hp}</p>
    <p>DEF {def}</p>
    <p>$ {value}</p>
</div>

