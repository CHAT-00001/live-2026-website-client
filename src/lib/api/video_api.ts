// src/api/video_api.ts  -- 接口列表

import {autoGateway} from '$lib/network2/gateway.ts';


/**
 * 列表 接口
 */
export const ListApi = {
    // 随机
    RandomList: (page: number, size: number) => autoGateway({
        name: 'video',
        path: 'list',
        params: {service: 'video.getVideoList', page, size}
    }),

    // 附近
    NearbyList: (lat: number | string, lng: number | string, page: number, size: number) => autoGateway({
        method: 'GET',
        name: 'video',
        path: 'list/nearby',
        params: {service: 'video.getNearbyList', lat, lng, page, size}
    }),

    // 热门
    HotList: (page: number, size: number) => autoGateway({
        name: 'video',
        path: 'list',
        params: {service: 'video.getHotVideoList', page, size}
    }),

    // 精选
    BestList: (page: number, size: number) => autoGateway({
        name: 'video',
        path: 'list',
        params: {service: 'video.getVideoList2', page, size}
    }),

    // 关注的人发布的
    FollowsList: (page: number, size: number) => autoGateway({
        name: 'video',
        path: 'list/follows',
        params: {service: 'video.getAttedList', page, size}
    }),

    // 点赞过的
    LikedList: (page: number, size: number) => autoGateway({
        method: 'GET',
        name: 'video',
        path: 'like',
        params: {service: 'video.setLikeVideo', page, size}
    }),

    // 收藏过的
    CollectedList: (uid: number | string, token: string, page: number, size: number) => autoGateway({
        method: 'GET',
        name: 'video',
        path: 'like',
        params: {service: 'video.getCollectList', uid, token, page, size}
    }),

    // 看过的
    ViewList: (uid: number | string, token: string, page: number, size: number) => autoGateway({
        method: 'GET',
        name: 'video',
        path: 'like',
        params: {service: 'video.getViewsList', uid, token, page, size}
    }),

    // 分类下的
    CategoryList: (categoryId: string | number, page: number, size: number) => autoGateway({
        method: 'GET',
        name: 'video',
        path: 'category/:id',
        pathParams: {id: categoryId},
        params: {service: 'video.setLikeVideo', categoryid: categoryId, page, size}
    }),

    // 主页发布的
    HomeList: (targetId: string | number, uid: number | string, token: string, page: number, size: number) => autoGateway({
        method: 'GET',
        name: 'video',
        path: 'home/:id',
        pathParams: {id: targetId},
        params: {service: 'video.setLikeVideo', touid: targetId, uid, token, page, size}
    }),

    // 搜索的
    SceachList: (keyword: string | number, uid: number | string, token: string, page: number, size: number) => autoGateway({
        method: 'POST',
        name: 'video',
        path: 'sceach/:kw',
        pathParams: {kw: keyword},
        params: {service: 'video.SceachVideo', kw: keyword, uid, token, page, size}
    }),
};

/**
 * 点赞 接口
 */
export const LikesApi = {
    // 点赞视频
    Add: (videoId: string | number, uid: number | string, token: string) => autoGateway({
        method: 'POST',
        name: 'video',
        path: ':id/like/add',
        pathParams: {id: videoId},
        params: {service: 'video.setLike', videoid: videoId, uid, token},
    }),

    // 取消点赞
    Del: (videoId: string | number, uid: number | string, token: string) => autoGateway({
        method: 'POST',
        name: 'video',
        path: ':id/like/del',
        pathParams: {id: videoId},
        params: {service: 'video.delLike', videoid: videoId, uid, token}
    }),
};

/**
 * 收藏 接口
 */
export const CollectApi = {
    // 点赞视频
    Add: (videoId: string | number, uid: number | string, token: string) => autoGateway({
        method: 'POST',
        name: 'video',
        path: ':id/collect/add',
        pathParams: {id: videoId},
        params: {service: 'video.setCollect', videoid: videoId, uid, token},
    }),

    // 取消点赞
    Del: (videoId: string | number, uid: number | string, token: string) => autoGateway({
        method: 'POST',
        name: 'video',
        path: ':id/collect/del',
        pathParams: {id: videoId},
        params: {service: 'video.delLike', videoid: videoId, uid, token}
    }),
};

/**
 * 评论 接口
 */
export const CommentsApi = {
    // 随机列表
    new: (videoId: number, page = 1, size = 10) => autoGateway({
        method: 'GET',
        name: 'video',
        path: ':id/comment',
        pathParams: {id: videoId},
        params: {service: 'video.getCommentList', videoid: videoId, page, size}
    }),

    // 附近的
    nearby: (videoId: number, lat: number, lng: number, page = 1, size = 10) => autoGateway({
        method: 'GET',
        name: 'video',
        path: ':id/comment/nearby',
        pathParams: {id: videoId},
        params: {service: 'video.getNearbyComments', lat, lng, page, size}
    }),

    // 焦点
    by: (videoId: number, CommentId: string, page = 1, size = 10) => autoGateway({
        method: 'GET',
        name: 'video',
        path: ':id/comment/by',
        pathParams: {id: videoId},
        params: {service: 'video.getCommentsByID', comment_id: CommentId, page, size}
    }),

    // 发布
    add: (videoId: number, uid: number | string, token: string) => autoGateway({
        method: 'POST',
        name: 'video',
        path: 'comments/add',
        pathParams: {id: videoId},
        params: {service: 'video.setComment', uid, token}
    }),

    // 删除
    del: (videoId: number, CommentId: number, uid: number | string, token: string) => autoGateway({
        method: 'POST',
        name: 'video',
        path: 'comment/del/:id',
        pathParams: {id: videoId},
        params: {service: 'video.DelComments', comment_id: CommentId, uid, token}
    }),

    // 点赞
    addLike: (commentId: number, uid: string | number, token: string) => autoGateway({
        method: 'POST',
        name: 'video',
        path: 'comment/:id/like/add',
        pathParams: {id: commentId},
        params: {service: 'video.setLikeVideo', comment_id: commentId, uid, token},
    }),

    // 取消点赞
    delLike: (commentId: number, uid: string | number, token: string) => autoGateway({
        method: 'POST',
        name: 'video',
        path: 'comment/:id/like/del',
        pathParams: {id: commentId},
        params: {service: 'video.delCommentLike', comment_id: commentId, uid, token},
    }),

    // 踩
    setStep: (commentId: number, uid: string | number, token: string) => autoGateway({
        method: 'POST',
        name: 'video',
        path: 'comment/:id/step/add',
        pathParams: {id: commentId},
        params: {service: 'video.setCommentStep', comment_id: commentId, uid, token},
    }),

    // 取消踩
    delStep: (commentId: number, uid: string | number, token: string) => autoGateway({
        method: 'POST',
        name: 'video',
        path: 'comment/:id/step/del',
        pathParams: {id: commentId},
        params: {service: 'video.delCommentStep', comment_id: commentId, uid, token},
    }),
};

