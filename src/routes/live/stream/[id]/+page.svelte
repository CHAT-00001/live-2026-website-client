<!-- src/routes/live/stream/[id]/+page.svelte -->

<script lang="ts">
    import {onMount} from 'svelte';
    import LIVE_CHAT from "../../components/LIVE_CHAT.svelte";

    export let data;

    // server 层已经处理过 info[0]
    const live = data?.data;

    // log
    console.log("live", live.pull);
    const error = data?.error;

    let videoEl: HTMLVideoElement;

    onMount(() => {
        if (videoEl) {
            videoEl.volume = 0.1;
        }
    });
</script>

<svelte:head>
    {#if live}
        <title>{live.title} - {live.user_nickname}的直播间 - [{live.uid}] - 实况直播</title>
    {/if}
</svelte:head>

{#if error}
    <div class="room">
        <h2 style="color:red">{error}</h2>
    </div>

{:else if !live}
    <div class="room">
        <h2>Loading live room...</h2>
    </div>

{:else}
    <div class="room">
        <div class="line_60"></div>

        <!-- 标题 -->
        <h3>{live.title} - {live.user_nickname} 的直播间</h3>

        <!-- 城市 / 基础信息 -->
        <div class="at">
            <h1>城市: {live.city}</h1>
            <h3 class="at_line">Stream: {live.stream}</h3>
        </div>

        <!-- 主播信息 -->
        <div class="author_info">
            <a href={`/u/${live.uid}`}><img src={live.avatar} width="48" alt="avatar"/></a>
            <a href={`/u/${live.uid}`}><span>{live.user_nickname}</span></a>
            <span>level: {live.level}</span>
        </div>

        <!-- 在线人数 -->
        <div class="online_visitors">
            <span class="quantity">在线观众人数: {live.nums}</span>
        </div>

        <!-- LED Display -->
        <div class="led_display">
            <div class="channels">
                <label class="btn">频道 1</label>
                <label class="btn">频道 2</label>
                <label class="btn">频道 3</label>
                <label class="btn">频道 4</label>
            </div>

            <div class="display">
                <video
                        bind:this={videoEl}
                        controls
                        autoplay=1
                        loop
                        muted={false}
                        src={live.pull}
                        poster={live.thumb}
                />
            </div>

            <!-- BARRAGE -->
            <div class="barrage">
                弹幕滚动区
            </div>
        </div>

        <!-- CHAT -->
        <div class="chat_bar">
            <LIVE_CHAT/>
        </div>

        <!-- GIFT -->
        <div class="git_display">
            礼物动画播放区...
        </div>

        <div class="line_100"></div>
    </div>
{/if}

<style>
    .room {
        margin-top: 55px;
    }

    .at_line {
        color: #4ef1c6;
    }
    .led_display {

    }

    .led_display .channels {
        display: flex;
    }

    .display {
        position: relative;
        max-height: 720px;
        background: #000000;
        text-align: center;
    }

    .led_display video {
        margin: 0 auto;
        max-width: 1280px;
        max-height: 720px;
    }
</style>
