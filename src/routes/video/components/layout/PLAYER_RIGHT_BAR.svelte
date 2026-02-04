<script lang="ts">
    // 1. 合并定义接口，确保类型唯一
    interface Props {
        item: {
            id: any;
            uid: any;
            title: any;
            likes: any;
            comments: any;
            collects: any;
            shares: any;
            user_info: any;
            music_info: any;
        };
        operator_id?: number;
        // 统一使用 isRotating 接收父组件的旋转状态
        isRotating?: boolean;
    }

    // 2. 唯一一次解构 $props()
    let {
        item,
        operator_id = 1001,
        isRotating = false
    }: Props = $props();
</script>

<div class="right_bar">
    <div class="item">
        {#if item.user_info.is_livestream}
            <a class="live_tag" target="_blank" href="/live/stream/{item.uid}">LIVE</a>
        {/if}

        <div class="avatar">
            <a href="/u/{item.uid}" target="_blank">
                <img alt="{item.user_info.nickname}" class="avatar_48_r50p" src="{item.user_info.avatar_url}"/>
            </a>
            {#if !item.user_info.is_followed && operator_id !== item.user_info.id}
                <a class="add" href="javascript:">+</a>
            {/if}
        </div>

        <div class="like">
            <div><i class="bi bi-heart" style="font-size: 24px; color: #f00000"></i></div>
            <h4>{item.likes}</h4>
        </div>

        <div class="comment">
            <div><i class="bi bi-comment" style="font-size: 24px; color: #f00000"></i></div>
            <h4>{item.comments}</h4>
        </div>

        <div class="collect">
            <i>
                <svg height="40" viewBox="0 0 100 100" width="40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50,10 L61,35 L88,35 L66,52 L74,77 L50,62 L26,77 L34,52 L12,35 L39,35 Z" fill="white"/>
                </svg>
            </i>
            <h4>{item.collects}</h4>
        </div>

        <div class="share">
            <i>
                <svg height="40" viewBox="0 0 80 100" width="40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10,50 L40,10 L40,30 C70,30 75,70 60,90 C70,60 55,55 40,55 L40,75 Z" fill="white"/>
                </svg>
            </i>
            <h4>{item.shares}</h4>
        </div>

        <div class="music">
            <a href="/music/{item.music_info.id}">
                <img alt=""
                     class="avatar_48_r50p music-rotate {isRotating ? 'on' : ''}" src="{item.music_info.thumbnail || item.user_info.avatar_url}"/>
            </a>
        </div>
    </div>
</div>

<style>
    .right_bar {
        position: absolute;
        right: 10px;
        bottom: 80px;
        z-index: 100;
        color: white;
        text-align: center;
    }

    .right_bar .avatar {
        position: relative;
        margin-bottom: 20px;
    }

    .right_bar .add {
        display: block;
        position: absolute;
        left: 14px;
        bottom: -8px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #f00;
        color: #fff;
        line-height: 18px;
        font-weight: bold;
    }

    .avatar_48_r50p {
        display: block;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 2px solid #fff;
        object-fit: cover;
    }

    .music-rotate {
        animation: rotate 5s linear infinite;
        animation-play-state: paused;
    }

    .music-rotate.on {
        animation-play-state: running;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .item > div {
        margin-top: 15px;
    }

    h4 {

    }
</style>