// src/lib/api/live_room.ts  -- 获取一个直播信息
import type {LiveItemResponse} from '$lib/models/live';
import FallbackData from '$lib/data/live/info.json'; // 兜底数据

/**
 * liveInfoRequest
 * @desc 获取直播间详情（兼容老 PHP 接口）
 * @param liveID 直播 UID
 * @param auth 登录态，可选
 */
export async function liveInfoRequest(
    liveID: string,
    auth?: {
        uid: string;
        token: string;
    }
): Promise<LiveItemResponse> {
    const requestId = crypto.randomUUID().replace(/-/g, '');
    const utcTime = new Date().toISOString();
    const path = 'live.getLiveInfo';

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

    // --- 参数校验 ---
    if (!liveID) {
        log.error(`[${utcTime}] ✘ Error: liveID is required`);
        throw new Error('liveID is required - 直播ID 未被找到');
    }

    // --- 构建请求 URL（兼容旧版 PHP 接口） ---
    const url = new URL('http://api2.damawei.com:8080/appapi/');
    url.searchParams.set('s', path);
    url.searchParams.set('liveuid', String(liveID));

    if (auth?.uid && auth?.token) {
        url.searchParams.set('uid', auth.uid);
        url.searchParams.set('token', auth.token);
    }

    log.info(`[${utcTime}] [${path}] Request: liveID=${liveID}`);

    try {
        // --- 5 秒超时 ---
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const res = await fetch(url.toString(), {signal: controller.signal});
        clearTimeout(timeout);

        if (!res.ok) {
            throw new Error(`HTTP Error ${res.status}`);
        }

        const data = (await res.json()) as LiveItemResponse;

        log.info(`[${new Date().toISOString()}] ✔ Success network request OK`);

        return data;

    } catch (e) {
        log.warn(`[${new Date().toISOString()}] ✘ Network error, using fallback data`, e);

        // --- 本地 JSON 兜底 ---
        if (FallbackData && typeof FallbackData === 'object') {
            return FallbackData as unknown as LiveItemResponse;
        }

        throw new Error('Fallback data invalid');
    }
}
