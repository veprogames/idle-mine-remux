<script lang="ts">
  import GameHeader from "$lib/components/GameHeader.svelte";
  import * as PIXI from "pixi.js";
  import game from "$lib/store/gamestore"
  import { onMount } from "svelte";
  import "../app.css";

  function loadTextures(){
    const addSafe = (name: string, url: string) => {
      if(PIXI.Loader.shared.resources[name] === undefined && PIXI.utils.TextureCache[name] === undefined){
        PIXI.Loader.shared.add(name, url);
      }
      return PIXI.Loader.shared;
    }

    return new Promise((resolve, reject) => {
      addSafe("default", "images/mineobjects/default.json");
      addSafe("dirty", "images/mineobjects/dirty.json");
      addSafe("paper", "images/mineobjects/paper.json");
      addSafe("salt", "images/mineobjects/salt.json");
      addSafe("bone", "images/mineobjects/bone.json");
      PIXI.Loader.shared.load((loader, resources) => {
          game.update(g => {
            g.mineObjects.createSpriteCache(resources);
            return g;
          });
          resolve(resources);
        });
    });
  }

  onMount(async () => {
    await loadTextures();
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