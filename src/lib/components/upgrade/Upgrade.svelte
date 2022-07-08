<script lang="ts">
    import type { Upgrade } from "$lib/classes/upgrade/upgrade";
    import Decimal from "break_infinity.js";

    import Button from "../ui/Button.svelte";

    export let upgrade: Upgrade|null = null;
    export let icon: string = "favicon.png";

    $: price = upgrade?.price ?? new Decimal(0);
</script>

<div on:click={() => upgrade?.buy()} class="group relative flex justify-between items-center flex-wrap p-2 w-72 rounded-md
    upgrade-sm-dark lg:upgrade-lg
    lg:w-16">
    <img class="w-14 h-14" alt="UPG" src={icon}/>
    <div class="lg:hidden flex flex-col flex-grow">
        <p class="font-semibold uppercase text-lg"><slot name="title">Title</slot> Lv. {upgrade?.level}</p>
        <p><slot name="description">Description</slot></p>
    </div>
    <div class="lg:hidden m-1 w-full">
        <Button full={true} on:click={() => upgrade?.buy()}><slot name="resource">$</slot> {price}</Button>
    </div>
    <span class="hidden lg:block absolute right-0 bottom-0 font-bold text-lg">{upgrade?.level}</span>
    <div class="w-48 absolute top-full translate-y-4 scale-0 p-2 group-hover:lg:scale-100 bg-black rounded-md transition-all">
        <p class="font-semibold uppercase text-lg"><slot name="title">Title</slot></p>
        <p><slot name="description">Description</slot></p>
        <p class="text-center text-lg"><slot name="resource">$</slot> <span class="font-mono">{price}</span></p>
    </div>
</div>

<style>
    .upgrade-lg{
        @apply cursor-default bg-blue-400 hover:bg-blue-500 active:bg-blue-600 border-b-4 border-b-blue-800;
    }

    .upgrade-sm{
        @apply cursor-pointer bg-gradient-to-br from-slate-200 to-slate-400;
    }

    .upgrade-sm-dark{
        @apply cursor-pointer bg-gradient-to-br from-slate-600 to-slate-800;
    }
</style>