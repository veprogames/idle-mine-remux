<script lang="ts">
    import type MineObject from "$lib/classes/mine-object";
    import Decimal from "break_infinity.js";
    import game from "$lib/store/gamestore";
    
    let canvas: HTMLCanvasElement;
    export let mineobject: MineObject|null = null;

    $: name = mineobject?.name ?? "Unknown";
    $: hp = mineobject?.hp ?? new Decimal(0);
    $: def = mineobject?.def ?? new Decimal(0);
    $: value = mineobject?.value ?? new Decimal(0);

    $: previousAvailable = $game.mineObjects.isPreviousAvailable;
    $: nextAvailable = $game.mineObjects.isNextAvailable;

    $: hpColor = `hsl(${120 * hp.div(mineobject?.maxHp ?? new Decimal(1)).toNumber()}deg, 90%, 75%)`;

    function damage(){
        game.update(game => {
            game.mineObjects.current?.damage(game.pickaxe.clickDamage);
            return game;
        });
    }

    function previous(){
        game.update(game => {
            game.mineObjects.previous();
            return game;
        });
    }

    function next(){
        game.update(game => {
            game.mineObjects.next();
            return game;
        });
    }
</script>

<div class="w-72 text-lg flex flex-col items-center justify-center">
    <div class="flex justify-between items-center">
        <button class="btn" class:invisible={!previousAvailable} on:click={previous}>←</button>
        <canvas class="w-48 sm:w-auto cursor-pointer active:scale-x-105 active:scale-y-95 transition-transform" on:click={damage} bind:this={canvas} width="256" height="224"></canvas>
        <button class="btn" class:invisible={!nextAvailable} on:click={next}>→</button>
    </div>
    <p class="font-extrabold">{name}</p>
    <p><span class="text-orange-500 font-extrabold">HP</span> <span style:color={hpColor} class="font-mono">{hp}</span></p>
    <p><span class="text-gray-700 dark:text-gray-300 font-extrabold">DEF</span> <span class="font-mono">{def}</span></p>
    <p><span class="text-green-500 font-extrabold">$</span> <span class="font-mono">{value}</span></p>
</div>

<style>
    canvas{
        cursor: pointer !important;
    }
</style>

