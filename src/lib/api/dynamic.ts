// src/lib/api/dynamic.ts
// 动态Api请求 2025-12-22 12:33:10


import type {ApiRequest, ListResponse} from '$lib/models/dynamic';
import listJson from '$lib/data/dynamic/list.json';

//////// 00000000
//////// 00000000


/**
 * Newest - 最新 - 动态
 * @param req
 */
export async function getNewDynamic(req: ApiRequest): Promise<ListResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const url = new URL('http://api2.damawei.com:8080/appapi/');
    url.searchParams.set('s', 'dynamic.getNewDynamic');
    url.searchParams.set('lat', req.lat);
    url.searchParams.set('lng', req.lng);
    url.searchParams.set('p', (req.p || 1).toString());

    try {
        const res = await fetch(url.toString(), { signal: controller.signal });
        clearTimeout(timeout);
        if (!res.ok) throw new Error('API Error');
        const data = (await res.json()) as ListResponse;
        console.info('网络请求: Ok!', url);
        return data;
    } catch (e) {
        console.warn('请求超时或失败，使用本地数据', e);
        return listJson as unknown as ListResponse;
    }
}


/**
 * Recommend - 推荐 -动态
 * @param req
 */
export async function getRecommendDynamics(req: ApiRequest): Promise<ListResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const url = new URL('http://api2.damawei.com:8080/appapi/');
    url.searchParams.set('s', 'dynamic.getRecommendDynamics');
    url.searchParams.set('lat', req.lat);
    url.searchParams.set('lng', req.lng);
    url.searchParams.set('p', (req.p || 1).toString());

    try {
        const res = await fetch(url.toString(), { signal: controller.signal });
        clearTimeout(timeout);
        if (!res.ok) throw new Error('API Error');
        const data = (await res.json()) as ListResponse;
        console.info('网络请求: Ok!', url);
        return data;
    } catch (e) {
        console.warn('请求超时或失败，使用本地数据', e);
        return listJson as unknown as ListResponse;
    }
}


/**
 * Nearby - 附近 - 动态
 * @param req
 */
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
        console.info('网络请求: Ok!', url);
        return data;
    } catch (e) {
        console.warn('请求超时或失败，使用本地数据', e);
        return listJson as unknown as ListResponse;
    }
}


/**
 * Home - 用户主页 - 动态
 * @param req
 */
export async function getHomeDynamic(req: ApiRequest): Promise<ListResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const url = new URL('http://api2.damawei.com:8080/appapi/');
    url.searchParams.set('s', 'dynamic.getHomeDynamic');
    url.searchParams.set('lat', req.lat);
    url.searchParams.set('lng', req.lng);
    url.searchParams.set('p', (req.p || 1).toString());

    try {
        const res = await fetch(url.toString(), {signal: controller.signal});
        clearTimeout(timeout);
        if (!res.ok) throw new Error('API Error');
        const data = (await res.json()) as ListResponse;
        console.info('网络请求: Ok!', url);
        return data;
    } catch (e) {
        console.warn('请求超时或失败，使用本地数据', e);
        return listJson as unknown as ListResponse;
    }
}


/**
 * Likes - 点赞过的 - 动态
 * @param req
 */
export async function getLikesDynamic(req: ApiRequest): Promise<ListResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const url = new URL('http://api2.damawei.com:8080/appapi/');
    url.searchParams.set('s', 'dynamic.getLikesList');
    url.searchParams.set('lat', req.lat);
    url.searchParams.set('lng', req.lng);
    url.searchParams.set('p', (req.p || 1).toString());

    try {
        const res = await fetch(url.toString(), {signal: controller.signal});
        clearTimeout(timeout);
        if (!res.ok) throw new Error('API Error');
        const data = (await res.json()) as ListResponse;
        console.info('网络请求: Ok!', url);
        return data;
    } catch (e) {
        console.warn('请求超时或失败，使用本地数据', e);
        return listJson as unknown as ListResponse;
    }
}


/**
 * Collects - 收藏过的 - 动态
 * @param req
 */
export async function getCollectsDynamic(req: ApiRequest): Promise<ListResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const url = new URL('http://api2.damawei.com:8080/appapi/');
    url.searchParams.set('s', 'dynamic.getCollectsList');
    url.searchParams.set('lat', req.lat);
    url.searchParams.set('lng', req.lng);
    url.searchParams.set('p', (req.p || 1).toString());

    try {
        const res = await fetch(url.toString(), { signal: controller.signal });
        clearTimeout(timeout);
        if (!res.ok) throw new Error('API Error');
        const data = (await res.json()) as ListResponse;
        console.info('网络请求: Ok!', url);
        return data;
    } catch (e) {
        console.warn('请求超时或失败，使用本地数据', e);
        return listJson as unknown as ListResponse;
    }
}


/**
 * Visited - 浏览过的 - 动态
 * @param req
 */
export async function getVisitedDynamic(req: ApiRequest): Promise<ListResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const url = new URL('http://api2.damawei.com:8080/appapi/');
    url.searchParams.set('s', 'dynamic.getVisitedList');
    url.searchParams.set('lat', req.lat);
    url.searchParams.set('lng', req.lng);
    url.searchParams.set('p', (req.p || 1).toString());

    try {
        const res = await fetch(url.toString(), {signal: controller.signal});
        clearTimeout(timeout);
        if (!res.ok) throw new Error('API Error');
        const data = (await res.json()) as ListResponse;
        console.info('网络请求: Ok!', url);
        return data;
    } catch (e) {
        console.warn('请求超时或失败，使用本地数据', e);
        return listJson as unknown as ListResponse;
    }
}