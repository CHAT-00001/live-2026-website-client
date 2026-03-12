// src/app.d.ts
import type {LoginState} from '$lib/stores/login';
import type {User as UserStoreType} from '$lib/stores/user';

declare global {
	namespace App {
		interface Locals {
			loginState?: LoginState;

            // ✅ 这样定义既保留了 uid 习惯，又兼容了 Store 要求的 id
            user: (UserStoreType & { uid: string }) | null;

			requestId: string;
		}

        // 如果想在页面上显示错误 ID，可以在这里扩展 Error
        interface Error {
            message: string;
            code?: string;
            requestId?: string;
        }
	}
}

export {};