<!-- src/routes/dynamic/components/preview/Comment_LIST.svelte -->
<script lang="ts">
    //
    interface UserInfo {
        id: number;
        user_nickname: string;
        avatar_url: string;
    }

    interface Comment {
        id: number;
        uid: number;
        content: string;
        user_info: UserInfo;
        // 可选：补充时间、IP、设备等字段，让数据更完整
        create_time?: string;
        ip_location?: string;
        device_info?: string;
        like_count?: number;
        dislike_count?: number;
    }

    // 评论列表 Props，默认值更贴近真实场景
    export let comments: Comment[] = [{
        id: 1,
        uid: 1000045128,
        content: "我爱你呀~",
        create_time: "2024-04-06 17:41:59",
        ip_location: "南宁市",
        device_info: "iPhone_17_Pro_max 2TB",
        like_count: 10086,
        dislike_count: 0,
        user_info: {
            id: 1000084511,
            user_nickname: "用户a",
            avatar_url: "11.jpg"
        },
    }];
</script>

<div class="comments_list">
    <!--  -->
    {#each comments as c (c.id)}
        <div class="comment" id="comment-{c.id}">
            <div class="user_info">
                <a href="/u/{c.user_info.id}">
                    <img class="avatar_32" src="{c.user_info.avatar_url}" alt="{c.user_info.user_nickname}">
                </a>
                <a href="/u/{c.user_info.id}" class="nickname">
                    {c.user_info.user_nickname}
                </a>
            </div>
            <div class="content">
                <p>{c.content}</p>
                <!-- 可扩展：如果有媒体内容，这里可以加条件渲染 -->
                <!-- {#if c.media}
                    <media src={c.media} />
                {/if} -->
            </div>
            <div class="meta_data">
                <div class="time">{c.create_time}</div>
                <div class="ip">{c.ip_location}</div>
                <div class="device">{c.device_info}</div>
                <div class="likes">点赞：{c.like_count}</div>
                <div class="dislikes">踩：{c.dislike_count}</div>
            </div>
        </div>
    {/each}

    <!-- 空状态提示 -->
    {#if comments.length === 0}
        <div class="empty-tip">暂无评论</div>
    {/if}
</div>

<style>
    .comments_list {
        width: 400px;
        max-height: 600px; /* 限制高度，配合滚动 */
        overflow-y: auto;
        padding: 10px;
        gap: 15px;
        display: flex;
        flex-direction: column;
    }

    .comment {
        padding: 10px;
        border-bottom: 1px solid #eee;
    }

    .user_info {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
    }

    .avatar_32 {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
    }

    .nickname {
        font-size: 14px;
        color: #333;
        text-decoration: none;
    }

    .content {
        margin-bottom: 8px;
    }

    .content p {
        margin: 0;
        font-size: 14px;
        line-height: 1.5;
        color: #666;
    }

    .meta_data {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        font-size: 12px;
        color: #999;
    }

    .empty-tip {
        text-align: center;
        padding: 20px;
        color: #999;
        font-size: 14px;
    }
</style>