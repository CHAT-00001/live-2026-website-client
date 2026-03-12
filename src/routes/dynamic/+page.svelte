<!-- src/routes/dynamic/+page.svelte -->


<script lang="ts">
    import {onMount, tick} from 'svelte';
    import type {Info} from '$lib/models/dynamic';
    import DYNAMIC_MENU from "./components/layout/DYNAMIC_MENU.svelte";

    // 核心数据
    let list: Info[] = [];
    let currentPage = 1; // 当前页码（无任何节流/锁限制）
    let loading = false; // 仅用于显示加载状态
    let hasMore = true;  // 是否还有更多数据
    const maxPages = 20; // 最大页码上限

    // 地理位置参数
    const lat = '24.02994';
    const lng = '108.66107';

    // 纯加载逻辑（无任何节流/锁）
    async function loadMore() {
        // 仅保留基础校验：无更多/超最大页数/正在加载
        if (loading || !hasMore || currentPage > maxPages) return;

        loading = true;
        console.log(`[加载数据] 开始请求第 ${currentPage} 页`);

        try {
            // 发起请求（无AbortController，无节流）
            const res = await fetch(`/api/dynamic/info?p=${currentPage}&lat=${lat}&lng=${lng}`);

            if (!res.ok) throw new Error(`请求失败：HTTP ${res.status}`);
            const json = await res.json();
            const newData = json.data || [];

            console.log(`[加载数据] 第 ${currentPage} 页返回数据量：${newData.length}`);

            // 更新列表
            if (newData.length > 0) {
                list = [...list, ...newData]; // 简单拼接，确保DOM更新
                await tick(); // 等待渲染完成
                currentPage += 1; // 页码递增（仅在数据有效时）
            } else {
                hasMore = false; // 无数据时标记结束
                console.log(`[加载数据] 第 ${currentPage} 页无数据，停止加载`);
            }
        } catch (err) {
            console.error('[加载数据] 出错：', err);
            hasMore = false; // 出错时也停止，避免无限请求
        } finally {
            loading = false; // 立即释放加载状态
        }
    }

    onMount(() => {
        // 初始化加载第一页
        loadMore();

        // 滚动监听（无节流，触底即触发）
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const clientHeight = window.innerHeight;
            const distanceToBottom = scrollHeight - (scrollTop + clientHeight);

            // 距离底部<300px 立即触发加载
            if (distanceToBottom < 400) {
                console.log(`[滚动触发] 距离底部${distanceToBottom}px，触发加载`);
                loadMore();
            }
        };

        // 绑定滚动事件（无passive限制）
        window.addEventListener('scroll', handleScroll);

        // 清理函数
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
</script>
<!-- DOM 省略 -->

<svelte:head>
    <title>动态 - [ Dynamic ] - 首页 - 网站名称</title>
</svelte:head>

<DYNAMIC_MENU/>
<div class="line_100"></div>
<div class="line_100"></div>
<div class="wrapper">
    <div class="dynamic-list">
        {#each list as item (item.id)}
            {list.length}
            <div class="dynamic-item" id="{item.id.toString()}">
                <div class="user_info">
                    <div class="avatar_48"><a target="_blank" href="/u/{item.uid}">
                        <img class="avatar_48" src="{item.userinfo.avatar}"/>
                    </a></div>
                    <div class="nickname"><a target="_blank" href="/u/{item.uid}">{item.userinfo.user_nickname}</a>
                    </div>
                </div>
                <div class="content"><h4 class="title">
                    <a target="_blank" href="/dynamic/{item.uid}">{item.title}</a>
                </h4></div>
                <div class="info">
                    <!-- 动态类型：0：文字；1：图片；2：视频；3：语音 ；4：商品 5：位置；6：xx -->
                    {#each item.thumbs as thumb}
                        <div class="photo">
                            <a target="_blank" href="{thumb}"><img
                                    class="thumb"
                                    src={thumb}?imageView2/2/w/400/h/600
                                    loading="lazy"
                                    in:fade={{ duration: 500 }}
                            /></a>
                        </div>
                    {/each}
                    {#if item.video_thumb}
                        <video class="player" src={item.href} poster={item.video_thumb} controls width="480">
                            <track kind="captions" src="" srclang="en" label="English"/>
                        </video>
                    {/if}
                </div>
                <div class="option">
                    <div class="data">{item.addtime}</div>
                    <div class="distance">City：{item.city} Address：{item.address}  距离: {item.distance}</div>
                    <div class="menu">
                        点赞: {item.likes} 评论: {item.comments}
                    </div>
                </div>
            </div>
        {/each}
    </div>
    {#if loading}
        <div class="load-more">
            <p>加载中...</p>
            <h4>Wait ...</h4>
        </div>
    {/if}

    {#if !hasMore}
        <p>没有更多数据了</p>
    {/if}
</div>

<style>
    .thumb {
        opacity: 1;
        transition: opacity 0.5s;
        width: 200px;
    }

    .thumb.fade-in {
        opacity: 1;
    }

    .dynamic-list {
        /*display: grid;*/
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        row-gap: 15px;
    }

    .dynamic-item {
        display: block;
        margin: 10px;
        padding: 20px;
        min-height: 200px;
        border-radius: 20px;
        background: var(--bg-gray);
    }

    .user_info {
        display: flex;
        align-items: center;
    }

    .avatar_48 {
        width: 48px;
        height: 48px;
        border-radius: 10%;
    }

    .nickname {
        margin: 0 10px;
        font-weight: bold;
    }

    .content {
        display: block;
        margin: 10px 0;
    }

    .photo {
        display: inline-block;
        margin: 10px;
    }
</style>