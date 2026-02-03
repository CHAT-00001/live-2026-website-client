<!-- src/video/ui/VIDEO_LIST_CARD.svelte -->
<script lang="ts">
    import 'bootstrap-icons/font/bootstrap-icons.min.css';
    import type {PageData} from './$types';
    import {onMount} from 'svelte';
    import type {Info} from "$lib/models/dynamic.ts";

    export let data: PageData;

    // 初始化分页相关变量
    let currentPage = data.currentPage || 1;
    let hasMore = data.hasMore || true; // 初始化为true，先尝试加载第一页
    let loading = false;
    const pageSize = 10;

    // 修复语法错误：正确初始化videos数组，指定Info类型
    let videos: Info[] = [];
    let p = 1; // 当前请求的页码
    let maxPages = 20; // 最大页码限制，防止无限请求
    let imgLoaded: boolean[] = [];

    // 定位信息
    const lat = '22.332214';
    const lng = '108.361544';
    console.log("广西南宁市");

    // 数字格式化函数
    const formatNumber = (num: number | string) => {
        if (typeof num === 'string') return num;
        return num >= 10000 ? (num / 10000).toFixed(1) + '万' : num.toString();
    };

    // 图片加载失败的兜底处理
    const handleImgError = (e: Event) => {
        const img = e.target as HTMLImageElement;
        img.src = img.alt.includes('avatar')
            ? 'https://picsum.photos/seed/avatar/40/40'
            : 'https://picsum.photos/seed/default/640/360';
    };

    // 接口返回类型（最小侵入：只约束用到的字段）
    interface VideoListResponse {
        data?: {
            info?: Info[];
        };
    }

    // 加载视频（支持初始化加载和加载更多）
    const loadVideos = async (isLoadMore = false): Promise<void> => {
        // 防重复请求、超出最大页码则停止
        if (loading || p > maxPages || (!isLoadMore && videos.length > 0)) return;
        loading = true;

        try {
            // 构造请求参数
            const params = new URLSearchParams({
                lat,
                lng,
                p: p.toString(),
                pageSize: pageSize.toString() // 传递页大小，方便后端分页
            });

            // 请求接口
            const res = await fetch(`/api/video/nearby?${params.toString()}`);
            if (!res.ok) throw new Error(`请求失败：${res.status} ${res.statusText}`);

            const responseData: VideoListResponse = await res.json();

            // 处理返回数据
            const list = responseData.data?.info;

            console.log(list);

            if (Array.isArray(list)) {
                if (isLoadMore) {
                    // 加载更多：追加数据
                    videos = [...videos, ...list];
                } else {
                    // 初始化加载：替换数据
                    videos = list;
                }

                // 更新分页状态
                currentPage = p;

                // 判断是否还有更多数据（最小修正，防止最后一页死循环）
                hasMore = list.length > 0 && list.length === pageSize && p < maxPages;

                p += 1; // 页码自增，为下一次请求做准备
            } else {
                hasMore = false; // 无数据则标记为无更多
            }
        } catch (err) {
            console.error('加载视频数据失败：', err);
            hasMore = false; // 出错后停止加载更多
        } finally {
            loading = false; // 无论成功失败，都结束加载状态
        }
    };

    // 加载更多函数（调用核心加载函数，标记为加载更多）
    const loadMore = () => {
        loadVideos(true);
    };

    // 组件挂载后，初始化加载第一页数据
    onMount(() => {
        // 首次加载第一页
        loadVideos(false);

        // 滚动加载逻辑
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            const scrollBottom = docHeight - (scrollTop + windowHeight);

            // 滚动到底部300px内、有更多数据、未加载中时触发加载
            if (scrollBottom < 300 && hasMore && !loading) {
                loadMore();
            }
        };

        // 添加滚动监听（优化参数：passive提升性能）
        window.addEventListener('scroll', handleScroll, {passive: true});
        // 组件销毁时移除监听，防止内存泄漏
        return () => window.removeEventListener('scroll', handleScroll);
    });
</script>

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