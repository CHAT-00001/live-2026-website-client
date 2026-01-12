// src/app.d.ts

import type {LoginState} from '$lib/stores/login';

declare global {
	namespace App {
		// 这里的 Locals 接口是 SvelteKit 预留的“扩展口”
		interface Locals {
			loginState?: LoginState;
			requestId: string;
		}

		// 如果你以后还要往 PageData 塞东西，也可以写在这里
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}

export {};