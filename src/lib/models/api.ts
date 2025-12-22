
//// API 结构体   2025-11-18 03:26:40  wx:18888461290


//// ClientInfo
export interface ClientInfo {
    client_id: string;
    client_secret: string;
    client_version: string;
    signature: string;
}

//// API 请求URL参数
export interface ApiRequestUrl {
    lat?: string;
    lng?: string;
    p?: number;
    uid?: number;
    token?: string;
}

//// API 请求体
export interface ApiRequestBody {
    id?: number;
    video_id?: string;
    touid?: string;
    lat?: string;
    lng?: string;
    p?: number;
    uid?: number;
    token?: string;
}

//// API 响应体
export interface ApiResponse<T = any> {
    ret: number;
    data: ApiData<T>;
    msg?: string;
    time?: string;
    at?: string;
}

/// DATA 数据体
export interface ApiData<T = any> {
    code: number;
    info: T[];
    msg: string;
    pagination?: Pagination[];
}

//// 分页结构体
export interface Pagination {
    p?: number;        // page
    page?: number;     // page
    total?: number;    // 总页数
    qty?: number;      // 单页数量
}