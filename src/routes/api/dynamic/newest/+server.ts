// routes/api/dynamic/nearby/+server.ts

import { getNewDynamic } from '$lib/api/dynamic';
import type { ApiRequest } from '$lib/models/dynamic';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
    const params: ApiRequest = {
        lat: url.searchParams.get('lat') || '',
        lng: url.searchParams.get('lng') || '',
        p: Number(url.searchParams.get('p') || 1)
    };

    try {
        const data = await getNewDynamic(params);
        return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
    } catch (err) {
        return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 });
    }
};
