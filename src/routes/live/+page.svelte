<script lang="ts">
    import {onMount} from 'svelte';
    import {fade} from 'svelte/transition';
    import {get_list} from '$lib/service/live';
    import LV_BANNER_500 from "./components/LV_BANNER_500.svelte";

    // 定义与API返回结构匹配的类型
    interface SlideItem {
        slide_pic: string;
        slide_url: string;
    }

    interface ContentItem {
        uid: number;
        title: string;
        city: string;
        stream: string;
        pull: string;
        thumb: string;
        isvideo: number;
        type: number;
        type_val: string;
        goodnum: string;
        anyway: number;
        starttime: number;
        isshop: number;
        game_action: number;
        isrecommend: number;
        live_type: number;
        voice_type: number;
        hotvotes: number;
        recommend_time: number;
        nums: string;
        avatar: string;
        avatar_thumb: string;
        user_nickname: string;
        sex: string;
        level: string;
        level_anchor: string;
        game: string;
    }

    interface ApiResponse {
        ret: number;
        data: {
            code: number;
            msg: string;
            info: Array<{
                slide: SlideItem[];
                list: ContentItem[];
                recommend: ContentItem[];
                attent_live_nums: string;
                attent_list: [];
            }>;
        };
        msg: string;
    }

    // 初始化变量
    let slideList: SlideItem[] = [];
    let recommendList: Info[] = [];
    let mainList: Info[] = [];
    let dynamicList: (ContentItem | Info)[] = []; // 用于存储“动态”数据

    let p = 1;
    let loading = false;
    let maxPages = 20;
    let imgLoaded: { [key: number]: boolean } = {}; // 使用对象存储图片加载状态

    const lat = '22.728144';
    const lng = '106.334001';

    async function loadMore() {
        if (loading || p > maxPages) return;
        loading = true;

        try {
            // 1. 先请求数据
            const res = await get_list<ApiResponse>({lat, lng, p});

            // 检查返回数据是否有效
            if (res.ret !== 200 || res.data.code !== 0 || !res.data.info || res.data.info.length === 0) {
                console.error('数据加载失败:', res.msg || '未知错误');
                return;
            }

            const info = res.data.info[0]; // 假设我们只需要info数组的第一个元素

            // 2. 根据页码处理数据
            if (p === 1) {
                // 第一页，加载轮播图、推荐列表和主列表
                slideList = info.slide || [];
                recommendList = info.recommend || [];
                mainList = info.list || [];
            }

            // 所有页都加载动态列表 (这里假设info[0].list就是动态列表数据)
            // 如果动态列表数据在API中有单独的字段，请替换它
            dynamicList = [...dynamicList, ...info.list || []];

            p += 1;
        } catch (error) {
            console.error('网络请求异常:', error);
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        loadMore();

        // 使用防抖优化滚动事件
        let debounceTimer: NodeJS.Timeout;
        const handleScroll = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight;
                const clientHeight = document.documentElement.clientHeight;

                if (scrollTop + clientHeight >= scrollHeight - 200) { // 距离底部200px时加载
                    loadMore();
                }
            }, 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(debounceTimer);
        };
    });
</script>
<svelte:head>
    <title>实况直播 - [ GEO - 10048 ] - 首页 - </title>
</svelte:head>

<div class="line_100"></div>
<!-- 轮播图区域 -->
{#if slideList.length > 0}
    <div class="wrapper">
        <section class="banner-section">
            <div class="slides-container">
                {#each slideList as slide (slide.slide_pic)}
                    <div class="slide-item">
                        <img src={slide.slide_pic} alt="轮播图" class="slide-image" loading="lazy"
                             on:load={() => imgLoaded[slide.slide_pic.length + slide.slide_url.length] = true}/>
                        {#if slide.slide_url && slide.slide_url !== '00'}
                            <a href={slide.slide_url} class="slide-link">查看详情</a>
                        {/if}
                    </div>
                {/each}
            </div>
        </section>
    </div>
{/if}

<!-- 推荐直播区域 -->
{#if recommendList.length > 0}
    <div class="wrapper">
        <section class="recommend-section">
            <h3 class="section-title">推荐直播</h3>
            <div class="recommend-grid">
                {#each recommendList as item (item.uid)}
                    <div class="recommend-card" in:fade={{ duration: 300 }}>
                        <div class="recommend-thumb">
                            <a target="_blank"
                               href="/live/stream/{item.uid}?r_id={item.uid}_00000a01f4ea8444d8a4f8caee"><img
                                    src={item.thumb} alt={item.title} loading="lazy"
                                    on:load={() => imgLoaded[item.uid] = true}
                                    class:loaded={imgLoaded[item.uid]}/></a>
                            {#if item.isvideo === 0}
                                <div class="live-badge">直播中</div>
                            {/if}
                        </div>
                        <div class="recommend-info">
                            <div class="recommend-user">
                                <a target="_blank"
                                   href="/live/stream/{item.uid}?r_id={item.uid}_00000a01f4ea8444d8a4f8caee"><img
                                        src={item.avatar_thumb} alt={item.user_nickname} class="user-avatar"/></a>
                                <span class="user-name">{item.user_nickname}</span>
                            </div>
                            <h4 class="recommend-title">{item.title}</h4>
                            <div class="recommend-meta">
                                <span class="city">{item.city}</span>
                                <span class="viewer">👀 {item.nums}</span>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </section>
    </div>
{/if}

<LV_BANNER_500/>
<!-- 主列表区域 -->
{#if mainList.length > 0}
    <div class="wrapper">
        <section class="main-list-section">
            <h3 class="section-title">热门</h3>
            <div class="main-list">
                {#each mainList as item (item.uid)}
                    <div class="main-card" in:fade={{ duration: 300 }}>
                        <div class="main-card-header">
                            <div class="user-info">
                                <a target="_blank" href="/u/{item.uid}"><img src={item.avatar_thumb}
                                                                             alt={item.user_nickname}
                                                                             class="user-avatar"/></a>
                                <div class="user-details">
                                    <div class="user-name"><a target="_blank"
                                                              href="/u/{item.uid}">{item.user_nickname}</a></div>
                                    <div class="user-level">Lv.{item.level_anchor}</div>
                                </div>
                            </div>
                            <div class="live-status">
                                {#if item.isvideo === 0}
                                    <span class="live-indicator">● 直播中</span>
                                {:else}
                                    <span class="video-indicator">▶ 视频</span>
                                {/if}
                            </div>
                        </div>
                        <h4 class="main-title">{item.title}</h4>
                        <div class="main-thumb"><a target="_blank"
                                                   href="/live/stream/{item.uid}?r_id={item.uid}_00000a01f4ea8444d8a4f8caee">
                            <img src={item.thumb} alt={item.title} loading="lazy"
                                 on:load={() => imgLoaded[item.uid * 10] = true}
                                 class:loaded={imgLoaded[item.uid * 10]}/></a>
                        </div>
                        <div class="main-meta">
                            <span class="location">📍 {item.city}</span>
                            <span class="hot">🔥 {item.hotvotes || 0}</span>
                            <span class="viewers">👥 {item.nums}</span>
                        </div>
                    </div>
                {/each}
            </div>
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
        color: #666;
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
        opacity: 0; /* 初始透明 */
        transition: opacity 0.3s ease-in-out;
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
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
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

    .main-title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 12px;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .main-thumb {
        width: 100%;
        height: auto;
        aspect-ratio: 2 / 3;
        border-radius: 20px;
        overflow: hidden;
        margin-bottom: 12px;
    }

    .main-thumb img {
        width: 100%;
        height: 100%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        opacity: 0;
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