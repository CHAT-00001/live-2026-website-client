// src/types/locals.d.ts
import type {LoginState} from '$lib/stores/login';

declare module '@sveltejs/kit' {
    interface Locals {
        loginState?: LoginState;
    }
}