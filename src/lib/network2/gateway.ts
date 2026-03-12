// src/lib/network2/gateway.ts  -- 网络请求


import TOML from '@iarna/toml';
import fs from 'fs';
import path from 'path';


// 网络API接口配置
interface ApiConfig {
    host: string;
    port?: number;
    client_id: string;
    client_secret: string;
    timeout: number;
    headers?: Record<string, string>;
}

// 默认兜底配置
const default_config: ApiConfig = {
    host: "https://api2.damawei.com",
    port: 443,
    client_id: "1234567890",
    client_secret: "1234567890",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
};


// --- 1. 安全配置加载 ---
const configPath = path.resolve('application.toml');
let config: any = {};

if (fs.existsSync(configPath)) {
    try {
        const fileContent = fs.readFileSync(configPath, 'utf-8');
        config = TOML.parse(fileContent);
    } catch (e) {
        console.error('❌ [API Config] 解析 application.toml 失败，请检查 TOML 语法:', e);
    }
} else {
    console.error(`❌ [API Config] 配置文件未找到: ${configPath}`);
    console.error('请确保项目根目录下存在 application.toml 文件。');
    // 设置默认值防止后续解构报错
    config = {api: {gateway: {version: 'v1'}, v1: {}, v4: {}}};
}

// --- 2. 接口定义 ---
export interface UrlParams {
    service?: string;      // PHP专用: video.getvideolist
    page?: number;
    size?: number;

    [key: string]: any;
}

export interface PathParams {
    [key: string]: string | number;
}

export interface GatewayOptions {
    method?: 'GET' | 'POST';
    name: string;          // 模块名 (如 video)
    path: string;          // 路径/动作 (如 list 或 info/:id)
    pathParams?: PathParams;
    params?: UrlParams;
}

// --- 3. 内部适配逻辑 ---

/** PHP 旧版逻辑: 使用 ?s=name.path */
function ApiGateway_1(options: GatewayOptions) {
    const {method = 'GET', name, path, params = {}} = options;
    const v1 = config.api?.v1 || {};
    const host = v1.host || '';
    const prefix = v1.prefix || '/appapi';
    const url = new URL(`${host}${prefix}`);

    const s = params.service || (name ? `${name}.${path}` : path);
    url.searchParams.set('s', s);
    url.searchParams.set('app_id', (v1.app_id || '').toString());

    Object.entries(params).forEach(([k, v]) => {
        if (k !== 'service' && v != null) url.searchParams.set(k, v.toString());
    });

    return {url: url.toString(), method};
}

/** Rust 新版逻辑: 使用 /api/v4/name/path */
function ApiGateway_4(options: GatewayOptions) {
    const {method = 'GET', name, path, pathParams = {}, params = {}} = options;
    const v4 = config.api?.v4 || {};

    let resolvedPath = path;
    Object.entries(pathParams).forEach(([key, val]) => {
        resolvedPath = resolvedPath.replace(`:${key}`, val.toString());
    });

    const host = v4.host || '';
    const prefix = v4.prefix || '/api/v4';
    const fullUrlPath = `${host}${prefix}/${name}/${resolvedPath}`.replace(/([^:]\/)\/+/g, "$1");

    const url = new URL(fullUrlPath);
    url.searchParams.set('app_id', (v4.app_id || '').toString());

    if (method === 'GET') {
        Object.entries(params).forEach(([k, v]) => {
            if (k !== 'service' && v != null) url.searchParams.set(k, v.toString());
        });
    }

    return {
        url: url.toString(),
        method,
        body: method === 'POST' ? JSON.stringify(params) : null
    };
}

/**
 * 4. 核心请求器
 */
async function fastRequest(req: { url: string; method: string; body?: any }) {
    const start = Date.now();

    // 打印请求信息
    console.log(`[request_url]: method=${req.method} url="${req.url}"`);
    if (req.method === 'POST' && req.body) {
        console.log(`[request_body]: ${req.body}`);
    }

    try {
        const fetchOptions: RequestInit = {
            method: req.method,
            headers: {'Content-Type': 'application/json'}
        };

        if (req.method === 'POST' && req.body) {
            fetchOptions.body = req.body;
        }

        const response = await fetch(req.url, fetchOptions);
        const text = await response.text(); // 先拿文本，避免二次解析失败
        let result: any;
        try {
            result = JSON.parse(text);
        } catch {
            result = text;
        }

        // 打印响应信息
        const duration = Date.now() - start;
        console.log(`[response]: status=${response.status} duration=${duration}ms`);
        //console.log(`[response_body]: ${JSON.stringify(result)}`);

        return result;
    } catch (error) {
        console.error(`[api_error]: ${error}`);
        return {ret: 500, msg: '网络连接失败', data: null};
    }
}

/**
 * 5. 自动网关入口
 */
export async function AutoGateway(options: GatewayOptions) {
    const version = config.api?.gateway?.version || 'v1';

    const req = version === 'v4'
        ? ApiGateway_4(options)
        : ApiGateway_1(options);

    return await fastRequest(req);
}