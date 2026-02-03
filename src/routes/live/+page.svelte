<!-- src/routes/live/+page.svelte -->

<script lang="ts">
    import {onMount} from 'svelte';
    import {fade} from 'svelte/transition';
    import LV_BANNER_500 from "./components/LV_BANNER_500.svelte";

    // ------------------ 数据接收 ------------------
    export let data: any;

    // 1. 静态数据：推荐位只拿初始加载的 5 条，后续不再改变
    $: recommendList = data?.recommendList?.slice(0, 5) || [];
    $: slideList = data?.slideList || [];

    // 2. 动态数据：主列表支持追加
    let dynamicList: any[] = [];
    $: if (data?.mainList && dynamicList.length === 0) {
        dynamicList = [...data.mainList];
    }

    // ------------------ 状态管理 ------------------
    let page = 2;
    let loading = false;
    let maxPages = 20;
    let imgLoaded: Record<string | number, boolean> = {};

    function setLoaded(id: string | number) {
        imgLoaded[id] = true;
        imgLoaded = imgLoaded;
    }

    // ------------------ loadMore: 只更新主列表 ------------------
    let loadError = false; // 新增一个错误状态
    async function loadMore() {
        if (loading || page > maxPages || loadError) return;
        loading = true;
        loadError = false;

        try {
            const response = await fetch(`/live?page=${page}`, {
                headers: {'Accept': 'application/json'}
            });

            if (!response.ok) throw new Error('Fetch failed');
            const result = await response.json();

            // 提取新数据 (兼容 SvelteKit 序列化格式)
            const rawData = result.type === 'data' ? result.data : result;
            const newList = rawData?.mainList || [];

            if (newList.length > 0) {
                // ✅ 只更新 dynamicList
                dynamicList = [...dynamicList, ...newList];
                page += 1;
            } else {
                maxPages = page;
            }
        } catch (err) {
            console.error('滚动加载失败:', err);
            loadError = true; // 记录错误
            // 3秒后允许再次尝试，防止瞬间死循环抖动
            setTimeout(() => {
                loadError = false;
            }, 3000);
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        const handleScroll = () => {
            if (loading) return;
            const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 300) {
                loadMore();
            }
        };
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => window.removeEventListener('scroll', handleScroll);
    });
</script>

<svelte:head>
    <title>实况直播 - 首页</title>
