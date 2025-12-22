// src/lib/utils/lock.ts
export type Notice = { lang: string; text: string };

/**
 * 简单 TOML 解析器（仅解析上面锁屏用的 [[notice]] 块）
 * 输入是 lock.toml 的文本内容，输出 Notice[]。
 */
export function parseLockToml(tomlText: string): Notice[] {
    const notices: Notice[] = [];
    // 将文件按 [[notice]] 块分割
    const blocks = tomlText.split(/\[\[notice\]\]/).map(s => s.trim()).filter(Boolean);
    for (const block of blocks) {
        // 查找 lang = "xx" 和 text = "..."
        const langMatch = block.match(/lang\s*=\s*"(.*?)"/);
        const textMatch = block.match(/text\s*=\s*"(.*?)"/s);
        if (langMatch && textMatch) {
            // unescape 的简单处理：把 \" 和 \n 处理一下
            const lang = langMatch[1];
            let text = textMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n');
            notices.push({ lang, text });
        }
    }
    return notices;
}

/**
 * PIN 校验：必须是 6 位纯数字且与预设密码匹配
 */
export function validatePin(pin: string, expected = '123456'): boolean {
    return /^\d{6}$/.test(pin) && pin === expected;
}
