// src/lib/api/login/info.ts  -- 登录接口
// 2026-03-04 09:30:20

// 导入网络SDK的请求接口
import {AutoGateway} from "$lib/network2/gateway.ts";

const NAME = "login";
const PATH = "info"

// 拼接PHP请求参数 service
const s = (action: string) => `${NAME}.${action}`;

// 列表
export const LoginApi = {
    // 用户登录
    addLogin: (country_code: number, user_login: string, user_pass: string) =>
        AutoGateway({
            name: NAME,
            path: PATH,
            params: {service: s("userLogin"), country_code, user_login, user_pass}
        }),

    // 注册
    addReg: (country_code: number, user_login: number, user_pass: any, user_pass2: string, code: any, source: any, source_type: number) =>
        AutoGateway({
            name: NAME,
            path: PATH,
            params: {service: s("userReg"), country_code, user_login, user_pass, user_pass2, code, source, source_type}
        }),

    // 找回密码
    findPass: (country_code: number, user_login: string, user_pass: string, user_pass2: string, code: string, source_type: number) =>
        AutoGateway({
            name: NAME,
            path: 'mine',
            params: {service: s("FindPass"), country_code, user_login, user_pass2, code, source_type}
        }),

    // LoginByThird
    LoginByThird: (openid: number, type: number, nicename: string, avatar: string, sign: string, source: string, access_token: string) =>
        AutoGateway({
            name: NAME,
            path: 'home',
            params: {service: s("userLoginByThird"), openid, type, nicename, avatar, sign, source, access_token}
        }),

    // 点赞
    getCode: (country_code: any, mobile: number, sign: any) =>
        AutoGateway({
            name: NAME,
            path: 'like',
            params: {service: s("getCode"), country_code, mobile, sign}
        }),


    // 忘记密码
    getForgetCode: (country_code: any, mobile: number, sign: any) =>
        AutoGateway({
            name: NAME,
            path: 'like',
            params: {service: s("getForgetCode"), country_code, mobile, sign}
        }),

    // 获取Uni id 获取微信code
    getUnionid: (code: string) =>
        AutoGateway({
            name: NAME,
            path: 'visited',
            params: {service: s("getUnionid"), code}
        }),

    // 退出登录
    logout: (uid: number, token: string) =>
        AutoGateway({
            name: NAME,
            path: 'visited',
            params: {service: s("logout"), uid, token}
        }),

    // 获取注销条件
    getCancelCondition: (uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: 'visited',
            params: {service: s("getCancelCondition"), uid, token}
        }),

    // 注销
    cancelAccount: (time: any, sign: string, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: 'visited',
            params: {service: s("cancelAccount"), time, sign, uid, token}
        }),


    // 获取地区码
    getCountrys: (uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: 'visited',
            params: {service: s("getCountrys"), uid, token}
        }),
}