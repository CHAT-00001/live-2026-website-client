

//// MODEL Wallet  钱包
export interface Wallet {
    id: string;
    uid: string;
    name: string;
    balance: number;                // 余额
    wallet_type?: CardInfo;           // 类型： 0. 钻石 1. 积分   2. RMB  3. USD  4. ESD  5. HKB  6.
    user_nickname: string;
    age?: number,                   // 年龄
    birthday?: string;
    is_live?: string;
    is_sale?: string;
    follows?: number;               // 关注数量
    fans?: number;                  // 粉丝数量
    status: string;                 // 状态
}

//// 卡片信息
export interface CardInfo {
    id: number;
    name: string;
    thumbnail: string;               // 封面
    bg_image: string;                // 背景图
}

//// 可溯源的交易单
export interface TransactionOder {
    id: number;
    sn: number;
    amount: number;                  // 金额
    quantity: number;                // 数量: 默认 1
    code: number;
    remark: string;                  //
    handling: number;                // 手续费
    status: string;                  // 状态：0. 失败  1. 成功
    operator_id: number;
    salesman_id: number;
    target_account: number;
    currency: string;
    created_at: string;
    handle_time: string;
    complete_time: string;
    transaction_id: TransactionOder;
    trade_type: string;
}