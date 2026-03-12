<!-- src/routes/console/+page.svelte -->


<script>
</script>

<div class="line_100"></div>

<div class="banner">
    <div class="banner_480">
        <!-- 用户资料 -->
        <img alt="SvelteKit" class="avatar_240"
             src="https://cdn1.damawei.com/1000018171_IOS_20251125134017_cerFace.png"/>
        <text>草莓味冰淇淋🍦</text>


        <button>二维码</button>

        <!-- 社交信息 -->
        <text>
            <a href="https://github.com/damawei/sveltekit-blog">Fans: <label class="qty">10.7w</label></a>
        </text>
        <text>
            <a href="https://github.com/damawei/sveltekit-blog">Follows: <label class="qty">4.1k</label></a>
        </text>
        <text>
            <a href="https://github.com/damawei/sveltekit-blog">Likes: <label class="qty">510.8w</label></a>
        </text>
    </div>
</div>

<div class="banner">
    <div class="black_card">
        <div class="wallet">
            <div class="wallet_item">
                Balance
                <h1>107,481.00</h1>
            </div>
            <div class="wallet_item">
                Coins
                <h1>601,100,001</h1>
            </div>

            <div class="wallet_item">
                Points
                <h1>107,481</h1>
            </div>
        </div>
    </div>
</div>

<!-- 创作中心 -->
<div class="banner">
    <div class="create_center">
        <div class="content">
            <div class="content_item">
                <img alt="SvelteKit" class="icon_100"
                     src="https://cdn1.damawei.com/1000018171_IOS_20251125134017_cerFace.png"/>
                <text class="name">动态</text>
            </div>

            <div class="content_item">
                <img alt="SvelteKit" class="icon_100"
                     src="http://cdn1.damawei.com/20200325_5e7a73900d3f9.jpg?imageView2/1/w/200/h/200"/>
                <text class="name">实况</text>
            </div>

            <div class="content_item">
                <img alt="SvelteKit" class="icon_100"
                     src="https://cdn1.damawei.com/1000018171_IOS_20251125134017_cerFace.png"/>
                <text class="name">商品</text>
            </div>

            <div class="content_item">
                <img alt="SvelteKit" class="icon_100"
                     src="https://cdn1.damawei.com/1000018171_IOS_20251125134017_cerFace.png"/>
                <text class="name">视频</text>
            </div>

            <div class="content_item">
                <img alt="SvelteKit" class="icon_100"
                     src="https://cdn1.damawei.com/1000018171_IOS_20251125134017_cerFace.png"/>
                <text class="name">队列</text>
            </div>

        </div>
    </div>
</div>


<style>
    .banner_480 {
        margin: 20px;
        padding: 20px;
        background-color: #f1f1f1;
        border-radius: 20px;
    }

    .avatar_240 {
        width: 240px;
    }

    .black_card {
        margin: 20px;
        padding: 20px;
        height: 160px;
        /*aspect-ratio: 4 / 1;*/
        max-height: 340px;
        background-color: #0f0f0f;
        border-radius: 20px;
    }

    .wallet {
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #ffffff;
        align-items: center;
    }

    .wallet_item {
        display: block;
        height: 140px;

    }

    .content {
        display: flex;
        margin: 20px;
        padding: 20px;
        height: auto;
        aspect-ratio: 5 / 1;
        background-color: #f0f0f0;
        border-radius: 20px;
        justify-content: space-around;
        align-items: center; /* 子项垂直居中（提升体验） */
        gap: 10px;
        overflow-x: auto;
    }

    .content_item {
        width: 120px;
        text-align: center; /* 文字水平居中 */
        color: #fff; /* 适配深色背景，文字显白 */
        flex-shrink: 0; /* 禁止子项被压缩（保持120px宽度） */
        color: var(--text-primary);
    }

    .content_item .icon_100 {
        width: 100px;
        height: 100px;
    }
</style>
