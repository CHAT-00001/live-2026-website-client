<!-- src/routes/dynamic/components/DYNAMIC_MENU.svelte -->
<script>
    import {page} from '$app/stores';

    // 显示方式：0 卡片 / 1 瀑布流 / 2 列表
    let displayType = '0';

    const isActiveRoute = (path) => {
        return $page.url.pathname === path;
    };
</script>

<div class="video_menu">
    <div class="wrapper">
        <!-- 搜索栏 -->
        <div class="search_bar">
            <input placeholder="搜索视频…" type="search"/>
            <input type="submit" value="搜索"/>
        </div>

        <!-- 标题 + Tabs -->
        <div class="title_bar">
            <div class="title"><h4>视频</h4></div>

            <div class="tab_menu">
                <!-- Tabs -->
                <div class="tab">
                    <a class="tab_item" class:active={isActiveRoute('/video')} href="/dynamic">推荐</a>
                    <a class="tab_item" class:active={isActiveRoute('/video/newest')} href="/video/newest">最新</a>
                    <a class="tab_item" class:active={isActiveRoute('/video/follow')} href="/video/follow">关注</a>
                    <a class="tab_item" class:active={isActiveRoute('/video/nearby')} href="/video/nearby">附近</a>
                    <a class="tab_item" class:active={isActiveRoute('/video/views')} href="/video/views">记录</a>
                    <a class="tab_item" class:active={isActiveRoute('/video/likes')} href="/video/likes">点赞</a>
                    <a class="tab_item" class:active={isActiveRoute('/video/collects')} href="/video/collects">收藏</a>
                </div>

                <!-- 显示方式（气泡单选） -->
                <div class="display">
                    <button
                            class="display_item"
                            class:active={displayType === '0'}
                            on:click={() => displayType = '0'}
                    >卡片
                    </button>

                    <button
                            class="display_item"
                            class:active={displayType === '1'}
                            on:click={() => displayType = '1'}
                    >瀑布流
                    </button>

                    <button
                            class="display_item"
                            class:active={displayType === '2'}
                            on:click={() => displayType = '2'}
                    >列表
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>

    .video_menu {
        position: sticky;
        top: 55px;
        z-index: 50;
        background: #ffffff;
        border-bottom: 1px solid #eee;
    }

    .wrapper {
        padding: 12px 16px;
    }

    .search_bar {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
    }

    .search_bar input[type="search"] {
        width: 220px;
        height: 36px;
        padding: 6px 12px;
        font-size: 14px;
        color: #333;

        border-radius: 6px;
        border: 2px solid #d9d9d9;
        background: #fff;
        outline: none;

        transition: border-color 300ms ease,
        box-shadow 300ms ease;
    }

    .search_bar input[type="search"]:focus {
        border-color: #1677ff;
        box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.15);
    }

    .search_bar input[type="search"]::placeholder {
        color: #aaa;
    }

    .search_bar input[type="submit"] {
        height: 36px;
        padding: 0 16px;
        font-size: 14px;
        border-radius: 6px;

        border: 2px solid #1677ff;
        background: #1677ff;
        color: #fff;

        cursor: pointer;

        transition: background-color 300ms ease,
        border-color 300ms ease,
        opacity 300ms ease;
    }

    .search_bar input[type="submit"]:hover {
        background: #4096ff;
        border-color: #4096ff;
    }

    .search_bar input[type="submit"]:active {
        opacity: 0.85;
    }

    /* ===== 标题 + Tab 区 ===== */
    .title_bar {
        display: flex;
        height: 40px;
        align-items: center;
        justify-content: space-between;
    }

    .title {
        font-size: 18px;
        font-weight: 600;
        color: #111;
    }

    .tab_menu {
        display: flex;
        align-items: center;
        gap: 24px;
    }

    /* ===== Tabs ===== */
    .tab {
        display: flex;
        gap: 20px;
    }

    .tab_item {
        position: relative;
        padding: 6px 2px;
        font-size: 14px;
        color: #666;
        text-decoration: none;

        transition: color 500ms ease;
    }

    .tab_item::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -6px;
        width: 100%;
        height: 2px;
        background: #1677ff;

        opacity: 0;
        transform: scaleX(0);

        transition: opacity 500ms ease,
        transform 500ms ease;
    }

    .tab_item:hover,
    .tab_item.active {
        color: #1677ff;
    }

    .tab_item:hover::after,
    .tab_item.active::after {
        opacity: 1;
        transform: scaleX(1);
    }

    /* ===== Display 气泡按钮 ===== */
    .display {
        display: flex;
        gap: 8px;
    }

    .display_item {
        padding: 6px 14px;
        font-size: 13px;
        border-radius: 999px;
        border: none;

        background: #f2f2f2;
        color: #666;
        cursor: pointer;

        transition: background-color 500ms ease,
        color 500ms ease;
    }

    .display_item:hover,
    .display_item.active {
        background: #1677ff;
        color: #fff;
    }
</style>
