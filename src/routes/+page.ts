// src/routes/+page.ts
import type { PageLoad } from './$types';
import type { ApiResponse, VideoListResponse, VideoList } from '$lib/models/video';

const pageSize = 20;     // 每页 20 条
const MAX_PAGE = 20;      // 最多加载 20 次

export const load: PageLoad = async ({ fetch, url }) => {
    const page = Math.max(Number(url.searchParams.get('p')) || 1, 1);

    // ⛔ 超过最大页数，直接返回空，防止继续请求
    if (page > MAX_PAGE) {
        console.warn(`【分页终止】已超过最大页数 ${MAX_PAGE}`);
        return {
            videos: [],
            total: pageSize * MAX_PAGE,
            currentPage: page,
            hasMore: false,
            pageSize: pageSize,
            error: null
        };
    }

    const uid = '1000008801';
    const host = 'http://api2.damawei.com:8080';
    const apiUrl = `${host}/appapi?s=video.getVideoList&uid=${uid}&p=${page}&pageSize=${pageSize}`;

    console.log(`【分页请求】页码：${page}，URL：${apiUrl}`);

    try {
        const response = await fetch(apiUrl, { credentials: 'include' });
        console.log(`【响应状态】${response.status}`);

        if (!response.ok) {
            return {
                videos: [],
                total: 0,
                currentPage: page,
                hasMore: false,
                pageSize: pageSize,
                error: { msg: `服务器错误: ${response.status}` }
            };
        }

        const result = (await response.json()) as ApiResponse<VideoListResponse>;
        console.log(`【接口返回】`, result);

        const businessData = result.data;

        if (businessData.code === 0) {
            const videos = (businessData.info || []) as VideoList[];

            // ✅ 无限滚动核心判断逻辑
            const hasMore =
                page < MAX_PAGE && videos.length === pageSize;

            console.log(
                `【分页结果】页码=${page}，数量=${videos.length}，hasMore=${hasMore}`
            );

            return {
                videos,
                total: pageSize * MAX_PAGE, // 前端虚拟 total
                currentPage: page,
                hasMore,
                pageSize: pageSize,
                error: null
            };
        }

        return {
            videos: [],
            total: 0,
            currentPage: page,
            hasMore: false,
            pageSize: pageSize,
            error: { msg: businessData.msg || '获取数据失败' }
        };
    } catch (error) {
        console.error(`【请求异常】`, error);
        return {
            videos: [],
            total: 0,
            currentPage: page,
            hasMore: false,
            pageSize: pageSize,
            error: { msg: '无法连接到服务器，请检查网络' }
        };
    }
};
