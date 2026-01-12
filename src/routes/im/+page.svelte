<!-- src/routes/im/+page.svelte - 消息发送栏 -->
<script lang="ts">
    import {onMount} from 'svelte';
    import {writable} from 'svelte/store';
    import ChatList from './ChatList.svelte';
    import ChatBubble from './ChatBubble.svelte';
    import ChatSettingsModal from './ChatSettingsModal.svelte';
    import {chats} from '$lib/data/chats';
    import {currentUser} from '$lib/data/user';

    let selectedChat = null;
    let newMessage = '';
    let messageContainer: HTMLDivElement;
    let showSettingsModal = false;
    let searchTerm = '';

    const messages = writable([]);

    // 滚动状态：'scrolling' = 用户在浏览聊天记录, 'away' = 正常自动滚到底
    let scrollState: 'scrolling' | 'away' = 'away';
    let scrollTimer: number;

    // 用户滚动事件
    function onScroll() {
        if (!messageContainer) return;

        const {scrollTop, scrollHeight, clientHeight} = messageContainer;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 5;

        if (atBottom) {
            scrollState = 'away';
            markMessagesAsRead();
            if (scrollTimer) clearTimeout(scrollTimer);
        } else {
            scrollState = 'scrolling';
            // 5秒后自动脱离浏览模式
            if (scrollTimer) clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                scrollState = 'away';
                scrollToBottom(true);
                markMessagesAsRead();
            }, 5000);
        }
    }

    // 标记当前聊天消息为已读，并重置未读计数
    function markMessagesAsRead() {
        if (!selectedChat) return;
        const unreadMsgs = selectedChat.messages.filter(msg => !msg.isSent && !msg.read);
        if (unreadMsgs.length > 0) {
            selectedChat.messages = selectedChat.messages.map(msg => msg.isSent ? msg : {...msg, read: true});
            selectedChat.unread = 0;
        }
    }

    // 精确滚到底，丝滑动画
    function scrollToBottom(animate: boolean = false) {
        if (!messageContainer) return;
        const end = messageContainer.scrollHeight - messageContainer.clientHeight;
        if (!animate) {
            messageContainer.scrollTop = end;
            return;
        }

        const start = messageContainer.scrollTop;
        const distance = end - start;
        if (distance <= 0) return;

        const duration = Math.min(Math.max(distance / 2, 100), 400); // 100~400ms
        const startTime = performance.now();

        function easeInOutCubic(t: number) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function animateScroll(time: number) {
            const t = Math.min(1, (time - startTime) / duration);
            const eased = easeInOutCubic(t);
            messageContainer.scrollTop = start + distance * eased;
            if (t < 1) requestAnimationFrame(animateScroll);
        }

        requestAnimationFrame(animateScroll);
    }

    function selectChat(chat) {
        selectedChat = chat;
        $messages = chat.messages;
        chat.unread = 0;
        scrollToBottom();
    }

    function sendMessage() {
        if (!selectedChat || !newMessage.trim()) return;

        const newMsg = {
            text: newMessage,
            timestamp: new Date(),
            isSent: true,
            senderAvatar: currentUser.avatar,
            senderName: currentUser.name,
            read: true
        };
        $messages = [...$messages, newMsg];
        selectedChat.messages = [...selectedChat.messages, newMsg];
        selectedChat.lastMessage = newMessage;
        newMessage = '';
        if (scrollState === 'away') scrollToBottom(true);
    }

    function handleButtonClick(type: string) {
        const actions = {
            '图片': '发送了一张图片',
            '视频': '发送了一个视频',
            '位置': '发送了位置信息',
            '语音': '发送了一段语音',
            '表情': '发送了一个表情',
            '转账': '发送了一笔转账',
            '礼物': '发送了一个礼物',
            '摸一下': '摸了一下'
        };
        const text = actions[type];
        if (!text || !selectedChat) return;

        const newMsg = {
            text,
            timestamp: new Date(),
            isSent: true,
            senderAvatar: currentUser.avatar,
            senderName: currentUser.name,
            read: true
        };
        $messages = [...$messages, newMsg];
        selectedChat.messages = [...selectedChat.messages, newMsg];
        selectedChat.lastMessage = text;
        if (scrollState === 'away') scrollToBottom(true);
    }

    function toggleDoNotDisturb() {
        console.log('消息免打扰状态已切换');
    }

    function togglePinChat() {
        console.log('置顶聊天状态已切换');
    }

    function clearChat() {
        $messages = [];
        if (selectedChat) selectedChat.messages = [];
    }

    function searchChat() {
        console.log('查找聊天内容');
    }

    function reportUser() {
        console.log('用户已被投诉');
    }

    onMount(() => {
        if (!selectedChat) selectedChat = chats[0];
        $messages = selectedChat?.messages || [];

        // 模拟每5秒收到新消息
        setInterval(() => {
            const randomChat = chats[Math.floor(Math.random() * chats.length)];
            const newMsg = {
                text: '收到新消息',
                timestamp: new Date(),
                isSent: false,
                senderAvatar: randomChat.avatar,
                senderName: randomChat.name,
                read: scrollState === 'away' && randomChat === selectedChat
            };
            randomChat.messages = [...randomChat.messages, newMsg];
            randomChat.lastMessage = newMsg.text;

            if (randomChat === selectedChat) {
                $messages = [...$messages, newMsg];
                if (scrollState === 'away') {
                    scrollToBottom(true);
                    markMessagesAsRead();
                }
            } else {
                // 浏览模式或其他聊天，未读+1
                randomChat.unread = (randomChat.unread || 0) + 1;
            }
        }, 5000);
    });
