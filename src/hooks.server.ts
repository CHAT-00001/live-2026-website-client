// src/hooks.server.ts

import type {Handle, HandleServerError} from '@sveltejs/kit';
// 💡 注意：如果 Vite 报错找不到模块，请尝试将路径改为 './lib/kits/logger.ts'
import {info, error as logError} from '$lib/kits/logger';

/**
 * 服务器错误统一处理钩子
 */
export const handleError: HandleServerError = ({error, event}) => {
    const requestId = event.locals.requestId || 'unknown';

    // ✅ 使用亮红色记录错误，并关联当前的 requestId
    logError(`[${event.url.pathname}] --- Server Error --- ${error}`, requestId);

    return {
        message: '服务器开小差了，请稍后再试',
        code: 'INTERNAL_ERROR',
        requestId // 传给前端，方便用户报修时提供 ID
    };
};

/**
 * 请求拦截与处理钩子
 */
export const handle: Handle = async ({ event, resolve }) => {
    // 1️⃣ 生成唯一请求 ID (8位短 ID)，用于全链路追踪
    const requestId = crypto.randomUUID().split('-')[0];
    event.locals.requestId = requestId;

    // 2️⃣ 从 Cookie 读取登录凭证 (真实的登录状态)
    const uid = event.cookies.get('uid');               // 用户id
    const token = event.cookies.get('token');           // 令牌
    const nickname = event.cookies.get('user_nickname'); // 昵称
    const avatar = event.cookies.get('avatar');         // 头像

    if (uid && token) {
        // ✅ 填充 locals.user，供后端 API 和前端页面使用
        event.locals.user = {
            uid: uid,
            id: uid,
            token: token,
            user_nickname: decodeURIComponent(nickname || '未知用户'),
            avatar: avatar || '',
        };

        // 保持 loginState 兼容旧逻辑
        event.locals.loginState = {
            uid,
            token,
            clientId: '',
            key: '',
            device: ''
        };
    } else {
        event.locals.user = null;
        event.locals.loginState = undefined;
    }

    // 3️⃣ 打印彩色 SSR 请求日志
    // 效果：[灰色时间戳] [亮绿INFO] [青色ID] SSR: /u/123456
    info(`SSR: ${event.url.pathname}`, requestId);

    // 4️⃣ 执行页面渲染逻辑
    const response = await resolve(event, {
        transformPageChunk: ({ html }) => {
            // 在 HTML 末尾注入一个隐藏的调试信息（可选）
            return html + `\n`;
        }
    });

    // 5️⃣ 将 RequestID 注入响应头，方便在浏览器 F12 网络面板查看
    response.headers.set('x-request-id', requestId);

    return response;
};