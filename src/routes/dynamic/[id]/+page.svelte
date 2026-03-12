<script lang="ts">
    import {page} from '$app/stores';
    import {onMount} from 'svelte';
    import {get} from 'svelte/store';

    const data = {
        item: {
            id: 1000514,
            type: 1,
            at: 10004840,
            title: "#jk 拍照",
            thumbnail: "https://cdn1.damawei.com/1004004595_IOS_20250504063206_action_image0_cover.png?imageView2/2/w/400/h/600",
            addtime: 16414784140,
            address: "厦门大学",
            duration: "500m",
        },
        comment: [
            {
                id: 1,
                type: 1,
                user: {
                    nickname: "姣姣",
                    avatar: "https://cdn1.damawei.com/20200325_5e7a7721b6d86.jpg",
                },
                content: "是人我吃.00",
                time: "2026-01-04 10:41:20",
                url: "http://cdn1.damawei.com/4590a.mp4",
                duration: "10:23"
            },
            {
                id: 2,
                type: 1,
                user: {
                    nickname: "姣姣",
                    avatar: "http://cdn1.damawei.com/android_10011081_20231004_234238_2741062.jpg?imageView2/2/w/600/h/600",
                },
                content: "哈吉狗狗22214",
                time: "2026-01-04 10:41:20",
                url: "http://cdn1.damawei.com/4590a.mp4",
                duration: "10:23"
            },
            {
                id: 3,
                type: 1,
                user: {
                    nickname: "姣姣",
                    avatar: "http://cdn1.damawei.com/1004004595_IOS_20250504063257_cerFace.png?imageView2/2/w/600/h/600",
                },
                content: "我不寄到啊",
                time: "2026-01-04 10:41:20",
                url: "http://cdn1.damawei.com/4590a.mp4",
                duration: "10:23"
            },
            {
                id: 4,
                type: 1,
                user: {
                    nickname: "你的老婆",
                    avatar: "http://cdn1.damawei.com/10019114_IOS_20250327144237_cerFace.png?imageView2/2/w/600/h/600",
                },
                content: "你吗死了",
                time: "2026-01-04 10:20:20",
                url: "http://cdn1.damawei.com/4590a.mp4",
                duration: "10:23"
            },
        ],

    };
</script>

<div class="line_100"></div>
<div class="display">
    {#if data}
        <h1>{data.item.title}</h1>
        <img src="{data.item.thumbnail}"/>
        <p>距离: {data.item.duration}</p>
        <p>地址: {data.item.address}</p>
        <p>发布于: {data.item.addtime}</p>
    {:else}
        <p>动态不存在</p>
    {/if}
</div>
<div class="info">
    视频信息：
    分辨率：1920x1080
    fps：30.00
    bit：8
    location：印度尼西亚 - 巴厘岛
    event：海边度假/潜水/旅行
    price：0.00
</div>
<div class="goods">

</div>
<div class="bottom_bar">
    <div class="wrapper">
        <button>转发</button>
        <button>点赞</button>
        <button>弹幕</button>
        <button>分享</button>
        <button>收藏</button>
    </div>
</div>

<!-- 发布评论 -->
<div class="send_bar">
    <h4>发布评论</h4>
    <textarea></textarea>
    <button>发布</button>
</div>

<!-- 评论列表 -->
<div class="comment_bar">
    <h4>全部评论</h4>
    {#each data.comment as comment}
        <li>
            <div class="user_bar">
                <a target="_blank" href="/u/1000001487"><img class="avatar_48" src="{comment.user.avatar}"/></a>
                <a target="_blank" href="/u/1000001487">
                    <text class="nickname">{comment.user.nickname}</text>
                </a>
            </div>
            <div class="content_bar">
                <div class="content">{comment.content}</div>
                <div class="media"></div>
            </div>
            <div class="option_bar">
                <div class="views-count"><i class="bi bi-eye"></i> 浏览量: 15.1w</div>
                <div class="likes-count"><i class="bi bi-heart"></i> 喜欢: 5.1k</div>
                <div class="comments-count"><i class="bi bi-chat-dots"></i> 评论: 9.4k</div>
                <div class="views-count"><i class="bi bi-star"></i> 收藏: 5.1k</div>
                <div class="views-count"><i class="bi bi-trash"></i> 删除</div>
            </div>

        </li>
    {/each}
</div>

<style>
    .display {
        border-bottom: solid 1px #f1f1f1;
    }

    video {
        display: block;
        margin: 0 auto;
        max-width: 1280px;
        max-height: 720px;
    }

    .send_bar textarea {
        display: block;
        padding: 5px 10px;
        width: 100%;
        height: 40px;
        border: solid 2px #39cd55;
        border-radius: 5px;
    }

    .option_bar {
        display: flex;
    }
</style>