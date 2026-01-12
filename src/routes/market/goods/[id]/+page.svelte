<script lang="ts">
    import {onMount, tick} from 'svelte';

    export let data;

    let previewState: {
        current: { src: string; videoUrl?: string; type: number }; // 当前项详情
        allList: Array<{ src: string; videoUrl?: string; type: number }>; // 混合媒体池
        index: number;
        tx: number; ty: number;
        sx: number; sy: number;
        isOpening: boolean;
    } | null = null;

    // 获取所有参与预览的 DOM（包括图片和视频封面）
    function getAllMediaElements() {
        return Array.from(document.querySelectorAll('.thumb-item, .comment-media-item')) as HTMLElement[];
    }

    async function openPreview(e: MouseEvent, item: any, type: number) {
        const target = e.currentTarget as HTMLElement;
        if (!target) return;

        // 1. 构造全局媒体池
        const allMediaElements = getAllMediaElements();
        const allList = allMediaElements.map(el => ({
            src: el.getAttribute('data-src') || '',
            videoUrl: el.getAttribute('data-video') || '',
            type: parseInt(el.getAttribute('data-type') || '1')
        }));

        // 2. 确定当前索引
        const currentSrc = type === 2 ? item.video_thumb : (typeof item === 'string' ? item : item.thumb);
        const currentIndex = allList.findIndex(i => i.src === currentSrc);

        // 3. 计算位置
        const rect = target.getBoundingClientRect();
        const winW = window.innerWidth;
        const winH = window.innerHeight;

        const tx = (rect.left + rect.width / 2) - winW / 2;
        const ty = (rect.top + rect.height / 2) - winH / 2;
        const sx = rect.width / (winW * 0.9);
        const sy = rect.height / (winH * 0.8);

        previewState = {
            current: allList[currentIndex],
            allList,
            index: currentIndex !== -1 ? currentIndex : 0,
            tx, ty, sx, sy,
            isOpening: false
        };

        await tick();
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (previewState) previewState.isOpening = true;
            });
        });
    }

    function switchImg(e: MouseEvent | null, step: -1 | 1) {
        if (e) e.stopPropagation();
        if (!previewState) return;

        const nextIndex = (previewState.index + step + previewState.allList.length) % previewState.allList.length;
        previewState.index = nextIndex;
        previewState.current = previewState.allList[nextIndex];
    }

    function closePreview() {
        if (!previewState) return;

        // 关闭时重新定位到缩略图当前位置（处理滚动后的情况）
        const allElements = getAllMediaElements();
        const targetEl = allElements[previewState.index];
        if (targetEl) {
            const rect = targetEl.getBoundingClientRect();
            const winW = window.innerWidth;
            const winH = window.innerHeight;
            previewState.tx = (rect.left + rect.width / 2) - winW / 2;
            previewState.ty = (rect.top + rect.height / 2) - winH / 2;
            previewState.sx = rect.width / (winW * 0.9);
            previewState.sy = rect.height / (winH * 0.8);
        }

        previewState.isOpening = false;
        setTimeout(() => {
            previewState = null;
        }, 350);
    }

    onMount(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!previewState) return;
            if (e.key === 'ArrowLeft') switchImg(null, -1);
            if (e.key === 'ArrowRight') switchImg(null, 1);
            if (e.key === 'Escape') closePreview();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    });
</script>

<div class="product-container">
    {#if data.goodsInfo}
        <div class="product-detail">
            <div class="thumbs">
                {#each data.goodsInfo.thumbs_format as thumb}
                    <img src={thumb} class="thumb-item" data-src={thumb} data-type="1"
                         on:click={(e) => openPreview(e, thumb, 1)} alt=""/>
                {/each}
            </div>

            <div class="comment-list">
                {#each data.commentLists as comment}
                    <div class="comment-item">
                        <div class="comment-header">
                            <img src={comment.avatar} class="user-avatar" alt=""/>
                            <span class="nickname">{comment.user_nickname}</span>
                        </div>
                        <div class="comment-content">
                            <p>{comment.content}</p>
                            <div class="comment-media-grid">
                                {#if comment.media_type === 2}
                                    <div class="comment-media-item video-box"
                                         data-src={comment.video_thumb}
                                         data-video={comment.video_url}
                                         data-type="2"
                                         on:click={(e) => openPreview(e, comment, 2)}>
                                        <img src={comment.video_thumb} alt=""/>
                                        <div class="play-icon"></div>
                                    </div>
                                {/if}
                                {#each (comment.thumb_format || []) as img}
                                    <img src={img} class="comment-media-item" data-src={img} data-type="1"
                                         on:click={(e) => openPreview(e, img, 1)} alt=""/>
                                {/each}
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>

{#if previewState}
    <div class="preview-mask" class:mask-active={previewState.isOpening} on:click={closePreview}>
        <button class="close-btn" on:click={closePreview}>&times;</button>

        <div class="nav-container">
            <button class="nav-btn" on:click={(e) => switchImg(e, -1)}>‹</button>

            <div class="media-wrapper"
                 class:preview-active={previewState.isOpening}
                 style="--tx: {previewState.tx}px; --ty: {previewState.ty}px; --sx: {previewState.sx}; --sy: {previewState.sy};">

                {#key previewState.current.src}
                    {#if previewState.current.type === 2}
                        <video src={previewState.current.videoUrl}
                               poster={previewState.current.src}
                               controls
                               autoplay
                               class="full-media"
                               on:click|stopPropagation></video>
                    {:else}
                        <img src={previewState.current.src} class="full-media" on:click|stopPropagation alt=""/>
                    {/if}
                {/key}
            </div>

            <button class="nav-btn" on:click={(e) => switchImg(e, 1)}>›</button>
        </div>

        <div class="preview-info" style="opacity: {previewState.isOpening ? 1 : 0}">
            <span class="count">{previewState.index + 1} / {previewState.allList.length}</span>
        </div>
    </div>
{/if}

<style>
    /* 列表基础样式 */
    .product-container {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
    }

    .thumb-item {
        width: 100px;
        height: 100px;
        object-fit: cover;
        margin: 5px;
        cursor: zoom-in;
        border-radius: 8px;
    }

    .user-avatar {
        width: 44px;
        height: 44px;
        border-radius: 10%;
        object-fit: cover;
    }

    .comment-item {
        border-bottom: 1px solid #eee;
        padding: 20px 0;
    }

    .comment-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 10px;
    }

    .comment-content p {
        margin: 0 0 12px 56px;
    }

    .comment-media-grid {
        display: flex;
        gap: 10px;
        margin-left: 56px;
        flex-wrap: wrap;
    }

    /* 缩略图项 */
    .comment-media-item {
        width: 84px;
        height: 84px;
        object-fit: cover;
        cursor: zoom-in;
        border-radius: 4px;
        position: relative;
    }

    /* 视频缩略图特有样式 */
    .video-box {
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .video-box img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.8;
    }

    .play-icon {
        position: absolute;
        width: 30px;
        height: 30px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        clip-path: polygon(35% 25%, 35% 75%, 80% 50%);
    }

    /* 预览层 - iOS 物理连续性 */
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

    /* 动画核心容器 */
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