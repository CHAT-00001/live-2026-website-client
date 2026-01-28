<script lang="ts">
    import {onMount} from 'svelte';
    import {fade} from 'svelte/transition';
    import {getRecommendDynamics} from '$lib/api/dynamic';
    import type {Info} from '$lib/models/dynamic';
    import DYNAMIC_MENU from "./components/layout/DYNAMIC_MENU.svelte";

    let list: Info[] = [];
    let p = 1;
    let loading = false;
    let maxPages = 20;
    let imgLoaded = []; // 记录每张图是否加载完成

    const lat = '24.02994'; // 示例经纬度
    const lng = '108.66107';

    async function loadMore() {
        if (loading || p > maxPages) return;
        loading = true;

        const res = await getRecommendDynamics({lat, lng, p});
        list = [...list, ...res.data.info];
        p += 1;

        loading = false;
    }

    onMount(() => {
        loadMore();
        // 监听滚动加载下一页
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
    <title>动态 - [ Dynamic - 10040 ] - 首页 - 网站名称</title>
</svelte:head>

<DYNAMIC_MENU/>
<div class="line_100"></div>
<div class="line_100"></div>
<div class="wrapper">
    <div class="dynamic-list">
        {#each list as item (item.id)}
            <div class="dynamic-item" id="{item.id.toString()}">
                <div class="user_info">
                    <div class="avatar_48"><a target="_blank" href="/u/{item.uid}"><img class="avatar_48"
                                                                                        src="{item.userinfo.avatar}"/>
                    </a></div>
                    <div class="nickname"><a target="_blank" href="/u/{item.uid}">{item.userinfo.user_nickname}</a>
                    </div>
                </div>
                <h4>{item.title}</h4>
                <div class="info">
                    <!-- 动态类型：0：文字；1：图片；2：视频；3：语音 ；4：商品 5：位置；6：xx -->
                    {#each item.thumbs as thumb}
                        <div class="photo">
                            <a target="_blank" href="{thumb}"><img
                                    class="thumb"
                                    src={thumb}?imageView2/2/w/400/h/600
                                    loading="lazy"
                                    on:load={() => imgLoaded[0] = true}
                                    in:fade={{ duration: 500 }}
                            /></a>
                        </div>
                    {/each}
                    {#if item.video_thumb}
                        <video src={item.href} poster={item.video_thumb} controls width="480">
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
        {#if loading}
            <p>加载中...</p>
            <h4>Wait ...</h4>
        {/if}
    </div>
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

    .dynamic-item {
        display: block;
        margin: 20px;
        padding: 20px;
        border-radius: 20px;
        background: var(--bg-gray);
    }

    .user_info {
        display: flex;
    }

    .avatar_48 {
        width: 48px;
        height: 48px;
        border-radius: 10%;
    }

    .nickname {
        margin: 10px;
        font-weight: bold;
    }

    .photo {
        display: inline-block;
        margin: 10px;
    }
</style>