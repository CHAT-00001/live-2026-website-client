<!-- src/routes/dynamic/component/preview/Left_Mini_LIST.svelte -->
<!-- 迷你动态列表（适配 SvelteKit 5 / Svelte 5） -->
<script lang="ts">
    // 1. 定义动态项类型接口（保持不变，增强类型安全）
    interface DynamicItem {
        id: number | string; // 动态唯一标识
        title: string; // 动态标题
        thumbs?: string[]; // 缩略图数组，可选
        publishTime?: string; // 可选：发布时间
        author?: string; // 可选：作者
    }

    // 2. 定义组件 Props，Svelte 5 中 Props 写法兼容但推荐明确类型
    export let list: DynamicItem[] = [];
    export let currentIndex = 0;

    // 3. Svelte 5 中移除 createEventDispatcher，直接使用 $dispatch
    // 定义点击处理函数，明确参数类型为 number
    function handleItemClick(index: number) {
        if (index !== currentIndex) {
            // 强制类型标注，消除编辑器警告
            const dispatch = $dispatch as (event: string, detail: number) => void;
            dispatch('selectDynamic', index);
        }
    }
</script>

<div class="left-mini-list">
    <!-- 空状态提示 -->
    {#if list.length === 0}
        <div class="empty-tip">暂无动态</div>
    {:else}
        <!-- 遍历列表，Svelte 5 中 {#each} 键值写法不变 -->
        {#each list as item, i (item.id)}
            <div
                    class="dynamic-item"
                    class:selected={i === currentIndex}
                    on:click={() => handleItemClick(i)}
                    aria-selected={i === currentIndex}
            >
                <!-- 缩略图容器：处理无图片的情况 -->
                <div class="thumb-container">
                    {#if item.thumbs?.[0]}
                        <img
                                src={item.thumbs[0]}
                                alt={item.title}
                                class="thumb-img"
                                loading="lazy"
                        />
                    {:else}
                        <div class="no-thumb">无图片</div>
                    {/if}
                </div>
                <!-- 标题：超出省略 -->
                <div class="title-text">{item.title}</div>
            </div>
        {/each}
    {/if}
</div>

<style>
    .left-mini-list {
        width: 200px;
        max-height: 80vh; /* 限制最大高度，适配页面布局 */
        overflow-y: auto;
        padding: 8px 0;
        background-color: #fff;
        box-sizing: border-box;
    }

    .dynamic-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        margin: 0 4px;
        cursor: pointer; /* 手型提示可点击 */
        border-left: 2px solid transparent; /* 预占边框位置，避免抖动 */
        transition: background-color 0.2s ease;
    }

    /* 选中态样式 */
    .dynamic-item.selected {
        border-left: 2px solid #1677ff;
        background-color: #e8f3ff; /* 强化选中视觉 */
    }

    /* 悬浮态 */
    .dynamic-item:not(.selected):hover {
        background-color: #f5f7fa;
    }

    .thumb-container {
        width: 40px;
        height: 40px;
        flex-shrink: 0; /* 固定尺寸不挤压 */
        border-radius: 4px;
        overflow: hidden;
        background-color: #f0f2f5;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .thumb-img {
        width: 100%;
        height: 100%;
        object-fit: cover; /* 图片不变形 */
    }

    .no-thumb {
        font-size: 10px;
        color: #999;
    }

    .title-text {
        flex: 1;
        font-size: 12px;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; /* 超出省略 */
    }

    .empty-tip {
        padding: 20px 0;
        text-align: center;
        font-size: 12px;
        color: #999;
    }
</style>