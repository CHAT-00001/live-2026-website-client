// src/routes/api/dynamic/info/+server.ts

import {json} from '@sveltejs/kit';
import {ListApi} from '$lib/api/dynamic/info';

type CacheItem = {
    data: any[];
    expire: number;
};

const CACHE_TTL = 1000 * 60 * 60; // 1小时
const cache = new Map<string, CacheItem>();

export async function GET({url}) {
    const p = Number(url.searchParams.get('p') || 1);
    const lat = url.searchParams.get('lat') || 20.152544;
    const lng = url.searchParams.get('lng') || 107.545211;

    const key = `recommend:${p}:${lat}:${lng}`;
    const now = Date.now();

    // 1. 检查缓存
    const cached = cache.get(key);
    if (cached && cached.expire > now) {
        console.log(`[Server Cache Hit] p=${p}, count=${cached.data.length}`);
        return json({
            code: 0,
            msg: 'ok',
            data: cached.data
        });
    }

    try {
        // 2. 核心修复：根据 ListApi 定义修正参数顺序
        // 定义：getRecommend: (p: number, page: number, size: number, uid: any, token: string)

        const pageSize = 10; // 必须传入 size，否则后端可能返回空
        const uid = '';      // 根据需要从 session 或 query 获取
        const token = '';    // 根据需要从 session 或 query 获取

        console.log(`[Server API Request] >>> p=${p}, page=${p}, size=${pageSize}`);

        // @ts-ignore
        const res = await ListApi.getRecommend(
            p,          // 1. p (兼容旧版php后端)
            p,          // 2. page (新版rust后端)
            pageSize,   // 3. size (之前传成了 '', 这是导致第 5 页不显示的主因)
            uid,        // 4. uid
            token,      // 5. token
            lat,
            lng,
        );

        const list = res?.data?.info ?? [];
        console.log(`[Server API Response] <<< p=${p}, count=${list.length}`);

        // 3. 写入缓存 (仅当有数据时才缓存)
        if (list.length > 0) {
            cache.set(key, {
                data: list,
                expire: now + CACHE_TTL
            });
        }

        return json({
            code: 0,
            msg: 'ok',
            data: list
        });

    } catch (err: any) {
        console.error(`[Server API Error] p=${p}:`, err);

        return json({
            code: 500,
            msg: 'server error',
            data: []
        });
    }
}
