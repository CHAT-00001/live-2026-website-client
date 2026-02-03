// src/lib/api/live_room.ts  -- 获取一个直播信息

import type {LiveHomeResponse} from '$lib/models/live_home';
import FallbackData from '$lib/data/live/home.json'; // 兜底数据

/**
 * liveHome - Network Request
 * @desc 获取直播主页 - 网络请求
 * @param liveID 直播 UID
 * @param auth 登录态，可选
 */
export async function liveHomeRequest(
    Page: number,
    auth?: {
        uid: string;
        token: string;
    }
): Promise<LiveHomeResponse> {

    const name = "Live Home Info - 获取直播主页";
    const requestId = crypto.randomUUID().replace(/-/g, '');
    const utcTime = new Date().toISOString();
    const path = 'home.getHot';

    // --- 彩色日志控制台兼容 ---
    const isNode = typeof process !== 'undefined' && process.versions?.node;
    const RESET = '\x1b[0m';
    const LIME_GREEN = '\x1b[38;2;65;255;0m';
    const RED = '\x1b[31m';

    const log = {
        info: (msg: string, ...args: any[]) => {
            if (isNode) console.info(`${LIME_GREEN}[${requestId}]${RESET} ${msg}`, ...args);
            else console.info(`%c[${requestId}] ${msg}`, 'color: limegreen', ...args);
        },
        warn: (msg: string, ...args: any[]) => {
            if (isNode) console.warn(`${LIME_GREEN}[${requestId}]${RESET} ${msg}`, ...args);
            else console.warn(`%c[${requestId}] ${msg}`, 'color: red', ...args);
        },
        error: (msg: string, ...args: any[]) => {
            if (isNode) console.error(`${LIME_GREEN}[${requestId}]${RESET} ${msg}`, ...args);
            else console.error(`%c[${requestId}] ${msg}`, 'color: red', ...args);
        }
    };


    // --- 构建请求 URL（兼容旧版 PHP 接口） ---
    const url = new URL('http://api2.damawei.com:8080/appapi/');
    url.searchParams.set('s', path);
    url.searchParams.set('p', String(Page));

    if (auth?.uid && auth?.token) {
        url.searchParams.set('uid', auth.uid);
        url.searchParams.set('token', auth.token);
    }

    log.info(`[${utcTime}] [${path}] Request: Page =${Page}`);

    try {
        // --- 5 秒超时 ---
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const res = await fetch(url.toString(), {signal: controller.signal});
        clearTimeout(timeout);

        if (!res.ok) {
            throw new Error(`HTTP Error ${res.status}`);
        }

        const data = (await res.json()) as LiveHomeResponse;

        // 打印 data
        //console.log(JSON.stringify(data, null, 4));


        log.info(`[${new Date().toISOString()}] ✔ Success network request OK - 网络请求: Ok!`, name);

        return data;

    } catch (e) {

        log.warn(`[${new Date().toISOString()}] ✘ Network error, using fallback data - 网络请求: Error, 使用本地数据兜底.`, e);

        // --- 本地 JSON 兜底 ---
        if (FallbackData && typeof FallbackData === 'object') {
            return FallbackData as unknown as LiveHomeResponse;
        }

        throw new Error('Fallback data invalid');
    }
}
