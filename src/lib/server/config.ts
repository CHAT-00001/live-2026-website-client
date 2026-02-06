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
 * 智能构建 URL
 * @param version 'v1' | 'v4'
 * @param endpoint 接口名，如 'video.getVideoList' 或 'video'
 */
export function buildApiUrl(version: 'v1' | 'v4', endpoint: string) {
    const api = config.api[version];
    const baseUrl = `${api.host}${api.prefix}`;

    if (version === 'v1') {
        // PHP 旧版风格：baseUrl?s=video.getVideoList
        return `${baseUrl}?s=${endpoint}`;
    } else {
        // Rust 新版风格：baseUrl/video
        // 假设 endpoint 传的是 'video'
        return `${baseUrl}/${endpoint.replace(/\./g, '/')}`;
    }
}