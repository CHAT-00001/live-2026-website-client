import {writable, get} from 'svelte/store';

/**
 * LoginState - 登录状态
 */
export interface LoginState {
    clientId?: string;   // 客户端ID
    key?: string;        // 秘钥
    device?: string;     // 设备号
    uid: string;        // 用户ID
    token: string;      // 令牌
}

/**
 * 初始化为临时开发用的登录状态
 */
const defaultState: LoginState = {
    clientId: 'ea00487ae5746448004eab447',
    key: '1234567890',
    device: '1234567890',
    uid: '1000010441',
    token: '46ce0f086d215805c50bbf1ce6fbc1eb'
};

// 登录状态 store
export const loginStore = writable<LoginState | null>(null); // null 表示未登录

// 弹窗显示/隐藏 store
export const showLoginStore = writable(false);

/**
 * 全局函数：打开登录弹窗
 */
export function showLogin() {
    showLoginStore.set(true);
}

/**
 * 全局函数：关闭登录弹窗
 */
export function hideLogin() {
    showLoginStore.set(false);
}

/**
 * 登录成功
 */
export function loginSuccess(state: LoginState) {
    loginStore.set(state);
    hideLogin(); // 登录成功后关闭弹窗
}

/**
 * 登出
 */
export function logout() {
    loginStore.set(null);
}