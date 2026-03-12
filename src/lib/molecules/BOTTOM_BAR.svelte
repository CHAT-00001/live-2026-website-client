<!-- BOTTOM BAR -->
<script lang="ts">
    const menu = [
        {
            id: 1,
            _id: "abc",
            name: "Home",
            name_zh: "主页",
            name_jp: "",
            name_kr: "",
            url: "/",
            icon: "bi-house-door-fill",
            sort: 0,
        },
        {
            id: 2,
            _id: "abc",
            name: "Nearby",
            name_zh: "附近",
            name_jp: "",
            name_kr: "",
            url: "/nearby",
            icon: "bi-radar",
            sort: 0,
        },
        {
            id: 3,
            _id: "abc",
            name: "Add",
            name_zh: "+",
            name_jp: "",
            name_kr: "",
            url: "/create",
            icon: "bi-plus-square-fill",
            sort: 0,
        },
        {
            id: 4,
            _id: "abc",
            name: "Message",
            name_zh: "消息",
            name_jp: "",
            name_kr: "",
            url: "/message",
            icon: "bi-chat-fill",
            sort: 0,
        },
        {
            id: 5,
            _id: "abc",
            name: "Mine",
            name_zh: "我的",
            name_jp: "",
            name_kr: "",
            url: "/mine",
            icon: "bi-person-fill",
            sort: 0,
        }
    ]
</script>

<div class="tab_bar">
    <div class="container">
        <div class="menu">
            {#each menu as item}
                <a href={item.url} class="menu-item">
                    <i class="bi {item.icon}"></i>
                    <span>{item.name_zh || item.name}</span>
                </a>
            {/each}
        </div>
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

    .tab_bar .container {
        display: block;
        margin: 0 auto;
        max-width: 640px;
    }

    .menu {
        display: flex;
        margin-top: 6px;
        padding: 0px;
        width: 100%;
    }

    .menu-item {
        flex: 1;
        align-items: center;
        text-decoration: none;
        color: --var(--color-text);
        font-size: 12px;
        font-weight: bold;
        border-radius: 16px;
    }

    .menu-item:hover {
        background-color: var(--color-primary);
    }

    .menu-item i.bi {
        display: block;
        margin: 0 auto;
        width: 20px;
        height: 20px;
        font-size: 20px;
        border-radius: 4px;
    }

    .menu-item span {
        display: block;
        margin: 0;
        height: 24px;
        font-size: 10px;
        text-align: center;
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






