<!-- src/routes/live/stream/[id]/+page.svelte -->
<!-- live room page -->
<script lang="ts">
    import {onMount} from 'svelte';
    import LIVE_CHAT from "../../components/LIVE_CHAT.svelte";

    let videoEl: HTMLVideoElement;

    onMount(() => {
        if (videoEl) {
            videoEl.volume = 0.1; // 设置音量为 10%
        }
    });

</script>

<div class="room">
    <div class="line_60"></div>
    <h3>Title - [RoomId: 0ade15ef02fac01641_1000001841] - xxx 的直播间</h3>
    <div class="at">
        <h1>工作区: 180015408411</h1>
        <h3 class="at_line">Line: LA18</h3>
    </div>
    <div class="author_info">
        <img src="http://cdn1.damawei.com/1000004040_IOS_20250501170133_cerFace.png?imageView2/2/w/200/h/200"
             width="48"/>
        <a href="/u/1000004851"><span>怡宝2026</span></a>
        <span>lever: 10</span>
        <span>ticket: 150000</span>
    </div>
    <div class="online_visitors">
        <span class="quantity">在线观众人数:0</span>
        <span class="visitors_list">
            <div class="visitors_users">
                <div class="item">
                    <img src="http://cdn1.damawei.com/1000004040_IOS_20250501170133_cerFace.png?imageView2/2/w/200/h/200"/>
                    <i class="icon"></i>
                </div>
            </div>
        </span>
    </div>
    <!-- LED Display-->
    <div class="led_display">
        <div class="channels">
            <label>频道 1</label>
            <label>频道 2</label>
            <label>频道 3</label>
            <label>频道 4</label>
        </div>
        <div class="display">
            <video
                    bind:this={videoEl}
                    controls
                    loop
                    muted={false}
                    src="http://cdn1.damawei.com/4963a.mp4"
                    width="240"
            />
        </div>
        <!-- BARRAGE - 弹幕区 -->
        <div class="barrage">
            弹幕滚动区
        </div>
    </div>
    <!-- CHAT Bar-->
    <div class="chat_bar">
        <LIVE_CHAT/>
    </div>
    <!-- GIT - Display -->
    <div class="git_display">
        礼物动画播放区...
    </div>
    <div class="line_100"></div>

</div>

<style>
    .room {
        margin-top: 55px;
    }

    .at_line {
        color: #4ef1c6
    }

    .led_display {
        position: relative;
        height: 440px;
        background: #000000;
    }
</style>