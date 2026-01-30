// src/routes/market/goods/[id]/+page.server.ts

import type {PageServerLoad} from './$types';
import type {Comment, GoodsInfo, ShopInfo} from '$lib/models/goods_model';
import {getGoodsInfo} from '$lib/api/goods_api';

//////// 00000000

export const load: PageServerLoad = async ({params, locals}) => {
    const stringId = params.id;

    // 1. 改进 ID 提取逻辑：支持纯数字或带 @ 的格式
    const match = stringId.match(/@(\d+)$/);
    const goodsId = match ? Number(match[1]) : Number(stringId) || 0;

    console.info("商品ID: " + goodsId);

    // 2. 初始化返回数据（注意：删除了错误的 Home 图标导入）
    // @ts-ignore
    let goods: Home | null = null;
    let goodsInfo: GoodsInfo | null = null;
    let shopInfo: ShopInfo | null = null;
    let commentLists: Comment[] = [];
    let errorMsg: string | undefined = undefined;

    // 3. 校验
    if (goodsId <= 0) {
        return {
            stringId,
            goodsId,
            goods,
            goodsInfo,
            shopInfo,
            commentLists,
            errorMsg: '无效商品ID'
        };
    }

    try {
        // 4. 获取登录态
        const auth = locals.loginState
            ? {
                uid: locals.loginState.uid,
                token: locals.loginState.token
            }
            : undefined;

        // 查看用户登录验证日志
        console.log("登录信息：" + JSON.stringify(auth));

        // 调用 API 请求数据
        const ApiResponse = await getGoodsInfo({goodsId, auth});

        // 假设接口返回结构是 { ret, data: { code, msg, info: [ ... ] } }
        const infoList = ApiResponse?.data?.info;

        // 打印接口结果
        //console.log('DataResponse:', JSON.stringify(ApiResponse, null, 2));

        // 取数组第一个商品条目
        goods = Array.isArray(infoList) ? infoList[0] ?? null : null;

        if (!goods) {
            errorMsg = '商品不存在或已下架';
        } else {
            // 5. 扁平化处理
            goodsInfo = goods.goods_info ?? null;
            shopInfo = goods.shop_info ?? null;
            commentLists = goods.comment_lists ?? [];
        }
    } catch (err) {
        console.error(`[Load Error] GoodsID: ${goodsId}`, err);
        errorMsg = err instanceof Error ? err.message : '商品信息加载失败';
    }

    return {
        stringId,
        goodsId,
        goods,
        goodsInfo,
        shopInfo,
        commentLists,
        errorMsg
    };
};
