<script lang="ts">
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import videojs from 'video.js';
    import 'video.js/dist/video-js.css';

    export let src = '';
    export let poster = '';
    export let id: string | number;
    export let muted = false;
    export let autoplay = false;
    export let showControls = false;

    const dispatch = createEventDispatcher();
    let playerEl: HTMLVideoElement;
    let player: videojs.Player | null = null;

    onMount(() => {
        player = videojs(playerEl, {
            controls: showControls,
            autoplay,
            muted,
            preload: 'auto',
            fluid: true,
            controlBar: {
                children: true // full control bar; we'll hide default UI and provide our own if wanted
            }
        });

        player.src({ src, type: 'video/mp4' });
        if (poster) player.poster(poster);

        player.on('play', () => dispatch('play'));
        player.on('pause', () => dispatch('pause'));
        player.on('timeupdate', () => dispatch('timeupdate', { currentTime: player?.currentTime() }));
        player.on('ended', () => dispatch('ended'));
    });

    onDestroy(() => {
        if (player) {
            player.dispose();
            player = null;
        }
    });

    // 外部控制 API
    export function play() { player?.play(); }
    export function pause() { player?.pause(); }
    export function getCurrentTime() { return player?.currentTime() ?? 0; }
    export function setCurrentTime(t: number) { player?.currentTime(t); }
</script>

<video
        bind:this={playerEl}
        class="video-js vjs-default-skin"
        playsinline
        webkit-playsinline
        x-webkit-airplay="allow"
></video>

<style>
    /* video.js 默认样式已引入 */
    :global(.video-js) {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
