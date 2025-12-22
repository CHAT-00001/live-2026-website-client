import type { RequestHandler } from './$types';

const HOST = 'http://api2.damawei.com:8080';
const PAGE_SIZE = 20;
const UID = '1000008801';

export const GET: RequestHandler = async ({ url, fetch }) => {
    const page = Math.max(Number(url.searchParams.get('p')) || 1, 1);

    const apiUrl =
        `${HOST}/appapi` +
        `?s=video.getVideoList` +
        `&uid=${UID}` +
        `&p=${page}` +
        `&pageSize=${PAGE_SIZE}`;

    try {
        const res = await fetch(apiUrl, {
            credentials: 'include'
        });

        if (!res.ok) {
            return new Response(
                JSON.stringify({ error: 'Upstream error', status: res.status }),
                { status: 500 }
            );
        }

        const raw = await res.json();
        const info = raw?.data?.info ?? [];

        return new Response(
            JSON.stringify({
                code: 0,
                page,
                pageSize: PAGE_SIZE,
                videos: info,
                hasMore: info.length === PAGE_SIZE
            }),
            {
                headers: {
                    'content-type': 'application/json'
                }
            }
        );
    } catch (err) {
        return new Response(
            JSON.stringify({ error: 'Server fetch failed' }),
            { status: 500 }
        );
    }
};
