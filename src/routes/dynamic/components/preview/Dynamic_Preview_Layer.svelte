<!-- src/routes/dynamic/components/Dynamic_Preview_Layer.svelte -->
<!--动态 - 预览 - 组件布局-->
<script lang="ts">
    import {fade} from 'svelte/transition';
    import {createEventDispatcher} from 'svelte';

    // 子组件
    import ImagePreview from './ImagePreview.svelte';
    import VideoPlay from './Video_Play.svelte';
    import AudioPlay from './Audio_Play.svelte';
    import Left_Mini_LIST from "./Left_Mini_LIST.svelte";

    export let open = false;
    export let list = []; // 动态列表
    export let currentDynamicIndex = 0;

    let currentDynamic = list[currentDynamicIndex];
    let currentMediaIndex = 0;

    const dispatch = createEventDispatcher();

    // 切换动态
    function selectDynamic(index: number) {
        currentDynamicIndex = index;
        currentDynamic = list[currentDynamicIndex];
        currentMediaIndex = 0;
    }

    // 切换动态内部多图
    function selectMedia(index: number) {
        currentMediaIndex = index;
    }

    $: currentDynamic = list[currentDynamicIndex];
</script>

{#if open}
    <div class="preview-layer" in:fade={{ duration: 400 }} out:fade={{ duration: 300 }}>

        <!-- 左边动态列表 -->
        <div class="left-sidebar">
            <Left_Mini_LIST {list}/>
        </div>

        <!-- 中间主内容 -->
        <div class="main-content">
            {#if currentDynamic.type === 1}
                <ImagePreview {currentDynamic} index={currentMediaIndex}/>
            {:else if currentDynamic.type === 2}
                <VideoPlay src={currentDynamic.href}/>
            {:else if currentDynamic.type === 3}
                <AudioPlay src={currentDynamic.href}/>
            {:else}
                <div class="text-preview">{currentDynamic.content}</div>
            {/if}

            <!-- 底部缩略图（多图） -->
            {#if currentDynamic.type === 1 && currentDynamic.thumbs.length > 1}
                <div class="bottom-thumbs">
                    {#each currentDynamic.thumbs as thumb, i}
                        <img
                                class:selected={i === currentMediaIndex}
                                src={thumb}
                                on:click={() => selectMedia(i)}
                        />
                    {/each}
                </div>
            {/if}
        </div>

        <!-- 右边评论列表 -->
        <div class="right-sidebar">
            {#each currentDynamic.commentsList || [] as c}
                <div class="comment">
                    <b>{c.user}</b>: {c.content}
                </div>
            {/each}
        </div>

        <!-- 点击遮罩关闭 -->
        <div class="mask" on:click={() => dispatch('close')}></div>
    </div>
{/if}

<style>
    .preview-layer {
        position: fixed;
        inset: 0;
        display: flex;
        background: rgba(0, 0, 0, 0.8);
        z-index: 999;
        color: #fff;
    }

    .left-sidebar {
        width: 200px;
        overflow-y: auto;
        background: #111;
    }

    .left-sidebar div {
        display: flex;
        flex-direction: column;
        margin: 8px;
        cursor: pointer;
        padding: 4px;
        border-radius: 6px;
        transition: background 200ms;
    }

    .left-sidebar div.selected {
        border-left: 3px solid #1677ff;
        background: rgba(22, 119, 255, 0.1);
    }

    .left-sidebar img {
        width: 100%;
        border-radius: 4px;
    }

    .left-sidebar .title {
        font-size: 12px;
        margin-top: 4px;
    }

    .main-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        padding: 16px;
    }

    .text-preview {
        font-size: 20px;
        text-align: center;
        padding: 20px;
    }

    .bottom-thumbs {
        display: flex;
        overflow-x: auto;
        margin-top: 12px;
    }

    .bottom-thumbs img {
        width: 80px;
        margin-right: 6px;
        cursor: pointer;
        border-radius: 4px;
        border: 2px solid transparent;
        transition: border 200ms;
    }

    .bottom-thumbs img.selected {
        border-color: #1677ff;
    }

    .right-sidebar {
        width: 400px;
        overflow-y: auto;
        background: #111;
        padding: 8px;
    }

    .right-sidebar .comment {
        margin-bottom: 8px;
        font-size: 14px;
    }

    .mask {
        position: fixed;
        inset: 0;
        cursor: pointer;
    }
</style>
