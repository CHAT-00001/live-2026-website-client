<!-- src/lib/molecules/Menu.svelte -->
<script lang="ts">
    import {page} from '$app/stores';
    import {theme, toggleTheme} from "$lib/stores/theme_store.ts";

    // 透明背景
    let {isHome} = $props();

    const menu = [
        {
            id: 1,
            _id: "abc",
            name: "Home",
            name_zh: "首页",
            name_jp: "",
            name_kr: "",
            url: "/",
            icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-house-door-fill\" viewBox=\"0 0 16 16\">\n" +
                "  <path d=\"M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5\"/>\n" +
                "</svg>",
            sort: 0,
        },
        {
            id: 1,
            _id: "abc",
            name: "Dynamic",
            name_zh: "动态",
            name_jp: "",
            name_kr: "",
            url: "/dynamic",
            icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-heptagon-fill\" viewBox=\"0 0 16 16\">\n" +
                "  <path fill-rule=\"evenodd\" d=\"M7.779.052a.5.5 0 0 1 .442 0l6.015 2.97a.5.5 0 0 1 .267.34l1.485 6.676a.5.5 0 0 1-.093.415l-4.162 5.354a.5.5 0 0 1-.395.193H4.662a.5.5 0 0 1-.395-.193L.105 10.453a.5.5 0 0 1-.093-.415l1.485-6.676a.5.5 0 0 1 .267-.34z\"/>\n" +
                "</svg>",
            sort: 0,
        },
        {
            id: 1,
            _id: "abc",
            name: "Living",
            name_zh: "直播",
            name_jp: "",
            name_kr: "",
            url: "/live",
            icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-asterisk\" viewBox=\"0 0 16 16\">\n" +
                "  <path d=\"M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1\"/>\n" +
                "</svg>",
            sort: 0,
        },
        {
            id: 1,
            _id: "abc",
            name: "Product",
            name_zh: "商品",
            name_jp: "",
            name_kr: "",
            url: "/product",
            icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-cart-fill\" viewBox=\"0 0 16 16\">\n" +
                "  <path d=\"M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2\"/>\n" +
                "</svg>",
            sort: 0,
        },
        {
            id: 1,
            _id: "abc",
            name: "Photo",
            name_zh: "照片",
            name_jp: "",
            name_kr: "",
            url: "/photo",
            icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-camera-fill\" viewBox=\"0 0 16 16\">\n" +
                "  <path d=\"M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0\"/>\n" +
                "  <path d=\"M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0\"/>\n" +
                "</svg>",
            sort: 0,
        },
        {
            id: 1,
            _id: "abc",
            name: "Video",
            name_zh: "视频",
            name_jp: "",
            name_kr: "",
            url: "/video",
            icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-play-btn-fill\" viewBox=\"0 0 16 16\">\n" +
                "  <path d=\"M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2m6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z\"/>\n" +
                "</svg>",
            sort: 0,
        },
        {
            id: 1,
            _id: "abc",
            name: "Home",
            name_zh: "推荐",
            name_jp: "",
            name_kr: "",
            url: "/home",
            icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-chat-fill\" viewBox=\"0 0 16 16\">\n" +
                "  <path d=\"M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15\"/>\n" +
                "</svg>",
            sort: 0,
        },
        {
            id: 1,
            _id: "abc",
            name: "Market",
            name_zh: "市场",
            name_jp: "",
            name_kr: "",
            url: "/market",
            icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-7-circle-fill\" viewBox=\"0 0 16 16\">\n" +
                "  <path d=\"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.37 5.11h3.972v.07L6.025 12H7.42l3.258-6.85V4.002H5.369v1.107Z\"/>\n" +
                "</svg>",
            sort: 0,
        },
    ]
</script>

