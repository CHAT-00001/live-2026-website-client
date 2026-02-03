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

/**
 * 实况直播信息
 * 拼接了主播信息摘要
 */
export interface LiveItem {
    uid: number;
    title?: string;               // 标题
    city?: string;                // 城市
    stream?: string;              // 推流
    pull?: string;                // 推流地址
    thumb?: string;               // 封面，空时显示头像
    isvideo?: string;             // 是否为视频直播
    type?: string;                // 房间类型：
    type_val?: string;            // 类型预设值，密码房间时为密码
    goodnum?: string;             // 商品数量
    anyway?: string;              // 是否为竖屏
    starttime?: string;           // 开播时间
    isshop?: string;               // 是否为店铺直播
    game_action?: number;          // 游戏动作
    pkuid?: string;                // pk时，对方的uid
    pkstream?: string;             // pk对方的推流
    nums?: number;                 // 在线人数
    avatar?: string;              // 头像
    avatar_thumb?: string;        // 头像2
    user_nickname?: string;        // 主播昵称
    sex: string;                  // 性别：1.男 2. 女 3. 不男不女 4. 实体企业
    level?: string;                // 观众等级
    level_anchor?: string;         // 作者直播等级
    game?: string;                 // 游戏

}

/**
 * 单个响应
 */
export interface LiveItemResponse {
    ret: number;
    data: {
        code: number;
        msg: string;
        info: LiveItem[];
    };
    msg: string;
}


/**
 * 列表响应
 */
export interface ListResponse {
    ret: number;
    data: {
        code: number;
        msg: string;
        info: Home[];
    };
    msg: string;
}
