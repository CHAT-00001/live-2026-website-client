<!-- src/routes/market/goods/[id]+page.svelte - 商品详情页 -->

<script lang="ts">
    import PreviewDisplay from '$lib/ui/kit/PreviewDisplay.svelte';

    export let data;

    // 预览控制状态
    let previewSession = {
        isOpen: false,
        list: [] as any[],
        index: 0,
        originEl: null as HTMLElement | null
    };

    // 收藏状态
    let isCollected = data.goodsInfo?.iscollect === '1';
    let collectCount = Number(data.goodsInfo?.collects ?? 0);

    // 统一获取所有可预览的 DOM 元素
    function getMediaNodes() {
        return Array.from(document.querySelectorAll('[data-preview-item]')) as HTMLElement[];
    }

    function handleOpen(e: MouseEvent) {
        const target = e.currentTarget as HTMLElement;
        const nodes = getMediaNodes();

        const list = nodes.map(el => ({
            src: el.getAttribute('data-src') || '',
            videoUrl: el.getAttribute('data-video') || '',
            type: parseInt(el.getAttribute('data-type') || '1')
        }));

        const index = nodes.indexOf(target);

        previewSession = {
            isOpen: true,
            list,
            index: index >= 0 ? index : 0,
            originEl: target
        };
    }

    function onPreviewChange(e: CustomEvent) {
        const newIndex = e.detail.index;
        const nodes = getMediaNodes();
        previewSession.index = newIndex;
        previewSession.originEl = nodes[newIndex];
    }

    // 收藏切换（静态 UI，不请求接口）
    function toggleCollect() {
        isCollected = !isCollected;
        collectCount += isCollected ? 1 : -1;
    }
</script>

<svelte:head>
    <title>{data.goodsInfo?.name ?? "商品详情"} - 商品详情页</title>
</svelte:head>

