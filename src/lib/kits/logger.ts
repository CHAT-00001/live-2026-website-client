// src/lib/logger.ts
import winston from 'winston';
import { v4 as uuidv4 } from 'uuid';

// ... (格式化器和 logger 实例的创建) ...

const loggerFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS', alias: 'utc_time' }),
    winston.format.printf(({ utc_time, level, message, request_id }) => {
        return `${utc_time} [${level}] [${request_id}] ${message}`;
    }),
    winston.format.colorize({ all: true })
);

const loggerInstance = winston.createLogger({
    level: 'info',
    format: loggerFormat,
    transports: [new winston.transports.Console()]
});

// 注意：为了避免命名冲突，这里将导出的函数命名为 log
// 而内部的 winston 实例命名为 loggerInstance
export async function log(
    message: string,
    level: 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly' = 'info'
): Promise<void> {
    const requestId = uuidv4().replace(/-/g, '');
    loggerInstance.log({ level, message, request_id: requestId });
}

// 为了方便，我们也可以创建一些别名函数
export async function info(message: string) {
    return log(message, 'info');
}

export async function error(message: string) {
    return log(message, 'error');
}

export async function warn(message: string) {
    return log(message, 'warn');
}

export async function debug(message: string) {
    return log(message, 'debug');
}