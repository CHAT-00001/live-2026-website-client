<script lang="ts">
    import {createEventDispatcher, onMount, tick} from 'svelte'; // 1. 增量：引入派发器
    import {browser} from '$app/environment';

    export let videoList: any[] = [];
    const dispatch = createEventDispatcher(); // 2. 增量：初始化派发器

    let operator_id = 1001;
    let activeIndex = 0;
    let swiperEl: any;
    let isReady = false;
    let videoEls: HTMLVideoElement[] = [];

    // 3. 增量：加载控制逻辑
    let isLoading = false;
    const PAGE_SIZE = 20;

    // 4. 增量：监听列表更新，一旦视频列表变长，说明新页已载入，解锁
    $: if (videoList.length) {
        isLoading = false;
    }

    onMount(async () => {
        if (browser) {
            const {register} = await import('swiper/element/bundle');
            register();

            const swiperParams = {
                direction: 'vertical',
                mousewheel: true,
                keyboard: {
                    enabled: true,
                },
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

                    // 5. 增量：核心预加载逻辑
                    // 只要当前索引是 20 的倍数（如 0, 20, 40...），就去要下一页
                    if (activeIndex % PAGE_SIZE === 0 && !isLoading) {
                        isLoading = true;
                        dispatch('loadMore');
                        console.log('触发下一页预缓存...');
                    }

                    // 自动播放逻辑保留
                    videoEls.forEach((v, idx) => {
                        if (v) {
                            if (idx === activeIndex) {
                                v.play().catch(() => {
                                });
                            } else {
                                v.pause();
                            }
                        }
                    });
                });
            }
        }
    });

    // togglePlay, getSafeItem 等其余函数全部保留，不做变动
    function togglePlay(i: number) {
        const v = videoEls[i];
        if (v) {
            if (v.paused) {
                v.play();
                rotating = true;
            } else {
                v.pause();
                rotating = false;
            }
        }
    }

    let rotating = true;

    function onPlay() {
        rotating = true;
    }

    function onPause() {
        rotating = false;
    }

    function getSafeItem(item: any) {
        return {
            id: item.id || 1,
            title: item.title || "视频标题NIKE 2026 T-shirt",
            thumbnail: item.thumbnail || "http://cdn1.damawei.com/4963a.jpeg?imageView2/1/w/200/h/200",
            video_url: item.video_url || item.href || "https://ferrari.scene7.com/is/content/ferrari/6628b794-2db2-4c91-9228-7cc0acc63687",
            description: item.description || "暂无描述",
            address: item.address || "广东省 - 深圳市",
            lat: item.lat || 20.164444,
            lng: item.lng || 108.1615411,
            time: item.time || "2026-01-09",
            likes: item.likes || 0,
            comments: item.comments || 0,
            collects: item.collects || 0,
            shares: item.shares || 0,
            user_info: item.user_info || {
                id: 999,
                nickname: item.user_nickname || "匿名用户",
                avatar_url: item.avatar || "http://cdn1.damawei.com/4752a.jpeg?imageView2/1/w/100/h/100",
                is_followed: 0,
                is_livestream: 1
            },
            music_info: item.music_info || {
                name: "xxx创作的原声",
                thumbnail: ""
            }
        };
    }
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
                            <h1>I-MESSAGE</h1>
                            <h3 style="flex: content">即时通讯</h3>
                        </div>

                        <div class="danmaku" style="pointer-events: none;">
                            <h2>Danmaku DEMO</h2>
                            <h2>看得我高兴坏了..</h2>
                        </div>

                        <div class="video_player" on:click={() => togglePlay(i)}>
                            {#if Math.abs(activeIndex - i) <= 1}
                                <video
                                        bind:this={videoEls[i]}
                                        src="{item.video_url}"
                                        loop
                                        autoplay={activeIndex === i}
                                        muted={activeIndex === i ? false : true}
                                        playsinline

                                        on:play={onPlay}
                                        on:pause={onPause}
                                        on:ended={onPause}
                                />
                            {/if}
                        </div>

                        <div class="info" style="pointer-events: none;">
                            <div class="by">
                                <h3 class="location">
                                    <a class="location" target="_blank" href="/location/16ab64e61ea0f17de"
                                       style="pointer-events: auto;">AT: {item.address}</a>
                                </h3>
                            </div>
                            <div class="at">
                                <h2>@{item.user_info.nickname}</h2>
                                <div class="wrapper">
                                    <div class="item">
                                        <div class="avatar">
                                            <img class="avatar_48_r50p" src="{item.user_info.avatar_url}" alt=""/>
                                        </div>
                                        <div class="name"><h4>Title: {item.title}</h4></div>
                                        <div class="address">At:{item.address}</div>
                                        <div class="desc">Desc:{item.description}</div>
                                        <div class="geo">{item.lat},{item.lng}</div>
                                        <div class="time">{item.time}</div>
                                        <div class="music">
                                            <div class="music-marquee">
                                                <span>{item.music_info.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="right_bar">
                            <div class="item">
                                {#if item.user_info.is_livestream}
                                    <a class="live_tag" target="_blank" href="/live/stream/{item.user_info.id}">LIVE</a>
                                {/if}
                                <div class="avatar">
                                    <img class="avatar_48_r50p" src="{item.user_info.avatar_url}" alt=""/>
                                    {#if !item.user_info.is_followed && operator_id !== item.user_info.id}
                                        <a class="add">+</a>
                                    {/if}
                                </div>
                                <div class="like">
                                    <i>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 100" width="40"
                                             height="40">
                                            <path fill="white"
                                                  d="M45,88.7 C49.3,30.6 56,0 63.4,0 C77.4,0 89,121.5 89,266.1 C89,266.1 89,266.1 89,266.1 L45,88.7 Z"
                                                  opacity="0.8"/>
                                            <path fill="#fe2c55"
                                                  d="M45,88.71199798583984 C49.377398681640625,30.663999557495117 56.06599731445312,0 63.42509765625,0 C77.44030151367188,0 89.09719848632812,121.58999633789062 89.09719848632812,266.1369934082031 C89.09719848632812,266.1549987792969 89.09719848632812,266.1730041503906 89.09719848632812,266.1910095214844 L45,816 L1,266.13 Z"/>
                                        </svg>
                                    </i>
                                    <h4>{item.likes}</h4>
                                </div>
                                <div class="comment">
                                    <i>
                                        <svg viewBox="0 0 100 100" width="40" height="40">
                                            <path fill="white"
                                                  d="M-5.79,5.98 C-3.56,3.75 -2.25,1.42 -2.25,-1.29 C-2.25,-6.79 -7.29,-11.25 -13.5,-11.25 C-19.71,-11.25 -24.75,-6.79 -24.75,-1.29 C-24.75,4.21 -19.55,7.99 -13.34,7.99"
                                                  transform="matrix(3,0,0,3,76,52)"/>
                                        </svg>
                                    </i>
                                    <h4>{item.comments}</h4>
                                </div>
                                <div class="collect" id="2">
                                    <i>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                                             viewBox="0 0 100 100">
                                            <path fill="white"
                                                  d="M50,10 L61,35 L88,35 L66,52 L74,77 L50,62 L26,77 L34,52 L12,35 L39,35 Z"/>
                                        </svg>
                                    </i>
                                    <h4>{item.collects}</h4>
                                </div>
                                <div class="share" id="3">
                                    <i>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                                             viewBox="0 0 80 100">
                                            <path fill="white"
                                                  d="M10,50 L40,10 L40,30 C70,30 75,70 60,90 C70,60 55,55 40,55 L40,75 Z"/>
                                        </svg>
                                    </i>
                                    <h4>{item.shares}</h4>
                                </div>
                                <div class="music" id="4">
                                    <a href="/music/{item.music_info.id}">
                                        <img class="avatar_48_r50p music-rotate {rotating ? 'on' : ''}"
                                             src="{item.music_info.thumbnail}" alt=""/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            {/each}
        </swiper-container>
    {:else}
        <div class="loading-state">LOADING VIDEOS...</div>
    {/if}
</div>

<style>
    :global(body, html) {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background: #000;
        overflow: hidden;
    }

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

    .barrage {
        top: 0;
        left: 0;
        padding: 20px;
    }

    .danmaku {
        top: 100px;
        left: 0;
        padding: 20px;
    }

    .info {
        padding: 10px;
        bottom: 60px;
        left: 0;
    }

    .info .location {
        color: #39cd55;
    }

    .right_bar {
        position: absolute;
        right: 10px;
        bottom: 100px;
        z-index: 20; /* 确保在最上层 */
        color: white;
        text-align: center;
    }

    .right_bar .avatar {
        position: relative;
    }

    /* 添加关注按钮 */
    .right_bar .add {
        display: block;
        position: absolute;
        left: 15px;
        bottom: -5px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        z-index: 10;
        color: #ffffff;
        background: #f00;
        align-content: center;
    }

    .avatar_48_r50p {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 2px solid #fff;
    }

    .music-rotate {
        animation: rotate 3s linear infinite;
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