</script>

<div class="im">
    <div class="app">
        <div class="sidebar">
            <ChatList bind:searchTerm {chats} {selectChat}/>
        </div>
        <div class="chat-area">
            {#if selectedChat}
                <div class="chat-header">
                    <img src={selectedChat.avatar} alt={selectedChat.name} class="avatar"
                         on:click={() => showSettingsModal = true}/>
                    <h2>{selectedChat.name}</h2>
                </div>
                <div class="chat-messages" bind:this={messageContainer} on:scroll={onScroll}>
                    {#each $messages as message}
                        <ChatBubble {message} isSent={message.isSent}/>
                    {/each}
                </div>
                <div class="chat-input-area">
                    <div class="chat-buttons">
                        <button on:click={() => handleButtonClick('图片')}>图片</button>
                        <button on:click={() => handleButtonClick('视频')}>视频</button>
                        <button on:click={() => handleButtonClick('位置')}>位置</button>
                        <button on:click={() => handleButtonClick('语音')}>语音</button>
                        <button on:click={() => handleButtonClick('表情')}>表情</button>
                        <button on:click={() => handleButtonClick('转账')}>转账</button>
                        <button on:click={() => handleButtonClick('礼物')}>礼物</button>
                        <button on:click={() => handleButtonClick('摸一下')}>摸一下</button>
                    </div>
                    <div class="chat-input">
                        <input bind:value={newMessage} placeholder="Type a message..."
                               on:keypress={(e) => e.key === 'Enter' && sendMessage()}/>
                        <button on:click={sendMessage}>Send</button>
                    </div>
                </div>
            {:else}
                <p>Select a chat to start messaging</p>
            {/if}
        </div>
    </div>
</div>

{#if showSettingsModal && selectedChat}
    <ChatSettingsModal
            avatarUrl={selectedChat.avatar}
            name={selectedChat.name}
            on:close={() => showSettingsModal = false}
            on:toggleDoNotDisturb={toggleDoNotDisturb}
            on:togglePinChat={togglePinChat}
            on:clearChat={clearChat}
            on:searchChat={searchChat}
            on:reportUser={reportUser}
    />
{/if}

<style>
    :root {
        --mac-bg: #f5f5f5;
        --mac-text: #333;
        --mac-primary: #007aff;
        --mac-secondary: #8e8e93;
    }

    .im {
        display: block;
        width: 100%;
        margin-top: 55px;
        margin-bottom: 55px;
    }

    .app {
        display: flex;
        flex: 1;
        height: 100%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        background-color: var(--mac-bg);
        color: var(--mac-text);
    }

    .sidebar {
        width: 300px;
        border-right: 1px solid var(--mac-secondary);
        overflow-y: auto;
    }

    .chat-area {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .chat-header {
        display: flex;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid var(--mac-secondary);
    }

    .avatar {
        width: 48px;
        height: 48px;
        border-radius: 5px;
        margin-right: 10px;
        cursor: pointer;
    }

    .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 10px;
        scroll-behavior: smooth;
    }

    .chat-input-area {
        display: flex;
        flex-direction: column;
    }

    .chat-buttons {
        display: flex;
        justify-content: space-around;
        padding: 10px;
        border-top: 1px solid var(--mac-secondary);
    }

    .chat-buttons button {
        padding: 5px;
        background-color: var(--mac-primary);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin: 0 5px;
        font-size: 14px;
    }

    .chat-input {
        display: flex;
        padding: 10px;
        border-top: 1px solid var(--mac-secondary);
    }

    .chat-input input {
        flex: 1;
        padding: 10px;
        height: 50px;
        border: 1px solid var(--mac-secondary);
        border-radius: 5px;
        margin-right: 10px;
    }

    .chat-input button {
        padding: 5px 10px;
        background-color: var(--mac-primary);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
</style>
