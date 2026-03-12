// src/routes/api/login/add/+server.ts
import {json} from '@sveltejs/kit';
import {LoginApi} from '$lib/api/login/info';

export async function GET({url, cookies}) {
    const country_code = Number(url.searchParams.get('country_code') || 86);
    const user_login = url.searchParams.get('user_login') || '';
    const user_pass = url.searchParams.get('user_pass') || '';

    if (!user_login || !user_pass) {
        return json({code: 400, msg: '请输入账号和密码', data: null});
    }

    try {
        const res = await LoginApi.addLogin(country_code, user_login, user_pass);

        console.log("LoginApi 原始返回:", JSON.stringify(res, null, 2));

        const phpData = res?.data ?? {};
        const phpCode = phpData.code;
        const phpMsg = phpData.msg || res?.msg || '';
        const phpInfo = phpData.info?.[0] ?? null;

        if (phpCode !== 0 || !phpInfo) {
            return json({code: phpCode ?? 500, msg: phpMsg || "登录失败", data: null});
        }

        // --- ✅ 统一 Cookie 配置 ---
        const cookieOptions = {
            path: "/",
            httpOnly: true, // 保持安全
            sameSite: "lax" as const,
            maxAge: 60 * 60 * 24 * 30 // 30天有效
        };

        // 1️⃣ 写入核心凭证
        cookies.set("uid", phpInfo.id, cookieOptions);
        cookies.set("token", phpInfo.token, cookieOptions);

        // 2️⃣ ✅ 补齐 UI 字段：写入头像和昵称 (这是你之前漏掉的)
        // 昵称需要编码，防止中文导致 Cookie 写入失败
        cookies.set("user_nickname", encodeURIComponent(phpInfo.user_nickname || ''), cookieOptions);
        cookies.set("avatar", phpInfo.avatar || '', cookieOptions);

        return json({code: 0, msg: phpMsg || "登录成功", data: phpInfo});

    } catch (err: any) {
        console.error("登录异常:", err);
        return json({code: 500, msg: "server error", data: null});
    }
}