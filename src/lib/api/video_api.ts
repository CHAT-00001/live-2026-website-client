// src/api/video.ts
// 2026-01-10 04:38:45

import {type ApiResponse, get_api} from "$lib/network";
import type {ListResponse, VideoListResponse} from "$lib/models/video.ts"; // SvelteKit 路径别名
import listJson from '$lib/data/video/list.json';
import type {ApiRequestBody} from "$lib/models/api.ts";

//////// 00000000
//////// 00000000

/**
 * 获取视频详情
 * @param videoid 视频ID
 * @param uid 用户ID
 * @param token 用户令牌
 */
export async function get_video_by_id(
    videoid: string | number,
    uid: string | number,
    token: string
): Promise<ApiResponse<VideoListResponse>> {
    return get_api<VideoListResponse>(
        "video.getVideo",
        {
            videoid, // 视频ID
            uid,     // 用户ID
            token    // 令牌
        },
        {timeout: 1000}
    );
}


/**
 * VIDEO LIST - 视频列表
 * @param req
 */
// export async function getVideoList(req: ApiRequestBody): Promise<ListResponse> {
//
//     const controller = new AbortController();
//     const timeout = setTimeout(() => controller.abort(), 2000);
//
//     const url = new URL('http://api2.damawei.com:8080/appapi/');
//     url.searchParams.set('s', 'video.getVideoList');
//     if (req.lat != null) {
//         url.searchParams.set('lat', req.lat);
//     }
//     if (req.lng != null) {
//         url.searchParams.set('lng', req.lng);
//     }
//     url.searchParams.set('p', (req.p || 1).toString());
//
//     try {
//         const res = await fetch(url.toString(), {signal: controller.signal});
//         clearTimeout(timeout);
//         if (!res.ok) throw new Error('API Error');
//         const data = (await res.json()) as ListResponse;
//         console.info("api/video: 获取视频列表好啦~！", data)
//         return data;
//     } catch (e) {
//         console.warn('请求超时或失败，使用本地数据', e);
//         return listJson as ListResponse;
//     }
// }

/**
 * VIDEO LIST - 视频列表
 * @param req
 */
/**
 * VIDEO LIST - 视频列表
 */
export async function getVideoList(req: ApiRequestBody): Promise<ListResponse> {
    // 1. 生成 ID 和时间
    const requestId = crypto.randomUUID().replace(/-/g, '');
    const utcTime = new Date().toISOString();
    const path = "video.getVideoList";

    // --- ANSI 颜色常量 ---
    const RESET = "\x1b[0m";
    const LIME_GREEN = "\x1b[38;2;65;255;0m"; // 对应 #41ff00
    const YELLOW = "\x1b[33m";
    const GREEN = "\x1b[32m";
    const RED = "\x1b[31m";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const url = new URL('http://api2.damawei.com:8080/appapi/');
    url.searchParams.set('s', path);
    if (req.lat != null) {
        url.searchParams.set('lat', req.lat);
    }
    if (req.lng != null) {
        url.searchParams.set('lng', req.lng);
    }
    url.searchParams.set('p', (req.p || 1).toString());

    // 2. 打印带颜色的请求起始日志
    console.info(
        `${LIME_GREEN}[${requestId}]${RESET} [${utcTime}] ${YELLOW}[${path}]${RESET} Request Params: p=${req.p}`
    );

    try {
        const res = await fetch(url.toString(), {signal: controller.signal});
        clearTimeout(timeout);

        if (!res.ok) throw new Error('API Error');

        const data = (await res.json()) as ListResponse;

        // 3. 打印成功日志 (绿色)
        console.info(
            `${LIME_GREEN}[${requestId}]${RESET} [${new Date().toISOString()}] ${GREEN}✔ Fetch Success: Got ${data.data?.info?.length || 0} items${RESET}`
        );

        return data;
    } catch (e) {
        clearTimeout(timeout);
        // 4. 打印失败日志 (红色)
        console.warn(
            `${LIME_GREEN}[${requestId}]${RESET} [${new Date().toISOString()}] ${RED}✘ Fetch Failed: 使用本地数据${RESET}`,
            e
        );
        return listJson as ListResponse;
    }
}

/**
 * Home LIST - 主页视频列表
 * @param req
 */
export async function getHomeVideo(req: ApiRequestBody): Promise<ListResponse> {

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const url = new URL('http://api2.damawei.com:8080/appapi/');
    url.searchParams.set('s', 'video.getHomeVideo');
    // @ts-ignore
    url.searchParams.set('uid', req.uid);
    if (req.token != null) {
        url.searchParams.set('token', req.token);
    }
    if (req.touid != null) {
        url.searchParams.set('touid', req.touid);
    }
    if (req.lat != null) {
        url.searchParams.set('lat', req.lat);
    }
    if (req.lng != null) {
        url.searchParams.set('lng', req.lng);
    }
    url.searchParams.set('p', (req.p || 1).toString());

    try {
        const res = await fetch(url.toString(), {signal: controller.signal});
        clearTimeout(timeout);
        if (!res.ok) throw new Error('API Error');
        const data = (await res.json()) as ListResponse;
        let touid = req.touid;
        console.info("api/video: 获取用户视频列表好啦~！ touid:", touid)
        return data;
    } catch (e) {
        console.warn('请求超时或失败，使用本地数据', e);
        return listJson as ListResponse;
    }
}

/**
 * Comments by ID - 根据视频id获取评论
 * @param req
 */
export async function getComments(req: ApiRequestBody): Promise<ListResponse> {

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const url = new URL('http://api2.damawei.com:8080/appapi/');
    url.searchParams.set('s', 'video.getComments');
    if (req.video_id != null) {
        url.searchParams.set('videoid', req.video_id);
    }
    if (req.lat != null) {
        url.searchParams.set('lat', req.lat);
    }
    if (req.lng != null) {
        url.searchParams.set('lng', req.lng);
    }
    url.searchParams.set('p', (req.p || 1).toString());

    try {
        const res = await fetch(url.toString(), {signal: controller.signal});
        clearTimeout(timeout);
        if (!res.ok) throw new Error('API Error');
        const data = (await res.json()) as ListResponse;
        console.info("api/video: 获取评论列表好啦~！", data)
        return data;
    } catch (e) {
        console.warn('请求超时或失败，使用本地数据', e);
        return listJson as ListResponse;
    }
}