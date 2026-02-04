<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import favicon from '$lib/assets/logo.png';
	import "../style/global.css";
	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	import {theme} from '$lib/stores/theme_store';
	import Menu from '$lib/molecules/Menu.svelte';
	import BOTTOM_BAR from "$lib/molecules/BOTTOM_BAR.svelte";
	import {onMount} from 'svelte';
	import {derived} from 'svelte/store';
	import {page} from "$app/stores";

	let { children } = $props();

	// 依然保留你的派生 store
	const isHome = derived(page, $page => $page.url.pathname === '/home');

	onMount(() => {
		const savedTheme = localStorage.getItem('site-theme');
		if (savedTheme) theme.set(Number(savedTheme));

		theme.subscribe((currentTheme) => {
			localStorage.setItem('site-theme', currentTheme.toString());
			document.documentElement.setAttribute('data-theme', currentTheme === 1 ? 'dark' : 'light');
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Menu isHome={$isHome}/>

<BOTTOM_BAR />

{@render children()}