<!-- lib/components/DanmakuArea.svelte -->
<script>
    import { onMount, onDestroy } from 'svelte';

    export let video;

    let danmakuContainer;
    let danmakuList = [];

    // 模拟弹幕数据
    function initializeDanmaku() {
        // 这里应该从服务器获取弹幕
        danmakuList = [
            { id: 1, content: '这个视频真好看！', time: 5, color: '#ffffff' },
            { id: 2, content: '点赞了！', time: 10, color: '#ffeb3b' },
            { id: 3, content: '背景音乐不错', time: 15, color: '#69c0ff' },
            // 更多弹幕...
        ];
    }

    onMount(() => {
        initializeDanmaku();
    });
</script>

<div class="danmaku-container" bind:this={danmakuContainer}>
    {#each danmakuList as danmaku}
        <div
                class="danmaku-item"
                style="color: {danmaku.color};"
                data-time={danmaku.time}
        >
            {danmaku.content}
        </div>
    {/each}
</div>

<style>
    .danmaku-container {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .danmaku-item {
        position: absolute;
        white-space: nowrap;
        font-size: 18px;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
        animation: danmakuMove 10s linear forwards;
    }

    @keyframes danmakuMove {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(-100%);
        }
    }
</style>