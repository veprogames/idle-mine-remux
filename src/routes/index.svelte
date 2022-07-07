<script>
    import MineObject from "$lib/components/MineObject.svelte";
    import game from "$lib/store/gamestore";

    $: mineObj = $game.mineObjects.current;
</script>

<MineObject mineobject={mineObj}></MineObject>