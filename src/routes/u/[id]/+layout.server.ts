// src/routes/u/[id]/+layout.server.ts


export const load = async ({params, fetch}) => {
    const touid = params.id;

    // 调用自己写好的 API
    const res = await fetch(`/api/u/${touid}/info`);
    const result = await res.json();

    // result.data 是数组，所以取第一个元素
    const user = result?.data?.[0] ?? null;

    console.log("[+layout.server.ts] user=", user);

    return {
        touid,
        user
    };
};