// routes/api/video/nearby/+server.ts

import {getNearbyList} from '$lib/api/video.ts';
import type {ApiRequestBody} from '$lib/models/api.ts';
import type {RequestHandler} from './$types';

// @ts-ignore
export const GET: RequestHandler = async ({ url }) => {
    const params: ApiRequestBody = {
        lat: url.searchParams.get('lat') || '',
        lng: url.searchParams.get('lng') || '',
        p: Number(url.searchParams.get('p') || 1)
    };

    try {
        const data = await getNearbyList(params);
        return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
    } catch (err) {
        return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 });
    }
};
