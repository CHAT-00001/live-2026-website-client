<!-- src/routes/market/shop/[id]/+page.svelte -->

<script lang="ts">

    // 定义类型接口，增强TS类型校验
    interface BuyerItem {
        id: number;
        icon: string;
        name: string;
        name_zh: string;
        status: number;
    }

    // 买家功能项数据
    let buyer_items: BuyerItem[] = [
        {
            id: 1,
            icon: "http://cdn1.damawei.com/4963a.jpeg?imageView2/1/w/200/h/200",
            name: "Oder",
            name_zh: "订单",
            status: 1,
        },
        {
            id: 2,
            icon: "http://cdn1.damawei.com/4758a.jpeg?imageView2/1/w/200/h/200",
            name: "Oder",
            name_zh: "订单",
            status: 1,
        },
        {
            id: 3,
            icon: "http://cdn1.damawei.com/4823a.jpeg?imageView2/1/w/200/h/200",
            name: "Wishlist",
            name_zh: "愿望清单",
            status: 1,
        },
        {
            id: 4,
            icon: "http://cdn1.damawei.com/4699a.jpeg?imageView2/1/w/200/h/200",
            name: "Cart",
            name_zh: "购物车",
            status: 1,
        },
        {
            id: 5,
            icon: "http://cdn1.damawei.com/4594a.jpeg?imageView2/1/w/200/h/200",
            name: "Collect",
            name_zh: "收藏",
            status: 1,
        },
        {
            id: 6,
            icon: "http://cdn1.damawei.com/4697a.jpeg?imageView2/1/w/200/h/200",
            name: "Address",
            name_zh: "地址",
            status: 1,
        },
        {
            id: 7,
            icon: "http://cdn1.damawei.com/4630a.jpeg?imageView2/1/w/200/h/200",
            name: "Wallet",
            name_zh: "钱包",
            status: 1,
        },
        {
            id: 8,
            icon: "http://cdn1.damawei.com/4692a.jpeg?imageView2/1/w/200/h/200",
            name: "Todolist",
            name_zh: "待办事项",
            status: 1,
        },
    ];
</script>

<svelte:head>
    <title>711士多店 - 24小时营业 - [ SHOP - 10070 ] - 市场 - 网站名称</title>
</svelte:head>

<!-- video banner -->
<section>
    <div class="led_640">
        <video
                autoplay
                loop
                src="https://ferrari.scene7.com/is/content/ferrari/6628b794-2db2-4c91-9228-7cc0acc63687"
        />
    </div>
</section>
<div class="pai">
    <h1>MARKET MAIN</h1>
    <h1 style="flex: content">市场部</h1>
</div>

<section>
    <div class="container">
        <h1>Buyer Actions [{buyer_items.length}]</h1>
        <div class="item-list">
            <!-- 循环渲染buyer_items -->
            {#each buyer_items as item (item.id)}
                <div class="item">
                    <div class="icon">
                        <img src={item.icon} alt={item.name_zh}/>
                    </div>
                    <div class="name"><h4>{item.name}</h4></div>
                    <div class="name_zh">{item.name_zh}</div>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- 如果是店员身份登录 -->
<section>
    <div class="banner_200">
        <div class="container">
            <a class="btn_black">添加商品</a>
            <a class="btn_black">我的店铺</a>
        </div>
    </div>
</section>

<!-- 本店分类 -->
<section>
    <div class="container">
        <h1>Categories - 分类</h1>
        <div class="wrapper">
            <div class="cate">电脑</div>
            <div class="cate">服饰</div>
            <div class="cate">电影票</div>
            <div class="cate">活动</div>
            <div class="cate">话费</div>
        </div>
    </div>
</section>

<!-- 过滤器 -->
<div class="container">
    <h1>过滤器</h1>
    <div class="wrapper">
        <a class="btn" href="/" target="_top">推荐</a>
        <a class="btn" href="/" target="_top">热门</a>
        <a class="btn" href="/" target="_top">附近</a>
        <a class="btn" href="/" target="_top">特价</a>
        <a class="btn" href="/" target="_top">新品</a>
    </div>
</div>

<!-- goods -->
<div class="container">
    <h1>Products List</h1>
    <div class="wrapper">
        <div class="item">
            <div class="thumbnails">
                <a href="/market/goods/可爱字母t@1000015410" target="_blank"><img
                        src="http://cdn1.damawei.com/4752a.jpeg?imageView2/1/w/480/h/480"/></a>

            </div>
            <div class="name"><a href="/market/goods/1000000140" target="_blank"><h2>NIKE 2026 T-shirt</h2></a></div>
            <div class="address">CHINA - SHENZHEN</div>
            <div class="desc">ALL NEW LIST</div>
            <div class="price">$99.00</div>
            <div class="sale_qty">1000 PES</div>
            <div class="collects">48</div>
        </div>
    </div>
</div>

<style>
    .pai {
        display: flex;
        position: sticky;
        top: 55px;
        padding: 10px;
        height: 100px;
        color: #ffffff;
        background: #000000;
        z-index: 50;
    }

    .container {
        margin: 0 auto;
        max-width: 1200px;
        padding: 0 20px;
    }

    .item-list {
        display: flex;
        gap: 20px; /* 项之间的间距 */
        flex-wrap: wrap; /* 自动换行 */
        margin-top: 20px;
    }

    .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
        width: 150px; /* 固定宽度，保证排版整齐 */
        border-radius: 10px;
    }

    .item:hover {
        background: #f0f0f0;
    }

    .icon img {
        width: 60px; /* 图标大小 */
        height: 60px;
        object-fit: cover;
        border-radius: 8px; /* 圆角优化 */
    }

    .name {
        margin-top: 8px;
        font-size: 14px;
        color: #333;
        text-align: center;
    }

    .banner_200 {
        height: 200px;
        background: #000000;
        margin: 0;
    }

    /* 核心修改：视频容器样式 */
    .led_640 {
        width: 100%;
        margin: 0 auto; /* 居中 */
        aspect-ratio: 2.5 / 1; /* 设置2.5:1的宽高比 */
        overflow: hidden; /* 隐藏超出部分 */
        position: relative; /* 为视频绝对定位做准备 */
        background: #000; /* 视频加载前的背景色 */
    }

    .led_640 video {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); /* 居中 */
        width: 100%;
        height: 100%;
        object-fit: cover; /* 铺满容器，保持比例，裁剪超出部分 */
    }

    /* 分类和过滤器样式优化（可选） */
    .wrapper {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        margin-top: 15px;
    }

    .cate {
        padding: 8px 16px;
        background: #f5f5f5;
        border-radius: 4px;
        cursor: pointer;
    }

    .wrapper .item {
        width: 400px;
        border: 1px solid #eee;
        padding: 15px;
        border-radius: 8px;
    }

    .thumbnails img {
        width: 100%;
        object-fit: cover;
        border-radius: 4px;
    }
</style>