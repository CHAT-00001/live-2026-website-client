<script lang="ts">
    import {onMount} from 'svelte';
    import type {Info} from '$lib/models/dynamic';
    import VIDEO_BANNER from "./components/layout/VIDEO_BANNER.svelte";

    let list: Info[] = [];
    let p = 1;
    let loading = false;
    let maxPages = 20;
    let imgLoaded: boolean[] = [];

    const lat = '22.332214';
    const lng = '108.361544';
    console.log("广西南宁市")

    async function loadMore() {
        if (loading || p > maxPages) return;
        loading = true;

        try {
            // 改为通过 routes/api 请求
            const params = new URLSearchParams({lat, lng, p: p.toString()});
            const res = await fetch(`/api/video/nearby?${params.toString()}`);
            if (!res.ok) throw new Error('API Error');
            const data = await res.json();

            list = [...list, ...data.data.info];
            p += 1;
        } catch (err) {
            console.error(err);
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        loadMore();

        const handleScroll = () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) {
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });
</script>
<svelte:head>
    <title>推荐 - [ Video - 10070 ] - 首页 - 网站名称</title>
</svelte:head>

<div class="line_100"></div>
<div class="title_bar">
    <h1>Videos</h1>
    <h4>视频</h4>
</div>
<div class="line_100"></div>
<VIDEO_BANNER/>
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
                <a target="_blank" href="/video/{item.id}"><h4>{item.title}</h4></a>
                <div class="info">
                    <a target="_blank" href="/video/{item.id}"><img class="thumb" src="{item.thumb}"/></a>
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
            <p>Waiting...</p>
        {/if}
    </div>
</div>

<style>
    .title_bar {
        margin: 20px;
    }

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
        background: #f1f1f1;
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
    }

    .photo {
        display: inline-block;
        margin: 10px;
    }
</style>