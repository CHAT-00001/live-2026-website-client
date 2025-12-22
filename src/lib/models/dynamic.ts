export interface ApiRequest {
    lat: string;
    lng: string;
    p?: number;
}

export interface UserInfo {
    id: string;
    user_nickname: string;
    avatar: string;
    avatar_thumb: string;
    sex: string;
    isAttention: string;
    age: string;
}

export interface Info {
    id: number;
    uid: number;
    title: string;
    thumbs: string[];
    video_thumb: string;
    href: string;
    voice: string;
    length: number;
    likes: number | string;
    comments: number;
    type: number;
    is_del: number;
    status: number;
    uptime: number;
    lat: string;
    lng: string;
    city: string;
    addtime: number;
    islike: string;
    userinfo: UserInfo;
    label_name: string;
    [key: string]: any;
    distance: string;
}

export interface ListResponse {
    ret: number;
    data: {
        code: number;
        msg: string;
        info: Info[];
    };
    msg: string;
}
