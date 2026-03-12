// src/routes/+layout.server.ts

import type {LayoutServerLoad} from './$types';

export const load: LayoutServerLoad = async ({locals}) => {
    // 直接返回 locals.user，类型会自动推导为 { uid: string; token: string } | null
    return {
        user: locals.user,
        requestId: locals.requestId // 建议顺便把这个传给前端，方便调试
    };
};