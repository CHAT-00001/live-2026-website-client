<!-- src/routes/u/[id]/components/molecules/VIDEOS.svelte -->
<script lang="ts">
    import {onMount} from 'svelte';
    import type {Info} from '$lib/models/dynamic';

    // 接收父组件传递的目标用户ID
    export let touid: string;

    // 原有变量保留
    let list: Info[] = [];
    let p = 1;
    let loading = false;
    let maxPages = 20;
    let imgLoaded: boolean[] = [];
    let hasMore = true;
    let total = 0; // 存储总视频数，用于渲染
    let apiError = false; // 标记 API 是否出错

    const lat = '22.332214';
    const lng = '108.361544';
    console.log("广西南宁市")

    const handleImgError = (e: Event) => {
        const img = e.target as HTMLImageElement;
        // 图片加载失败时替换为默认图（可根据需求修改默认图路径）
        img.src = '/default-img.png';
    };

    function formatNumber(views: any) {
        const num = Number(views);
        if (isNaN(num)) return '0';
        if (num >= 10000) return (num / 10000).toFixed(1) + '万';
        if (num >= 1000) return (num / 1000).toFixed(1) + '千';
        return num.toString();
    }

    async function loadMore() {
        if (loading || p > maxPages || !hasMore) return;
        loading = true;

        try {
            const params = new URLSearchParams({touid, lat, lng, p: p.toString()});
            const res = await fetch(`/api/video/home?${params.toString()}`);
            if (!res.ok) throw new Error('API Error');
            const data = await res.json();

            // 累加数据并更新分页状态
            list = [...list, ...data.data.info];
            total = data.data.total || 0; // 假设 API 返回 total 总条数
            hasMore = data.data.info.length > 0 && p < maxPages;
            p += 1;
            apiError = false; // 重置错误状态
        } catch (err) {
            console.error(err);
            apiError = true; // 标记 API 错误
            hasMore = false; // 出错后停止加载
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        loadMore();

        const handleScroll = () => {
            // 加载中或无更多数据时，不再触发加载
            if (loading || !hasMore) return;
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });
</script>

<main class="video-list-container">
    <header>
        <h1>VIDEOS</h1>
        <h4>视频（{formatNumber(total)}）</h4>
        {#if list.length > 0}
            <p class="total-count">共 {formatNumber(total)} 条内容</p>
        {/if}
    </header>

    {#if apiError}
        <div class="empty-state">
            <h1>500</h1>
            <p class="empty-text">哇！这里还是空的呀~！</p>
            <p class="error-msg">数据加载失败，请稍后重试</p>
        </div>
    {:else if list.length === 0 && !loading}
        <div class="empty-state">
            <h1>404</h1>
            <p class="empty-text">哇！这里还是空的呀~！</p>
            <p class="default-msg">暂无视频数据，敬请期待</p>
        </div>
    {:else if list.length > 0}
        <div class="video-grid">
            {#each list as item (item.id)}
                <a href={`/video/${item.id}?display=1&room_id=${item.id}_5100048914&r_mm=00000111114444466666`}
                   target="_blank" class="video-card">
                    <div class="thumbnail-wrapper">
                        <img src={item.thumb} alt={item.title || '视频封面'} class="thumbnail" loading="lazy"
                             on:error={handleImgError}/>
                        <span class="duration">{item.duration || '00:00' }</span>
                        <span class="views-count">{formatNumber(item.views)}</span>
                    </div>
                    <div class="video-info">
                        <div class="author-info">
                            <img src={item.avatar || '/default-avatar.png'} alt={`${item.user_nickname || '未知作者'}的头像`}
                                 class="author-avatar" on:error={handleImgError}/>
                            <span class="author-name">{item.user_nickname || '未知作者'}</span>
                        </div>
                        <h3 class="video-title">{item.title || '无标题'}</h3>
                        <div class="stats">
                            <span class="like-count">❤️ {formatNumber(item.likes)}</span>
                            <span class="comment-count">💬 {formatNumber(item.comments)}</span>
                            <span class="share-count">📤 {formatNumber(Number(item.shares) || 0)}</span>
                        </div>
                    </div>
                </a>
            {/each}
        </div>

        <!-- 仅保留加载中提示和无更多内容提示，移除按钮 -->
        <div class="load-more">
            {#if loading}
                <p>加载中...</p>
            {:else if !hasMore}
                <p>没有更多内容了</p>
            {/if}
        </div>
    {/if}
</main>

<style>
    .banner_led {
        width: 100%;
        aspect-ratio: 2.5/1;
        min-height: 200px;
        background: #f1f1f1;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .video-list-container {
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    .video-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
    }

    .video-card {
        display: flex;
        flex-direction: column;
        background: white;
        /*border-radius: 10px;*/
        overflow: hidden;
        margin-bottom: 1rem;
    }

    .thumbnail-wrapper {
        position: relative;
        width: 100%;
        aspect-ratio: 3/4;
        background: #f8f8f8;
        overflow: hidden;
    }

    .thumbnail {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .duration, .views-count {
        position: absolute;
        bottom: 8px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        font-size: 0.75rem;
        padding: 2px 6px;
        border-radius: 3px;
    }

    .duration {
        right: 8px;
    }

    .views-count {
        left: 8px;
    }

    .video-info {
        padding: 1rem;
    }

    .author-info {
        display: flex;
        align-items: center;
        margin-bottom: 0.75rem;
        font-size: 0.8em;
        font-weight: bold
    }

    .author-avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-right: 8px;
    }

    .video-title {
        color: #000;
        font-size: 0.812498rem;
        font-style: normal;
        margin-bottom: 0.75rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .stats {
        display: flex;
        gap: 1rem;
        font-size: 0.8rem;
        color: #888;
    }

    .empty-state {
        text-align: center;
        padding: 4rem 0;
        color: #999;
    }

    .error-msg {
        color: #dc3545;
    }

    .load-more {
        text-align: center;
        padding: 2rem 0;
        font-size: 16px;
    }
</style>