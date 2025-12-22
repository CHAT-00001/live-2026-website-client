// src/lib/stores/login.ts

import { writable } from 'svelte/store';

export interface LoginState {
    uid: string;
    token: string;
}

// 初始化为临时开发用的登录状态
const defaultState: LoginState = {
    uid: '1000010441',
    token: '46ce0f086d215805c50bbf1ce6fbc1eb'
};

export const loginStore = writable<LoginState>(defaultState);
