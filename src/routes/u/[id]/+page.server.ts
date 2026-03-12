// src/routes/u/[id]/+page.server.ts


// import { getUserHome } from '$lib/api/user_api';
//
// export async function load({ params, locals }) {
//     // 这里的请求发生在服务器，速度飞快，且对 SEO 友好
//     // @ts-ignore
//     const data = await getUserHome({
//         uid: locals.user?.uid || '',
//         token: locals.user?.token || '',
//         touid: params.id,
//         p: 1
//     });
//
//     return {
//         initialUser: data.data?.info?.[0] || null,
//         initialList: data.data?.info || []
//     };
// }