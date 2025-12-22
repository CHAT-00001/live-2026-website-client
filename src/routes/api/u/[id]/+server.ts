// routes/api/u/[id]/+server.ts
import type { RequestHandler } from './$types';
import { getUserHome } from '$lib/api/user';
import type { ApiRequestBody } from '$lib/models/api';
import { get } from 'svelte/store';
import { loginStore } from '$lib/stores/login';

export const GET: RequestHandler = async ({ url, params }) => {
    // 从登录状态获取当前开发用 uid 和 token
    const { uid: loginUid, token } = get(loginStore);

    // 目标用户 id，从 url params 获取 /u/123 => 123
    const touid = params.id;

    // 其他 query 参数
    const lat = url.searchParams.get('lat') || '';
    const lng = url.searchParams.get('lng') || '';
    const p = Number(url.searchParams.get('p') || 1);

    const requestData: ApiRequestBody = {
        uid: loginUid,   // 当前登录用户
        token,           // 当前登录 token
        touid,           // 访问的目标用户
        lat,
        lng,
        p
    };

    try {
        const data = await getUserHome(requestData);
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        return new Response(
            JSON.stringify({ error: (err as Error).message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
