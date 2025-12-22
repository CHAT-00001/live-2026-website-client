import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: '0.0.0.0',
		port: 5173,
	},
	// 开发环境禁用压缩，方便查看错误堆栈
	build: {
		minify: false
	}
});
