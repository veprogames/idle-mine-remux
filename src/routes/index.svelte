<script>
    import MineObject from "$lib/components/MineObject.svelte";
import PickaxeCrafter from "$lib/components/PickaxeCrafter.svelte";
    import game from "$lib/store/gamestore";

    $: mineObj = $game.mineObjects.current;
</script>

<MineObject mineobject={mineObj}></MineObject>

<PickaxeCrafter/>