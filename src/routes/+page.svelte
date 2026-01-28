<!-- src/routes/+page.svelte -->


<script lang="ts">
    import type {PageData} from './$types';
    import {onMount} from 'svelte';

    let site_info =
        {
            "name": "coke",
            "cname": "可乐",
            "url": "/",
            "copyright": 2026,
        };

    export let data: PageData;

    let videos = data.videos || [];
    let currentPage = data.currentPage || 1;
    let hasMore = data.hasMore || false;
    let loading = false;
    const pageSize = 10;

    const formatNumber = (num: number | string) => {
        if (typeof num === 'string') return num;
        return num >= 10000 ? (num / 10000).toFixed(1) + '万' : num.toString();
    };

    const handleImgError = (e: Event) => {
        const img = e.target as HTMLImageElement;
        img.src = img.alt.includes('avatar')
            ? 'https://picsum.photos/seed/avatar/40/40'
            : 'https://picsum.photos/seed/default/640/360';
    };

    // 最简 loadMore：只要有下一页就加载
    const loadMore = async () => {
        if (loading || !hasMore) return;
        loading = true;
        const nextPage = currentPage + 1;

        try {
            const res = await fetch(`/api/videos?p=${nextPage}`);
            if (!res.ok) throw new Error(`HTTP错误：${res.status}`);
            const result = await res.json();

            const newVideos = result.videos || [];
            videos = [...videos, ...newVideos];
            currentPage = nextPage;
            hasMore = result.hasMore;
        } catch (err) {
            console.error('加载异常', err);
        } finally {
            loading = false;
        }
    };

    onMount(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            const scrollBottom = docHeight - (scrollTop + windowHeight);

            // 只要快到底就触发 loadMore
            if (scrollBottom < 300 && hasMore && !loading) {
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll, {capture: true, passive: true});
        return () => window.removeEventListener('scroll', handleScroll, {capture: true});
    });
</script>


<svelte:head>
    <title>HOME - [ GEO - 10048 ] - 首页 - {site_info.name}</title>
</svelte:head>

<!-- led 2026-12-23 21:06:10 -->
<div class="banner_led">
    <a class="" href="/home"><h1> VIDEO BANNER - 2026 </h1></a>
</div>

<main class="video-list-container">
    <div class="title_bar">
        <h1>热门视频</h1>
        {#if videos.length > 0}
            <p class="total-count">共 {formatNumber(data.total)} 条内容</p>
        {/if}
    </div>

    {#if data.error}
        <div class="empty-state">
            <p class="empty-text">哇！这里还是空的呀~！</p>
            <p class="error-msg">{data.error.msg}</p>
        </div>
    {:else if videos.length === 0}
        <div class="empty-state">
            <p class="empty-text">哇！这里还是空的呀~！</p>
            <p class="default-msg">暂无视频数据，敬请期待</p>
        </div>
    {:else}
        <div class="video-grid">
            {#each videos as video (video.id)}
                <a href={`/video/${video.id}?display=1&room_id=${video.id}_5100048914&r_mm=00000111114444466666`}
                   target="_blank" class="video-card">
                    <div class="thumbnail-wrapper">
                        <img src={video.thumb}?imageView2/1/w/640/h/360 alt={video.title} class="thumbnail"
                             loading="lazy"
                             on:error={handleImgError}/>
                        <span class="duration">{video.duration || '00:00'}</span>
                        <span class="views-count">{formatNumber(video.views)}</span>
                    </div>
                    <div class="video-info">
                        <div class="author-info">
                            <img src="{video.avatar}?imageView2/2/w/50/h/50" alt={`${video.user_nickname}`}
                                 class="author-avatar"
                                 on:error={handleImgError}/>
                            <span class="author-name">{video.user_nickname}</span>
                        </div>
                        <h3 class="video-title">{video.title}</h3>
                        <div class="stats">
                            <span class="like-count">❤️ {formatNumber(video.likes)}</span>
                            <span class="comment-count">💬 {formatNumber(video.comments)}</span>
                            <span class="share-count">📤 {formatNumber(Number(video.shares) || 0)}</span>
                        </div>
                    </div>
                </a>
            {/each}
        </div>

        <!-- 加载状态 + 手动按钮（兜底） -->
        <div class="load-more">
            {#if loading}
                <p>加载中...</p>
            {:else if hasMore}
                <button on:click={loadMore} style="padding: 10px 20px; cursor: pointer;">
                    点击加载更多（第{currentPage + 1}页）
                </button>
            {:else}
                <p>没有更多内容了</p>
            {/if}
        </div>
    {/if}
</main>

<style>

    .banner_led {
        width: 100%;
        aspect-ratio: 5/1;
        min-height: 200px;
        background: var(--led-bg-color);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .banner_led a {
        color: #ffffff;
    }

    .title_bar {
        position: sticky;
        top: 55px;
        margin: 20px 0;
        padding: 10px;
        background: var(--title-bar);
        z-index: 10;
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
        background: var(--card-bg-white);
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 1rem;
    }

    .thumbnail-wrapper {
        position: relative;
        width: 100%;
        aspect-ratio: 16/9;
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
    }

    .author-avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-right: 8px;
    }

    .video-title {
        font-size: 0.875rem;
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