// src/lib/models/api.ts
// API 结构体   2025-11-18 03:26:40  wx:18888461290


/**
 * ClientInfo 客户端信息
 */
export interface ClientInfo {
    client_id: string;
    client_secret: string;
    client_version: string;
    signature: string;
}

/**
 * ApiRequest - Api请求体
 */
export interface ApiRequest {
    goodsid?: string;
    lat?: string;
    lng?: string;
    p?: number;
    uid?: number;
    token?: string;
}

/**
 * ApiRequestBody - 视频请求体
 */
export interface ApiRequestBody {
    id?: number;                          // id
    video_id?: string;                    // 视频id
    touid?: string;                       // 目标用户id
    lat?: string;                         // 纬度
    lng?: string;                         // 经度
    keyword?: string;                     // 关键词
    p?: number;                           // 页码
    page?: number;                        // 页码
    uid?: number | string;                // 用户id
    token?: string;                       // token
}

/**
 * ApiUrlParms - URL请求参数
 */
export interface ApiUrlParms {
    id?: number;                          // id
    video_id?: string;                    // 视频id
    touid?: string;                       // 目标用户id
    lat?: string;                         // 纬度
    lng?: string;                         // 经度
    keyword?: string;                     // 关键词
    p?: number;                           // 页码
    page?: number;                        // 页码
    uid?: number;                         // 用户id
    token?: string;                       // token
}

/**
 * API Response - Api响应体
 */
export interface ApiResponse<T = any> {
    ret: number;                     // 主机码
    data: ApiData<T>;                // 业务数据
    msg?: string;                    // 主机消息
    time?: string;                   // 耗时
    at?: string;                     // 请求时间
}


/**
 * API DATA - Api业务数据
 */
export interface ApiData<T = any> {
    code: number;                    // 业务码：0. 成功  1. 失败  2. 权限  3. ..
    info: T[];                       // 信息体
    msg: string;                     // 业务消息
    pagination?: Pagination[];       // 分页信息（可选）
}


/**
 * Pagination - 分页信息
 */
export interface Pagination {
    p?: number;                      // page
    page?: number;                   // page
    total?: number;                  // 总量
    qty?: number;                    // 单页数量（兼容旧版）
    size?: number;                   // 每页数量
}