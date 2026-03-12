// src/routes/api/video/like/+server.ts -- 视频点赞接口

import {json} from '@sveltejs/kit';
import {setVideoLike} from '$lib/api/video';

////////


/**
 * 点赞视频
 * @param videoId as id
 * @constructor
 */
export const GET = async ({url}) => {
    const id = Number(url.searchParams.get('id') || 1);
    const result = await setVideoLike({id: id});

    // 数据层日志..
    console.log("[ SetLike ] - ID = ", id);
    return json(result);
};