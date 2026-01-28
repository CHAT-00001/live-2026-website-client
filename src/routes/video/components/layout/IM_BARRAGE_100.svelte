<!-- IM_BARRAGE_100 - IM弹幕聊天 -->

<script lang="ts">
    import {messageBarrage} from "$lib/data/im/message_barrage.ts";

    // 使用模拟数据
    let barrage_message = messageBarrage;

    // speed 滚动速度 20秒经过屏幕
    let speed
</script>

<!-- IM 弹幕聊天显示 -->
<div class="barrage_display">
    <div class="barrage channel_01">
        <div class="marquee"><h3>是人我吃...</h3></div>
    </div>
    <div class="barrage channel_02">
        <div class="marquee"><h3>来打我啊，傻子...</h3></div>
    </div>
</div>

<style>
    /* 1. 容器需要溢出隐藏 */
    .marquee {
        padding: 5px;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        border: 1px solid rgba(78, 255, 198, 0);
    / ! * 方便你观察范围 * ! * /
    }

    /* 2. 修改选择器为 h3，并确保它是行内块 */
    .marquee h3 {
        display: inline-block;
        animation: music-scroll 20s linear infinite;
        margin: 0; /* 清除标题默认边距 */
    }

    /* 3. 悬停暂停 */
    .marquee:hover h3 {
        animation-play-state: paused;
    }

    /* 4. 优化动画路径：从容器右侧边缘开始，移动到文字完全消失在左侧 */
    @keyframes music-scroll {
        from {
            transform: translateX(100vw); /* 从屏幕/容器最右侧开始 */
        }
        to {
            transform: translateX(-100%); /* 移动到自身完全消失在左侧 */
        }
    }
</style>