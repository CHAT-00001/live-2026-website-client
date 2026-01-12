<script lang="ts">
    import COMMENTS from "../components/molecules/COMMENTS.svelte";
    import {onMount} from 'svelte';

    let videoVolume = 0.2;
    let videoElement: HTMLVideoElement | null = null;

    export let data;

    const videoData = data.videoData;
    const siteName = data.site?.name ?? 'Video Site';

    let errorMsg: string | null = null;
    let video: any = null;

    if (videoData.code === 10000) {
        errorMsg = videoData.msg || '啊！视频找不到了~！';
    } else if (videoData.code === 0) {
        video = videoData.info?.[0] ?? null;
    }

    $: shortTitle = video?.title
        ? video.title.slice(0, 20)
        : '';

    $: pageTitle = video
        ? `${shortTitle} - [${video.id}] - ${siteName}`
        : siteName;

    $: metaDescription = video?.description
        ? video.description.replace(/\s+/g, ' ').slice(0, 120)
        : '';

    $: metaKeywords = video
        ? [
            video.title,
            video.description
        ]
            .filter(Boolean)
            .join(',')
            .replace(/\s+/g, ' ')
            .slice(0, 200)
        : '';

    let videoEl: HTMLVideoElement;

    onMount(() => {
        if (videoEl) {
            videoEl.volume = 0.1; // 设置音量为 10%
        }
    });
</script>

<svelte:head>
    <title>{pageTitle}</title>

    {#if metaDescription}
        <meta name="description" content={metaDescription}/>
    {/if}

    {#if metaKeywords}
        <meta name="keywords" content={metaKeywords}/>
    {/if}
</svelte:head>

{#if errorMsg}
    <div class="video-not-found">
        <h2>{errorMsg}</h2>
    </div>

{:else if video}
    <div class="video-detail">
        <div class="banner_led">
            <video
                    src={video.href}
                    poster={video.thumb}
                    controls
                    autoplay
                    loop
                    bind:this={videoEl}
                    preload="metadata"
            ></video>
        </div>

        <div class="title">
            <h3>{video.title}</h3>
        </div>
        <div class="video_info">
            <h4>视频信息</h4>
            <div class="info">
                <div class="qty">
                    浏览量: {video.views}
                    被点赞: {video.likes}
                    评论数量: {video.comments}
                    收藏量: {video.collects}
                    被分享: {video.shares}
                </div>

                <h5>
                    at: {video.addtime}
                    - 📍: {video.city}
                    - IP: 日本
                </h5>

                <div class="desc">{video.description}</div>

                <div class="author">
                    <a class="avatar" target="_blank" href="/u/{video.uid}">
                        <img class="avatar_48" src="{video.avatar}" alt="avatar"/>
                    </a>
                    <a class="nickname" target="_blank" href="/u/{video.uid}">
                        <span>{video.user_nickname}</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
{/if}

{#if video}
    <div class="media-info">
        <div class="param">
            width: <span class="data-time">{video.width}</span>
            height: <span class="data-time">{video.height}</span>
            fps: <span class="data-time">{video.fps}</span>
            bit: <span class="data-time">10</span>
            duration: <span class="data-time">{video.duration}</span>
        </div>
    </div>
{/if}
<COMMENTS video_id="{video.id}"/>
<div class="banner_640">
    <h1>欢迎观看视频~</h1>
</div>

<h1>THANKS - 2026</h1>
<h2>Copyright 2026 - 乐可信息系统</h2>

<style>
    .video-detail {
        margin-top: 55px;
    }

    .banner_led {
        width: 100%;
        min-height: 480px;
        max-height: 1024px;
        text-align: center;
        background: var(--led-bg-color);
    }

    .banner_led video {
        max-width: 1280px;
        min-height: 480px;
        max-height: 640px;
    }

    .title {
        padding: 10px;
        border-bottom: solid 1px var(--line-q);
    }

    .video_info {
        margin: 10px;
        padding: 10px;
    }

    .video_info h4 {
        padding: 0 20px;
    }

    .video_info .info {
        padding: 20px;
        border-radius: 20px;
        background: var(--bg-gray);
    }

    .author {
        display: flex;
    }

    .author .nickname {
        margin: 10px;
        font-weight: bold;
    }

    .media-info {
        padding: 10px;
    }

    .banner_640 {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 240px;
        background: var(--led-bg-color);
        aspect-ratio: 2.5 / 1;
        text-align: center;
    }
</style>