<!-- src/routes/login/+page.svelte -->



<script lang="ts">
    // 1️⃣ 所有的 import 必须放在最顶部
    import {goto} from '$app/navigation';
    import {page} from '$app/stores';
    import {user as userStore} from '$lib/stores/user';
    import {onMount} from 'svelte';

    // 2️⃣ 接收 Svelte 5 Props (从 +layout.server.ts 传来的登录态)
    let {data} = $props<{ data: { user: any } }>();

    // ✅ 修复：确保跳转逻辑只在浏览器端运行
    onMount(() => {
        if (data.user) {
            goto('/');
        }
    });

    let title = "登录";

    // =============================
    // 登录配置数据 (静态)
    // =============================
    const countryCodes = [
        {value: "0086", label: "+86（中国）"},
        {value: "00852", label: "+852（中国香港）"},
        {value: "00853", label: "+853（中国澳门）"},
        {value: "00886", label: "+886（中国台湾）"},
        {value: "001", label: "+1（美国/加拿大）"},
        {value: "0044", label: "+44（英国）"},
        {value: "0061", label: "+61（澳大利亚）"}
    ];

    const baseLoginType = [
        {id: 1, name: "SMS Code", name_zh: "短信验证码"},
        {id: 2, name: "Password", name_zh: "账号密码"}
    ];

    const threeLoginType = [
        {id: 4, icon: "bi-wechat", name_zh: "微信"},
        {id: 5, icon: "bi-tiktok", name_zh: "抖音"},
        {id: 6, icon: "bi-apple", name_zh: "苹果"},
        {id: 7, icon: "bi-google", name_zh: "谷歌"}
    ];

    // =============================
    // 响应式状态 (Svelte 5 Runes)
    // =============================
    let selectedCountryCode = $state("0086");
    let activeTab = $state(2); // 默认账号密码
    let loginAccount = $state("");
    let loginPassword = $state("");
    let loading = $state(false);
    let errorMsg = $state("");

    // =============================
    // 业务逻辑
    // =============================
    function selectTab(id: number) {
        activeTab = id;
        errorMsg = "";
    }

    async function addLogin() {
        errorMsg = "";

        if (!loginAccount.trim()) {
            errorMsg = "请输入账号";
            return;
        }
        if (!loginPassword.trim()) {
            errorMsg = "请输入密码";
            return;
        }

        loading = true;

        try {
            const query = new URLSearchParams({
                country_code: selectedCountryCode,
                user_login: loginAccount.trim(),
                user_pass: loginPassword
            }).toString();

            const res = await fetch(`/api/login/add?${query}`);
            const result = await res.json();

            // 🟢 1. 校验外层接口状态 (ret: 200)
            if (result.ret !== 200) {
                errorMsg = result.msg || "接口响应异常";
                return;
            }

            // 🟢 2. 校验内层业务状态 (data.code: 0)
            if (result.data.code !== 0) {
                errorMsg = result.data.msg || "登录失败";
                return;
            }

            // 🟢 3. 提取用户信息 (info[0])
            const userInfo = result.data.info?.[0];
            if (!userInfo) {
                errorMsg = "返回数据为空";
                return;
            }

            // ✅ 4. 更新 Store (将接口的 id 映射为项目通用的 uid)
            userStore.set({
                id: userInfo.id,
                uid: userInfo.id,
                token: userInfo.token,
                user_nickname: userInfo.user_nickname,
                avatar: userInfo.avatar
            });

            document.cookie = `uid=${userInfo.id}; path=/; max-age=2592000; SameSite=Lax`;
            document.cookie = `token=${userInfo.token}; path=/; max-age=2592000; SameSite=Lax`;

            // ✅ 发射信号：通知其他标签页
            localStorage.setItem('auth-event', Date.now().toString());

            // ✅ 5. 登录成功跳转逻辑：优先后退，否则去首页
            if (window.history.length > 1) {
                history.back();
            } else {
                goto("/");
            }

        } catch (err) {
            console.error("Login Error:", err);
            errorMsg = "网络异常，请稍后重试";
        } finally {
            loading = false;
        }
    }

    function handleEnter(e: KeyboardEvent) {
        if (e.key === "Enter") {
            addLogin();
        }
    }
</script>

<div class="page-container">
    <div class="login-container">
        <h1 class="login-title">{title}</h1>

        <div class="tab-bar">
            {#each baseLoginType as tab}
                <button
                        type="button"
                        class="tab-item {activeTab === tab.id ? 'active' : ''}"
                        onclick={() => selectTab(tab.id)}
                >
                    {tab.name_zh}
                </button>
            {/each}
        </div>

        <div class="form-container">
            {#if activeTab === 1}
                <div class="form">
                    <select bind:value={selectedCountryCode} class="country-code-select">
                        {#each countryCodes as code}
                            <option value={code.value}>{code.label}</option>
                        {/each}
                    </select>
                    <input type="text" placeholder="手机号"/>
                    <div class="code-input">
                        <input type="text" placeholder="验证码"/>
                        <button type="button">获取验证码</button>
                    </div>
                    <button class="login-btn">登录</button>
                </div>
            {:else}
                <div class="form">
                    <input
                            type="text"
                            placeholder="手机号/邮箱"
                            bind:value={loginAccount}
                            onkeydown={handleEnter}
                    />
                    <input
                            type="password"
                            placeholder="密码"
                            bind:value={loginPassword}
                            onkeydown={handleEnter}
                    />
                    {#if errorMsg}
                        <div class="error-msg">{errorMsg}</div>
                    {/if}
                    <button
                            class="login-btn"
                            onclick={addLogin}
                            disabled={loading}
                    >
                        {loading ? "登录中..." : "登录"}
                    </button>
                </div>
            {/if}
        </div>

        <div class="three-login">
            <span>第三方登录</span>
            <div class="three-list">
                {#each threeLoginType as item}
                    <div class="three-item">
                        <i class="bi {item.icon}"></i>
                        <span>{item.name_zh}</span>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .page-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background-color: #f9f9f9;
    }

    .login-container {
        width: 100%;
        max-width: 500px;
        padding: 2rem;
        background-color: white;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .login-title {
        font-size: 2rem;
        margin-bottom: 1.5rem;
    }

    .tab-bar {
        display: flex;
        width: 100%;
        border-bottom: 2px solid #eee;
        margin-bottom: 1rem;
    }

    .tab-item {
        flex: 1;
        text-align: center;
        padding: 0.75rem 0;
        cursor: pointer;
        color: #555;
        transition: 0.3s;
        background: none;
        border: none;
        outline: none;
    }

    .tab-item.active {
        color: #007bff;
        border-bottom: 2px solid #007bff;
        font-weight: 600;
    }

    .form-container {
        width: 100%;
        min-height: 180px;
        margin-bottom: 2rem;
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .form input,
    .country-code-select {
        padding: 0.75rem 1rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 1rem;
        outline: none;
        transition: 0.3s;
    }

    .login-btn {
        width: 100%;
        padding: 0.75rem 0;
        border: none;
        background-color: #28a745;
        color: white;
        font-size: 1rem;
        border-radius: 6px;
        cursor: pointer;
    }

    .error-msg {
        color: #dc3545;
        font-size: 0.9rem;
    }

    .three-list {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;
    }

    .three-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
    }

    .three-item i {
        font-size: 2rem;
    }
</style>