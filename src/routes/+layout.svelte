<!-- src/routes/+layout.svelte -->


<!-- 2026-03-04 12:41:20 -->


<script lang="ts">
	import favicon from '$lib/assets/logo.png';
	import "../style/global.css";
	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	import {theme} from '$lib/stores/theme_store';
    import LoginModal from '$lib/ui/kit/LoginModal.svelte';
	import Menu from '$lib/molecules/Menu.svelte';
	import BOTTOM_BAR from "$lib/molecules/BOTTOM_BAR.svelte";
	import {onMount} from 'svelte';
	import {derived} from 'svelte/store';
	import {page} from "$app/stores";
    import {invalidateAll} from '$app/navigation'; // ✅ 新增：用于刷新数据
    import {user as userStore} from '$lib/stores/user';

    // 统一使用 $props 接收 children 和 data
    let {children, data} = $props<{
        children: any,
        data: { user: any | null }
    }>();

	// 依然保留你的派生 store
	const isHome = derived(page, $page => $page.url.pathname === '/home');

	onMount(() => {
        // --- 主题初始化 ---
		const savedTheme = localStorage.getItem('site-theme');
		if (savedTheme) theme.set(Number(savedTheme));

		theme.subscribe((currentTheme) => {
			localStorage.setItem('site-theme', currentTheme.toString());
			document.documentElement.setAttribute('data-theme', currentTheme === 1 ? 'dark' : 'light');
		});

        // --- ✅ 多标签页同步逻辑 ---
        const handleAuthChange = (event: StorageEvent) => {
            if (event.key === 'auth-event') {
                // 当监听到其他标签页发出的登录/退出信号时
                // 强制重新运行服务端 load 函数，更新 data.user
                invalidateAll();
            }
        };

        window.addEventListener('storage', handleAuthChange);
        return () => window.removeEventListener('storage', handleAuthChange);
    });

    // 监听 data.user 的变化，并同步到全局 userStore
    // Svelte 5 中，$derived 或简易的副作用可以处理这种同步
    $effect(() => {
        if (data.user) {
            userStore.set(data.user);
        } else {
            userStore.set(null);
        }
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Menu isHome={$isHome}/>
<LoginModal/>
<BOTTOM_BAR />

{@render children()}