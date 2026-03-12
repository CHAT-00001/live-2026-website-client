// src/lib/api/dynamic/info.ts  -- 动态流接口
// 2026-03-04 05:34:20

// 导入网络SDK的请求接口
import {AutoGateway} from "$lib/network2/gateway.ts";

const NAME = "dynamic";
const PATH = "info"

// 拼接PHP请求参数 service
const service = (action: string) => `${NAME}.${action}`;

// 列表
export const ListApi = {
    // 推荐
    getRecommend: (p: number, page: number, size: number, uid: any, token: string, lat: any, lng: any) =>
        AutoGateway({
            name: NAME,
            path: PATH,
            params: {service: service("getRecommendDynamics"), p, page, size, uid, token, lat, lng},
        }),

    // 最新
    getNewest: (p: number, page: number, size: number, uid: any, token: string, lat: any, lng: any) =>
        AutoGateway({
            name: NAME,
            path: PATH,
            params: {service: service("getNewDynamic"), p, page, size, uid, token, lat, lng}
        }),

    // 附近
    getNearby2: (p: number, page: number, size: number, uid: any, token: string, lat: any, lng: any) =>
        AutoGateway({
            name: NAME,
            path: PATH,
            params: {service: service("getNearby"), p, page, size, uid, token, lat, lng}
        }),

    // 我的
    getMyDynamics: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: 'mine',
            params: {service: service("getMyDynamics"), page, size, uid, token}
        }),

    // 主页
    getHomeDynamics: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: PATH,
            params: {service: service("getHomeDynamic"), page, size, uid, token}
        }),

    // 关主的人发布的
    getFollowingPosts: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: PATH,
            params: {service: service("getAttentionDynamic"), page, size, uid, token}
        }),

    // 点赞
    getLikeDynamics: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: 'like',
            params: {service: service("getLikeDynamics"), page, size, uid, token}
        }),

    // 浏览过的
    getVisitedDynamics: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: 'visited',
            params: {service: service("getVisitedDynamic"), page, size, uid, token}
        }),
}

// 互动
export const AloneApi = {
    // 发布
    Add: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: PATH,
            params: {service: service("setDynamics"), page, size, uid, token}
        }),

    // 删除
    Del: (page: number, size: number, uid: any, token: string, lat: any, lng: any) =>
        AutoGateway({
            name: NAME,
            path: PATH,
            params: {service: service("delDynamic"), page, size, uid, token, lat, lng}
        }),

    // 修改
    getMyDynamics: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: PATH,
            params: {service: service("editDynamics"), page, size, uid, token}
        }),

    // 浏览
    getDynamics: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: PATH,
            params: {service: service("getDynamics"), page, size, uid, token}
        }),

    // 添加到浏览记录
    addVisitedLog: (dynamic_id: any, page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: PATH,
            params: {service: service("AddVisitedLog"), dynamic_id, page, size, uid, token}
        }),

    // 添加点赞
    addLike: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: 'like',
            params: {service: service("addLike"), page, size, uid, token}
        }),

    // 删除点赞
    delLike: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: 'like',
            params: {service: service("delLike"), page, size, uid, token}
        }),

    // 添加收藏
    getCollect: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: 'like',
            params: {service: service("getCollect"), page, size, uid, token}
        }),

    // 删除收藏
    delCollect: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: 'visited',
            params: {service: service("delCollect"), page, size, uid, token}
        }),

    // 添加举报
    addReport: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: 'visited',
            params: {service: service("addReport"), page, size, uid, token}
        }),
}