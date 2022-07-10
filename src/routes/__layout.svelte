<script>
  import GameHeader from "$lib/components/GameHeader.svelte";
  import * as PIXI from "pixi.js";
  import game from "$lib/store/gamestore"
  import { onMount } from "svelte";
  import "../app.css";

  let loaded = false;

  onMount(() => {
    PIXI.Loader.shared.add("default", "images/mineobjects/default.json")
      .load((loader, resources) => {
        game.update(g => {
          g.mineObjects.createSpriteCache(resources);
          return g;
        });
        loaded = true;
      });
  });
  
</script>

<svelte:head>
  <title>Idle Mine: Remux</title>
</svelte:head>

{#if loaded}
  <GameHeader/>
  <slot />
{:else}
  <div class="w-screen h-screen flex justify-center items-center text-4xl">Loading...</div>
{/if}

<style>
  :global(.btn){
    @apply p-2 rounded-lg font-semibold uppercase bg-blue-400 border-b-8 border-b-blue-800 hover:bg-blue-500 active:bg-blue-600;
  }

  :global(.btn:disabled, .btn-disabled){
    @apply p-2 rounded-lg font-semibold uppercase bg-red-400 border-b-8 border-b-red-800 brightness-75;
  }
</style>