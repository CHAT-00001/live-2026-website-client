<script lang="ts">
    let title = "登录"
</script>





<div class="wrapper">
    <div class="main">
        <h1>账号和密码{title}</h1>
        <div class="a">
            <input type="text"/>
            <input type="password">
            <input type="submit" value="登录">
        </div>
    </div>
    <div class="main">
        <h1>手机验证码{title}</h1>
        <div class="a">
            <input type="checkbox" value="0086,001">
            <input type="text"/>
            <input type="password">
            <input type="submit" value="登录">
        </div>
    </div>
    <div class="main">
        <h1>邮箱验证码{title}</h1>
        <div class="a">
            <input type="text"/>
            <input type="password">
            <input type="submit" value="登录">
        </div>
    </div>
    <div class="main">
        <h1>微信{title}</h1>
        <div class="a">
            <img class="qd_code" src="/">
            <input type="submit" value="登录">
        </div>
    </div>
</div>

<style>
    .qd_code {
        display: block;
        width: 200px;
        height: 200px;
    }
</style>