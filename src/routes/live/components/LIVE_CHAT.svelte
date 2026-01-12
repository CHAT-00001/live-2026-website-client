<script lang="ts">
    import {onDestroy, onMount} from 'svelte';
    import type {GiftInfo, MessageBody, Payload, UserInfo} from '$lib/models/message.ts';
    import {Event, MsgType, Status} from '$lib/models/message.ts';

    interface ChatMessage {
        id?: string;        // 消息 ID，用于匹配和去重
        text: string;
        self?: boolean;
        isGift?: boolean;
        giftInfo?: { id: string; name: string; sender: string };
        status?: 'sending' | 'success' | 'failed';
    }

    interface FrontendGiftInfo extends GiftInfo {
        icon: string;
    }

    const giftList: FrontendGiftInfo[] = [
        {id: '1001', name: '火箭', icon: '🚀', count: 1, length: 3},
        {id: '1002', name: '飞机', icon: '✈️', count: 1, length: 3},
        {id: '1003', name: '鲜花', icon: '🌸', count: 1, length: 2},
        {id: '1004', name: '气球', icon: '🎈', count: 1, length: 2}
    ];

    const liveRoomId = '1000020001';
    const roomId = `${liveRoomId}`;
    const WS_URL = 'ws://localhost:19967/ws';
    const RECONNECT_INTERVAL = 3000;

    // --- 【新增：去重记录器】 ---
    let processedIds = new Set<string>();

    const purgeSourceIllegalChars = (str: string): string => {
        if (typeof str !== 'string') return '';
        return str.replace(/[\u0000-\u001F\u007F-\u009F]/g, '').replace(/[\n\r\f\v\t]/g, '').replace(/\s+/g, ' ').trim();
    };

    const makeSingleLineValidJson = (jsonStr: string): string => {
        if (typeof jsonStr !== 'string') return '{}';
        return jsonStr.replace(/\n/g, '').replace(/\r/g, '').replace(/\s+/g, ' ').trim();
    };

    const generateSafeShortId = (): string => {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID().replace(/-/g, '').slice(0, 16);
        }
        return Date.now().toString(36).slice(-8) + Math.floor(Math.random() * 1000).toString(36);
    };

    const uidNum = Math.floor(Math.random() * 1e10);
    const uid = purgeSourceIllegalChars(uidNum.toString());
    const clientId = generateSafeShortId();

    let ws: WebSocket | null = null;
    let status: 'disconnected' | 'connecting' | 'connected' = 'disconnected';
    let messages: ChatMessage[] = [];
    let selectedGiftId: string = giftList[0].id;
    let reconnectTimer: NodeJS.Timeout | null = null;
    let input: string = '';

    function log(msg: Omit<ChatMessage, 'self'> & { self?: boolean }) {
        messages = [...messages, msg];
        scrollToBottom();
    }


    // 有新消息时 - 滚动到底部
    function scrollToBottom() {
        const el = document.getElementById('messages') as HTMLElement | null;
        if (!el) return; // --- 【安全检查】 ---

        const start = el.scrollTop;
        const end = el.scrollHeight;
        const duration = 500; // 500ms
        const startTime = performance.now();

        function animate(time: number) {
            try {
                const elapsed = time - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // easeInOutQuad 缓动公式
                const eased = progress < 0.5
                    ? 2 * progress * progress
                    : -1 + (4 - 2 * progress) * progress;

                // --- 【断言 el 为 HTMLElement】 ---
                (el as HTMLElement).scrollTop = start + (end - start) * eased;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            } catch (err) {
                console.error("滚动动画出错", err);
            }
        }

        requestAnimationFrame(animate);
    }


    // 构建消息体
    function buildMessageBody(msgType: MsgType, payload: Payload): MessageBody {
        const senderInfo: UserInfo = {
            id: uidNum,
            user_nickname: purgeSourceIllegalChars(`临时用户_${uid.slice(-4)}`),
            avatar: purgeSourceIllegalChars(`https://picsum.photos/200/200?random=${uid}`),
            level: purgeSourceIllegalChars("10"), usertype: purgeSourceIllegalChars("normal"),
            vip_type: purgeSourceIllegalChars("0"), guard_type: purgeSourceIllegalChars("0"),
            liangname: "", car_id: "", car_swf: "", car_swftime: "", car_words: ""
        };
        return {
            status: Status.Sending,
            client_id: clientId,
            send_at: new Date().toISOString(),
            server_sync_at: undefined,
            send_id: generateSafeShortId(),
            sync_id: "",
            msg_type: msgType,
            event: Event.SendMsg,
            room_id: roomId,
            uid: uidNum,
            sender: senderInfo,
            payload
        };
    }

    // 发送聊天消息
    function sendChatMessage() {
        if (!ws || ws.readyState !== WebSocket.OPEN) return;
        const content = input.trim();
        if (!content) return;

        const msg = buildMessageBody(MsgType.Text, {type: "Content", content: {text: content}});

        // --- 【去重：自己发的先记录 ID】 ---
        processedIds.add(msg.send_id);

        log({id: msg.send_id, text: `我: ${content}`, self: true, status: 'sending'});

        try {
            ws.send(makeSingleLineValidJson(JSON.stringify(msg)));
            const currentId = msg.send_id;
            setTimeout(() => {
                messages = messages.map(m => (m.id === currentId && m.status === 'sending') ? {
                    ...m,
                    status: 'failed'
                } : m);
            }, 5000);
            input = '';
        } catch (err) {
            messages = messages.map(m => m.id === msg.send_id ? {...m, status: 'failed'} : m);
        }
    }

    // 发送礼物
    function sendGift() {
        if (!ws || ws.readyState !== WebSocket.OPEN) return;
        const giftItem = giftList.find(g => g.id === selectedGiftId);
        if (!giftItem) return;

        const payload: Payload = {type: "Gift", gift: {...giftItem}};
        const msg = buildMessageBody(MsgType.System, payload);

        // --- 【去重：记录礼物 ID】 ---
        processedIds.add(msg.send_id);

        log({
            id: msg.send_id, text: `我送出了 ${giftItem.name} 🎁`, self: true, isGift: true,
            giftInfo: {id: giftItem.id, name: giftItem.name, sender: uid}, status: 'sending'
        });

        try {
            ws.send(makeSingleLineValidJson(JSON.stringify(msg)));
        } catch (err) {
            messages = messages.map(m => m.id === msg.send_id ? {...m, status: 'failed'} : m);
        }
    }

    // 连接
    function connect() {
        if (ws) return;
        status = 'connecting';
        ws = new WebSocket(`${WS_URL}?room_id=${roomId}&uid=${uid}&client_id=${clientId}`);

        ws.onopen = () => {
            status = 'connected';
            clearReconnectTimer();
            log({text: `✅ 已连上服务器`});
        };

        ws.onmessage = e => {
            try {
                const msg: MessageBody = JSON.parse(e.data);

                // --- 【核心去重判断】 ---
                if (msg.send_id) {
                    if (processedIds.has(msg.send_id)) {
                        // 如果 ID 已存在，说明是：1.自己发的消息回传 2.后端重复推送的消息
                        // 我们只更新状态，不新增消息
                        messages = messages.map(m => m.id === msg.send_id ? {...m, status: 'success'} : m);
                        return;
                    }
                    processedIds.add(msg.send_id); // 记录新 ID
                    if (processedIds.size > 500) processedIds.clear(); // 定期清空防止内存溢出
                }

                if (msg.room_id !== roomId) return;
                const isSelf = msg.client_id === clientId;
                const senderName = msg.sender?.user_nickname || '系统';

                // 统一处理 log
                let text = '';
                let isGift = false;
                if (msg.msg_type === MsgType.Text) {
                    text = `${senderName}: ${msg.payload.content?.text}`;
                } else if (msg.payload.type === 'Gift') {
                    text = `${senderName} 送出了 ${msg.payload.gift?.name} 🎁`;
                    isGift = true;
                }

                if (text) log({id: msg.send_id, text, self: isSelf, isGift, status: 'success'});

            } catch (err) {
                console.error("解析失败", err);
            }
        };

        ws.onclose = () => {
            ws = null;
            status = 'disconnected';
            setupReconnect();
        };
    }

    function setupReconnect() {
        clearReconnectTimer();
        reconnectTimer = setTimeout(() => connect(), RECONNECT_INTERVAL);
    }

    function clearReconnectTimer() {
        if (reconnectTimer) {
            clearTimeout(reconnectTimer);
            reconnectTimer = null;
        }
    }

    onMount(connect);
    onDestroy(() => {
        if (ws) ws.close();
        clearReconnectTimer();
    });
