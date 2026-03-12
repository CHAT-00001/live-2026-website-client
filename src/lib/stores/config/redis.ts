// src/lib/server/redis.ts

import {createClient} from 'redis';
// @ts-ignore
import {config} from './config';

// 构造连接字符串 (redis://user:pass@host:port/db)
const {host, port, password, database} = config.redis;

const url = `redis://${password ? `:${password}@` : ''}${host}:${port}/${database || 0}`;

const client = createClient({url});

client.on('error', (err) => console.error('❌ Redis 连接错误:', err));

// 立即连接 (SvelteKit 项目启动时)
(async () => {
    if (!client.isOpen) {
        await client.connect();
        console.log('🚀 Redis 已就绪');
    }
})();

export default client;