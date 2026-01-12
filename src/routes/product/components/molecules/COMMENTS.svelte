<!-- src/routes/video/components/molecules/COMMENTS.svelte -->
<!-- 视频评论 2025-12-22 16:43:10 -->

<script lang="ts">
    import {onMount} from 'svelte';
    import type {CommentItem} from '$lib/models/comments';

    /** 父组件传入 */
    export let video_id: string | number;

    let list: CommentItem[] = [];
    let p = 1;
    let loading = false;
    let maxPages = 20;

    /** 评论总数 */
    let totalComments = 0;

    const lat = '22.332214';
    const lng = '108.361544';

    async function loadMore() {
        if (loading || p > maxPages) return;
        loading = true;

        try {
            const params = new URLSearchParams({
                video_id: String(video_id),
                lat,
                lng,
                p: String(p)
            });

            const res = await fetch(`/api/video/comments/list?${params.toString()}`);
            if (!res.ok) throw new Error('API Error');

            const json = await res.json();
            const info = json?.data?.info?.[0];
            if (!info) return;

            totalComments = info.comments ?? 0;

            const newList: CommentItem[] = info.commentlist ?? [];
            if (newList.length > 0) {
                list = [...list, ...newList];
                p += 1;
            }
        } catch (err) {
            console.error(err);
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        loadMore();

        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });
</script>

<div class="wrapper">
    <h4>评论（{totalComments}）</h4>
</div>

<div class="wrapper">
    <div class="bucket">
        <div class="push">
            <h4>发布评论</h4>
            <textarea></textarea>
            <div class="media">
                <div class="item">+</div>
            </div>
            <input type="submit" value="发表">
        </div>
        <div class="comment-list">

            {#if !loading && totalComments === 0}
                <p class="empty">
                    哇！这里还是空的呀~！赶紧发表第一条评论吧！
                </p>
            {/if}

            {#each list as item (item.id)}
                <div class="comment-item" id="{item.id.toString()}">
                    <div class="user_info">
                        <div class="avatar_48">
                            <a target="_blank" href="/u/{item.userinfo.id}"><img class="avatar_48"
                                                                                 src="{item.userinfo.avatar}"/></a>
                        </div>
                        <div class="nickname">
                            <a target="_blank" href="/u/{item.userinfo.id}">{item.userinfo.user_nickname}</a>
                        </div>
                    </div>

                    <!-- 评论内容（按 type） -->
                    <div class="content">
                        <h4>{item.content}</h4>
                    </div>
                    <div class="photo"></div>
                    <div class="audio"></div>
                    <div class="option">
                        <div class="data">{item.datetime}</div>
                        <div class="menu">
                            点赞: {item.likes}
                            回复: {item.replys}
                        </div>
                    </div>
                </div>
            {/each}

            {#if loading}
                <p>加载中...</p>
                <p>Wait...</p>
            {/if}
        </div>
    </div>
</div>

<style>
    .bucket {
        overflow-x: hidden;
        overflow-y: scroll;
        max-height: 1024px;
    }

    .bucket .push {
        margin: 20px;
        padding: 10px;
        border-radius: 10px;
        border: dashed 2px color(display-p3 1023 1023 1023 / 1);
    }

    .bucket textarea {
        display: inline-flex;
        padding: 10px;
        width: auto;
        height: 50px;
    }

    .bucket .media .item {
        display: block;
        width: 100px;
        height: 100px;
        text-align: center;
        align-items: center;
        font-size: 4em;
    }

    .comment-item {
        margin: 20px;
        padding: 20px;
        border-radius: 20px;
        background: var(--bg-gray);
    }

    .user_info {
        display: flex;
        align-items: center;
    }

    .avatar_48 {
        width: 48px;
        height: 48px;
        border-radius: 10%;
    }

    .nickname {
        margin-left: 10px;
        font-weight: bold;
    }

    .content {
        margin: 10px 0;
    }

    .photo,
    .emoji {
        max-width: 200px;
        border-radius: 8px;
    }

    .redpacket {
        padding: 10px;
        background: #ffecec;
        border-radius: 8px;
        color: #c00;
    }

    .empty {
        text-align: center;
        padding: 40px 0;
        color: #999;
    }
</style>
