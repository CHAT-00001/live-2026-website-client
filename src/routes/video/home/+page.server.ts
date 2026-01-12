// routes/video/home/+page.server.ts
import {getVideoList} from '$lib/api/video_api.ts';
import type {ApiRequestBody} from '$lib/models/api.ts';
import {error} from '@sveltejs/kit';
import type {PageServerLoad} from './$types';

export const load: PageServerLoad = async ({url}) => {
    const params: ApiRequestBody = {
        lat: url.searchParams.get('lat') ?? '',
        lng: url.searchParams.get('lng') ?? '',
        p: Number(url.searchParams.get('p') || 1)
    };

    try {
        const result = await getVideoList(params);

        // 注意：根据你提供的 JSON，数据在 result.data.info 里面
        if (result.ret === 200 && result.data && result.data.info) {
            return {
                videos: result.data.info, // 直接把这一组视频数组传给前端
                pagination: {
                    current_page: params.p,
                    has_more: result.data.info.length > 0
                }
            };
        }

        return {
            videos: [],
            pagination: {current_page: params.p, has_more: false}
        };

    } catch (err) {
        console.error('API Error:', err);
        throw error(500, '视频获取失败');
    }
};