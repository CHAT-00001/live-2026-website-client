<!-- src/routes/video/components/layout/FULL_SCREEN_PLAYER.svelte-->

<!-- version: 2026/01/16 01  -->
<script lang="ts">
    import {onMount, tick} from 'svelte';
    import {browser} from '$app/environment';
    import IM_BARRAGE_100 from "./IM_BARRAGE_100.svelte";
    import CT_DANMAKU_100 from "./CT_DANMAKU_100.svelte";
    import PLAYER_RIGHT_BAR from "./PLAYER_RIGHT_BAR.svelte";

    interface Props {
        videoList: any[];
        operator_id?: number;
        onLoadMore?: () => void;
    }

    let {
        videoList = [],
        operator_id = 1001,
        onLoadMore
    }: Props = $props();

    let activeIndex = $state(0);
    let isReady = $state(false);
    let isLoading = $state(false);
    let rotating = $state(true);

    let swiperEl: any = $state();
    let videoEls: HTMLVideoElement[] = $state([]);

    const PAGE_SIZE = 20;
    const PRELOAD_OFFSET = 3; // 剩 3 条触发加载
    const MEMORY_WINDOW = 10;

    onMount(async () => {
        if (browser) {
            const {register} = await import('swiper/element/bundle');
            register();

            const swiperParams = {
                direction: 'vertical',
                mousewheel: true,
                keyboard: {enabled: true},
                slidesPerView: 1,
            };

            isReady = true;
            await tick();

            if (swiperEl) {
                Object.assign(swiperEl, swiperParams);
                swiperEl.initialize();

                swiperEl.addEventListener('swiperslidechange', (e: any) => {
                    const swiper = e.detail[0];
                    activeIndex = swiper.activeIndex;

                    // ---------- 无限加载（稳定版） ----------
                    if (activeIndex >= videoList.length - PRELOAD_OFFSET && !isLoading) {
                        isLoading = true;
                        console.info(
                            `[Component] trigger loadMore at index=${activeIndex}, total=${videoList.length}`
                        );
                        onLoadMore?.();
                    }

                    // ---------- 视频播放控制 ----------
                    videoEls.forEach((v, idx) => {
                        if (!v) return;
                        if (idx === activeIndex) v.play().catch(() => {
                        });
                        else v.pause();
                    });

                    // ---------- 内存释放 ----------
                    videoEls.forEach((v, idx) => {
                        if (!v) return;
                        const distance = Math.abs(idx - activeIndex);

                        if (distance > MEMORY_WINDOW) {
                            if (v.dataset.released === '1') return;
                            v.pause();
                            v.removeAttribute('src');
                            v.load();
                            v.dataset.released = '1';
                        } else if (v.dataset.released === '1') {
                            v.src = v.dataset.src!;
                            v.dataset.released = '0';
                        }
                    });
                });
            }
        }
    });

    // ---------- 播放/暂停控制函数 ----------
    function togglePlay(i: number) {
        const v = videoEls[i];
        if (v) {
            if (v.paused) {
                v.play().catch(() => {
                });
                rotating = true;
            } else {
                v.pause();
                rotating = false;
            }
        }
    }

    function onPlay() {
        rotating = true;
    }

    function onPause() {
        rotating = false;
    }

    // ---------- 数据兜底 ----------
    function getSafeItem(item: any) {
        return {
            id: item.id || 1,
            uid: item.uid || 1,
            title: item.title || "视频标题NIKE 2026 T-shirt",
            thumbnail: item.thumbnail || "http://cdn1.damawei.com/4963a.jpeg?imageView2/1/w/200/h/200",
            video_url: item.video_url || item.href || "https://ferrari.scene7.com/is/content/ferrari/6628b794-2db2-4c91-9228-7cc0acc63687",
            description: item.description || "暂无描述",
            address: item.address || "广东省 - 深圳市",
            lat: item.lat || 0,
            lng: item.lng || 0,
            time: item.time || "2026-01-09",
            likes: item.likes || 0,
            comments: item.comments || 0,
            collects: item.collects || 0,
            shares: item.shares || 0,
            user_info: item.user_info || {
                id: 1000008374,
                nickname: item.user_nickname || "匿名用户",
                avatar_url: item.avatar || "http://cdn1.damawei.com/4752a.jpeg?imageView2/1/w/100/h/100",
                is_followed: 0,
                is_livestream: 1
            },
            music_info: item.music_info || {
                name: "哈基米南北 - 创作的原声",
                thumbnail: ""
            }
        };
    }

    // ---------- 自动解锁 loading ----------
    $effect(() => {
        if (isLoading) {
            // 只要 videoList 发生变化就解锁
            isLoading = false;
            console.info(`[Component] load done, total videos=${videoList.length}`);
        }
    });
