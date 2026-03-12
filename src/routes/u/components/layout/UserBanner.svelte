<!-- src/routes/u/components/layout/UserBanner.svelte -->


<script lang="ts">
    import {page} from '$app/stores';

    // Svelte 5 使用 $props 接收参数
    let {
        touid = '1000004258',
        user = null
    } = $props();

    const defaultAvatar = '/img/default_avatar.png';
    const defaultBg = '/img/bg_default.png';

    // 使用 $derived 实时获取当前路径，用于判断 Tab 激活状态
    const currentPath = $derived($page.url.pathname);

    // 辅助函数：判断链接是否应该激活
    // 作品页是 /u/[id]，精确匹配；其他页面如 /u/[id]/dynamic 匹配前缀
    const isActive = (path: string, exact = false) => {
        if (exact) return currentPath === path;
        return currentPath.startsWith(path);
    };

    console.log("[UI] user=", user);
</script>

<div class="banner_bar">
    <div class="banner"
         style="background: url('{user?.bg_img || defaultBg}') center; background-size: cover">

        <div class="line_100"></div>
        <div class="info_bar">
            <a href="{user?.avatar || defaultAvatar}" target="_blank">
                <img alt="avatar" class="avatar" src="{user?.avatar || defaultAvatar}">
            </a>
            <div class="user_info">
                <div class="nickname"><h1>{user?.user_nickname || '未命名'}</h1></div>
                <div class="user_id"><h3>ID: {user?.id || touid}</h3></div>
                <div class="nickname">
                    <h4>
                        {user?.id} {user?.age || ''}岁 {user?.from || ''} IP: {user?.ip || ''} - GUANGXI - CHINA
                    </h4>
                </div>
                <div class="signature">{user?.signature || '这家伙很懒，什么都没有留下'}</div>
                <div class="item">
                    <button>Living...</button>
                    <button>2D Code...</button>
                    <button>STORE</button>
                    <button>AD</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="banner_menu">
    <div class="wrapper">
        <a class="menu" class:active={isActive(`/u/${touid}`, true)}
           href="/u/{touid}"
           target="_top">作品</a>

        <a class="menu" class:active={isActive(`/u/${touid}/dynamic`)}
           href="/u/{touid}/dynamic"
           target="_top">动态</a>

        <a class="menu" class:active={isActive(`/u/${touid}/events`)}
           href="/u/{touid}/events"
           target="_top">活动</a>

        <a class="menu" class:active={isActive(`/u/${touid}/replay`)}
           href="/u/{touid}/replay"
           target="_top">回播</a>

        <a class="menu" class:active={isActive(`/u/${touid}/window`)}
           href="/u/{touid}/window"
           target="_top">橱窗</a>
    </div>
</div>

<div class="bottom_bar">
    <div class="wrapper">
        <div class="menu_bar">
            <button>➕️添加关注</button>
            <button>✉️发送消息</button>
        </div>
    </div>
</div>

<!-- CSS样式完全不变 -->
<style>

    .banner_640 {
        height: 640px;
        background: var(--bg-primary);
    }

    .banner {
        margin: 0 auto;
        max-width: 1440px;
    }

    .user_info {
        display: inline-block;
        margin: 0 auto;
        padding: 10px;
        width: 1200px;
    }

    .avatar {
        float: left;
        margin: 10px;
    }

    .avatar_200 {
        width: 200px;
        height: 200px;
    }

    .signature {
        padding: 10px;
    }

    .banner_menu {
        position: sticky;
        top: 55px;
        display: block;
        height: 50px;
        background-color: var(--bg-primary);
        border-bottom: solid 1px var(--line-q);
        z-index: 50;
    }

    .banner_menu .menu {
        float: left;
        width: 20%;
        height: 40px;
        color: var(--text-333333);
        font-size: 14px;
        font-weight: bold;
        line-height: 28px;
        text-align: center;
        border-bottom: solid 4px rgba(82, 229, 21, 0);
    }

    .banner_menu .menu:hover {
        float: left;
        border-bottom: solid 4px rgba(0, 255, 21, 1.0);
    }

    .banner_menu .active {
        border-bottom: solid 4px rgba(0, 255, 21, 1.0);
    }

    .bottom_bar {
        position: fixed;
        bottom: 80px;
        width: 100%;
        height: 55px;
    }

    .bottom_bar .menu_bar {
        display: block;
        margin: 0 auto;
        width: 320px;
    }

    .banner {
        height: 640px;
        background-color: #f1f1f1;
    }

    .banner .avatar {
        margin-top: 0px;
        width: 200px;
        height: 200px;
    }

    .banner .info_bar {
        margin: 0 auto;
        max-width: 1200px;
    }

    .banner .info_bar h1 {
        font-size: 2em;
        color: #ffffff;
        text-shadow: 0 0 5px #000000;
    }

    .banner .info_bar h4 {
        margin: 10px 0;
        width: fit-content;
        color: #ffffff;
        background-color: #4ffffee0;
    }

    .info {
        padding: 10px;
        height: 200px;
        background-color: #f1f1f1;
    }

    .info .qty span {
        font-weight: bold;
        font-size: 18px;
    }

    .by button {
        height: 50px;
        min-width: 60px;;
        background-color: #e6e6e6;
        border-radius: 5px;
    }

    ul.menu li {
        float: left;
        display: inline-block;
    }

    .led {
        margin: 10px;
        height: 480px;
        background-color: #f6f6f6;
    }
</style>