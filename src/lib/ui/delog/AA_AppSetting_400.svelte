<!-- src/routes/notify/+page.svelte 2026-01-10 12:04:20 -->
<script lang="ts">
    import {onDestroy, onMount} from 'svelte';

    // 当前时间
    let at = '';

    function updateTime() {
        at = new Date().toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }

    let timer: ReturnType<typeof setInterval>;

    onMount(() => {
        updateTime(); // 先立刻显示一次
        timer = setInterval(updateTime, 1000); // 每分钟更新
    });

    onDestroy(() => {
        clearInterval(timer);
    });

    let chat = [
        {
            id: 1,
            name: "草莓味冰淇淋06",
            at: "15秒前",
            last_msg: "你吃饭了吗？",
            unread_count: 0,
        }
    ]
</script>


<div class="line_100"></div>
<div class="line_100"></div>
<div class="time_bar">
    <span class="at">{at}</span>
</div>
<h1>Notify Center</h1>
<h4>通知中心</h4>
<div class="chat_list">
    <div class="bucket">
        <div class="bucket_item" id="10086">
            <div class="avatar">
                <img alt=""
                     class="avatar_48"
                     src="http://cdn1.damawei.com/android_10011147_20231207_232042_1622180.jpg?imageView2/2/w/200/h/200"/>
            </div>
            <div class="chat_info">
                <div class="name">草莓味冰淇淋06</div>
                <div class="msg">
                    <text>wwtre</text>
                    <time>14秒前</time>
                </div>
            </div>
            <div class="content">
                <a href="/video/10000000058">
                    <img alt=""
                         class="avatar_48" src="http://cdn1.damawei.com/20200420_5e9cbb83b92c9.jpg?imageView2/2/w/200/h/200"/>
                </a>
            </div>

        </div>
    </div>
</div>

<style>
    .time_bar .at {
        display: block;
        text-align: center;
        color: rgba(0, 0, 0, 0.8);
        font-size: 100px;
    }

    .bucket_item {
        display: flex;
        padding: 10px;
        height: 68px;
        background: #f1f1f1;
        border: 0.5px solid #dddddd;
        border-radius: 3px;
    }

    .bucket_item:hover {
        background: #0044ff;
        border: 0.5px solid #00aaff;
    }

    .avatar {
        margin: 0 10px;
    }

    .avatar_48 {
        width: 48px;
        height: 48px;
        border-radius: 10%;
    }

    .content {
        margin-left: auto;
    }
</style>