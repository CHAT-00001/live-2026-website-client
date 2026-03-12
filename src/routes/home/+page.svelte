<!-- src/routes/home/+page.svelte -->

<script lang="ts">

    import {getVideoList2} from '$lib/api/video';
    import FULL_SCREEN_PLAYER from "./components/layout/FULL_SCREEN_PLAYER.svelte";

    // 1. 使用 $props 接收服务器 data
    let {data} = $props();

    // 2. 使用 $state 定义响应式状态（Svelte 5 的灵魂）
    let videos = $state([...data.videos]);
    let currentPage = $state(data.pagination.current_page || 1);
    let isEnd = $state(!data.pagination.has_more);
    let isLoading = $state(false);

    // 加载更多函数
    async function handleLoadMore() {
        if (isEnd || isLoading) return;

        isLoading = true;
        try {
            // 页码自动加1
            const Page = currentPage + 1;
            const params = {
                lat: '',
                lng: '',
                page: Page
            };

            // 启用loadMore加载更多数据
            console.info(`\x1b[38;2;65;255;0m[Parent]\x1b[0m 启用loadMore，加载更多数据..`);
            const response = await fetch(`/api/video/list?page=${Page}`)
            const result = await response.json();


            if (result.ret === 200 && result.data?.info?.length > 0) {
                // 3. 在 Svelte 5 中，直接修改 $state 数组即可触发子组件更新
                videos = [...videos, ...result.data.info];
                currentPage = Page;

                // 使用你的专属“黑客绿”日志
                console.log("[Load More...]");
            } else {
                isEnd = true;
                console.info("\x1b[33m[Parent]\x1b[0m 没有更多视频了");
            }
        } catch (error) {
            console.error("加载更多视频失败:", error);
        } finally {
            isLoading = false;
        }
    }
</script>

<svelte:head>
    <title>推荐</title>
</svelte:head>

<FULL_SCREEN_PLAYER
        onLoadMore={handleLoadMore}
        videoList={videos}
/>