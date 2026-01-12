// src/lib/api/goods_api.ts
// API: http://api2.damawei.com:8080/appapi/?s=shop.getGoodsInfo&uid=1000010441&token=46ce0f086d215805c50bbf1ce6fbc1eb&goodsid=1000000140

import type {ListResponse} from '$lib/models/live';
import listJson from '$lib/data/shop/goods_info.json'; // 模拟数据

/**
 * Goods Info - 商品信息
 * @param req
 * req.goodsId  商品ID
 * req.auth     登录态（由 server 层注入，强烈推荐）
 */
/**
 * GOODS DETAIL - 获取商品详情
 */

/**
 * 带有颜色的控制台输出
 */
/**
 * 带有特定 RGB 颜色 (#41ff00) 的控制台输出
 */
export async function getGoodsInfo(req: {
    goodsId: number;
    auth?: { uid: number; token: string };
}): Promise<ListResponse> {
    const requestId = crypto.randomUUID().replace(/-/g, '');
    const utcTime = new Date().toISOString();
    const path = "shop.getGoodsInfo";

    // --- 定义颜色常量 ---
    // \x1b[38;2;R;G;Bm 是终端的真彩色指令
    const RESET = "\x1b[0m";
    const LIME_GREEN = "\x1b[38;2;65;255;0m"; // 对应 #41ff00 (65, 255, 0)
    const YELLOW = "\x1b[33m";
    const GREEN = "\x1b[38;2;65;255;0m";
    const RED = "\x1b[31m";

    const url = new URL('http://api2.damawei.com:8080/appapi/');
    url.searchParams.set('s', path);
    url.searchParams.set('goodsid', String(req.goodsId || '1000000140'));

    if (req.auth?.uid && req.auth?.token) {
        url.searchParams.set('uid', String(req.auth.uid));
        url.searchParams.set('token', req.auth.token);
    }

    // 1. 打印带 #41ff00 颜色的请求日志
    console.info(
        `${LIME_GREEN}[${requestId}]${RESET} [${utcTime}] ${YELLOW}[${path}]${RESET} Request: GoodsID=${req.goodsId}`
    );

    try {
        // ... 中间的 fetch 逻辑保持不变 ...
        const res = await fetch(url.toString());
        const data = (await res.json()) as ListResponse;

        // 2. 成功日志
        console.info(
            `${LIME_GREEN}[${requestId}]${RESET} [${new Date().toISOString()}] ${GREEN}✔ Success${RESET}`
        );

        return data;
    } catch (e) {
        // 3. 错误日志
        console.warn(
            `${LIME_GREEN}[${requestId}]${RESET} [${new Date().toISOString()}] ${RED}✘ Error${RESET}`,
            e
        );
        return listJson as unknown as ListResponse;
    }
}