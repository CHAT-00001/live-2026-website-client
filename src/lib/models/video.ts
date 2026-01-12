export interface ApiRequest {
    video_id: string;
    lat: string;
    lng: string;
    p?: number;
    uid?: number;
    token?: string;
}


// 用户VIP
export interface UserVip {
    type: string;
    endtime: string;
}

// 用户靓号
export interface UserLiang {
    name: string;
}

// 用户信息类型
export interface UserInfo {
    id: string;
    user_nickname: string;
    avatar: string;
    avatar_thumb: string;
    sex: string; // "0"未知 "1"男 "2"女 "3"  "4"  "5"
    signature: string;
    consumption: string;
    votestotal: string;
    province: string;
    city: string;
    birthday: string;
    user_status: string;
    issuper: string;
    location: string;
    praise_num: string;
    bg_img: string;
    level: string;
    level_anchor: string;
    vip: UserVip;
    liang: UserLiang;
    online: number;
    age: string;
}

// 单个视频数据类型
export interface VideoList {
    id: number;
    _id: null | string;
    uid: number;
    title: string;
    thumb: string;
    thumb_s: string;
    href: string;
    href_w: string;
    url: string | null;
    likes: string | number; // 可能是字符串（如"6.15万"）或数字
    views: number;
    comments: string | number;
    steps: number;
    collects: number | null;
    shares: string | number;
    addtime: string;
    lat: string;
    lng: string;
    description: string | null;
    duration: String | null;
    city: string;
    status: number;
    music_id: number;
    is_ad: number;
    ad_url: string;
    type: number;
    goodsid: number;
    classid: number;
    anyway: string;
    labelid: number | null;
    is_best: number | null;
    isdel: number;
    user_nickname: string;
    avatar: string;
    userinfo: UserInfo;
    datetime: string;
    islike: string;
    isstep: string;
    isattent: string;
    goods_type: string;
    music_img: string;
    music_title: string;
}

// API响应数据外层类型
export interface VideoListResponse {
    total: number;
    code: number;
    msg: string;
    info: VideoList[];
}

// API响应数据外层类型
export interface ListResponse {
    ret: number;
    data: {
        code: number;
        msg: string;
        info: VideoList[];
    };
    msg: string;
}

// 前端API请求支持的action类型
export type ApiAction = 'video.getVideoList' | 'video.getVideoById';

// 前端统一响应类型（适配你的后端格式）
export interface ApiResponse<T = unknown> {
    ret: number;
    data: T;
    msg: string;
}

export class VideoData {
}


export interface VideoItem {
    id: number;
    uid: number;
    title: string;
    thumb: string;
    href: string;
    likes: number;
    views: number;
    user_info: UserInfo
}

export interface CommentsModel {
    id: number;
    uid: number;
    user_info: UserInfo;
    video_id: number;
    content: string;
    addtime: number;
}