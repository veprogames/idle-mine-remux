<script>
  import GameHeader from "$lib/components/GameHeader.svelte";
  import * as PIXI from "pixi.js";
  import game from "$lib/store/gamestore"
  import { onMount } from "svelte";
  import "../app.css";

  let loaded = false;

  function loadTextures(){
    return new Promise((resolve, reject) => {
      PIXI.Loader.shared
        .add("default", "images/mineobjects/default.json")
        .add("dirty", "images/mineobjects/dirty.json")
        .load((loader, resources) => {
          game.update(g => {
            g.mineObjects.createSpriteCache(resources);
            return g;
          });
          resolve(resources);
        });
    });
  }

  onMount(async () => {
    const res = await loadTextures();
    loaded = true;
  });
  
</script>

<svelte:head>
  <title>Idle Mine: Remux</title>
</svelte:head>

<GameHeader/>
<slot />

<style>
  :global(.btn){
    @apply p-2 rounded-lg font-semibold uppercase bg-blue-400 border-b-8 border-b-blue-800 hover:bg-blue-500 active:bg-blue-600;
  }

  :global(.btn:disabled, .btn-disabled){
    @apply p-2 rounded-lg font-semibold uppercase bg-red-400 border-b-8 border-b-red-800 brightness-75;
  }
</style>