/**
 * 弹幕 接口
 */
export const DanmakuApi = {
    // 新的
    new: (videoId: number | string, time: number | string, qty: number) => autoGateway({
        method: 'GET',
        name: 'video',
        path: ':id/danmaku',
        pathParams: {id: videoId},
        params: {service: 'video.getDanmakuList', video_id: videoId, time, qty}
    }),

    // 焦点
    by: (videoId: number | string, danmakuId: string, time: number | string, qty: number) => autoGateway({
        method: 'GET',
        name: 'video',
        path: ':id/danmaku/by/:id2',
        pathParams: {id: videoId, id2: danmakuId},
        params: {service: 'video.getDanmakuByID', video_id: videoId, danmaku_id: danmakuId, time, qty}
    }),

    // 发布
    add: (videoId: number, uid: number | string, token: string) => autoGateway({
        method: 'POST',
        name: 'video',
        path: ':id/danmaku',
        pathParams: {id: videoId},
        params: {service: 'video.setDanmaku', uid, token}
    }),

    // 删除
    del: (danmakuId: number, uid: number | string, token: string) => autoGateway({
        method: 'POST',
        name: 'video',
        path: 'danmaku/:id',
        pathParams: {id: danmakuId},
        params: {service: 'video.DelComments', comment_id: danmakuId, uid, token}
    }),

    // 点赞
    setLike: (danmakuId: number, uid: string | number, token: string) => autoGateway({
        method: 'POST',
        name: 'video',
        path: 'danmaku/:id/like/add',
        pathParams: {id: danmakuId},
        params: {service: 'video.setDanmakuLike', danmaku_id: danmakuId, uid, token},
    }),

    // 取消点赞
    delLike: (danmakuId: number, uid: string | number, token: string) => autoGateway({
        method: 'POST',
        name: 'video',
        path: 'danmaku/:id/like/del',
        pathParams: {id: danmakuId},
        params: {service: 'video.delDanmakuIdLike', danmaku_id: danmakuId, uid, token},
    }),

    // 踩
    addStep: (danmakuId: number, uid: string | number, token: string) => autoGateway({
        method: 'POST',
        name: 'video',
        path: 'danmaku/:id/step/add',
        pathParams: {id: danmakuId},
        params: {service: 'video.setCommentStep', danmaku_id: danmakuId, uid, token},
    }),

    // 删除踩
    delStep: (danmakuId: number, uid: string | number, token: string) => autoGateway({
        method: 'POST',
        name: 'video',
        path: 'danmaku/:id/step/del',
        pathParams: {id: danmakuId},
        params: {service: 'video.delDanmakuStep', danmaku_id: danmakuId, uid, token},
    }),
};

/**
 * 浏览 接口
 */
export const InfoApi = {
    // 发布
    add: (uid: number | string, token: string,) => autoGateway({
        method: 'POST',
        name: 'video',
        path: 'add',
        params: {service: 'video.setVideo', uid, token},
    }),

    // 删除
    del: (videoId: number | string, uid: number | string, token: string,) => autoGateway({
        method: 'POST',
        name: 'video',
        path: ':id/del',
        pathParams: {id: videoId},
        params: {service: 'video.delVideo', videoid: videoId, uid, token},
    }),

    // 跳出
    jump: (videoId: number | string, time: number, uid: number | string, token: string,) => autoGateway({
        method: 'POST',
        name: 'video',
        path: ':id/jump',
        pathParams: {id: videoId},
        params: {service: 'video.set', videoid: videoId, time, uid, token},
    }),

    // 完播
    done: (videoId: number | string, uid: number | string, token: string,) => autoGateway({
        method: 'POST',
        name: 'video',
        path: ':id/done',
        pathParams: {id: videoId},
        params: {service: 'video.setDoneById', video_id: videoId, uid, token},
    }),

    // 更新
    update: (videoId: number | string, uid: number | string, token: string,) => autoGateway({
        method: 'POST',
        name: 'video',
        path: ':id/update',
        params: {service: 'video.setUpdateById', video_id: videoId, uid, token},
    }),

    // 隐藏
    hidden: (videoId: number | string, uid: number | string, token: string,) => autoGateway({
        method: 'POST',
        name: 'video',
        path: ':id/hidden',
        pathParams: {id: videoId},
        params: {service: 'video.setHiddenVideoById', video_id: videoId, uid, token},
    }),
};