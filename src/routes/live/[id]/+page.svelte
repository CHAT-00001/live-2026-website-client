<script lang="ts">
    import {page} from '$app/stores';
    import {onMount} from 'svelte';
    import {get} from 'svelte/store';

    let videoId: string;
    let video: any;

    const mockVideos = [
        {id: 1, title: "SvelteKit 入门教程", url: "http://cdn1.damawei.com/4590a.mp4", duration: "10:23"},
        {id: 2, title: "JavaScript 高级技巧", url: "http://cdn1.damawei.com/1050a.mp4", duration: "12:45"},
        {
            id: 3,
            title: "算了，和你们上班的人说不明白#度假 #巴厘岛 #乌布算了，和你们上班的人说不明白#度假 #巴厘岛 #乌布",
            url: "http://cdn1.damawei.com/4573a.mp4",
            duration: "08:30"
        },
        {id: 4, title: "找到你咯#睡衣换装 #抽屉变装 #肉感十足", url: "http://cdn1.damawei.com/4567a.mp4", duration: "15:10"}
    ];

    onMount(() => {
        videoId = get(page).params.id;
        video = mockVideos.find(v => v.id.toString() === videoId);
    });
</script>


<div class="display">
    {#if video}
        <h1>{video.title}</h1>
        <p>时长: {video.duration}</p>
        <video src={video.url} controls autoplay="autoplay" loop="loop" width="640"></video>
    {:else}
        <p>视频不存在</p>
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
</style>