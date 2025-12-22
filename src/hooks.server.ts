// src/hooks.server.ts


import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    // 调用 resolve 获取默认响应
    const response = await resolve(event, {
        transformPageChunk: ({ html }) => {
            // 获取当前时间
            const now = new Date();
            const timestamp = now.toISOString(); // 或自定义格式

            // 在 <!doctype html> 后面插入注释
            return html.replace(
                /<!doctype html>/i,
                `<!doctype html>\n<!-- ${timestamp} -->`
            );
        }
    });

    return response;
};
