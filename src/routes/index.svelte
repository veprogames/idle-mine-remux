<script>
    import game from "$lib/store/gamestore";
    import Decimal from "break_infinity.js";
</script>

<h1 class="text-3xl font-bold underline">
Hello world! {$game.test}
<button class="uppercase font-semibold" on:click={() => $game.test = $game.test.add(1)}>++++++</button>
</h1>