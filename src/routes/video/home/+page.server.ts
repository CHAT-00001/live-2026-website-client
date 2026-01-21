// routes/video/home/+page.server.ts
import {getVideoList} from '$lib/api/video_api.ts';
import type {ApiRequestBody} from '$lib/models/api.ts';
import {error} from '@sveltejs/kit';
import type {PageServerLoad} from './$types';

// ⚡ 增量：如果你定义了 VideoItem 模型，建议在这里引入
// import type { VideoItem } from '$lib/models/video_model';

export const load: PageServerLoad = async ({url, locals}) => {
    // 1. 构造参数（可以从 locals 拿到 requestId 用于全链路追踪）
    const params: ApiRequestBody = {
        lat: url.searchParams.get('lat') ?? '',
        lng: url.searchParams.get('lng') ?? '',
        p: Number(url.searchParams.get('p') || 1)
    };

    try {
        // 2. 调用 API
        const result = await getVideoList(params);

        // 3. 校验并返回数据
        // 注意：根据你提供的 JSON，数据在 result.data.info 里面
        if (result.ret === 200 && result.data && result.data.info) {
            return {
                // ⚡ 这里的数据会变成前端的 $props().data.videos
                videos: result.data.info, // 直接把这一组视频数组传给前端
                pagination: {
                    current_page: params.p,
                    // 如果 info 长度达到 PAGE_SIZE(20)，通常认为还有下一页
                    has_more: result.data.info.length >= 20
                },
                // 顺便把请求 ID 传给前端，方便前端日志对应
                requestId: (locals as any).requestId
            };
        }

        // 4. 兜底返回
        return {
            videos: [],
            pagination: {current_page: params.p, has_more: false}
        };

    } catch (err) {
        // 使用我们之前约定的颜色日志（可选）
        console.error('\x1b[31m[Server Error]\x1b[0m 视频加载失败:', err);
        throw error(500, '视频获取失败');
    }
};