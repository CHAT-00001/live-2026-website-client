<!-- src/routes/+layout.svelte -->
<script lang="ts">
	// import favicon from '$lib/assets/favicon.svg';
	import favicon from '$lib/assets/logo.png';
	import "../style/global.css";
	import {theme} from '$lib/stores/theme_store';
	import Menu from '$lib/molecules/Menu.svelte';
	import BOTTOM_BAR from "$lib/molecules/BOTTOM_BAR.svelte";
	import {onMount} from 'svelte';

	let { children } = $props();

    onMount(() => {
        // 1. 页面加载时，读取本地缓存的主题，设置初始值
        const savedTheme = localStorage.getItem('site-theme');
        if (savedTheme) theme.set(Number(savedTheme));

        // 2. 监听主题变化，同步到 本地缓存 + html根元素的data-theme属性
        theme.subscribe((currentTheme) => {
            localStorage.setItem('site-theme', currentTheme.toString());
            document.documentElement.setAttribute('data-theme', currentTheme === 1 ? 'dark' : 'light');
        });
    });
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Menu />
<BOTTOM_BAR />

{@render children()}