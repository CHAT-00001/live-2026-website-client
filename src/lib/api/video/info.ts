// src/lib/api/video/info.ts  -- 视频流接口
// 2026-03-04 05:34:20

// 导入网络SDK的请求接口
import {AutoGateway} from "$lib/network2/gateway.ts";

const NAME = "video";
const PATH = "info"

// 拼接PHP请求参数 service
const s = (action: string) => `${NAME}.${action}`;

// 列表
export const ListApi = {
    // 推荐
    getRecommendList: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: PATH,
            params: {service: s("getRecommend"), page, size, uid, token}
        }),

    // 随机
    getVideoList: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: PATH,
            params: {service: s("getVideoList"), page, size, uid, token}
        }),

    // 随机
    getCategoriesVideoList: (category_id: number, page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: PATH,
            params: {service: s("getVideoList"), category_id, page, size, uid, token}
        }),

    // 附近
    getNearbyList: (page: number, size: number, uid: any, token: string, lat: any, lng: any) =>
        AutoGateway({
            name: NAME,
            path: PATH,
            params: {service: s("getNearbyList"), page, size, uid, token, lat, lng}
        }),

    // 我的
    getMyVideos: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: 'mine',
            params: {service: s("getMyDynamics"), page, size, uid, token}
        }),

    // 主页
    getHomeVideo: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: 'home',
            params: {service: NAME + '.getHomeDynamics', page, size, uid, token}
        }),

    // 点赞
    getLikeList: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: 'like',
            params: {service: NAME + '.getLikeDynamics', page, size, uid, token}
        }),

    // 浏览过的
    getVisitedList: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: 'visited',
            params: {service: NAME + '.getVisitedDynamic', page, size, uid, token}
        }),
}

// 互动
export const AloneApi = {
    // 发布
    Add: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: PATH,
            params: {service: s("setDynamics"), page, size, uid, token}
        }),

    // 删除
    Del: (page: number, size: number, uid: any, token: string, lat: any, lng: any) =>
        AutoGateway({
            name: NAME,
            path: PATH,
            params: {service: s("delDynamic"), page, size, uid, token, lat, lng}
        }),

    // 修改
    getMyDynamics: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: 'mine',
            params: {service: s("editDynamics"), page, size, uid, token}
        }),

    // 浏览
    getView: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: PATH,
            params: {service: s("getDynamics"), page, size, uid, token}
        }),

    // 添加点赞
    addLike: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: 'like',
            params: {service: s("addLike"), page, size, uid, token}
        }),

    // 删除点赞
    delLike: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: 'like',
            params: {service: s("delLike"), page, size, uid, token}
        }),

    // 添加收藏
    getCollect: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: 'like',
            params: {service: s("getCollect"), page, size, uid, token}
        }),

    // 删除收藏
    delCollect: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: 'visited',
            params: {service: s("delCollect"), page, size, uid, token}
        }),

    // 添加举报
    addReport: (page: number, size: number, uid: any, token: string) =>
        AutoGateway({
            name: NAME,
            path: 'visited',
            params: {service: s("addReport"), page, size, uid, token}
        }),
}