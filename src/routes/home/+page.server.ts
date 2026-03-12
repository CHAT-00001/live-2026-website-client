// routes/video/home/+page.server.ts

import {getVideoList} from '$lib/api/video.ts';
import type {ApiUrlParms} from '$lib/models/api.ts';
import {error} from '@sveltejs/kit';
import type {PageServerLoad} from './$types';

/**
 * 视频列表SSR数据结果构造
 * @param url
 * @param locals
 */
export const load: PageServerLoad = async ({url, locals}) => {

    // 1. 构造参数（可以从 locals 拿到 requestId 用于全链路追踪）
    const params: ApiUrlParms = {
        lat: url.searchParams.get('lat') ?? '',
        lng: url.searchParams.get('lng') ?? '',
        p: Number(url.searchParams.get('p') || 1),    // 兼容旧版PHP接口
        page: Number(url.searchParams.get('page') || 1)
    };

    try {
        // 2. 调用 API
        const result = await getVideoList(params);

        // 3. 校验并返回数据
        if (result.ret === 200 && result.data && result.data.info) {
            return {
                // ⚡ 这里的数据会变成前端的 $props().data.videos
                videos: result.data.info,
                pagination: {
                    current_page: params.page,
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
            pagination: {current_page: params.page, has_more: false},
        };

    } catch (err) {
        console.error('--- SSR Error Detail ---');
        console.error('\x1b[31m[Server Error]\x1b[0m 视频加载失败:', err);
        throw error(500, '视频获取失败');
    }
};