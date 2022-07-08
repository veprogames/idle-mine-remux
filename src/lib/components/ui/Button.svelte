<script>
    export let full = false;
</script>

<button on:click on:dblclick on:mouseenter on:mouseleave
class:w-full={full}
class="p-2 rounded-lg font-semibold uppercase bg-blue-400 border-b-8 border-b-blue-800 hover:bg-blue-500 active:bg-blue-600"><slot/></button>