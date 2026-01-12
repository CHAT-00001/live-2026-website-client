<script lang="ts">
    let running = true;
    let serverAddress = "http://127.0.0.1:35729/mcp";

    function toggleRunning() {
        running = !running;
    }

    function installChatWise() {
        alert("Installing ChatWise...");
    }
</script>

<style>
    .card {
        width: 320px;
        padding: 20px;
        border-radius: 16px;
        background: #e0e5ec;
        box-shadow: 8px 8px 16px #b8c0c8,
        -8px -8px 16px #ffffff;
        font-family: sans-serif;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }

    .status-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: green;
        box-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
    }

    .status-dot.off {
        background: gray;
        box-shadow: none;
    }

    .server {
        background: #e0e5ec;
        padding: 10px;
        border-radius: 12px;
        box-shadow: inset 3px 3px 6px #b8c0c8,
        inset -3px -3px 6px #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        font-size: 14px;
    }

    .btn {
        padding: 6px 12px;
        border-radius: 12px;
        border: none;
        background: #e0e5ec;
        box-shadow: 3px 3px 6px #b8c0c8,
        -3px -3px 6px #ffffff;
        cursor: pointer;
        transition: 0.2s;
    }

    .btn:active {
        box-shadow: inset 3px 3px 6px #b8c0c8,
        inset -3px -3px 6px #ffffff;
    }

    .quick-action {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .quick-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-radius: 12px;
        background: #e0e5ec;
        box-shadow: 5px 5px 10px #b8c0c8,
        -5px -5px 10px #ffffff;
        font-size: 14px;
    }

    .quick-item .label {
        font-weight: 500;
    }

    .configured {
        color: #4caf50;
        font-size: 12px;
        font-weight: bold;
    }
</style>

<div class="card">
    <div class="header">
        <div>Server</div>
        <div class="status-dot" class:off={!running}></div>
    </div>

    <div class="server">
        <span>{serverAddress}</span>
        <div style="display:flex; gap:6px;">
            <button class="btn" on:click={toggleRunning}>{running ? 'Stop' : 'Start'}</button>
            <button class="btn">⚙</button>
        </div>
    </div>

    <div class="quick-action">
        <div class="quick-item">
            <span class="label">ChatWise</span>
            <button class="btn" on:click={installChatWise}>Install</button>
        </div>
        <div class="quick-item">
            <span class="label">Claude Desktop</span>
            <span class="configured">Configured</span>
        </div>
    </div>
</div>
