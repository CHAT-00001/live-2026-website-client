// src/types/message.ts

export enum Status {
    Editing = 0,        // 草稿
    Sending = 1,        // 正在发送
    Syncing = 2,        // 同步发件箱/收件箱
    Received = 3,       // 客户端接收（Rust 端为 received，TS 遵循大驼峰命名规范修正首字母大写）
    Read = 4,           // 已读
    Recalled = 5        // 撤回
}


export enum MsgType {
    System = 0,         // 系统
    Text = 1,           // 文字
    Audio = 2,          // 音频
    Video = 3,          // 视频
    Image = 4,          // 图像
    File = 5,           // 文件
    RedPacket = 6,      // 红包
    Barrage = 7,        // 弹幕
    Location = 8,       // 位置
    Card = 9,           // 名片
    LivePhoto = 10,     // 实况照片
    Emoticon = 11,      // 表情包
    VideoCall = 12,     // 视频通话
    Transfer = 13,      // 转账
    Gift = 14,
}


export enum Event {
    SendMsg = 0,        // 发送消息
    Connect = 1,        // 建立连接
    ReConn = 2,         // 重连中
    Coming = 3,         // 来到直播间
    KillUser = 4,       // 踢人
    ChanLiveType = 5,   // 改变直播类型
    Follow = 6,         // 关注
    VideoCallWaiting = 7, // 等待
    VideoCallStart = 8,  // 接通
    VideoCallPause = 9,  // 暂停
    VideoCallEnd = 10    // 挂断
}


export interface UserInfo {
    id: number;         // Rust 中 u64，TS 中用 number 兼容（前端无 u64 类型，大数可考虑 string）
    user_nickname: string;
    avatar: string;
    level: string;
    usertype: string;
    vip_type: string;
    guard_type: string;
    liangname: string;
    car_id: string;
    car_swf: string;
    car_swftime: string;
    car_words: string;
}


export interface Content {
    text?: string;      // Rust 中 Option<String>，可选字段
}


export interface MediaInfo {
    name?: number;      // Rust 中 Option<u64>，TS 用 number 兼容
    size?: number;      // Rust 中 Option<u64>
    url?: string;       // Rust 中 Option<String>
    width?: number;     // Rust 中 Option<u64>
    height?: number;    // Rust 中 Option<u64>
    fps?: number;       // Rust 中 Option<f32>
    bit?: number;       // Rust 中 Option<u16>
    link_url?: string;  // Rust 中 Option<String>
    is_livephoto?: number; // Rust 中 Option<u8>
}


export interface GiftInfo {
    id: string;
    name: string;
    count: number;      // Rust 中 u32，TS 用 number 兼容
    length: number;     // Rust 中 u32
    icon: string;
}


export interface BarrageInfo {
    id: string;
    uid: number;        // Rust 中 u64，TS 用 number 兼容
    room_id: string;
    text: string;
    color: string;
}


export type Payload =
    | { type: "System"; message: string }                // 对应 Rust Payload::System
    | { type: "Content"; content: Content }              // 对应 Rust Payload::Content
    | { type: "Media"; media: MediaInfo }                // 对应 Rust Payload::Media
    | { type: "Gift"; gift: GiftInfo }                   // 对应 Rust Payload::Gift
    | { type: "Barrage"; barrage: BarrageInfo };         // 对应 Rust Payload::Barrage


export interface MessageBody {
    status: Status;
    client_id: string;
    send_at: string;    // Rust 中 DateTime<Utc>，前端接收为 ISO 格式字符串（后端序列化后）
    server_sync_at?: string; // Rust 中 Option<DateTime<Utc>>，可选 ISO 格式字符串
    send_id: string;
    sync_id: string;
    msg_type: MsgType;
    event: Event;
    room_id: string;
    uid: number;        // Rust 中 u64，TS 用 number 兼容（大数场景可改为 string）
    sender?: UserInfo;  // Rust 中 Option<UserInfo>，可选字段
    payload: Payload;   // 对应 Rust Payload 枚举，使用上述 TS 联合类型
}