<script>
    ////////
</script>

<footer class="footer_led">
    <div class="grid-container">
        <div class="item">
            <div class="contact-card">
                <h4><i class="bi bi-telephone"></i> Tel:+1-1008-600154</h4>
                <h4><i class="bi bi-envelope-check"></i> Email: led2024@gmail.com</h4>
                <h4><i class="bi bi-geo-alt-fill"></i> Address: CN2 - Guangdong - Shenzhen Nanshan Zone</h4>
                <h4><i class="bi bi-alarm"></i> Open Time: 08:00 - 18:00 utc e8</h4>
            </div>
        </div>
        <div class="item">
            <div class="copyright">
                <div class="footer_logo">
                    <i class="bi bi-chat-left-fill fs-3 mx-2"></i>
                </div>
                <div>copyright 2026</div>
            </div>
        </div>
        <div class="item">
            <div class="sns-net">
                <a href="https://www.instagram/led" target="_blank"><i class="bi bi-instagram fs-3 mx-2"
                                                                       style="font-size: 24px;color: #333333"></i> </a>
                <a href="https://youtube.com/eac1600ae7841" target="_blank"><i class="bi-youtube fs-3 mx-2"
                                                                               style="font-size: 24px;color: #ff0000"></i>
                </a>
                <a href="https://tiktok.com/u/415644464" target="_blank"><i class="bi-tiktok fs-3 mx-2"
                                                                            style="font-size: 24px;color: #000000"></i>
                </a>
                <a href="https://facebook.com/165964944004" target="_blank"><i class="bi-facebook fs-3 mx-2"
                                                                               style="font-size: 24px;color: #0066ff"></i>
                </a>
            </div>
        </div>
        <div class="item">
            <div class="links">
                <h4><a href="/dynamic" target="_top">Note</a></h4>
                <h4><a href="/video" target="_top">Video</a></h4>
                <h4><a href="/photo" target="_top">Photo</a></h4>
                <h4><a href="/market" target="_top">Market</a></h4>
                <h4><a href="/product" target="_top">Product</a></h4>
                <h4><a href="/app" target="_top">App</a></h4>
                <h4><a href="/maps" target="_top">Maps</a></h4>
            </div>
        </div>
    </div>
</footer>

<style>
    .footer_led {
        margin: 20px;
        padding: 20px;
        background: var(--led-bg-color);
        border-radius: 20px;
    }

    /* 父容器：核心 Grid 布局 + 响应式配置 */
    .grid-container {
        /* Grid 基础设置 */
        display: grid;
        /* 列间距（可选，根据需求调整） */
        gap: 10px;
        /* 响应式断点：从小到大（移动端优先） */
        /* 480px 以下：4行1列 */
        grid-template-columns: repeat(1, 1fr);
    }

    /* 子元素：仅做样式美化，无布局逻辑 */
    .item {

        /*background: #f5f5f5;*/
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* 断点1：480px - 960px，2行2列 */
    @media (min-width: 480px) {
        .grid-container {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    /* 断点2：960px 以上，4列 + 最小列宽240px */
    @media (min-width: 960px) {
        /* minmax(240px, 1fr)：列宽最小240px，超出部分均分 */
        .grid-container {
            grid-template-columns: repeat(4, minmax(240px, 1fr));
        }
    }

    .copyright {
        display: flex;
        padding: 20px;
        text-align: center;
        color: #00ff00;
    }

    .sns-net {
        display: flex;
        padding: 20px;
    }

    .sns-net a {
        margin: 10px;
    }

    .sns-net a i {
        width: 48px;
    }
</style>