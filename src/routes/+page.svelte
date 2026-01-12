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
    // 响应式数据（必须用let，不能用const）
    let videos = data.videos || [];
    let currentPage = data.currentPage || 1;
    let hasMore = data.hasMore || false;
    let loading = false;
    const pageSize = 10;

    // 格式化数字
    const formatNumber = (num: number | string) => {
        if (typeof num === 'string') return num;
        return num >= 10000 ? (num / 10000).toFixed(1) + '万' : num.toString();
    };

    // 图片错误处理
    const handleImgError = (e: Event) => {
        const img = e.target as HTMLImageElement;
        img.src = img.alt.includes('avatar')
            ? 'https://picsum.photos/seed/avatar/40/40'
            : 'https://picsum.photos/seed/default/640/360';
    };

    // 核心加载函数（带全量日志）
    const loadMore = async () => {
        // 1. 打印当前状态（关键调试）
        console.log(`【加载触发】loading=${loading}，hasMore=${hasMore}，当前页码=${currentPage}`);

        // 2. 拦截条件
        if (loading || !hasMore) {
            console.log(`【加载拦截】loading=${loading} 或 hasMore=${hasMore}`);
            return;
        }

        // 3. 标记加载中
        loading = true;
        const nextPage = currentPage + 1;
        console.log(`【开始加载】下一页=${nextPage}`);

        try {
            // 4. 直接请求API（跳过路由，避免参数解析问题）
            const res = await fetch(`http://api2.damawei.com:8080/appapi?s=video.getVideoList&uid=1000008801&p=${nextPage}&pageSize=${pageSize}`, {
                credentials: 'include'
            });
            console.log(`【请求响应】状态码=${res.status}`);

            if (!res.ok) throw new Error(`HTTP错误：${res.status}`);
            const result = await res.json();
            console.log(`【下一页数据】`, result);

            // 5. 处理数据
            if (result.data?.code === 0) {
                const newVideos = result.data.info || [];
                console.log(`【新增数据】${newVideos.length}条`);

                // 合并数据（核心：必须用=赋值，保持响应式）
                videos = [...videos, ...newVideos];
                currentPage = nextPage;
                hasMore = newVideos.length === pageSize; // 更新是否有更多

                console.log(`【加载完成】总数据=${videos.length}，hasMore=${hasMore}`);
            } else {
                console.error(`【业务失败】${result.data?.msg}`);
                hasMore = false; // 加载失败则停止
            }
        } catch (err) {
            console.error(`【加载异常】`, err);
        } finally {
            loading = false; // 解除加载锁
            console.log(`【加载结束】loading=${loading}`);
        }
    };

    // 滚动监听（强制触发：只要滚动就打印日志）
    onMount(() => {
        const handleScroll = () => {
            // 计算滚动位置（兼容所有浏览器）
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            const scrollBottom = docHeight - (scrollTop + windowHeight);

            // 强制打印滚动日志
            console.log(`【滚动状态】距离底部=${scrollBottom}px，hasMore=${hasMore}，loading=${loading}`);

            // 触发条件：距离底部<300px + 有更多数据 + 未加载中
            if (scrollBottom < 300 && hasMore && !loading) {
                console.log(`【满足条件】执行loadMore()`);
                loadMore(); // 直接执行加载
            }
        };

        // 绑定滚动事件（用捕获模式，确保不被拦截）
        window.addEventListener('scroll', handleScroll, {capture: true, passive: true});

        // 组件销毁时移除
        return () => window.removeEventListener('scroll', handleScroll, {capture: true});
    });
</script>

<svelte:head>
    <title>HOME - [ GEO - 10048 ] - 首页 - {site_info.name}</title>
</svelte:head>

<!-- led 2026-12-23 21:06:10 -->
<div class="banner_led">
    <a class="" href="/video/home"><h1> VIDEO BANNER - 2026 </h1></a>
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