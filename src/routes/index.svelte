<script>
    import game from "$lib/store/gamestore";
    import Decimal from "break_infinity.js";

    function damage(){
        $game.mineObjects.current?.damage(new Decimal(10));
        $game.mineObjects.current = $game.mineObjects.current; //trigger update
    }
</script>

<h1 class="text-3xl">You have $<span class="font-mono">{$game.money.amount}</span></h1>
<p>{$game.mineObjects.current?.name}</p>
<p class="font-mono">HP {$game.mineObjects.current?.hp}</p>
<button class="uppercase font-semibold" on:click={damage}>hit me</button>