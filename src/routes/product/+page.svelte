<script lang="ts">
    import {onMount} from 'svelte';
    import type {Info} from '$lib/models/dynamic';
    import VIDEO_BANNER from "./components/layout/VIDEO_BANNER.svelte";

    ////////

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
            const res = await fetch(`/api/product/nearby?${params.toString()}`);
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
    <h1>Product</h1>
    <h4>产品</h4>
</div>
<div class="line_100"></div>
<VIDEO_BANNER/>
<div class="info_bar"></div>
<div class="#wrapper">
    <div class="dynamic-list">
        {#each list as item (item.id)}
            <!-- 00000 -->
            <div class="dynamic-item" id="{item.id.toString()}">
                <div class="user_info">
                    <div class="avatar_48">
                        <a target="_blank" href="/u/{item.uid}"><img class="avatar_48"
                                                                     src="{item.userinfo.avatar}?imageView2/1/w/100/h/100"/>
                        </a></div>
                    <div class="nickname">
                        <a target="_blank" href="/u/{item.uid}">{item.userinfo.user_nickname}</a>
                    </div>
                </div>
                <a class="name" target="_blank" href="/product/{item.id}"><h5>{item.title}</h5></a>
                <label class="no"><strong>148001-100</strong></label>
                <label class="add"><h5>ADD: CHINA </h5></label>
                <a class="ot_link" target="_blank" href="/video/{item.id}"><h5>链接</h5></a>
                <label class="price"><h5>249.00</h5></label>
                <label class="orange_price"><h5>249.00</h5></label>
                <div class="info">
                    <a target="_blank" href="/product/{item.id}"><img class="thumb"
                                                                      src="{item.thumb}?imageView2/1/w/200/h/200"/></a>
                </div>
                <div class="option">
                    <div class="data"><label class="time">{item.addtime}</label></div>
                    <div class="distance">City：{item.city} Address：{item.address}  距离: {item.distance}</div>
                    <div class="menu">
                        点赞: {item.likes} 评论: {item.comments}
                    </div>
                    <button class="btn_black">编辑</button>
                    <button class="btn_black">▶查看产品</button>
                    <button class="btn_black">推荐</button>
                    <button class="btn_black">下架</button>
                </div>
                <div class="info">
                    <button>-</button>
                    <strong>0</strong>
                    <button>+</button>
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
        margin: 0 10px;
        opacity: 1;
        transition: opacity 0.5s;
        width: 100px;
        height: 100px;
        aspect-ratio: 1 / 1;
        background: #eeeeee;
    }

    .thumb.fade-in {
        opacity: 1;
    }

    .dynamic-item {
        display: flex;
        /*margin: 20px;*/
        padding: 20px;
        border-radius: 20px;
        background: #ffffff;
        align-items: center; /* 上下居中 */
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
        border: 1px solid #ffffff;
    }

    .dynamic-item:hover {
        background: #f1f1f1;
    }

    .user_info {
        display: flex;
        align-content: center;
        min-width: 200px;
    }

    .name {
        flex: 1;
        min-width: 200px;
        max-width: 300px;
    }

    .no {
        margin: 0 10px;
        min-width: 120px;
    }

    .time {
        color: #00ff00;
        font-size: 14px;
    }

    .avatar_48 {
        width: 48px;
        height: 48px;
        aspect-ratio: 1 / 1;
        border-radius: 10%;
    }

    .nickname {
        display: flex;
        margin: 10px;
        align-items: center;
    }

    .photo {
        display: inline-block;
        margin: 10px;
    }

    .ot_link {
        color: #0044ff;
    }

    .orange_price {
        text-decoration: line-through;
        color: #999; /* 變灰一點 */
        font-weight: normal;
    }

    .option {
        margin-left: auto;
    }

    .info {
        margin-left: auto;
    }
</style>