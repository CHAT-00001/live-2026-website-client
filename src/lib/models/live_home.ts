/**
 * 请求体
 */
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

/**
 * 直播主页数据分片
 */
export interface Home {
    slide: [];                     // 轮播图
    list: Info[];                  // 热门直播列表
    recommend?: Info[];            // 推荐的直播
    attent_live_nums: string;      // 关注的直播数量
    attent_list: [];               // 关注的直播列表

}


/**
 * 主页响应 聚合接口
 */
export interface LiveHomeResponse {
    ret: number;
    data: {
        code: number;
        msg: string;
        info: Home[];
    };
    msg: string;
}