</svelte:head>
<div class="line_100"></div>
{#if slideList.length > 0}
    <div class="wrapper">
        <section class="banner-section">
            <div class="slides-container">
                {#each slideList as slide (slide.slide_pic)}
                    <div class="slide-item">
                        <img loading="lazy" src={slide.slide_pic} alt="" class="slide-image"
                             on:load={() => setLoaded(slide.slide_pic)}
                             class:loaded={imgLoaded[slide.slide_pic]}/>
                    </div>
                {/each}
            </div>
        </section>
    </div>
{/if}

{#if recommendList.length > 0}
    <div class="wrapper">
        <section class="recommend-section">
            <h3 class="section-title">推荐直播</h3>
            <div class="recommend-grid">
                {#each recommendList as item (item.uid)}
                    <div class="recommend-card" in:fade={{ duration: 300 }}>
                        <div class="recommend-thumb">
                            <a target="_blank" href="/live/stream/{item.uid}">
                                <img loading="lazy" src={item.thumb} alt={item.title}
                                     on:load={() => setLoaded(`rec_${item.uid}`)}
                                     class:loaded={imgLoaded[`rec_${item.uid}`]}/>
                            </a>
                            {#if item.isvideo === 0}
                                <div class="live-badge">直播中</div>
                            {/if}
                        </div>
                        <div class="recommend-info">
                            <div class="recommend-user">
                                <img loading="lazy" src={item.avatar_thumb} alt="" class="user-avatar"/>
                                <span class="user-name">{item.user_nickname}</span>
                            </div>
                            <h4 class="recommend-title">{item.title}</h4>
                        </div>
                    </div>
                {/each}
            </div>
        </section>
    </div>
{/if}

<LV_BANNER_500/>

{#if dynamicList.length > 0}
    <div class="wrapper">
        <section class="main-list-section">
            <h3 class="section-title">热门</h3>
            <div class="main-list">
                {#each dynamicList as item (item.uid)}
                    <div class="main-card" in:fade={{ duration: 300 }}>
                        <div class="main-card-header">
                            <div class="user-info">
                                <a target="_blank" href="/u/{item.uid}"><img loading="lazy" src={item.avatar_thumb}
                                                                             alt="" class="user-avatar"/></a>
                                <div class="user-details">
                                    <a target="_blank" href="/u/{item.uid}">
                                        <div class="user-name">{item.user_nickname}</div>
                                    </a>
                                    <div class="user-level">Lv.{item.level_anchor}</div>
                                </div>
                                <div class="live-status">
                                    {#if item.isvideo === 0}
                                        <span class="live-indicator">● 直播中</span>
                                    {:else}
                                        <span class="video-indicator">▶ 视频</span>
                                    {/if}
                                </div>
                            </div>
                        </div>
                        <div class="main-thumb">
                            <a target="_blank" href="/live/stream/{item.uid}">
                                <img loading="lazy" src={item.thumb} alt={item.title}
                                     on:load={() => setLoaded(`main_${item.uid}`)}
                                     class:loaded={imgLoaded[`main_${item.uid}`]}/>
                            </a>
                        </div>
                        <div class="main-meta">
                            <span class="location">📍 {item.city}</span>
                            <span class="hot">🔥 {item.hotvotes || 0}</span>
                            <span class="viewers">👥 {item.nums}</span>
                        </div>

                        <h4 class="main-title">{item.title}</h4>
                    </div>
                {/each}
            </div>

            {#if loading}
                <div class="loading">
                    <i class=""/>
                    <h4>正在搬运更多内容...</h4>
                </div>
            {/if}
        </section>
    </div>
{/if}

<div class="line_100"></div>

<style>
    /* --- 全局样式 --- */
    .wrapper {
        max-width: 100%;
        margin: 0 auto;
        padding: 0 20px;
    }

    .section-title {
        margin: 20px 0;
        font-size: 18px;
        font-weight: bold;
        color: #333;
    }

    .loading {
        text-align: center;
        padding: 20px;
        height: 60px;
        color: #666;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* --- 标题栏 --- */
    .title_bar {
        margin: 20px 0;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
    }

    .title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .tab_menu .list {
        display: flex;
        gap: 20px;
    }

    .tab_menu button {
        background: none;
        border: none;
        padding: 5px 10px;
        font-size: 16px;
        color: #666;
        cursor: pointer;
        border-bottom: 2px solid transparent;
    }

    .tab_menu button.active {
        color: #000;
        border-bottom-color: #000;
    }

    /* --- 轮播图 --- */
    .banner-section {
        margin-bottom: 20px;
    }

    .slides-container {
        display: flex;
        margin: 10px 0;
        overflow-x: auto;
        gap: 10px;
        scrollbar-width: none; /* Firefox */
        padding-bottom: 10px;
    }

    .slides-container::-webkit-scrollbar {
        display: none;
    }

    /* Chrome, Safari */
    .slide-item {
        flex: 0 0 auto;
        position: relative;
        width: 100%; /* 或其他你喜欢的宽度 */
        border-radius: 12px;
        overflow: hidden;
    }

    .slide-image {
        width: 100%;
        height: 240px;
        object-fit: cover;
    }

    .slide-link {
        position: absolute;
        bottom: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        text-decoration: none;
    }

    /* --- 推荐直播 --- */
    .recommend-section {
        margin: 20px 0;
    }

    .recommend-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 16px;
    }

    .recommend-card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease-in-out;
    }

    .recommend-card:hover {
        transform: translateY(-5px);
    }

    .recommend-thumb {
        position: relative;
        width: 100%;
        height: 200px;
    }

    .recommend-thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .recommend-thumb img.loaded {
        opacity: 1;
    }

    /* 加载完成后显示 */
    .live-badge {
        position: absolute;
        top: 8px;
        right: 8px;
        background: #ff4757;
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
    }

    .recommend-info {
        padding: 12px;
    }

    .recommend-user {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }

    .user-avatar {
        display: block;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        margin-right: 8px;
        object-fit: cover;
    }

    .user-name {
        font-size: 14px;
        color: #333;
    }

    .recommend-title {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 8px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: #333;
    }

    .recommend-meta {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #999;
    }

    /* --- 主列表 --- */
    .main-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 16px;
    }

    .main-card {
        border-radius: 12px;
        padding: 5px;
    }

    .main-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
    }

    .user-details .user-name {
        font-weight: bold;
        font-size: 14px;
    }

    .user-level {
        font-size: 12px;
        color: #666;
    }

    .live-indicator {
        color: #ff0000;
        font-size: 12px;
        font-weight: bold;
    }

    .video-indicator {
        color: #33ff00;
        font-size: 12px;
        font-weight: bold;
    }

    .user-info {
        display: flex;
        width: 100%;
        align-items: center; /* 顺便垂直居中，好看点 */
    }

    .user-info .live-status {
        margin-left: auto;
    }

    .main-title {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 12px;
        color: #333333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .main-thumb {
        width: 100%;
        height: auto;
        aspect-ratio: 2 / 2;
        border-radius: 20px;
        overflow: hidden;
        margin-bottom: 12px;
    }

    .main-thumb img {
        width: 100%;
        height: 100%;
        aspect-ratio: 2 / 3;
        object-fit: cover;
        transition: opacity 0.3s ease-in-out;
    }

    .main-thumb img.loaded {
        opacity: 1;
    }

    .main-meta {
        display: flex;
        gap: 16px;
        font-size: 12px;
        color: #666;
    }
</style>