</script>


<div class="full_screen_player">
    {#if isReady && videoList.length > 0}
        <swiper-container
                bind:this={swiperEl}
                init="false"
                class="full-swiper"
        >
            {#each videoList as rawItem, i}
                {@const item = getSafeItem(rawItem)}
                <swiper-slide>
                    <div class="slide-wrapper">
                        <div class="barrage" style="pointer-events: none;">
                            <IM_BARRAGE_100/><!-- IM弹幕聊天 -->
                        </div>

                        <div class="danmaku" style="pointer-events: none;">
                            <CT_DANMAKU_100/><!-- 弹幕评论 -->
                        </div>

                        <div class="video_player">
                            {#if Math.abs(activeIndex - i) <= 1}
                                <video on:click={() => togglePlay(i)}
                                       bind:this={videoEls[i]}
                                       src="{item.video_url}"
                                       loop
                                       autoplay={activeIndex === i}
                                       muted={activeIndex === i ? false : true}
                                       playsinline
                                       controls
                                       on:play={onPlay}
                                       on:pause={onPause}
                                       on:ended={onPause}
                                />
                            {/if}
                        </div>

                        <!-- 视频信息 -->
                        <div class="info">
                            <div class="by">
                                <h5 class="bi-at">
                                    <a class="location" target="_blank" href="/location/16ab64e61ea0f17de"
                                       style="pointer-events: auto;">at: {item.address} - 14.5km</a>
                                </h5>
                            </div>
                            <div class="at">
                                <h3><a class="live_tag" target="_blank"
                                       href="/u/{item.user_info.id}">@{item.user_info.nickname}</a></h3>
                                <div class="wrapper">
                                    <div class="item">
                                        <div class="avatar">
                                            <a target="_blank" href="/u/{item.uid}"><img class="avatar_48_r50p"
                                                                                         src="{item.user_info.avatar_url}"
                                                                                         alt="{item.user_info.nickname}"/></a>
                                        </div>
                                        <div class="name"><h4>* {item.title}</h4></div>
                                        <div class="desc">- {item.description}</div>
                                        <div class="geo">p {item.lat},{item.lng}</div>
                                        <div class="time">{item.time}</div>
                                        <div class="music">
                                            <div class="music-marquee">
                                                <span><h4>{item.music_info.name}</h4></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 右侧操作栏 仿抖音 -->
                        <PLAYER_RIGHT_BAR
                                {item}
                                {operator_id}
                                isRotating={activeIndex === i && rotating}
                        />
                    </div>
                </swiper-slide>
            {/each}
        </swiper-container>
    {:else}
        <div class="loading-state">LOADING VIDEOS...</div>
    {/if}
</div>

<style>
    .full_screen_player {
        width: 100vw;
        height: 100vh;
        background: #000;
    }

    swiper-container {
        width: 100%;
        height: 100%;
        display: block;
    }

    swiper-slide {
        width: 100%;
        height: 100%;
    }

    .slide-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .video_player {
        width: 100%;
        height: 100%;
        z-index: 1;
        background: #000;
        cursor: pointer;
    }

    video {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .barrage, .danmaku, .info {
        position: absolute;
        color: white;
        z-index: 10;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
    }

    /* IM-聊天室弹幕 */
    .barrage {
        top: 60px;
        left: 0;
        width: 100%;
        height: 100px;
        padding: 0;
    }

    /* 弹幕评论 */
    .danmaku {
        top: 160px;
        left: 0;
        width: 100%;
        height: 100px;
        padding: 0;
    }

    /* 视频信息 */
    .info {
        /*pointer-events: none;*/
        position: absolute;
        padding: 10px;
        bottom: 60px;
        left: 0;
        z-index: 50;
        max-width: 70%;
    }

    .info .location {
        color: #ffffff;
        display: inline;
        padding: 0 5px;
        background: rgba(0, 0, 0, 0.5);
    }

    .info .name {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
    }

    .info .at .wrapper {
        padding: 0;
    }

    .info .time {
        color: #00ff00;
        font-size: 12px;
    }

    /* 背景音乐名称 滚动 */
    .music-marquee {
        width: 180px;
        overflow: hidden;
        white-space: nowrap;
    }

    .music-marquee span {
        display: inline-block;
        padding-left: 100%;
        animation: music-scroll 10s linear infinite;
    }

    .music-marquee:hover span {
        animation-play-state: paused;
    }

    @keyframes music-scroll {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(-100%);
        }
    }

    .avatar_48_r50p {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 2px solid #fff;
    }

    /* 音乐专辑封面滚动 */
    .music-rotate {
        animation: rotate 4s linear infinite;
        animation-play-state: paused;
    }

    .music-rotate.on {
        animation-play-state: running;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .loading-state {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
    }
</style>