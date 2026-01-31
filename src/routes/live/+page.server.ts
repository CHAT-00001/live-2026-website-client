// +page.server.ts

import type {PageServerLoad} from './$types';
import {liveHomeRequest} from '$lib/api/live_home';

export const load: PageServerLoad = async ({locals, url}) => {
    const page = Number(url.searchParams.get('page') || '1');

    const auth = locals.loginState ? {
        uid: locals.loginState.uid,
        token: locals.loginState.token
    } : undefined;

    try {
        // 设置一个超时限制，防止 undici 抛出 AbortError
        const apiResponse = await liveHomeRequest(page, auth);
        const resData = apiResponse?.data;

        if (!resData || resData.code !== 0) {
            return {slideList: [], recommendList: [], mainList: [], error: resData?.msg || '获取失败'};
        }

        const info = Array.isArray(resData.info) ? resData.info[0] : null;

        if (!info) {
            return {slideList: [], recommendList: [], mainList: [], error: '数据为空'};
        }

        // ✅ 统一字段名，对应前端的 slideList, recommendList, mainList
        // 请根据你 PHP 接口返回的实际 key 修改冒号左边的部分
        return {
            slideList: info.slide || [],      // 假设接口叫 slide
            recommendList: info.list || [],   // 假设接口叫 list
            mainList: info.list || [],        // 首页第一页数据
            error: null
        };

    } catch (e: any) {
        console.error('[live] Load Error:', e.message);
        // 返回空数组防止前端 .length 报错
        return {
            slideList: [],
            recommendList: [],
            mainList: [],
            error: '接口请求超时或中断，请检查网络'
        };
    }
};