<!-- src/routes/video/components/molecules/CommentSend.svelte -->

<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();
    export let videoId: string;
    let text = '';

    async function submit() {
        const res = await fetch('/api/comments', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({videoId, text})
        });

        if (res.ok) {
            dispatch('submitted');
            text = '';
        }
    }

    let post = "发布";

    // 检测评论文字数量，最大值500
    let count = 500;
</script>
<!-- 发布评论 -->
<div class="comment-send">
    <h4>发布评论</h4>
    <em>可以发布文字、语音、视频、照片、实况照片喔~</em>
    <textarea bind:value={text} class="send_bar" placeholder="Write a comment..."></textarea>
    <message>你还可以输入{count}个字符!</message>
    <media>
        <div class="video">
            <div class="audio">
                <button>开始录音⏺️</button>
            </div>
        </div>
        <div class="thumb">
            <button>添加照片</button>
        </div>
        <!-- 显示已经添加的照片,可拖拽改变排序,可删除。最多可以发4张照片 -->
        <div class="thumb">
            <img class="thumb_100" src="/"/>
            <button class="del">删除</button>
        </div>
    </media>
    <button on:click={submit}>{post}</button>
</div>

<style>
    textarea {
        width: 400px;
        height: 100px;
        padding: 10px;
        border: solid 2px #999999;
        border-radius: 5px;
    }

    textarea:active {
        border-color: #2ed573;
    }

    .thumb {
        position: relative;
        margin: 10px;
        width: 100px;
        height: 100px;
    }

    .thumb .del {
        position: absolute;
        top: -12px;
        right: -12px;
        width: 24px;
        height: 24px;
        background: #ff0000;
    }
</style>
