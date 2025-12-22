<script lang="ts">
    import {onMount} from 'svelte';
    import {fade} from 'svelte/transition';
    import type {Info} from '$lib/models/dynamic';

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
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });
</script>
<div class="line_100"></div>
<div class="title_bar">
    <h1>Videos</h1>
    <h4>视频</h4>
</div>
<div class="line_100"></div>
<div class="wrapper">
    <div class="search_bar">
        <input type="search"/>
        <input type="submit" value="搜索"/>
    </div>
    <div class="title_bar">
        <div class="title">动态</div>
        <div class="tab_menu" style="display: flex">
            <div class="list">
                <button>推荐</button>
                <button>关注</button>
                <button>附近</button>
                <button>最新</button>
                <button>记录</button>
            </div>
            <div class="list">
                <button>卡片</button>
                <button>瀑布流</button>
                <button>列表</button>
                <button>照片墙</button>
                <button>Map</button>
            </div>
        </div>
    </div>
</div>
<div class="wrapper">
    <div class="dynamic-list">
        {#each list as item (item.id)}
            <div class="dynamic-item" id="{item.id}">
                <div class="user_info">
                    <div class="avatar_48"><a target="_blank" href="/u/{item.uid}"><img class="avatar_48"
                                                                                        src="{item.userinfo.avatar}"/>
                    </a></div>
                    <div class="nickname"><a target="_blank" href="/u/{item.uid}">{item.userinfo.user_nickname}</a>
                    </div>
                </div>
                <h4>{item.title}</h4>
                <div class="info">
                    {#each item.thumbs as thumb}
                        <div class="photo">
                            <a target="_blank" href="{thumb}"><img
                                    class="thumb"
                                    src={thumb}
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