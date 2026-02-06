// src/server/config.ts  - 解析TOML配置文件

import TOML from '@iarna/toml';
import fs from 'fs';
import path from 'path';

// 读取根目录下的 application.toml
const configPath = path.resolve('application.toml');
const fileContent = fs.readFileSync(configPath, 'utf-8');

// 解析并导出为常量
export const config = TOML.parse(fileContent) as any;

/**
 * 助手函数：根据当前环境获取 API 配置
 * @param version 'v1' (PHP) | 'v4' (Rust)
 */
export function getApiConfig(version: 'v1' | 'v4' = 'v1') {
    const api = config.api[version];
    return {
        baseURL: `${api.host}/appapi/`, // 拼接你之前的路径
        ...api
    };
}