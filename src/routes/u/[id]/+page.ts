import type { PageLoad } from './$types';
import type { ApiResponse, Video } from '$lib/models/video';

export const load: PageLoad = async ({ fetch, params }) => {
    // 从路由参数获取视频ID
    const videoId = params.id;
    const uid = '10008801'; // 实际项目从登录态获取

    // 调用API：s=video.getVideoById + uid + videoid
    const apiUrl = `/api/appapi?s=video.getVideoById&uid=${uid}&videoid=${videoId}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        return {
            status: 404,
            error: new Error('视频加载失败')
        };
    }

    const result = (await response.json()) as ApiResponse<Video>;

    // 处理接口错误
    if (result.ret !== 200 || result.data.code !== 0 || !result.data.info) {
        return {
            status: 404,
            error: new Error(result.data.msg || '视频不存在')
        };
    }

    return {
        video: result.data.info as Video
    };
};