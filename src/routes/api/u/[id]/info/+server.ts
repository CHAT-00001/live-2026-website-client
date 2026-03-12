// src/routes/api/u/[id]/info/+server.ts


import {json} from '@sveltejs/kit';
import {AloneApi} from '$lib/api/user/info';

type CacheItem = {
    data: any;
    expire: number;
};

const CACHE_TTL = 1000 * 60 * 60; // 60分钟
const cache = new Map<string, CacheItem>();

export async function GET({params, url}) {

    const touid = Number(params.id);

    if (!touid) {
        return json({
            code: 400,
            msg: 'invalid uid',
            data: null
        });
    }

    const lat = Number(url.searchParams.get('lat') || 20.16444);
    const lng = Number(url.searchParams.get('lng') || 108.16245);

    const key = `user_profile:${touid}`;
    const now = Date.now();

    // 1 读取缓存
    const cached = cache.get(key);

    if (cached && cached.expire > now) {

        console.log(`[Cache Hit] touid=${touid}`);

        return json({
            code: 0,
            msg: 'ok',
            data: cached.data
        });
    }

    try {

        console.log(`[API Request] touid=${touid}`);

        const res = await AloneApi.getView(
            touid,
            '',
            '',
            lat,
            lng
        );

        const info = res?.data?.info ?? null;

        // 只有成功才缓存
        if (info) {
            cache.set(key, {
                data: info,
                expire: now + CACHE_TTL
            });
        }

        return json({
            code: 0,
            msg: 'ok',
            data: info
        });

    } catch (err) {

        console.error(`[API Error] touid=${touid}`, err);

        return json({
            code: 500,
            msg: 'server error',
            data: null
        });
    }
}