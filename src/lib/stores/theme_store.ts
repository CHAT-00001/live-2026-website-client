// src/lib/store/theme_story.ts
// 主题设置： 0. 牛奶白色  1. 钻石黑色
// 2026-01-10 08:24:10

import {writable} from 'svelte/store';


//////// 00000000
//////// 00000000


// 主题状态：0 = 浅色(默认)，1 = 深色
export const theme = writable(0);

// 主题切换方法：点击按钮调用，0 ↔ 1 互转
export function toggleTheme() {
    theme.update(val => val === 0 ? 1 : 0);
}



