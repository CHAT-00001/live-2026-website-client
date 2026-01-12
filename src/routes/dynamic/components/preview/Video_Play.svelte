<!-- src/routes/dynamic/components/preview/VideoPlay.svelte -->
<!-- 沉浸式视频播放器 - 带时间线缩略图（适配 SvelteKit 5） -->
<script lang="ts">
    // 1. 定义组件 Props，明确类型和默认值
    export let videoUrl: string = ""; // 视频地址（规范命名：小驼峰）
    export let isVisible: boolean = true; // 组件可见性状态

    // 2. 获取视频 DOM 元素引用，用于控制播放状态
    let videoElement: HTMLVideoElement;
    // 3. 记录视频加载状态和错误信息
    let isLoading = true;
    let hasError = false;
    let errorMessage = "";

    // 4. 监听可见性变化，自动控制视频播放/终止
    $: {
        if (videoElement) {
            if (isVisible) {
                // 可见时尝试恢复播放（需用户交互后才能自动播放，浏览器限制）
                videoElement.play().catch(err => {
                    console.log("视频需用户交互后播放：", err);
                });
            } else {
                // 不可见时强制终止播放、重置进度
                videoElement.pause();
                videoElement.currentTime = 0; // 重置到视频开头
                isLoading = true; // 重置加载状态
            }
        }
    }

    // 5. 视频加载完成回调
    function handleLoadedData() {
        isLoading = false;
        hasError = false;
    }

    // 6. 视频加载错误处理
    function handleError(e: Event) {
        isLoading = false;
        hasError = true;
        errorMessage = "视频加载失败，请检查地址或网络";
        console.error("视频播放错误：", e);
    }

    // 7. 模拟生成视频时间线缩略图（示例逻辑，可根据实际接口扩展）
    function generateTimelineThumbs() {
        // 实际项目中可替换为接口请求，获取视频关键帧缩略图
        const thumbCount = 10; // 生成10个缩略图占位
        return Array.from({length: thumbCount}, (_, i) => ({
            id: i,
            time: `${Math.floor((videoElement?.duration || 0) * (i / thumbCount))}s`,
            src: `https://placeholder.pics/svg/60x40/EEEEEE/999999/帧${i + 1}` // 占位图
        }));
    }
</script>

<!-- 沉浸式视频容器 -->
<div aria-hidden={!isVisible} class="full-video-container">
    <!-- 视频播放区域 -->
    <div class="video-player-wrapper">
        <!-- 视频核心元素 -->
        <video
                bind:this={videoElement}
                class="immersive-video"
                controls
                on:error={handleError}
                on:loadeddata={handleLoadedData}
                poster="https://placeholder.pics/svg/1080x720/F5F5F5/666666/视频封面"
                preload="metadata"
        >
            <source src={videoUrl} type="video/mp4"/>
            您的浏览器不支持HTML5视频播放，请升级浏览器
        </video>

        <!-- 加载状态遮罩 -->
        {#if isLoading && !hasError}
            <div class="video-loading">
                <div class="loading-spinner"></div>
                <p>视频加载中...</p>
            </div>
        {/if}

        <!-- 错误提示 -->
        {#if hasError}
            <div class="video-error">
                <p>{errorMessage}</p>
                <button on:click={() => videoElement.load()}>重新加载</button>
            </div>
        {/if}
    </div>

    <!-- 视频时间线缩略图区域 -->
    <div class="player-time-line">
        <div class="timeline-header">
            <span class="timeline-title">视频进度</span>
            <span class="total-time">{videoElement?.duration ? `${Math.floor(videoElement.duration)}s` : '0s'}</span>
        </div>
        <div class="timeline-thumbs">
            {#each generateTimelineThumbs() as thumb (thumb.id)}
                <div
                        class="timeline-thumb"
                        on:click={() => videoElement.currentTime = Number(thumb.time.replace('s', ''))}
                >
                    <img src={thumb.src} alt={`视频帧 ${thumb.time}`}/>
                    <span class="thumb-time">{thumb.time}</span>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    /* 沉浸式视频容器：占满父容器，适配沉浸式浏览 */
    .full-video-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #000;
        overflow: hidden;
    }

    /* 视频播放器包装器：控制视频尺寸和加载/错误遮罩 */
    .video-player-wrapper {
        flex: 1;
        position: relative;
        width: 100%;
        height: calc(100% - 80px); /* 预留时间线区域高度 */
    }

    /* 沉浸式视频样式：适配容器，保持比例 */
    .immersive-video {
        width: 100%;
        height: 100%;
        object-fit: contain; /* 保持视频比例，不拉伸 */
        background-color: #000;
    }

    /* 加载状态遮罩 */
    .video-loading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.7);
        color: #fff;
        z-index: 10;
    }

    /* 加载动画 */
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s linear infinite;
        margin-bottom: 12px;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    /* 错误提示样式 */
    .video-error {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.7);
        color: #fff;
        z-index: 10;
        gap: 16px;
    }

    .video-error button {
        padding: 8px 16px;
        background-color: #1677ff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    /* 时间线缩略图区域样式 */
    .player-time-line {
        height: 80px;
        padding: 8px 16px;
        background-color: #1a1a1a;
        color: #fff;
    }

    .timeline-header {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        margin-bottom: 4px;
        color: #ccc;
    }

    .timeline-thumbs {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        height: 50px;
        padding-bottom: 4px;
    }

    .timeline-thumb {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
    }

    .timeline-thumb img {
        width: 60px;
        height: 40px;
        border-radius: 2px;
        object-fit: cover;
    }

    .timeline-thumb .thumb-time {
        font-size: 10px;
        color: #ccc;
        margin-top: 2px;
    }

    /* 隐藏滚动条但保留滚动功能 */
    .timeline-thumbs::-webkit-scrollbar {
        height: 0;
    }

    /* 响应式适配 */
    @media (max-width: 768px) {
        .player-time-line {
            height: 70px;
        }

        .timeline-thumb img {
            width: 50px;
            height: 35px;
        }
    }
</style>