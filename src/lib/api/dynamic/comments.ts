// src/lib/api/dynamic/like.ts  -- 动态评论接口

// 导入网络SDK的请求接口
import {AutoGateway} from "$lib/network2/gateway.ts";

const URL = "https://api2.damawei.com/appapi/?s=dynamic.getRecommendDynamics&uid=1000008801&token=123&videoid=1000000807"
const NAME = "dynamic";   // 模块名称
const PATH = "comments"   // 动作路径

// 评论
export const CommentApi = {

    // 获取评论列表 by dynamicId
    getComments: (dynamic_id: number, page: number, size: number, uid: any, token: string,) =>
        AutoGateway({
            method: 'GET',
            name: NAME,
            path: PATH,
            params: {service: NAME + '.getComments', dynamic_id, page, size, uid, token,}
        }),

    // 发布评论
    addComment: (dynamic_id: number, uid: any, token: string, commentContent: string) =>
        AutoGateway({
            method: 'POST',
            name: NAME,
            path: PATH,
            params: {service: NAME + '.setComments', dynamic_id, uid, token, comment: commentContent}
        }),

    // 删除评论
    delCommentById: (comment_id: number, uid: any, token: string) =>
        AutoGateway({
            method: 'POST',
            name: NAME,
            path: PATH,
            params: {service: NAME + '.delComments', comment_id, uid, token}
        }),

    // 添加点赞
    addLike: (comment_id: number, uid: any, token: string) =>
        AutoGateway({
            method: 'GET',
            name: NAME,
            path: PATH,
            params: {service: NAME + '.addCommentLike', comment_id, uid, token}
        }),

    // 删除点赞
    delLike: (comment_id: number, uid: any, token: string) =>
        AutoGateway({
            method: 'GET',
            name: NAME,
            path: PATH,
            params: {service: NAME + '.delCommentLike', comment_id, uid, token}
        }),

}