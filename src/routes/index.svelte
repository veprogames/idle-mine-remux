<script>
    import MineObject from "$lib/components/MineObject.svelte";
import PickaxeCrafter from "$lib/components/PickaxeCrafter.svelte";
import Upgrade from "$lib/components/upgrade/Upgrade.svelte";
    import game from "$lib/store/gamestore";

    $: mineObj = $game.mineObjects.current;

    $: upg = $game.money.upgrades.blacksmith;
</script>

<MineObject mineobject={mineObj}></MineObject>

<PickaxeCrafter/>

<div>
    <Upgrade upgrade={upg}>
        <span slot="title">Blacksmith</span>
        <span slot="description">Get <span class="text-green-500">more</span> Blacksmith</span>
        <span slot="resource"><span class="text-green-300 font-extrabold">$</span></span>
    </Upgrade>
</div>