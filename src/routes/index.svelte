<script>
    import MineObject from "$lib/components/MineObject.svelte";
import game from "$lib/store/gamestore";
    import Decimal from "break_infinity.js";

    $: mineObj = $game.mineObjects.current;

    function damage(){
        mineObj?.damage(new Decimal(10));
        mineObj = mineObj; //trigger update
        //$game.mineObjects.current = $game.mineObjects.current; //trigger update
    }
</script>

<h1 class="text-3xl">You have $<span class="font-mono">{$game.money.amount}</span></h1>

<MineObject mineobject={mineObj}></MineObject>

<button class="uppercase font-semibold" on:click={damage}>hit me</button>