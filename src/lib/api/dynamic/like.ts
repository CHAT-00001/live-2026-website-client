// src/lib/api/dynamic/like.ts

import {AutoGateway} from "$lib/network2/gateway";

const NAME = "dynamic";
const PATH = "like";

// 内部构造 service = s  （兼容PHP Api 后端）
const s = (action: string) => `${NAME}.${action}`;

export const Like = {
    // 添加点赞
    addLike: (dynamic_id: number, uid: number, token: string) =>
        AutoGateway({
            method: "POST",
            name: NAME,
            path: PATH,
            params: {
                service: s("addLike"),
                dynamic_id,
                uid,
                token
            }
        }),

    // 删除点赞
    delLike: (dynamic_id: number, uid: number, token: string) =>
        AutoGateway({
            method: "POST",
            name: NAME,
            path: PATH,
            params: {
                service: s("delLike"),
                dynamic_id,
                uid,
                token
            }
        }),

    // 查看点赞用户列表
    getLikeUsers: (
        dynamic_id: number,
        page: number,
        size: number,
        uid: number,
        token: string
    ) =>
        AutoGateway({
            method: "GET",
            name: NAME,
            path: PATH,
            params: {
                service: s("getLikeUsers"),
                dynamic_id,
                page,
                size,
                uid,
                token
            }
        })
};