<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import "../style/global.css";
	import Menu from '$lib/molecules/Menu.svelte';
	import BOTTOM_BAR from "$lib/molecules/BOTTOM_BAR.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Menu />
<BOTTOM_BAR />

{@render children()}
