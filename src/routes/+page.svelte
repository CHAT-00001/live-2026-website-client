<!-- src/routes/+page.svelte -->
<script lang="ts">
    import VIDEO_LIST_CARD from "./video/ui/VIDEO_LIST_CARD.svelte";
    import FooterBar from "$lib/ui/base/FooterBar.svelte";

    let site_info = {
        "name": "乐可led IM信息系统",
        "cname": "可乐",
        "url": "/",
        "copyright": 2026,
    };


    export let data;

</script>


<svelte:head>
    <title>{site_info.name}</title>
</svelte:head>

<!-- led 2026-01-23 21:06:10 -->
<div class="banner_led">
    <a class="" href="/home"><h1> VIDEO BANNER - 2026 </h1></a>
</div>

<section>
    <VIDEO_LIST_CARD data={data}/>
</section>

<div class="banner_led2">
    <video autoplay
           class="player_2024"
           loop
           muted
           src="/assets/images/video/b02.mp4"
           width="100%"
    ></video>
</div>

<FooterBar/>

<style>

    .banner_led {
        width: 100%;
        aspect-ratio: 4/1;
        min-height: 400px;
        background: var(--led-bg-color);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .banner_led a {
        color: #ffffff;
    }

    .banner_led2 {
        width: 100%;
        aspect-ratio: 2/1;
        min-height: 400px;
        background: var(--led-bg-color);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .player_2024 {
        display: flex;
    }
</style>