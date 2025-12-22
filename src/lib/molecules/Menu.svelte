<script lang="ts">
    const menu = [
        {
            id: 1,
            _id: "abc",
            name: "Home",
            name_zh: "首页",
            name_jp: "",
            name_kr: "",
            url: "/",
            icon: "https://img.alicdn.com/imgextra/i1/2212688966599/O1CN01RA6su81ycOcYNyeT9_!!2212688966599.jpg",
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
            icon: "https://img.alicdn.com/imgextra/i1/2212688966599/O1CN01RA6su81ycOcYNyeT9_!!2212688966599.jpg",
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
            icon: "https://img.alicdn.com/imgextra/i1/2212688966599/O1CN01RA6su81ycOcYNyeT9_!!2212688966599.jpg",
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
            icon: "https://img.alicdn.com/imgextra/i1/2212688966599/O1CN01RA6su81ycOcYNyeT9_!!2212688966599.jpg",
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
            icon: "https://img.alicdn.com/imgextra/i1/2212688966599/O1CN01RA6su81ycOcYNyeT9_!!2212688966599.jpg",
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
            icon: "https://img.alicdn.com/imgextra/i1/2212688966599/O1CN01RA6su81ycOcYNyeT9_!!2212688966599.jpg",
            sort: 0,
        },
        {
            id: 1,
            _id: "abc",
            name: "Event",
            name_zh: "活动",
            name_jp: "",
            name_kr: "",
            url: "/event",
            icon: "https://img.alicdn.com/imgextra/i1/2212688966599/O1CN01RA6su81ycOcYNyeT9_!!2212688966599.jpg",
            sort: 0,
        },
        {
            id: 1,
            _id: "abc",
            name: "App",
            name_zh: "APP",
            name_jp: "",
            name_kr: "",
            url: "/app",
            icon: "https://img.alicdn.com/imgextra/i1/2212688966599/O1CN01RA6su81ycOcYNyeT9_!!2212688966599.jpg",
            sort: 0,
        },
    ]
</script>

<div class="info_bar">
    <div class="full">
        <div class="left_bar">
            <div class="menu">
                <div class="logo"><a target="_top" href="/">🉑</a> </div>
                <div class="name">可乐 2026</div>
                <nav class="menu">
                    {#each menu as item}
                        <a target="_top" href={item.url} class="menu-item">
                            <img src={item.icon} alt={item.name}/>
                            <span>{item.name_zh || item.name}</span>
                        </a>
                    {/each}
                </nav>
            </div>
        </div>
        <div class="search_bar">
            <div class="search">
                <input class="a" type="search">
                <input class="b" type="submit" value="搜索">
            </div>
        </div>
        <div class="right_bar">
            <a href="/">设置</a>
            <a href="/">控制台</a>
            <a href="/">消息[9999]</a>
            <a href="/"><img class="avatar_32" src="http://cdn1.damawei.com/20200420_5e9caa158b1f9.jpg" alt="柠檬味的你" /></a>
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
        background-color: rgba(255, 255, 255, 0.80);
    }
    .full {
        display: flex;
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
        width: 400px;
        height: 37px;
        border-radius: 10px;
        border: solid 2px #f1f1f1;
        font-size: 16px;
        background: rgba(255, 255, 255, 0.74);
    }
    .search_bar input.b {
        display: inline-block;
        margin: 8px 0;
        width: 60px;
        height: 36px;
    }
    .right_bar {
        margin-left: auto;
    }

    .menu {
        display: flex;
        gap: 16px;
        padding: 0px;
    }
    .logo {
        margin: 5px;
    }

    .name {
        margin: 5px;
    }

    .menu-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        font-size: 12px;
    }

    .menu-item img {
        width: 20px;
        height: 20px;
        margin-bottom: 4px;
        border-radius: 4px;
    }

    .menu-item:hover {
        color: #0070f3;
    }

    .avatar_32 {
        width: 32px;
        height: 32px;
        border-radius: 6px;
    }
</style>






