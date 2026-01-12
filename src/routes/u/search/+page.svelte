<!-- src/routes/u/search.svelte -->
<script lang="ts">
    let search_result = {
        keyword: "可乐",
        qty: 5
    };

    let url_result = {
        xx: "1654ad887de16401102444fe600655ae____2026____004711"
    };

    let user = [
        {
            id: 1000004715,
            name: 'John',
            avatar: 'http://cdn1.damawei.com/android_1000000193_20250716_085431_4651409.jpg?imageView2/2/w/400/h/400',
            nickname: '哥们12488',
            signature: '哇~！这里还是空的呀~！',
        },
        {
            id: 1000005441,
            name: 'John',
            avatar: 'http://cdn1.damawei.com/1000010807_IOS_20250419032723_cerFace.png?imageView2/2/w/400/h/400',
            nickname: '我是最可爱的~',
            signature: '不加v',
        },
        {
            id: 1000015327,
            name: 'John',
            avatar: 'http://cdn1.damawei.com/1000015327_IOS_20250722064753_cerFace.png?imageView2/2/w/400/h/400',
            nickname: '只会心疼哥哥',
            signature: '哇~！这里还是空的呀~！',
        },
        {
            id: 1000008415,
            name: 'John',
            avatar: 'http://cdn1.damawei.com/1000015368_IOS_20250726122045_cerFace.png?imageView2/2/w/400/h/400',
            nickname: '盘想想',
            signature: '163cm / 48kg',
        },
        {
            id: 1000006114,
            name: 'John',
            avatar: 'http://cdn1.damawei.com/1000000248_IOS_20250629003410_cerFace.png?imageView2/2/w/400/h/400',
            nickname: '155',
            signature: '哇~！这里还是空的呀~！',
        },
        {
            id: 1000015177,
            name: 'John',
            avatar: 'http://cdn1.damawei.com/1000015177_IOS_20250712172229_cerFace.png?imageView2/2/w/400/h/400',
            nickname: 'Phone5177',
            signature: '哇~！这里还是空的呀~！',
        },
        {
            id: 1000001020,
            name: 'John',
            avatar: 'http://cdn1.damawei.com/user/20221227/f2ca5653a74abf1a8b82308213142dac.png?imageView2/2/w/400/h/400',
            nickname: 'jo_2005',
            signature: '哇~！这里还是空的呀~！',
        },
        {
            id: 1000015379,
            name: 'John',
            avatar: 'http://cdn1.damawei.com/1000015379_IOS_20250727162546_cerFace.png?imageView2/2/w/400/h/400',
            nickname: '法拉利0115',
            signature: '哇~！这里还是空的呀~！',
        },
        {
            id: 1000015890,
            name: 'John',
            avatar: 'http://cdn1.damawei.com/1000015890_IOS_20250818150118_cerFace.png?imageView2/2/w/400/h/400',
            nickname: '手机用户5890',
            signature: 'jk妹妹，你喜欢吗',
        },
        {
            id: 1000008074,
            name: 'John',
            avatar: 'http://cdn1.damawei.com/android_10011147_20231207_232042_1622180.jpg?imageView2/2/w/400/h/400',
            nickname: '200',
            signature: '66',
        },
    ]
</script>
<svelte:head>
    <title> {search_result.keyword} - [ Search - 10020 ] - 用户 - 网站名称</title>
</svelte:head>

<div class="line_100"></div>
<div class="wrapper">
    <div class="search_bar">
        <input type="text" value="搜索用户">
        <button class="btn_black">搜索</button>
        <button>历史搜索</button>
    </div>
    <div class="hot_search_bar">
        <button>2026</button>
        <button>番薯很喜欢你</button>
        <button>不爱吃柠檬🍋</button>
    </div>
    <div class="search_result">
        <h4><span style="color: #0000ff">OK！</span>共找到关于<span style="color: #00ff33">{search_result.keyword}</span>
            的对象<span style="color: #ff0000">{search_result.qty}</span> 个。</h4>
    </div>
    <div class="user_card">
        {#each user as item}
            <div class="item">
                <div class="thumb">
                    <a target="_blank" href="/u/{item.id}?nn={item.nickname}&xx={url_result.xx}"><img class="thumb-img"
                                                                                                      src="{item.avatar}"
                                                                                                      alt={item.nickname}/></a>
                </div>
                <div class="user_info">
                    <div class="avatar"><a target="_blank"
                                           href="/u/{item.id}?nn={item.nickname}&xx={url_result.xx}"><img
                            class="avatar_32" src="{item.avatar}" alt={item.nickname}/></a></div>
                    <div class="nickname"><a target="_blank" href="/u/{item.id}?nn={item.nickname}&xx={url_result.xx}">
                        <h4>{item.nickname}</h4></a></div>
                </div>
                <div class="signature">{item.signature}</div>
            </div>
        {/each}
    </div>
</div>

<style>
    .wrapper {
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
        padding: 0 10px;
        box-sizing: border-box;
    }

    .user_card {
        margin: 10px 0;
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        justify-content: flex-start;
    }

    .user_card .item {

        flex: 0 0 calc(20% - 12px);
        box-sizing: border-box;
        padding: 8px;
        border-radius: 12px;
        background: #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }

    .user_card .item .thumb {
        width: 100%;
        aspect-ratio: 1 / 1;
        border-radius: 10px;
        overflow: hidden;
    }

    .user_card .item .thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform .5s;
    }

    .user_card .item .thumb img:hover {
        transform: scale(1.1);
    }

    .user_card .item .user_info {
        display: flex;
        align-items: center;
        padding: 8px 5px;
    }

    .avatar_32 {
        margin: 5px;
        width: 32px;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        object-fit: cover;
    }

    .nickname a {
        text-decoration: none;
        color: #333;
    }

    .nickname h4 {
        margin: 0;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; /* 昵称超长省略 */
    }

    .user_card .item .signature {
        color: #666666;
        font-size: 12px;
        padding: 0 5px;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .search_bar, .hot_search_bar {
        margin: 15px 0;
    }

    .search_bar input {
        padding: 6px 10px;
        width: 280px;
        height: 24px;
        border-radius: 4px;
        border: 1px solid #eee;
        outline: none;
    }

    .search_bar button, .hot_search_bar button {
        padding: 6px 12px;
        margin: 0 5px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        background: #f5f5f5;
    }

    .btn_black {
        background: #333 !important;
        color: #fff !important;
    }

    .search_result h4 {
        margin: 10px 0;
        font-weight: normal;
    }
</style>