<div class="info_bar" class:transparent={isHome}>
    <div class="full">
        <div class="left_bar">
            <div class="menu">
                <div class="logo"><a href="/" target="_top">⬇️</a></div>
                <div class="name"><h4>4K IM</h4></div>
                <nav class="menu-list">
                    {#each menu as item}
                        <!-- ✅ 核心修改：路由匹配高亮，添加class判断，其他不变 -->
                        <a target="_top" href={item.url} class="menu-item"
                           class:active={$page.url.pathname === item.url}>
                            <span class="icon_20">{@html item.icon}</span>
                            <span>{item.name_zh || item.name}</span>
                        </a>
                    {/each}
                </nav>
            </div>
        </div>
        <div class="search_bar">
            <div class="search">
                <input class="a" type="search">
                <button>搜索</button>
            </div>
        </div>
        <div class="right_bar">
            <a href="/">
                <i>
                    <svg class="bi bi-gear-fill" fill="currentColor" height="16" viewBox="0 0 16 16"
                         width="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                    </svg>
                </i>
                <text>设置</text>
            </a>
            <a href="/notify"><i>
                <svg class="bi bi-toggles" fill="currentColor" height="16" viewBox="0 0 16 16" width="16"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 9a3.5 3.5 0 1 0 0 7h7a3.5 3.5 0 1 0 0-7zm7 6a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m-7-14a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m2.45 0A3.5 3.5 0 0 1 8 3.5 3.5 3.5 0 0 1 6.95 6h4.55a2.5 2.5 0 0 0 0-5zM4.5 0h7a3.5 3.5 0 1 1 0 7h-7a3.5 3.5 0 1 1 0-7"/>
                </svg>
            </i>
                <text>通知</text>
            </a>
            <a href="/im?client_id=1001ade84166e_1000015847&season=1"><i>
                <svg class="bi bi-chat-fill" fill="currentColor" height="16" viewBox="0 0 16 16"
                     width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15"/>
                </svg>
            </i>
                <text>消息</text>
                <qty>[9999]</qty>
            </a>
            <button class="theme-toggle" on:click={toggleTheme} title={$theme === 0 ? '切换深色主题' : '切换浅色主题'}>
                {#if $theme === 0}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-moon-fill" viewBox="0 0 16 16">
                        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
                    </svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-sun-fill" viewBox="0 0 16 16">
                        <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                    </svg>
                {/if}
            </button>
            <a href="/"><img alt="柠檬味的你" class="avatar_32"
                             src="http://cdn1.damawei.com/20200420_5e9caa158b1f9.jpg"/></a>
            <a href="/">柠檬味的你</a>
            <a href="/">[退出]</a>
        </div>
    </div>
</div>

<style>
    .info_bar {
        position: fixed;
        top: 0;
        z-index: 99;
        width: 100%;
        height: 55px;
        background-color: var(--bar-bg);
        box-sizing: border-box;
        backdrop-filter: blur(20px);
    }

    .info_bar.transparent {
        background-color: transparent;
        backdrop-filter: none;
        box-shadow: none;
    }

    .full {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 10px;
    }

    .left_bar {
        margin-right: auto;
    }

    .search_bar {
        margin: 0 auto;
    }

    .search_bar input.a {
        display: inline-block;
        margin: 5px;
        padding: 0 20px;
        width: 160px;
        height: 37px;
        border-radius: 10px;
        border: solid 2px rgba(0, 0, 0, 0.1);
        font-size: 16px;
        background: rgba(255, 255, 255, 0.10);
        outline: none;
    }

    .search_bar input.b {
        display: inline-block;
        margin: 8px 0;
        width: 60px;
        height: 36px;
        cursor: pointer;
    }

    .right_bar {
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .right_bar a {
        text-decoration: none;
        font-size: 14px;
    }

    .menu {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 4px;
        height: 100%;
    }

    .logo {
        margin: 0 12px;
    }

    .logo a {
        text-decoration: none;
        color: #333;
    }

    .name {
        margin: 0;
        line-height: 1;
    }

    .name h4 {
        margin: 0;
        font-size: 14px;
    }

    .menu-list {
        display: flex;
        gap: 12px;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .menu-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 30px;
        text-decoration: none;
        font-size: 12px;
        gap: 2px;
        transition: border-bottom 0.4s ease, color 0.4s ease;
        border-bottom: solid 2px #f6f6f6;
    }

    .menu-item:hover,
    .menu-item.active {
        border-bottom: solid 2px color(display-p3 0 1023 0 /1);
        color: #0070f3;
    }

    .icon_20 {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: inherit;
    }

    .avatar_32 {
        width: 32px;
        height: 32px;
        border-radius: 6px;
        vertical-align: middle;
    }
</style>