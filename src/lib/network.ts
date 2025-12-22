// src/lib/network.ts

// 保留原有类型定义（不改动）
interface ApiConfig {
    host: string;
    port?: number;
    client_id: string;
    client_secret: string;
    timeout: number;
    headers?: Record<string, string>;
}

const default_config: ApiConfig = {
    host: "http://api2.damawei.com",
    port: 8080,
    client_id: "1234567890",
    client_secret: "1234567890",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
};

function build_url(path: string, config: ApiConfig = default_config): string {
    const base_host = config.host.endsWith("/") ? config.host.slice(0, -1) : config.host;
    const api_path = path.startsWith("/") ? path.slice(1) : path;
    const port_str = config.port ? `:${config.port}` : "";
    return `${base_host}${port_str}/${api_path}`;
}

export interface ApiResponse<T = any> {
    code: number;
    msg: string;
    data: T;
}

export async function request_api<T = any>(
    action: string,
    params: Record<string, string | number> = {},
    method: "GET" | "POST" = "GET",
    custom_config?: Partial<ApiConfig>
): Promise<ApiResponse<T>> {
    const config = { ...default_config, ...custom_config };
    const url = new URL(build_url("appapi/", config));

    // 仅保留核心请求逻辑，删除所有判断
    const request_params = { s: action, client_id: config.client_id, ...params };
    const fetch_options: RequestInit = { method, headers: config.headers ?? {} };

    if (method === "GET") {
        Object.entries(request_params).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
    } else if (method === "POST") {
        fetch_options.body = JSON.stringify(request_params);
    }

    // 直接请求，不判断HTTP状态码、不捕获超时
    const response = await fetch(url.toString(), fetch_options);
    const result = await response.json();

    // ✅ 核心改动：删除所有判断，服务器返回啥就返回啥
    // 直接取result.data，没有就返回空对象，不处理code/msg
    return {
        code: result.data?.code ?? 0,  // 仅兜底，不判断
        msg: result.data?.msg ?? "",   // 仅兜底，不判断
        data: result.data ?? {} as T   // 服务器返回的data原样返回
    };
}

// 保留原有快捷函数（不改动）
export const get_api = <T = any>(
    action: string,
    params?: Record<string, string | number>,
    custom_config?: Partial<ApiConfig>
) => request_api<T>(action, params ?? {}, "GET", custom_config);

export const post_api = <T = any>(
    action: string,
    params?: Record<string, string | number>,
    custom_config?: Partial<ApiConfig>
) => request_api<T>(action, params ?? {}, "POST", custom_config);