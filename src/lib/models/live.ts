import {n} from "vite/dist/node/chunks/moduleRunnerTransport";

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
    uid: number,
    title: string,
    city: string,
    stream: string,
    pull: string,
    thumb: string,
    isvideo: number,
    type: number,
    type_val: string,
    goodnum: string,
    anyway: number,
    starttime: number,
    isshop: number,
    game_action: number,
    isrecommend: number,
    live_type: number,
    voice_type: number,
    hotvotes: number,
    "recommend_time": number,
    "nums": string,
    avatar: string,
    avatar_thumb?: string,
    user_nickname: string,
    sex: string,
    level: string,
    level_anchor: string,
    game: string
}

export interface Home {
    slide: [];
    list: Info[];
    recommend?: Info[];
    attent_live_nums: string;
    attent_list: [];

}

export interface ListResponse {
    ret: number;
    data: {
        code: number;
        msg: string;
        info: Home[];
    };
    msg: string;
}
