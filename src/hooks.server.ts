// src/hooks.server.ts
import type {Handle, HandleServerError} from '@sveltejs/kit';
// @ts-ignore
import type {LoginState} from '$lib/stores/login';

declare module '@sveltejs/kit' {
    interface Locals {
        loginState?: LoginState;
        requestId: string; // ⚡ 增量：存储当前请求的唯一ID
    }
}


export const handleError: HandleServerError = ({error, event}) => {
    // 这里可以将错误发送到 Sentry 或直接打印
    console.error('--- Server Error ---');
    console.error(error);
    console.error('Event:', event);

    // 你可以自定义返回给用户的信息
    return {
        message: '服务器开小差了，请稍后再试',
        code: 'INTERNAL_ERROR'
    };
};

export const handle: Handle = async ({ event, resolve }) => {
    // 1. 生成本次请求的唯一 ID (无分割符 UUID)
    const requestId = crypto.randomUUID().replace(/-/g, '');
    event.locals.requestId = requestId;

    // 2. 模拟/获取登录状态
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    event.locals.loginState = {
        uid: '1000008860',
        token: '81706a99665805fe21a2bc7502a07bef'
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