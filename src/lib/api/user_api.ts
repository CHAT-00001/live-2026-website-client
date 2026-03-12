// src/lib/api/user.ts

import type {ApiRequestBody} from '$lib/models/api.ts';
import type {ListResponse} from '$lib/models/dynamic.ts';
import listJson from '$lib/data/user/home.json';

const BASE_URL = 'http://api2.damawei.com:8080/appapi/';

/**
 * Home - 用户主页
 */
export async function getUserHome2(req: ApiRequestBody): Promise<ListResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    // ✅ 把你的日志补回来，查看传入的身份信息
    console.log('API Request Params (getUserHome):', {uid: req.uid, token: req.token, touid: req.touid});

    const url = new URL(BASE_URL);
    url.searchParams.set('s', 'user.getUserHome');
    url.searchParams.set('uid', (req.uid || '').toString());
    url.searchParams.set('token', req.token || '');
    url.searchParams.set('touid', req.touid || '');
    url.searchParams.set('lat', req.lat || '');
    url.searchParams.set('lng', req.lng || '');
    url.searchParams.set('p', (req.p || 1).toString());

    try {
        const res = await fetch(url.toString(), {signal: controller.signal});
        clearTimeout(timeout);

        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

        const data = (await res.json()) as ListResponse;

        // ✅ 补回你的成功日志和数据打印
        console.info('api/user: 获取用户主页好啦~！', data);
        console.log('Api返回的数据:', JSON.stringify(data, null, 4));

        return data;
    } catch (e) {
        // ✅ 补回你的失败警告日志
        console.warn('local: 请求超时或失败，使用本地数据', e);
        return listJson as unknown as ListResponse;
    }
}

/**
 * Search - 搜索用户
 */
export async function searchUser(req: ApiRequestBody): Promise<ListResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const url = new URL(BASE_URL);
    url.searchParams.set('s', 'user.searchUser');
    url.searchParams.set('uid', (req.uid || '').toString());
    url.searchParams.set('token', req.token || '');
    url.searchParams.set('touid', req.touid || '');
    url.searchParams.set('keyword', req.keyword || '');
    url.searchParams.set('lat', req.lat || '');
    url.searchParams.set('lng', req.lng || '');
    url.searchParams.set('p', (req.p || 1).toString());

    try {
        const res = await fetch(url.toString(), {signal: controller.signal});
        clearTimeout(timeout);

        if (!res.ok) throw new Error('API Error');

        const data = (await res.json()) as ListResponse;

        // ✅ 补回搜索成功的日志
        console.info('api/user: 搜索用户主页好啦~！', data);
        return data;
    } catch (e) {
        console.warn('local: 请求超时或失败，使用本地数据', e);
        return listJson as unknown as ListResponse;
    }
}