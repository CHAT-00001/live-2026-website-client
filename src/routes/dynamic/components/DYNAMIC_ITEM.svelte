<!-- src/routes/dynamic/components/DYNAMIC.svelte -->
<script lang="ts">
    import {fade} from 'svelte/transition';
    import type {Info} from '$lib/models/dynamic';

    export let item: Info;
    export let imgLoaded: boolean[]; // 如果你想在父组件追踪图片加载
</script>

<div class="dynamic-item" id="{item.id.toString()}">
    <div class="user_info">
        <div class="avatar_48">
            <a href={`/u/${item.uid}`} target="_blank">
                <img class="avatar_48" src={item.userinfo.avatar}/>
            </a>
        </div>
        <div class="nickname">
            <a href={`/u/${item.uid}`} target="_blank">{item.userinfo.user_nickname}</a>
        </div>
    </div>

    <h4>{item.title}</h4>

    <div class="info">
        {#each item.thumbs as thumb, index}
            <div class="photo">
                <a target="_blank" href={thumb}>
                    <img
                            class="thumb"
                            src={thumb}?imageView2/2/w/400/h/600
                            loading="lazy"
                            on:load={() => imgLoaded[index] = true}
                            in:fade={{ duration: 500 }}
                    />
                </a>
            </div>
        {/each}

        {#if item.video_thumb}
            <video src={item.href} poster={item.video_thumb} controls width="480">
                <track kind="captions" src="" srclang="en" label="English"/>
            </video>
        {/if}
    </div>

    <div class="option">
        <div class="data">{item.addtime}</div>
        <div class="distance">
            City: {item.city} Address: {item.address} 距离: {item.distance}
        </div>
        <div class="menu">
            点赞: {item.likes} 评论: {item.comments}
        </div>
    </div>
</div>

<style>
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
        font-weight: bold;
    }

    .photo {
        display: inline-block;
        margin: 10px;
    }
</style>
