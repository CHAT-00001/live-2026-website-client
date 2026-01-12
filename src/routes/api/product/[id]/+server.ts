// src/routes/api/video/[id]/+server.ts

import type {RequestHandler} from './$types';

export const GET: RequestHandler = async ({params, fetch}) => {
    const videoid = params.id; // 👈 关键：和 [id] 对应

    const apiUrl =
        `http://api2.damawei.com:8080/appapi/?s=video.getVideo&videoid=${videoid}`;

    const res = await fetch(apiUrl);
    const json = await res.json();

    // 只抽取 data
    const data = json?.data ?? {};

    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
