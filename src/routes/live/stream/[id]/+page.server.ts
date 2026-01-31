// +page.server.ts
import type {PageServerLoad} from './$types';
import {liveInfoRequest} from '$lib/api/live_room';

export const load: PageServerLoad = async ({locals, params}) => {
    const liveID = params.id;

    const auth = locals.loginState
        ? {
            uid: locals.loginState.uid,
            token: locals.loginState.token
        }
        : undefined;

    console.log('[live] auth:', auth);

    try {
        const apiResponse = await liveInfoRequest(liveID, auth);

        /**
         * 老 PHP 返回结构：
         * {
         *   data: {
         *     code: number,
         *     msg: string,
         *     info: []
         *   }
         * }
         */
        const data = apiResponse.data;

        if (!data || data.code !== 0) {
            console.error('[live] api error:', data?.msg);
            return {
                data: null,
                error: data?.msg || 'Live room not available'
            };
        }

        // ✅ 关键点：只取第一条
        const info = Array.isArray(data.info) ? data.info[0] : null;

        if (!info) {
            console.warn('[live] empty info array');
            return {
                data: null,
                error: 'Live room data is empty'
            };
        }

        return {
            data: info, // ⚠️ UI 拿到的是「对象」，不是数组
            error: null
        };

    } catch (e) {
        console.error('[live] Failed to load live data', e);
        return {
            data: null,
            error: 'Network error, returning fallback data'
        };
    }
};
