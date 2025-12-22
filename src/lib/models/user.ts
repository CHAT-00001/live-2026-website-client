

//// MODEL User
export interface User {
    id: string;
    email: string;
    avatar: string;
    bg_img?: string;
    user_nickname: string;
    age?: number,                   // 年龄
    birthday?: string;
    is_live?: string;
    is_sale?: string;
    follows?: number;               // 关注数量
    fans?: number;                  // 粉丝数量
}



//// 创建用户
export interface CreatUser {
    sn: string;                     // 流水号
    phone: number;                  // 电话号码
    code: number;                   // 手机验证码
    password: string;               // 密码
}