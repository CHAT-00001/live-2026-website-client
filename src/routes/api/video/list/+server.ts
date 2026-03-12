// src/routes/api/video/list/+server.ts  -- 短视频列表接口

import {json} from '@sveltejs/kit';
import {getVideoList2} from '$lib/api/video';

////////

export const GET = async ({url}) => {
    const page = Number(url.searchParams.get('page') || 1);
    const result = await getVideoList2({p: page});

    // 数据层日志..
    console.log("[ LoadMore ] - Page = ", page);
    return json(result);
};