</script>

<style>
    /* CSS 原封不动保留，仅在底部增加发送状态样式 */
    .chat {
        max-width: 720px;
        margin: 0 auto;
        height: 580px;
        display: flex;
        flex-direction: column;
        padding: 12px;
        box-sizing: border-box;
        gap: 12px;
    }

    .header {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 8px;
        border-bottom: 1px solid #eee;
    }

    .status {
        padding: 4px 8px;
        border-radius: 4px;
        font-weight: 500;
    }

    .status.connecting {
        background: #fff8e1;
        color: #ffb300;
    }

    .status.connected {
        background: #e8f5e9;
        color: #2e7d32;
    }

    .status.disconnected {
        background: #ffebee;
        color: #d32f2f;
    }

    .messages {
        flex: 1;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 12px;
        overflow-y: auto;
        margin-bottom: 8px;
        background: #fafafa;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .msg {
        font-size: 14px;
        padding: 6px 10px;
        border-radius: 4px;
        max-width: 70%;
        word-wrap: break-word;
    }

    .msg.self {
        color: #1976d2;
        background: #e3f2fd;
        align-self: flex-end;
    }

    .msg:not(.self) {
        background: #ffffff;
        align-self: flex-start;
    }

    .msg.gift {
        color: #d84315;
        background: #fff3e0;
        border: 1px solid #ffccbc;
        animation: giftBounce 0.5s ease-in-out;
    }

    @keyframes giftBounce {
        0% {
            transform: scale(0.9);
            opacity: 0;
        }
        50% {
            transform: scale(1.05);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    .input-area {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .chat-input {
        display: flex;
        gap: 8px;
    }

    input {
        flex: 1;
        padding: 10px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
        outline: none;
        transition: border-color 0.2s;
    }

    input:focus {
        border-color: #1976d2;
    }

    button {
        padding: 10px 16px;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        background: #1976d2;
        color: white;
        font-size: 14px;
        transition: background-color 0.2s;
    }

    button:hover {
        background: #1565c0;
    }

    .gift-panel {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fafafa;
    }

    .gift-select {
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ccc;
        outline: none;
        cursor: pointer;
    }

    .gift-send-btn {
        background: #d84315;
    }

    .gift-send-btn:hover {
        background: #bf360c;
    }

    /* --- 新增状态样式 --- */
    .msg-wrapper {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .msg-wrapper.self {
        flex-direction: row-reverse;
        /*align-self: flex-end;*/
    }

    .fail-icon {
        color: #d32f2f;
        font-weight: bold;
        cursor: help;
    }

    .sending-icon {
        font-size: 12px;
        color: #999;
    }
</style>

<div class="chat">
    <div class="header">
        <div>房间：{roomId} - UID: {uid}</div>
        <div class="status {status}">状态：{
            status === 'connected' ? '已连接' :
                status === 'connecting' ? '连接中...' : '已断开'
        }</div>
    </div>

    <div class="messages" id="messages">
        {#each messages as m}
            <div class="msg-wrapper {m.self ? 'self' : ''}">
                {#if m.status === 'failed'}
                    <span class="fail-icon" title="发送失败">⚠️</span>
                {/if}
                {#if m.status === 'sending'}
                    <span class="sending-spinner">...</span>
                {/if}
                <div class="msg {m.self ? 'self' : ''} {m.isGift ? 'gift' : ''}">
                    {m.text}
                </div>
            </div>
        {/each}
    </div>

    <div class="input-area">
        <div class="gift-panel">
            <span>赠送礼物：</span>
            <select bind:value={selectedGiftId} class="gift-select">
                {#each giftList as gift}
                    <option value={gift.id}>{gift.icon} {gift.name}</option>
                {/each}
            </select>
            <button class="gift-send-btn" on:click={sendGift}>赠送礼物</button>
        </div>

        <div class="chat-input">
            <input
                    bind:value={input}
                    on:keydown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendChatMessage();
                        }
                    }}
                    placeholder="输入聊天内容，Enter 发送"
            />
            <button on:click={sendChatMessage}>发送消息</button>
        </div>
    </div>
</div>