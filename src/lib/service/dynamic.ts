// src/lib/service/dynamic.ts
// 2025-12-1 09:00:41


//import { log, info, error, warn, debug } from '$lib/kits/logger';
import type { ApiRequest, ListResponse } from '$lib/models/dynamic';
import listJson from '$lib/data/dynamic/list.json';

export async function getNearbyDynamic(req: ApiRequest): Promise<ListResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const url = new URL('http://api2.damawei.com:8080/appapi/');
    url.searchParams.set('s', 'dynamic.getNearby2');
    url.searchParams.set('lat', req.lat);
    url.searchParams.set('lng', req.lng);
    url.searchParams.set('p', (req.p || 1).toString());

    try {
        const res = await fetch(url.toString(), { signal: controller.signal });
        clearTimeout(timeout);
        if (!res.ok) throw new Error('API Error');
        const data = (await res.json()) as ListResponse;
        return data;
    } catch (e) {
        console.warn('请求超时或失败，使用本地数据', e);
        return listJson as ListResponse;
    }
}
