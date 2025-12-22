// src/lib/api/user.ts
import type { ApiRequestBody } from '$lib/models/api.ts';
import type { ListResponse } from '$lib/models/dynamic.ts';
import listJson from '$lib/data/user/home.json';
import { get } from 'svelte/store';
import { loginStore } from '$lib/stores/login';

export async function getUserHome(req: ApiRequestBody): Promise<ListResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    // 从 loginStore 获取登录状态
    const loginState = get(loginStore);
    const uid = loginState.uid;
    const token = loginState.token;

    const url = new URL('http://api2.damawei.com:8080/appapi/');
    url.searchParams.set('s', 'user.getUserHome');
    url.searchParams.set('uid', uid);
    url.searchParams.set('token', token);
    url.searchParams.set('touid', req.touid || '');
    url.searchParams.set('lat', req.lat || '');
    url.searchParams.set('lng', req.lng || '');
    url.searchParams.set('p', (req.p || 1).toString());

    try {
        const res = await fetch(url.toString(), { signal: controller.signal });
        clearTimeout(timeout);
        if (!res.ok) throw new Error('API Error');
        const data = (await res.json()) as ListResponse;
        console.info('api/user: 获取用户主页好啦~！', data);
        return data;
    } catch (e) {
        console.warn('local: 请求超时或失败，使用本地数据', e);
        return listJson as ListResponse;
    }
}
