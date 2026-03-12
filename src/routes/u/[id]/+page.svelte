<!-- src/routes/u/[id]/+page.svelte -->





<script lang="ts">
    import {fade} from 'svelte/transition';
    import VIDEOS from "../components/molecules/VIDEOS.svelte";

    // 1. 定义接口以获得完美的类型提示
    // 这里的 data 类型通常对应你 +page.ts 或 +page.server.ts 的返回值
    interface Props {
        data: {
            user?: {
                user_nickname?: string;
            };
            touid: string | number;
            [key: string]: any; // 允许其他可能的字段
        };
    }

    // 2. 接收 SvelteKit 注入的 data
    let {data}: Props = $props();

    // 3. 使用 $derived 确保响应式（当 data 变化时，这些变量会自动更新）
    // 这样就解决了 "Property user does not exist" 的问题，因为我们是从 data 里拿的
    const user = $derived(data.user);
    const touid = $derived(data.touid);

    const name = "封面";

    const siteName = "你的网站名称";

    // 4. 动态生成页面标题
    const pageTitle = $derived(`${user?.user_nickname || '用户'} - [${touid}] - ${name} - ${siteName}`);
</script>

<svelte:head>
    <title>{pageTitle}</title>
</svelte:head>

<VIDEOS {touid} />

<div class="wrapper">
    <div class="title_bar">
        <div class="title">动态</div>
        <div class="tab_menu">
            <div class="list">
                <button>推荐</button>
                <button>关注</button>
                <button>附近</button>
                <button>最新</button>
            </div>
        </div>
    </div>
</div>


<style>
    /* 样式完全不变 */
    .live_bar .led {
        height: 480px;
        background-size: cover;
    }
    .title_bar {
        margin: 20px;
    }
    .thumb {
        opacity: 1;
        transition: opacity 0.5s;
        width: 200px;
    }
    .thumb.fade-in {
        opacity: 1;
    }
    .dynamic-item {
        display: block;
        margin: 20px;
        padding: 20px;
        border-radius: 20px;
        background: #f1f1f1;
    }
    .user_info {
        display: flex;
    }
    .avatar_48 {
        width: 48px;
        height: 48px;
        border-radius: 10%;
    }
    .nickname {
        margin: 10px;
    }
    .photo {
        display: inline-block;
        margin: 10px;
    }
</style>