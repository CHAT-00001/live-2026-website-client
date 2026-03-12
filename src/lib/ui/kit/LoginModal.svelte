<!-- src/lib/ui/kit/LoginModal.svelte -- 全局登录对话窗 -->


<script lang="ts">
    import {showLoginStore, hideLogin, loginSuccess} from '$lib/stores/login';
    import {onMount} from 'svelte';

    let username = '';
    let password = '';

    function submit() {
        // 模拟登录
        const fakeLogin = {
            clientId: 'ea00487ae5746448004eab447',
            key: '1234567890',
            device: '1234567890',
            uid: '1000010441',
            token: 'fake_token_123456'
        };
        loginSuccess(fakeLogin);
    }
</script>

{#if $showLoginStore}
    <div class="modal-mask">
        <div class="modal">
            <h3>登录</h3>
            <input placeholder="用户名" bind:value={username}/>
            <input type="password" placeholder="密码" bind:value={password}/>
            <button on:click={submit}>登录</button>
            <button on:click={hideLogin}>关闭</button>
        </div>
    </div>
{/if}

<style>
    .modal-mask {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .modal {
        background: white;
        padding: 2rem;
        border-radius: 10px;
        min-width: 300px;
    }
</style>