<!-- src/routes/video/home/+page.svelte -->

<script lang="ts">
    import FULL_SCREEN_PLAYER from "../components/layout/FULL_SCREEN_PLAYER.svelte";
    import {getVideoList} from '$lib/api/video_api.ts';

    export let data;

    // 初始化：从服务器传来的 data.videos 赋值
    let videos = [...data.videos];
    let currentPage = data.pagination.current_page || 1;
    let isEnd = !data.pagination.has_more;
    let isLoading = false;

    async function handleLoadMore() {
        if (isEnd || isLoading) return;

        isLoading = true; // 父组件也加个锁，双重保险
        try {
            const nextP = currentPage + 1;

            // 构造符合你 API 要求的参数
            const params = {
                lat: '', // 如果需要经纬度，可以从 URL 或 state 获取
                lng: '',
                p: nextP
            };

            // 直接使用你封装好的 getVideoList
            const result = await getVideoList(params);

            // 根据你提供的映射：数据在 result.data.info
            if (result.ret === 200 && result.data?.info?.length > 0) {
                // 核心：解构赋值追加数据
                videos = [...videos, ...result.data.info];
                currentPage = nextP;
                console.log(`API 映射成功：第 ${nextP} 页(p=${nextP})已载入，当前共 ${videos.length} 条`);
            } else {
                isEnd = true;
                console.log("没有更多视频了");
            }
        } catch (error) {
            console.error("加载更多视频失败:", error);
        } finally {
            isLoading = false;
        }
    }
</script>

<svelte:head>
    <title>推荐 - 首页</title>
</svelte:head>

<FULL_SCREEN_PLAYER
        on:loadMore={handleLoadMore}
        videoList={videos}
/>