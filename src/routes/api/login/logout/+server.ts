// src/routes/api/login/logout/+server.ts


import {json} from '@sveltejs/kit';

export async function POST({cookies}) {
    const cookieOptions = {
        path: "/",
        httpOnly: true,
        sameSite: "lax" as const,
        maxAge: 0 // 设置为 0 立即失效
    };

    // 清除所有相关的 Cookie
    cookies.delete("uid", {path: "/"});
    cookies.delete("token", {path: "/"});
    cookies.set("user_nickname", "", cookieOptions);
    cookies.set("avatar", "", cookieOptions);

    return json({code: 0, msg: "已退出登录"});
}