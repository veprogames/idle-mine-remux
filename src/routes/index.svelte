<script>
    import MineObject from "$lib/components/MineObject.svelte";
import PickaxeCrafter from "$lib/components/PickaxeCrafter.svelte";
import Upgrade from "$lib/components/upgrade/Upgrade.svelte";
    import game from "$lib/store/gamestore";

    $: mineObj = $game.mineObjects.current;

    $: upg = $game.money.upgrades.blacksmith;
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-y-8">
    <MineObject mineobject={mineObj}></MineObject>
    
    <div class="p-4">
        <Upgrade upgrade={upg} icon="blacksmith.png">
            <span slot="title">Blacksmith</span>
            <span slot="description">Increase the minimum <span class="text-green-500">Power</span> of Pickaxes</span>
            <span slot="resource"><span class="text-green-300 font-extrabold">$</span></span>
        </Upgrade>
    </div>

    <div>Pickaxe</div>
    
    <PickaxeCrafter/>
</div>