// src/router/api/dynamic/comment/+server.ts  -- 动态评论服务

import {json, error} from '@sveltejs/kit';
import {CommentApi} from '$lib/api/dynamic/comments';
import type {RequestHandler} from './$types';

// 获取评论列表
export const GET: RequestHandler = async ({url}) => {
    const dynamicId = Number(url.searchParams.get('dynamicId'));
    const page = Number(url.searchParams.get('page')) || 1;
    const size = Number(url.searchParams.get('size')) || 10;
    const uid = url.searchParams.get('uid');
    const token = url.searchParams.get('token') || '';

    if (!dynamicId) throw error(400, '缺少 dynamicId');

    // 直接调用 API 层方法，http 方法在 CommentApi.getComments 中定义好了
    const result = await CommentApi.getComments(dynamicId, page, size, uid, token);
    return json(result);
};

// 统一的 POST 处理：发表、删除、点赞等操作
export const POST: RequestHandler = async ({request}) => {
    try {
        const body = await request.json();
        const {action, ...params} = body;

        let result;

        // 根据 action 字段分发逻辑，具体 http 方法在 api 层封装
        switch (action) {
            case 'add':
                result = await CommentApi.addComment(
                    params.dynamicId,
                    params.uid,
                    params.token,
                    params.comment
                );
                break;

            case 'delete':
                result = await CommentApi.delCommentById(
                    params.commentId, // 这里 api 层定义的是 comment_id
                    params.uid,
                    params.token
                );
                break;

            case 'like':
                result = await CommentApi.addCommentLike(
                    params.commentId,
                    params.uid,
                    params.token
                );
                break;

            case 'unlike':
                result = await CommentApi.delCommentLike(
                    params.commentId,
                    params.uid,
                    params.token
                );
                break;

            default:
                throw error(400, '无效的操作类型 (action)');
        }

        return json(result);

    } catch (e: any) {
        console.error('评论接口调用失败:', e);
        throw error(500, e.message || '内部服务器错误');
    }
};