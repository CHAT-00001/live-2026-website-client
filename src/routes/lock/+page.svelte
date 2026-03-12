<!-- src/routes/+page.svelte -->
<script lang="ts">
    import {onMount, onDestroy} from 'svelte';
    import {fade} from 'svelte/transition';
    import {parseLockToml, validatePin, type Notice} from '$lib/utils/lock.ts';
    import {goto} from '$app/navigation';

    let videoEl: HTMLVideoElement | null = null;
    const VIDEO_SRC = 'http://cdn1.damawei.com/1050.mp4'; // 将视频放到 static/video.mp4，或改成外部 URL

    // 视频重放计数（重复播放 10 次后停止）
    let playCount = 0;
    const MAX_REPEATS = 10;

    // 提示语言数据
    let notices: Notice[] = [];
    let currentIndex = 0;
    let cycleTimer: number | null = null;

    // 输入相关
    let pin = '';
    let inputEl: HTMLInputElement | null = null;
    let error = '';

    // 读取 toml 并解析
    async function loadNotices() {
        try {
            const res = await fetch('/data/label/lock.toml');
            if (!res.ok) throw new Error('failed to fetch lock.toml');
            const txt = await res.text();
            const parsed = parseLockToml(txt);
            if (parsed.length > 0) notices = parsed;
        } catch (e) {
            console.error('loadNotices error', e);
            // 兜底：如果读取失败，提供一个默认英文提示
            notices = [{lang: 'en', text: 'Enter password to unlock the information system'}];
        }
    }

    // 启动语言轮播：每个语言显示 (2s in, then transition) => 切换间隔定为 2200ms
    function startCycle() {
        stopCycle();
        if (notices.length <= 1) return;
        cycleTimer = setInterval(() => {
            currentIndex = (currentIndex + 1) % notices.length;
        }, 2200) as unknown as number;
    }

    function stopCycle() {
        if (cycleTimer) {
            clearInterval(cycleTimer);
            cycleTimer = null;
        }
    }

    // video ended 事件处理：手动重复播放，直到达到 MAX_REPEATS（播放次数计视频完成次数）
    function onVideoEnded() {
        playCount++;
        if (playCount < MAX_REPEATS) {
            // 重新播放
            videoEl?.currentTime === 0 ? videoEl?.play() : videoEl?.play();
        } else {
            // 超过次数后不再自动播放
            // （保持最后一帧或回到起点，取决于 UX；这里我们暂停）
            videoEl?.pause();
        }
    }

    function handleInput(e: Event) {
        const v = (e.target as HTMLInputElement).value || '';
        // 只保留数字，最大长度 6
        const digits = v.replace(/\D/g, '').slice(0, 6);
        pin = digits;
        error = '';
    }

    async function onSubmit(e?: Event) {
        e?.preventDefault();
        if (!/^\d{6}$/.test(pin)) {
            error = '请输入 6 位数字密码';
            return;
        }
        if (validatePin(pin)) {
            // 成功：跳转到首页（占位）
            await goto('/home');
        } else {
            error = '密码错误';
            pin = '';
            inputEl?.focus();
        }
    }

    onMount(async () => {
        await loadNotices();
        startCycle();

        // 自动聚焦
        setTimeout(() => inputEl?.focus(), 120);

        // 如果 video 自动播放失败（浏览器策略），尝试静音后播放
        try {
            await videoEl?.play();
        } catch {
            if (videoEl) {
                videoEl.muted = true;
                videoEl.play().catch(() => {
                });
            }
        }
    });

    onDestroy(() => {
        stopCycle();
    });
</script>

<style>
    :global(html,body,#svelte) {
        height: 100%;
        margin: 0;
        background: black;
    }

    .page {
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }

    /* 视频覆盖全屏，不变形 */
    .bg-video {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover; /* cover 保持比例并裁剪以铺满 */
        display: block;
    }

    /* 居中容器 */
    .center {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        pointer-events: none; /* 不阻止视频点击，输入通过内部元素启用 */
    }

    /* 卡片外壳用来放置提示 + 输入框 */
    .card {
        width: 400px;
        height: 100px;
        border-radius: 25px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.5);
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        pointer-events: auto; /* 使内部控件可交互 */
        gap: 6px;
    }

    .notice {
        height: 50px;
        line-height: 1;
        font-size: 16px;
        color: #ffffff;
        font-weight: 500;
        display: flex;
        align-items: center;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
        text-overflow: ellipsis;
    }

    .pin-input {
        width: 100%;
        height: 48px;
        border: none;
        outline: none;
        background: transparent;
        font-size: 50px;
        color: #000;
        text-align: left;
        padding: 0;
        caret-color: #000;
        letter-spacing: 6px;
    }

    .pin-input::placeholder {
        color: rgba(0, 0, 0, 0.25);
    }

    .error {
        position: absolute;
        top: calc(50% + 80px);
        left: 50%;
        transform: translateX(-50%);
        color: #ff4d4f;
        font-size: 14px;
        background: rgba(0, 0, 0, 0.45);
        padding: 6px 10px;
        border-radius: 6px;
    }

    /* 让容器在窄屏也行 */
    @media (max-width: 440px) {
        .card {
            width: calc(100% - 40px);
            border-radius: 16px;
            padding: 16px;
        }

        .pin-input {
            font-size: 40px;
        }
    }
</style>

<div class="page" role="main">
    <video
            bind:this={videoEl}
            class="bg-video"
            src={VIDEO_SRC}
            muted
            playsinline
            preload="auto"
            on:ended={onVideoEnded}
            aria-hidden="true"
    ></video>

    <div class="center" aria-live="polite">
        <!-- 语言提示：用 svelte transition 做淡入 2s，淡出 200ms -->
        <div class="notice" aria-hidden="false">
            {#if notices.length > 0}
                {#key currentIndex}
            <span in:fade={{duration:2000}} out:fade={{duration:200}}>
              {notices[currentIndex].text}
            </span>
                {/key}
            {:else}
          <span in:fade={{duration:2000}} out:fade={{duration:200}}>
            Enter password to unlock the information system
          </span>
            {/if}
        </div>
        <div class="a">
            <form class="card" on:submit|preventDefault={onSubmit} autocomplete="off" novalidate>
                <!-- 密码输入 -->
                <input
                        bind:this={inputEl}
                        class="pin-input"
                        type="password"
                        inputmode="numeric"
                        pattern="\d{6}"
                        placeholder="••••••"
                        maxlength="6"
                        value={pin}
                        on:input={handleInput}
                        aria-label="6 digit password"
                        autocomplete="one-time-code"
                />
            </form>
        </div>
    </div>

    {#if error}
        <div class="error" role="alert">{error}</div>
    {/if}
</div>
