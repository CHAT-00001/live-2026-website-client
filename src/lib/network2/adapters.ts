// src/lib/network2/adapters.ts  -- 数据适配层

// 服务端统一响应体
export interface ApiResponse<T> {
    ret: number;               // php 主机状态码 需兼容
    status: number;            // rust 主机状态码
    success: boolean;          // 成功与否
    payload: T;                // 业务数据体
    message?: string;          // 消息
}

// PHP 适配器
export function wrapLegacy<T>(data: any): ApiResponse<T> {
    return {
        ret: 200,
        status: 200,
        success: data.status === 'success' || data.code === 0,
        payload: data.data || data.result,
        message: data.msg || data.error_message
    };
}

// Rust 适配器
export function wrapModern<T>(data: any): ApiResponse<T> {
    return {
        ret: 200,
        status: 200,
        success: true, // 假设 Rust 端 non-200 已经在 fetch 阶段 catch 了
        payload: data,
        message: ''
    };
}