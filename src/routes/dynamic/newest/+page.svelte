<script lang="ts">
    import {onMount} from 'svelte';
    import type {Info} from '$lib/models/dynamic';
    import DYNAMIC_MENU from "../components/layout/DYNAMIC_MENU.svelte";
    import DYNAMIC_ITEM from "../components/DYNAMIC_ITEM.svelte";

    let list: Info[] = [];
    let p = 1;
    let loading = false;
    let maxPages = 20;
    let imgLoaded: boolean[] = [];

    const lat = '22.332214';
    const lng = '108.361544';
    console.log("最新的动态")

    async function loadMore() {
        if (loading || p > maxPages) return;
        loading = true;

        try {
            // 改为通过 routes/api 请求
            const params = new URLSearchParams({ lat, lng, p: p.toString() });
            const res = await fetch(`/api/dynamic/newest?${params.toString()}`);
            if (!res.ok) throw new Error('API Error');
            const data = await res.json();

            const newItems = data.data.info;
            list = [...list, ...newItems];
            imgLoaded = [...imgLoaded, ...newItems.map(() => false)];
            p += 1;

            if (document.body.scrollHeight <= window.innerHeight) {
                loadMore();
            }
        } catch (err) {
            console.error(err);
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        loadMore();

        const handleScroll = () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });
</script>

<svelte:head>
    <title>最新 - [GEO - 20.541254, 108.614411] - 动态 - 网站标题</title>
</svelte:head>

<DYNAMIC_MENU/>
<div class="line_100"></div>
<div class="line_100"></div>
<div class="wrapper">
    {#each list as item (item.id)}
        <DYNAMIC_ITEM {item} imgLoaded={imgLoaded}/>
    {/each}
    {#if loading}
        <p>加载中...</p>
    {/if}
</div>
