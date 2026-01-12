// src/routes/market/goods/[id]/+page.server.ts
import type {PageServerLoad} from './$types';
import type {Comment, GoodsDetailItem, GoodsInfo, ShopInfo} from '$lib/models/goods_model';
import {getGoodsInfo} from '$lib/api/goods_api';

export const load: PageServerLoad = async ({params, locals}) => {
    // 原始拼接id：可爱字符 t@1000015410
    const stringId = params.id;

    // 提取数字ID，匹配失败兜底0
    const goodsId = Number(stringId.match(/@(\d+)$/)?.[1]) ?? 0;

    // 扁平化数据
    let goods: GoodsDetailItem | null = null;
    let goodsInfo: GoodsInfo | null = null;
    let shopInfo: ShopInfo | null = null;
    let commentLists: Comment[] = [];
    let errorMsg: string | undefined = undefined;

    // 只使用 SSR 登录态
    const auth = locals.loginState
        ? {uid: locals.loginState.uid, token: locals.loginState.token}
        : undefined;

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
        const listResponse = await getGoodsInfo({goodsId, auth: auth as any});

        goods = listResponse?.data?.info?.[0] ?? null;

        if (!goods) {
            errorMsg = '商品不存在';
        } else {
            // 扁平化关键数据，方便模板渲染
            goodsInfo = goods.goods_info ?? null;
            shopInfo = goods.shop_info ?? null;
            commentLists = goods.comment_lists ?? [];
        }
    } catch (err) {
        console.error('商品信息获取失败', err);
        errorMsg = (err as Error).message || '商品信息加载失败';
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
