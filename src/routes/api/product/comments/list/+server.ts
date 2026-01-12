// routes/api/video/comments/+server.ts
// 视频评论

import {getComments} from '$lib/api/video.ts';
import type {ApiRequestBody} from '$lib/models/api.ts';
import type {RequestHandler} from './$types';

export const GET: RequestHandler = async ({url}) => {
    const params: ApiRequestBody = {
        video_id: url.searchParams.get('video_id') || '',
        lat: url.searchParams.get('lat') || '',
        lng: url.searchParams.get('lng') || '',
        p: Number(url.searchParams.get('p') || 1)
    };

    try {
        const data = await getComments(params);
        return new Response(JSON.stringify(data), {
            headers: {'Content-Type': 'application/json'}
        });
    } catch (err) {
        return new Response(
            JSON.stringify({error: (err as Error).message}),
            {status: 500}
        );
    }
};
