<script lang="ts">
    import {createEventDispatcher, onMount} from 'svelte';

    const dispatch = createEventDispatcher();
    export let visible = false;

    let text = '';
    let inputEl: HTMLInputElement;

    function send() {
        if (!text.trim()) return;
        dispatch('send', {text: text.trim()});
        text = '';
        visible = false;
    }

    function onKey(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            e.preventDefault();
            send();
        } else if (e.key === 'Escape') {
            visible = false;
        }
    }
</script>

{#if visible}
    <div class="danmaku-wrap" on:click={() => (visible = false)}>
        <div class="danmaku-box" on:click|stopPropagation>
            <input bind:this={inputEl} bind:value={text} on:keydown={onKey} placeholder="输入弹幕，回车发送"/>
            <button on:click={send}>发送</button>
        </div>
    </div>
{/if}

<style>
    .danmaku-wrap {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        pointer-events: auto;
    }

    .danmaku-box {
        margin-bottom: 12vh;
        background: rgba(0, 0, 0, 0.6);
        padding: 10px;
        border-radius: 8px;
        display: flex;
        gap: 8px;
    }

    input {
        min-width: 320px;
        padding: 8px;
        color: #fff;
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    button {
        padding: 6px 10px;
    }
</style>
