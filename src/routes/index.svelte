<script>
    import game from "$lib/store/gamestore";
</script>

<h1 class="text-3xl">You have <span class="font-mono">{$game.test}</span></h1>
<button class="uppercase font-semibold" on:click={() => $game.test = $game.test.add(1)}>Get more</button>