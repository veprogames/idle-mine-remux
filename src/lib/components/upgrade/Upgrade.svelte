<script lang="ts">
import type { Upgrade } from "$lib/classes/upgrade/upgrade";
import Decimal from "break_infinity.js";

import Button from "../ui/Button.svelte";

export let upgrade: Upgrade|null = null;
export let icon: string = "favicon.png";

$: price = upgrade?.price ?? new Decimal(0);

</script>

<div on:click={() => upgrade?.buy()} class="group relative flex justify-between items-center p-2 w-72 rounded-md
    bg-gradient-to-br from-slate-200 to-slate-400 dark:from-slate-600 dark:to-slate-800
    lg:w-16">
    <img class="w-16 h-16" alt="UPG" src={icon}/>
    <div class="lg:hidden flex flex-col flex-grow">
        <p class="font-semibold uppercase text-lg"><slot name="title">Title</slot></p>
        <p><slot name="description">Description</slot></p>
    </div>
    <div class="lg:hidden">
        <Button on:click={() => upgrade?.buy()}><slot name="resource">$</slot> {price}</Button>
    </div>
    <div class="absolute top-full translate-y-4 scale-0 group-hover:lg:scale-100 bg-black rounded-md transition-all">
        <p class="font-semibold uppercase text-lg"><slot name="title">Title</slot></p>
        <p><slot name="description">Description</slot></p>
        <p><slot name="resource">$</slot> {price}</p>
    </div>
</div>