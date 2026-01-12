<!-- BOTTOM BAR -->
<script lang="ts">
    const menu = [
        {
            id: 1,
            _id: "abc",
            name: "Home",
            name_zh: "推荐",
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
            name_zh: "关注",
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
            name_zh: "市场 Market",
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
            name_zh: "喜欢 Like",
            name_jp: "",
            name_kr: "",
            url: "/photo",
            icon: "https://img.alicdn.com/imgextra/i1/2212688966599/O1CN01RA6su81ycOcYNyeT9_!!2212688966599.jpg",
            sort: 0,
        },
        {
            id: 1,
            _id: "abc",
            name: "Library",
            name_zh: "库 Library",
            name_jp: "",
            name_kr: "",
            url: "/library",
            icon: "https://img.alicdn.com/imgextra/i1/2212688966599/O1CN01RA6su81ycOcYNyeT9_!!2212688966599.jpg",
            sort: 0,
        },
    ]
</script>

<div class="tab_bar">
    <div class="left_bar">
        <div class="menu">
            <nav class="menu">
                {#each menu as item}
                    <a href={item.url} class="menu-item">
                        <img src={item.icon} alt={item.name}/>
                        <span>{item.name_zh || item.name}</span>
                    </a>
                {/each}
            </nav>
        </div>
    </div>
    <div class="right_bar">
        <button>地图 Map</button>
        <button>消息 Message</button>
        <button>我的 Mine </button>
        <button>设置 Setting</button>
    </div>
</div>

<style>
    .tab_bar {
        display: none;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 55px;
        background-color: var(--bar-bg);
        z-index: 50;
        backdrop-filter: blur(20px);
    }
    .menu {
        display: block;
        padding: 0px;
    }

    .menu-item {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #333;
        font-size: 12px;
        font-weight: bold;
    }

    .menu-item img {
        margin: 10px;
        width: 24px;
        height: 24px;
        border-radius: 4px;
    }
    .menu-item span {
        margin: 0;
        width: 100px;
        height: 24px;
        line-height: 24px;
        border-radius: 4px;
    }

    .menu-item:hover {
        color: #0070f3;
        background: #f1f1f1;
    }
    .menu-item:active {
        color: #ffffff;
        background: #0011ff;
    }
</style>






