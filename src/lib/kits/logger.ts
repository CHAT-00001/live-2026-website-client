// src/lib/logger.ts -- 全局日志打印





import { v4 as uuidv4 } from 'uuid';

// 定义 24位真彩色 转义码（和原代码完全一致的RGB值）
const colors = {
    // #dddddd 浅灰色（时间色）
    lightGray: (text: string) => `\x1b[38;2;240;240;240m${text}\x1b[0m`,
    // #00ff00 纯绿色（info级别）
    pureGreen: (text: string) => `\x1b[38;2;0;255;0m${text}\x1b[0m`,
    // #ff0000 纯红色（error级别）
    pureRed: (text: string) => `\x1b[38;2;255;0;0m${text}\x1b[0m`,
    // 青色 ID（保留原有效果）
    cyan: (text: string) => `\x1b[36m${text}\x1b[0m`,
    // 亮黄（warn级别，保留原有效果）
    yellow: (text: string) => `\x1b[93m${text}\x1b[0m`
};

/**
 * 格式化日志输出（复刻原 winston 格式）
 * @param level 日志级别 (info/error/warn)
 * @param message 日志内容
 * @param request_id 请求ID
 * @returns 格式化后的日志字符串
 */
function formatLog(level: string, message: string, request_id: string): string {
    // 1. 获取 UTC 时间戳（和原 winston 格式一致）
    const timestamp = new Date().toISOString();
    // 2. 处理级别标签的颜色
    let levelTag = level.toUpperCase();
    if (level === 'info') levelTag = colors.pureGreen(levelTag);
    else if (level === 'error') levelTag = colors.pureRed(levelTag);
    else if (level === 'warn') levelTag = colors.yellow(levelTag);
    // 3. 格式化时间和ID部分
    const timePart = colors.lightGray(`[${timestamp}]`);
    const idPart = colors.cyan(`[${request_id}]`);
    // 4. 拼接最终日志字符串
    return `${timePart} ${levelTag} ${idPart} ${message}`;
}

/**
 * 核心日志方法（兼容原 log 函数）
 * @param message 日志内容
 * @param level 日志级别（默认 info）
 * @param rid 请求ID（可选，自动生成）
 */
export function log(message: string, level: string = 'info', rid?: string): void {
    // 生成请求ID（和原代码逻辑一致：优先传参，否则取 uuid 的第一段）
    const finalId = rid || uuidv4().split('-')[0];
    // 格式化日志
    const logStr = formatLog(level, message, finalId);
    // 根据级别输出到控制台（error 输出到 stderr，其他到 stdout）
    if (level === 'error') {
        console.error(logStr);
    } else {
        console.log(logStr);
    }
}

// 导出和原代码完全一致的快捷方法
export const info = (msg: string, rid?: string) => log(msg, 'info', rid);
export const error = (msg: string, rid?: string) => log(msg, 'error', rid);
export const warn = (msg: string, rid?: string) => log(msg, 'warn', rid);