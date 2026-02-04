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
            <i class="icon bi bi-heart-fill" style="color: #ff0000"></i>
            <h4>{item.likes}</h4>
        </div>

        <div class="comment">
            <i class="icon bi bi-chat-fill fs-3 mx-2" style=""></i>
            <h4>{item.comments}</h4>
        </div>

        <div class="collect">
            <i class="icon bi bi-bookmark-fill fs-3" style="color: #ffff00"></i>
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
                     class="avatar_48_r50p music-rotate {isRotating ? 'on' : ''}"
                     src="{item.music_info.thumbnail || item.user_info.avatar_url}"/>
            </a>
        </div>
    </div>
</div>

<style>
    .right_bar {
        position: absolute;
        right: 4px;
        bottom: 80px;
        width: 64px;
        z-index: 100;
        color: white;
        text-align: center;
    }

    .right_bar .avatar {
        position: relative;
        margin: 20px auto;
        width: 48px;
    }

    .right_bar .item .icon {
        font-size: 28px;
        color: #ffffff;
        opacity: 0.9;
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

    .music {
        margin: 10px auto;
        width: 48px;
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

    /* 3. 屏幕 1200-4800px：基准 h4 = 24px */
    @media (min-width: 1600px) and (max-width: 4800px) {
        .right_bar {
            position: absolute;
            right: 8px;
            bottom: 80px;
            width: 128px;
            z-index: 100;
            color: white;
            text-align: center;
        }

        .right_bar .avatar {
            position: relative;
            margin: 40px auto;
            width: 96px;
        }

        .right_bar .item .icon {
            font-size: 56px;
            color: #ffffff;
            opacity: 0.9;
        }

        .right_bar .add {
            display: block;
            position: absolute;
            left: 28px;
            bottom: -14px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #f00;
            color: #fff;
            line-height: 35px;
            font-size: 32px;
            font-weight: bold;
        }

        .avatar_48_r50p {
            display: block;
            width: 96px;
            height: 96px;
            border-radius: 50%;
            border: 2px solid #fff;
            object-fit: cover;
        }

        .music {
            margin: 10px auto;
            width: 96px;
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
    }
</style>