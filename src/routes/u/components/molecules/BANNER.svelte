<!-- src/routes/u/components/molecules/BANNER.svelte -->


<script lang="ts">

    export let uid: string = '1000008018';
    export let touid: string = '1000004258';
    export let user: any = null; // 接收父组件传递的user

</script>

<!-- DOM结构完全不变 -->
<div class="banner_bar">
    <div class="banner"
         style="background: url('{user?.bg_img}') center; background-size: cover">

        <div class="line_100"></div>
        <div class="info_bar">
            <a target="_blank" href="{user?.avatar}">
                <img class="avatar" src="{user?.avatar}">
            </a>
            <div class="user_info">
                <div class="nickname"><h1>{user?.user_nickname}</h1></div>
                <div class="user_id"><h3>ID: {user?.id}</h3></div>
                <div class="nickname">
                    <h4>
                        {user?.id} {user?.age || ''}岁 {user?.from || ''} IP: {user?.ip || ''} - GUANGXI - CHINA
                    </h4>
                </div>
                <div class="signature">{user?.signature || 'null'}</div>
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
        <a target="_top" href="/u/{touid}" class="menu active">作品</a>
        <a target="_top" href="/u/{touid}/dynamic" class="menu">动态</a>
        <a target="_top" href="/u/{touid}/events" class="menu">活动</a>
        <a target="_top" href="/u/{touid}/replay" class="menu">回播</a>
        <a target="_top" href="/u/{touid}/window" class="menu">橱窗</a>
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
        border-bottom: solid 1px var(--line-q);
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