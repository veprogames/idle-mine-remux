<script>
    import MineObject from "$lib/components/MineObject.svelte";
    import game from "$lib/store/gamestore";

    $: mineObj = $game.mineObjects.current;
</script>

<h1 class="text-3xl">You have $<span class="font-mono">{$game.money.amount}</span></h1>

<MineObject mineobject={mineObj}></MineObject>