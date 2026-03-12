// src/lib/stores/user.ts
import {writable} from 'svelte/store';

export interface User {
    id: string;                   // 操作者id
    uid: string;                  // 用户id
    token: string;                // token
    user_nickname: string;        // 昵称
    avatar: string;               // 头像
    signature?: string;           // 签名
    sex?: string;                 // 性别
    level?: string;               // 用户等级
    coin?: string;                // 金币
    usersign?: string;            // 如果要做 IM 聊天，这个必留
    location?: string;            // 位置
    [key: string]: any;           // key
}

// 初始化为 null
export const user = writable<User | null>(null);