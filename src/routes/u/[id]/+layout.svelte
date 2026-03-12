<!-- src/routes/u/[id]/+layout.svelte -->

<script lang="ts">
    import UserBanner from "../components/layout/UserBanner.svelte";

    // 解构获取 data 和 children（即子页面内容）
    let {data, children} = $props();

    // 使用 $derived 确保当 URL 参数 [id] 变化时，touid 自动更新
    const touid = $derived(String(data.touid));
    const user = $derived(data.user);
</script>

<UserBanner {touid} {user}/>

{@render children()}