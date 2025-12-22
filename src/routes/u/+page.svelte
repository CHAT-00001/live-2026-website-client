<!-- src/routes/+page.svelte -->
<script>
    // 模拟的视频数据
    // 在真实项目中，这些数据通常来自一个 API 调用
    const videos = [
        {
            id: '1',
            title: '这是我的第一条SvelteKit短视频！',
            thumbnail: 'https://picsum.photos/seed/svelte1/640/360',
            author: 'Svelte爱好者',
            views: '1.2万'
        },
        {
            id: '2',
            title: 'SvelteKit vs Next.js 性能大比拼',
            thumbnail: 'https://picsum.photos/seed/svelte2/640/360',
            author: '技术测评君',
            views: '3.4万'
        },
        {
            id: '3',
            title: '用SvelteKit制作一个漂亮的动画',
            thumbnail: 'https://picsum.photos/seed/svelte3/640/360',
            author: '动画师小A',
            views: '8.7千'
        },
        {
            id: '4',
            title: 'SvelteKit从入门到精通',
            thumbnail: 'https://picsum.photos/seed/svelte4/640/360',
            author: '全栈开发笔记',
            views: '5.1万'
        },
    ];
</script>

<div class="video-list-container">
    <h1>热门短视频</h1>
    <div class="video-grid">
        {#each videos as video}
            <!-- 使用 <a> 标签进行客户端路由，SvelteKit 会自动处理 -->
            <a href={`/video/${video.id}`} class="video-card">
                <div class="thumbnail-container">
                    <img src={video.thumbnail} alt={video.title} class="thumbnail" loading="lazy" />
                    <span class="duration">01:23</span>
                </div>
                <div class="video-info">
                    <h3 class="video-title">{video.title}</h3>
                    <p class="video-author">{video.author}</p>
                    <p class="video-views">{video.views} 次观看</p>
                </div>
            </a>
        {/each}
    </div>
</div>

<style>
    .video-list-container {
        max-width: 1200px;
        margin: 2rem auto;
        padding: 0 2rem;
    }

    .video-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
    }

    .video-card {
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease-in-out;
        text-decoration: none;
        color: inherit;
        background-color: #fff;
    }

    .video-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }

    .thumbnail-container {
        position: relative;
        padding-top: 56.25%; /* 16:9 Aspect Ratio */
        background-color: #000;
    }

    .thumbnail {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .duration {
        position: absolute;
        bottom: 4px;
        right: 4px;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        font-size: 0.75rem;
        padding: 2px 4px;
        border-radius: 2px;
    }

    .video-info {
        padding: 12px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }

    .video-title {
        font-size: 1rem;
        font-weight: 600;
        margin: 0 0 8px 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-height: 1.2;
    }

    .video-author {
        font-size: 0.85rem;
        color: #666;
        margin: 0 0 4px 0;
    }

    .video-views {
        font-size: 0.75rem;
        color: #999;
        margin: auto 0 0 0; /* 推到底部 */
    }
</style>