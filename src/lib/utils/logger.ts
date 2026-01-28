// lib/utils/logger.ts
import winston from 'winston';

const {combine, timestamp, printf, colorize} = winston.format;

// 定义颜色方案
export const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), // UTC 时间
        printf(({level, message, timestamp, requestId, ...meta}) => {
            // 颜色处理：UTC 时间（浅灰色），RequestId（绿色）
            const greyTime = `\x1b[90m[${timestamp}]\x1b[0m`;
            const greenId = `\x1b[32m[${requestId || 'N/A'}]\x1b[0m`;

            // meta 中可能包含的额外信息（如 URL）
            const extra = meta.url ? ` | URL: ${meta.url}` : '';

            return `${greyTime} ${greenId} ${level}: ${message}${extra}`;
        })
    ),
    transports: [new winston.transports.Console()],
});