<div class="product-page">
    {#if data.goodsInfo}
        <!-- 商品主图与缩略图 -->
        <section class="media-section">
            <div class="goods_main">
                <img class="big_thumb" src={data.goodsInfo.thumbs_format?.[0]} alt={data.goodsInfo.name}/>
            </div>
            <div class="thumbs_scroll">
                {#each data.goodsInfo.thumbs_format as thumb}
                    <img src={thumb}
                         class="thumb-card"
                         data-preview-item
                         data-src={thumb}
                         data-type="1"
                         on:click={handleOpen}
                         alt="商品缩略图"/>
                {/each}
            </div>
        </section>

        <!-- 商品基本信息 -->
        <section class="goods-info">
            <h2 class="goods-title">{data.goodsInfo.name}</h2>
            <div class="price-row">
                <span class="original-price">原价：¥{data.goodsInfo.original_price}</span>
                <span class="current-price">现价：¥{data.goodsInfo.present_price}</span>
            </div>
            <ul class="goods-meta">
                <li>产地：{data.goodsInfo.city ?? '未知'}</li>
                <li>物流方式：标准快递</li>
                <li>发货地：{data.goodsInfo.address ?? '未知'}</li>
                <li>销量：{data.goodsInfo.sale_nums}</li>
            </ul>
        </section>

        <!-- 商品规格 -->
        <section class="goods-specs">
            <h3>可选规格</h3>
            {#each data.goodsInfo.specs_format as spec}
                <div class="spec-item">
                    <img src={spec.thumb} alt={spec.spec_name} class="spec-thumb"/>
                    <div class="spec-info">
                        <span class="spec-name">{spec.spec_name}</span>
                        <span class="spec-price">¥{spec.price}</span>
                        <span class="spec-stock">库存：{spec.spec_num}</span>
                    </div>
                </div>
            {/each}
        </section>

        <!-- 支付方式 -->
        <section class="payment-methods">
            <h3>支付方式</h3>
            <ul class="pay_list_item">
                <li>
                    <img src="/assets/images/pay/Alipay.png" alt="Alipay" class="img_100"/>
                    <span>支付宝</span>
                </li>
                <li>
                    <img src="/assets/images/pay/WeChatPay.png" alt="WeChat" class="img_100"/>
                    <span>微信支付</span>
                </li>
                <li>
                    <img src="/assets/images/pay/PayPal.png" alt="Paypal" class="img_100"/>
                    <span>PayPal</span>
                </li>
                <li>
                    <img src="/assets/images/pay/Mastercard.png" alt="Mastercard" class="img_100"/>
                    <span>万事达</span>
                </li>
                <li>
                    <img src="/assets/images/pay/Visa.png" alt="Visa" class="img_100"/>
                    <span>Visa</span>
                </li>
                <li>
                    <img src="/assets/images/pay/Stripe.png" alt="Sprite" class="img_100"/>
                    <span>Sprite</span>
                </li>
                <li>
                    <img src="/assets/images/pay/ApplePay.png" alt="Sprite" class="img_100"/>
                    <span>ApplePay</span>
                </li>
            </ul>
        </section>

        <!-- 商品详情 -->
        <section class="goods-detail">
            <h3>商品详情</h3>
            <p>{data.goodsInfo.goods_desc || '暂无详情描述'}</p>
        </section>

        <!-- 店铺摘要 -->
        <section class="shop-info">
            <h3>店铺信息</h3>
            <div class="shop-card">
                <img src={data.shopInfo?.avatar} alt="店铺头像" class="shop-avatar"/>
                <div class="shop-meta">
                    <span class="shop-name">{data.shopInfo?.name}</span>
                    <span class="shop-nickname">{data.shopInfo?.user_nickname}</span>
                    <span>综合评分：{data.shopInfo?.composite_points}</span>
                </div>
            </div>
        </section>

        <!-- 用户评论 -->
        <section class="comments-section">
            <h3>用户评价 ({data.commentLists.length})</h3>
            {#each data.commentLists as comment}
                <div class="comment-card">
                    <div class="user-info">
                        <img src={comment.avatar} class="avatar" alt="头像"/>
                        <span class="name">{comment.user_nickname}</span>
                    </div>
                    <p class="content">{comment.content}</p>

                    <div class="media-grid">
                        {#if comment.media_type === 2}
                            <div class="grid-item video-type"
                                 data-preview-item
                                 data-src={comment.video_thumb}
                                 data-video={comment.video_url}
                                 data-type="2"
                                 on:click={handleOpen}>
                                <img src={comment.video_thumb} alt="视频缩略图"/>
                                <i class="play-icon"></i>
                            </div>
                        {/if}
                        {#each (comment.thumb_format || []) as img}
                            <img src={img}
                                 class="grid-item"
                                 data-preview-item
                                 data-src={img}
                                 data-type="1"
                                 on:click={handleOpen}
                                 alt="评论图片"/>
                        {/each}
                    </div>
                </div>
            {/each}
        </section>

    {:else}
        <p class="empty-msg">商品信息无法显示，请稍后重试。</p>
    {/if}
</div>

<!-- 图片预览 -->
{#if previewSession.isOpen}
    <PreviewDisplay
            allList={previewSession.list}
            currentIndex={previewSession.index}
            originElement={previewSession.originEl}
            on:change={onPreviewChange}
            on:close={() => previewSession.isOpen = false}
    />
{/if}

<!-- 底部固定购买栏 -->
<div class="bottom-bar">
    <div class="bar-left">
        <button class="collect-btn" on:click={toggleCollect}>
            {#if isCollected}
                <span>❤️ 已收藏</span>
            {:else}
                <span>🤍 收藏</span>
            {/if}
            <span> ({collectCount})</span>
        </button>
        <button class="chat-btn">
            💬 联系客服
        </button>
    </div>
    <div class="bar-right">
        <button class="add-cart">加入购物车</button>
        <button class="buy-now">立即购买</button>
    </div>
</div>

<style>
    /* 页面基础布局 */
    .product-page {
        max-width: 640px;
        margin: 0 auto;
        background: #f9f9f9;
        min-height: 100vh;
        padding-bottom: 120px; /* 底部栏留空 */
    }

    /* 商品主图和缩略图 */
    .media-section {
        background: #fff;
        padding: 15px;
        border-radius: 12px;
        margin: 15px 0;
    }

    .goods_main {
        text-align: center;
        margin-bottom: 10px;
    }

    .big_thumb {
        width: 100%;
        max-width: 480px;
        border-radius: 12px;
        object-fit: cover;
    }

    .thumbs_scroll {
        display: flex;
        gap: 10px;
        overflow-x: auto;
        margin-top: 10px;
    }

    .thumb-card {
        width: 80px;
        height: 80px;
        border-radius: 8px;
        object-fit: cover;
        cursor: pointer;
        border: 1px solid #ddd;
        transition: 0.2s all;
    }

    .thumb-card:hover {
        transform: scale(1.05);
        border-color: #aaa;
    }

    /* 商品信息 */
    .goods-info, .goods-specs, .payment-methods, .goods-detail, .shop-info, .comments-section {
        background: #fff;
        padding: 15px;
        border-radius: 12px;
        margin-bottom: 15px;
    }

    .goods-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .price-row {
        display: flex;
        gap: 15px;
        margin-bottom: 10px;
    }

    .original-price {
        text-decoration: line-through;
        color: #999;
    }

    .current-price {
        color: #e60012;
        font-weight: bold;
    }

    .goods-meta {
        list-style: none;
        padding: 0;
        font-size: 14px;
        color: #555;
    }

    .goods-meta li {
        margin: 4px 0;
    }

    /* 规格 */
    .spec-item {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 10px;
    }

    .spec-thumb {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 6px;
    }

    .spec-info {
        display: flex;
        flex-direction: column;
        font-size: 14px;
    }

    .spec-name {
        font-weight: bold;
    }

    .spec-price {
        color: #e60012;
    }

    .spec-stock {
        color: #999;
    }

    /* 支付方式 */
    .pay_list_item {
        display: flex;
        gap: 15px;
        list-style: none;
        padding: 0;
    }

    .pay_list_item li {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
    }

    .img_100 {
        width: 40px;
        height: 40px;
        object-fit: contain;
        margin-bottom: 4px;
    }

    /* 店铺摘要 */
    .shop-card {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .shop-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .shop-meta {
        display: flex;
        flex-direction: column;
        font-size: 14px;
    }

    /* 评论 */
    .comment-card {
        padding: 10px 0;
        border-bottom: 1px solid #eee;
    }

    .user-info {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 6px;
    }

    .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
    }

    .content {
        font-size: 14px;
        color: #333;
        margin-bottom: 8px;
        line-height: 1.5;
    }

    .media-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        margin-top: 6px;
    }

    .grid-item {
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
        border-radius: 6px;
        cursor: pointer;
    }

    .video-type {
        position: relative;
        background: #000;
    }

    .video-type img {
        opacity: 0.7;
    }

    .play-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 24px;
        height: 24px;
        background: #fff;
        border-radius: 50%;
        clip-path: polygon(35% 25%, 35% 75%, 80% 50%);
    }

    /* 底部固定栏 */
    .bottom-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.8);
        border-top: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px;
        z-index: 100;
        backdrop-filter: blur(20px);
    }

    .bar-left {
        display: flex;
        gap: 10px;
    }

    .bar-right {
        display: flex;
        gap: 10px;
    }

    .collect-btn, .chat-btn, .add-cart, .buy-now {
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        cursor: pointer;
        border: none;
    }

    .collect-btn {
        background: #fff;
        border: 1px solid #e60012;
        color: #e60012;
    }

    .chat-btn {
        background: #f0f0f0;
    }

    .add-cart {
        background: #ff9500;
        color: #fff;
    }

    .buy-now {
        background: #e60012;
        color: #fff;
    }
</style>
