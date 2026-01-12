// src/hooks.server.ts
import type {Handle} from '@sveltejs/kit';
import type {LoginState} from '$lib/stores/login';

declare module '@sveltejs/kit' {
    interface Locals {
        loginState?: LoginState;
        requestId: string; // ⚡ 增量：存储当前请求的唯一ID
    }
}

export const handle: Handle = async ({ event, resolve }) => {
    // 1. 生成本次请求的唯一 ID (无分割符 UUID)
    const requestId = crypto.randomUUID().replace(/-/g, '');
    event.locals.requestId = requestId;

    // 2. 模拟/获取登录状态
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    event.locals.loginState = {
        uid: '1000010441',
        token: '46ce0f086d215805c50bbf1ce6fbc1eb'
    };

    const now = new Date();
    const utcTime = now.toISOString();

    // 打印服务器接收请求日志
    console.info(`[${requestId}] [${utcTime}] SSR Request: ${event.url.pathname}`);

    const response = await resolve(event, {
        transformPageChunk: ({ html }) => {
            // 3. 在 HTML 头部插入包含 ID 和时间的调试信息
            // 这样你直接右键查看网页源代码，就能看到这个页面是哪个请求 ID 生成的
            const debugComment = `\n`;
            return html.replace(/<!doctype html>/i, `<!doctype html>${debugComment}`);
        }
    });

    // 4. 在响应头里也塞入这个 ID（方便浏览器 F12 网络面板查看）
    response.headers.set('x-request-id', requestId);

    return response;
};