//import { log, info, error, warn, debug } from '$lib/kits/logger';
import type { ApiRequest, ListResponse } from '$lib/models/live';
import listJson from '$lib/data/live/list.json';

export async function get_list(req: ApiRequest): Promise<ListResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const url = new URL('http://api2.damawei.com:8080/appapi/');
    url.searchParams.set('s', 'home.getHot');
    url.searchParams.set('lat', req.lat);
    url.searchParams.set('lng', req.lng);
    url.searchParams.set('p', (req.p || 1).toString());

    try {
        const res = await fetch(url.toString(), { signal: controller.signal });
        clearTimeout(timeout);
        if (!res.ok) throw new Error('API Error');
        const data = (await res.json()) as ListResponse;
        let info= data;
        console.log(info);
        return data;
    } catch (e) {
        console.warn('请求超时或失败，使用本地数据', e);
        return listJson as ListResponse;
    }
}
