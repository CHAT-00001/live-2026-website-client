<!-- src/lib/ui/kit/PreviewDisplay.svelte -->

<script lang="ts">
    import {createEventDispatcher, onMount, tick} from 'svelte';

    const dispatch = createEventDispatcher();

    // --- Props ---
    export let allList: Array<{ src: string; videoUrl?: string; type: number }> = [];
    export let currentIndex: number = 0;
    export let originElement: HTMLElement | null = null; // 用于计算初始位置的 DOM

    // --- Internal State ---
    let isOpening = false;
    let tx = 0, ty = 0, sx = 1, sy = 1;

    // 当 currentIndex 改变时，更新当前显示项
    $: current = allList[currentIndex];

    function calculatePosition() {
        if (!originElement) return;
        const rect = originElement.getBoundingClientRect();
        const winW = window.innerWidth;
        const winH = window.innerHeight;

        tx = (rect.left + rect.width / 2) - winW / 2;
        ty = (rect.top + rect.height / 2) - winH / 2;
        sx = rect.width / (winW * 0.9);
        sy = rect.height / (winH * 0.8);
    }

    onMount(async () => {
        calculatePosition();
        await tick();
        // 触发开场动画
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                isOpening = true;
            });
        });

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') switchImg(-1);
            if (e.key === 'ArrowRight') switchImg(1);
            if (e.key === 'Escape') close();
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    });

    function switchImg(step: -1 | 1) {
        const nextIndex = (currentIndex + step + allList.length) % allList.length;
        // 通知父组件索引变化，以便父组件同步更新 originElement（实现连续缩放）
        dispatch('change', {index: nextIndex});
    }

    function close() {
        // 重新计算当前索引对应的位置，确保缩回去的位置是准确的
        calculatePosition();
        isOpening = false;
        setTimeout(() => {
            dispatch('close');
        }, 350);
    }
</script>

<div class="preview-mask" class:mask-active={isOpening} on:click={close}>
    <button class="close-btn" on:click={close}>&times;</button>

    <div class="nav-container">
        <button class="nav-btn" on:click|stopPropagation={() => switchImg(-1)}>‹</button>

        <div class="media-wrapper"
             class:preview-active={isOpening}
             style="--tx: {tx}px; --ty: {ty}px; --sx: {sx}; --sy: {sy};">

            {#key current.src}
                {#if current.type === 2}
                    <video src={current.videoUrl}
                           poster={current.src}
                           controls
                           autoplay
                           class="full-media"
                           on:click|stopPropagation></video>
                {:else}
                    <img src={current.src} class="full-media" on:click|stopPropagation alt=""/>
                {/if}
            {/key}
        </div>

        <button class="nav-btn" on:click|stopPropagation={() => switchImg(1)}>›</button>
    </div>

    <div class="preview-info" style="opacity: {isOpening ? 1 : 0}">
        <span class="count">{currentIndex + 1} / {allList.length}</span>
    </div>
</div>

<style>
    .preview-mask {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0);
        z-index: 2000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: background 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .mask-active {
        background: rgba(0, 0, 0, 0.98);
    }

    .nav-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .media-wrapper {
        width: 90vw;
        height: 80vh;
        transform: translate(var(--tx), var(--ty)) scale(var(--sx), var(--sy));
        transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1), border-radius 0.4s;
        border-radius: 8px;
        will-change: transform;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .preview-active {
        transform: translate(0, 0) scale(1);
        border-radius: 0;
    }

    .full-media {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    .close-btn {
        position: absolute;
        top: 40px;
        right: 40px;
        color: white;
        font-size: 44px;
        background: none;
        border: none;
        cursor: pointer;
        z-index: 2100;
    }

    .nav-btn {
        color: white;
        font-size: 80px;
        background: none;
        border: none;
        cursor: pointer;
        opacity: 0.3;
        transition: 0.2s;
        z-index: 2100;
        padding: 0 40px;
    }

    .nav-btn:hover {
        opacity: 1;
    }

    .preview-info {
        position: absolute;
        bottom: 60px;
        color: white;
    }

    .count {
        background: rgba(255, 255, 255, 0.15);
        padding: 6px 24px;
        border-radius: 24px;
    }
</style>