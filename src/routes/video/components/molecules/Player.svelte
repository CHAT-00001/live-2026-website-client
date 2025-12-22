<script>
    import XG from "./XG.svelte";

    let info = {
        id: 1,
        title: "",
        length: "00:45",
        href: "11"
    }

    let user = {
        id: 1000008810,
        nickname: "keaine2004",
        avatar: ""
    }

    let music = {
        id: 10045,
        name: "xxx创作的原声",
        thumb: "00.mp3"
    }
</script>


<div class="player">
    <div class="barrages"></div>
    <div class="main">
        <XG />
    </div>
    <div class="right_bar">
        <div class="avtar">
            <img src="{user.avatar}" />
            <span>+</span>
        </div>
        <div class="a_like">
            <div class="icon"></div>
            <div class="qty">199</div>
        </div>
        <div class="a_comments">
            <div class="icon"></div>
            <div class="qty">10</div>
        </div>
        <div class="a_collect">
            <div class="icon"></div>
            <div class="qty">20</div>
        </div>
        <div class="a_share">
            <div class="icon"></div>
            <div class="qty">14</div>
        </div>
        <div class="gits">
            <div class="icon"></div>
            <div class="qty">45.61</div>
        </div>
        <div class="sound">
            <div class="thumbs">
                <img src="{music.thumb}" />
            </div>
        </div>
    </div>
</div>
