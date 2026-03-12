// src/lib/app.ts


// Api响应体
export interface ApiResponse<T> {
    code: number;
    msg: string;
    data: T;
}

// 请求选项
export interface RequestOptions {
    timeout?: number;
    headers?: Record<string, string>;
}

/**
 * 统一 API 请求封装（SvelteKit 原生 fetch 版本）
 *
 * @param request 接口方法名，例如 video.getVideo
 * @param params  请求参数
 * @param options 可选配置
 * @param fetcher 可传入 SvelteKit 的 event.fetch（推荐）
 */
export async function get_api<T>(
    request: string,
    params: Record<string, any> = {},
    options: RequestOptions = {},
    fetcher: typeof fetch = fetch
): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeout = options.timeout ?? 5000;

    const timer = setTimeout(() => {
        controller.abort();
    }, timeout);

    try {
        const response = await fetcher("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            },
            body: JSON.stringify({
                request,
                ...params
            }),
            signal: controller.signal
        });

        clearTimeout(timer);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const result: ApiResponse<T> = await response.json();

        if (result.code !== 0) {
            throw new Error(result.msg || "API Error");
        }

        return result;
    } catch (err: any) {
        if (err.name === "AbortError") {
            throw new Error("Request Timeout");
        }
        throw new Error(err.message || "Network Error");
    }
}