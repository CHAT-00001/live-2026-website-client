<!-- 父组件：src/routes/u/[id]/+page.svelte（假设路径） -->
<script lang="ts">
    import {onMount} from 'svelte';
    import {fade} from 'svelte/transition';
    import {page} from '$app/stores';
    import BANNER from "../components/molecules/BANNER.svelte";
    import VIDEOS from "../components/molecules/VIDEOS.svelte";
    import type {Info} from '$lib/models/dynamic';
    import {browser} from '$app/environment'; // 新增：区分SSR/CSR

    let list: Info[] = [];
    let p = 1;
    let loading = false;
    let maxPages = 20;
    let imgLoaded: boolean[] = [];

    let touid: string = '';  // 目标用户 ID
    let uid: string = '1000010441';    // 当前登录用户 ID
    let user: any = null; // 新增：父组件存储用户数据

    // 从 URL 获取目标用户 ID
    $: touid = $page.params.id;
    console.log('id:', touid)

    // 新增：父组件统一获取用户数据（复用BANNER原逻辑）
    async function fetchUserInfo() {
        if (!browser || !touid) return;
        try {
            const res = await fetch(`/api/u/${touid}?p=1`);
            const data = await res.json();

            if (!data.error && data.data?.info?.length) {
                user = data.data.info[0]; // 赋值给父组件user
            } else {
                console.warn('API 返回错误或 info 为空', data);
                // 使用默认值
                // user = {
                //     id: 1000008018,
                //     _id: "adcfcfee55115e1155ad445664efcc",
                //     uid: 1000008804,
                //     user_nickname: "未知用户-10086",
                //     avatar: "https://img.alicdn.com/imgextra/i1/2212688966599/O1CN01RA6su81ycOcYNyeT9_!!2212688966599.jpg",
                //     bg_img: "",
                //     age: 17,
                //     from: "欧洲 - 冰岛",
                //     ip: "中国.广东.深圳",
                //     location: "21.161444,120.125441"
                // };
            }
        } catch (err) {
            console.error('请求用户信息失败', err);
            // 使用默认值
            // user = {
            //     id: 1000008018,
            //     _id: "adcfcfee55115e1155ad445664efcc",
            //     uid: 1000008804,
            //     user_nickname: "未知用户-10086",
            //     avatar: "https://img.alicdn.com/imgextra/i1/2212688966599/O1CN01RA6su81ycOcYNyeT9_!!2212688966599.jpg",
            //     bg_img: "",
            //     age: 17,
            //     from: "欧洲 - 冰岛",
            //     ip: "中国.广东.深圳",
            //     location: "21.161444,120.125441"
            // };
        }
    }

    async function loadMore(reset = false) {
        if (loading || p > maxPages) return;
        loading = true;

        try {
            const params = new URLSearchParams({ p: p.toString() });
            const res = await fetch(`/api/u/${touid}?${params.toString()}`);
            if (!res.ok) throw new Error('API Error');

            const data = await res.json();
            const infoList: Info[] = data.data.info;

            list = reset ? infoList : [...list, ...infoList];
            p += 1;
        } catch (err) {
            console.error(err);
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        if (touid) {
            fetchUserInfo(); // 新增：先获取用户数据
            loadMore();      // 再加载动态列表
        }

        const handleScroll = () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
                loadMore();
            }
        };

        if (browser) { // 新增：仅客户端添加滚动监听
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    });
</script>

<svelte:head>
    <title>{user?.user_nickname || '未知用户'} - [{user?.id || '0'}] - 动态 - 网站标题</title>
</svelte:head>

<!-- 修改：将父组件的user数据传递给BANNER -->
<div class="banner_640">
    <BANNER {uid} {touid} {user} />
</div>

<!--<div class="live_bar">-->
<!--    <a target="_blank" href="/u/1000004258">-->
<!--        <div class="led" style="margin: 20px; background: url(http://cdn1.damawei.com/android_10014120_20250118_185012_4511339.jpg); background-size: cover;"></div>-->
<!--    </a>-->
<!--</div>-->

<VIDEOS {touid} />

<div class="wrapper">
    <div class="title_bar">
        <div class="title">动态</div>
        <div class="tab_menu">
            <div class="list">
                <button>推荐</button>
                <button>关注</button>
                <button>附近</button>
                <button>最新</button>
            </div>
        </div>
    </div>
</div>

<div class="wrapper">
    <div class="dynamic-list">
        {#each list as item (item.id)}
            <div class="dynamic-item">
                <div class="user_info">
                    <div class="avatar_48">
                        <a target="_blank" href="/u/{item.uid}">
                            <img class="avatar_48" src="{item.userinfo.avatar}" />
                        </a>
                    </div>
                    <div class="nickname">
                        <a target="_blank" href="/u/{item.uid}">{item.userinfo.user_nickname}</a>
                    </div>
                </div>

                <h4>{item.title}</h4>

                <div class="info">
                    {#each item.thumbs as thumb}
                        <div class="photo">
                            <img
                                    class="thumb"
                                    src={thumb}
                                    loading="lazy"
                                    on:load={() => imgLoaded[0] = true}
                                    in:fade={{ duration: 500 }}
                            />
                        </div>
                    {/each}
                    {#if item.video_thumb}
                        <video src={item.href} poster={item.video_thumb} controls width="480"></video>
                    {/if}
                </div>

                <div class="option">
                    <div class="data">{item.addtime}</div>
                    <div class="distance">位置：{item.city} 距离: {item.distance}</div>
                    <div class="menu">
                        点赞: {item.likes} 评论: {item.comments}
                    </div>
                </div>
            </div>
        {/each}

        {#if loading}
            <p>加载中...</p>
        {/if}
    </div>
</div>

<style>
    /* 样式完全不变 */
    .live_bar .led {
        height: 480px;
        background-size: cover;
    }
    .title_bar {
        margin: 20px;
    }
    .thumb {
        opacity: 1;
        transition: opacity 0.5s;
        width: 200px;
    }
    .thumb.fade-in {
        opacity: 1;
    }
    .dynamic-item {
        display: block;
        margin: 20px;
        padding: 20px;
        border-radius: 20px;
        background: #f1f1f1;
    }
    .user_info {
        display: flex;
    }
    .avatar_48 {
        width: 48px;
        height: 48px;
        border-radius: 10%;
    }
    .nickname {
        margin: 10px;
    }
    .photo {
        display: inline-block;
        margin: 10px;
    }
</style>