// src/lib/models/comments.ts

export interface CommentsApiResponse {
    ret: number
    data: CommentsApiData
    msg: string
}

export interface CommentsApiData {
    code: number
    msg: string
    info: CommentsInfo[]
}

/**
 * info 数组中的对象
 * 一个视频通常只有一个
 */
export interface CommentsInfo {
    comments: number
    commentlist: CommentItem[]
}

/**
 * 单条评论
 */
export interface CommentItem {
    id: number
    message_type: number | null
    uid: number
    touid: number
    videoid: number
    is_danmaku: number | null
    send_time: number | null
    commentid: number
    parentid: number
    content: string
    likes: number
    steps: number | null
    addtime: number
    at_info: string
    created_at: string | null
    photo_url: string | null
    video_url: string | null
    voice: string | null
    length: number | null
    is_livephoto: number | null
    display_qty: number | null
    userinfo: UserInfo
    datetime: string
    islike: '0' | '1'
    touserinfo: UserInfo
    replys: number
    replylist: CommentItem[]
}

/**
 * 用户信息
 */
export interface UserInfo {
    id: string
    user_nickname: string
    avatar: string
    avatar_thumb: string
    sex: string
    signature: string
    consumption: string
    votestotal: string
    province: string
    city: string
    birthday: string
    user_status: string
    issuper: string
    location: string
    praise_num: string
    bg_img: string
    level: string
    level_anchor: string
    vip: VipInfo
    liang: LiangInfo
    online: number
    age: string
}

/**
 * VIP 信息
 */
export interface VipInfo {
    type: string
    endtime: string
}

/**
 * 靓号信息
 */
export interface LiangInfo {
    name: string
}
