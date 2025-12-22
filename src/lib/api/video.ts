// src/api/video.ts

import { get_api, ApiResponse } from "$lib/network";
import type {VideoListResponse} from "$lib/models/video.ts"; // SvelteKit 路径别名
import type { ApiRequest, ListResponse } from '$lib/models/video.ts';
import listJson from '$lib/data/video/list.json';
import type {ApiRequestBody} from "$lib/models/api.ts";

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
        { timeout: 1000 }
    );
}


// 获取视频列表
export async function getVideoList(req: ApiRequestBody): Promise<ListResponse> {

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const url = new URL('http://api2.damawei.com:8080/appapi/');
    url.searchParams.set('s', 'video.getVideoList');
    url.searchParams.set('lat', req.lat);
    url.searchParams.set('lng', req.lng);
    url.searchParams.set('p', (req.p || 1).toString());

    try {
        const res = await fetch(url.toString(), { signal: controller.signal });
        clearTimeout(timeout);
        if (!res.ok) throw new Error('API Error');
        const data = (await res.json()) as ListResponse;
        console.info("api/video: 获取视频列表好啦~！", data)
        return data;
    } catch (e) {
        console.warn('请求超时或失败，使用本地数据', e);
        return listJson as ListResponse;
    }
}

// 获取视频列表
export async function getHomeVideo(req: ApiRequestBody): Promise<ListResponse> {

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const url = new URL('http://api2.damawei.com:8080/appapi/');
    url.searchParams.set('s', 'video.getHomeVideo');
    url.searchParams.set('uid', req.uid);
    url.searchParams.set('token', req.token);
    url.searchParams.set('touid', req.touid);
    url.searchParams.set('lat', req.lat);
    url.searchParams.set('lng', req.lng);
    url.searchParams.set('p', (req.p || 1).toString());

    try {
        const res = await fetch(url.toString(), { signal: controller.signal });
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


// 获取视频评论列表
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
        const res = await fetch(url.toString(), { signal: controller.signal });
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