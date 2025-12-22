// src/routes/video/[id]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    const videoid = params.id; // 对应 [id] 路由参数

    // 请求你自己写的代理接口
    const res = await fetch(`/api/video/${videoid}`);
    const data = await res.json();

    // 返回给 +page.svelte 使用
    return {
        videoData: data
    };
};
