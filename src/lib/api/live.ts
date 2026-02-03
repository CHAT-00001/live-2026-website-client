import type {ApiRequestBody} from "$lib/models/api.ts";
import type {ListResponse} from "$lib/models/video.ts";
import FallbackData from '$lib/data/live/list.json'; // 兜底数据


/**
 * 获取直播首页 - 聚合数据页
 * @param req
 */
export async function get_list(req: ApiRequestBody) {
    // 1. 生成 ID 和时间
    const requestId = crypto.randomUUID().replace(/-/g, '');
    const utcTime = new Date().toISOString();
    const path = "home.getHot";
    const name = "直播主页";

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
        console.info("网络请求: Ok!" + name);
        console.info(
            `${LIME_GREEN}[${requestId}]${RESET} [${new Date().toISOString()}] ${GREEN}✔ Fetch Success: Got ${data.data?.info?.length || 0} items${RESET}`
        );
        console.info(data);

        return data;
    } catch (e) {
        clearTimeout(timeout);
        // 4. 打印失败日志 (红色)
        console.warn(
            `${LIME_GREEN}[${requestId}]${RESET} [${new Date().toISOString()}] ${RED}✘ Fetch Failed: 使用本地数据${RESET}`,
            e
        );
        return FallbackData as unknown as ListResponse;
    }
}





