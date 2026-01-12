// src/lib/models/goods_model.ts

// 商品规格
export interface Spec {
    spec_id: number;
    spec_name: string;
    spec_num: string;
    price: string | number;
    thumb: string;
}

// 商品三级分类
export interface ThreeClassInfo {
    gc_id: number;
    gc_name: string;
    gc_name_en: string;
    gc_icon: string;
}

// 商品信息
export interface GoodsInfo {
    id: number;
    market_id: number;
    uid: number;
    name: string;
    name_en: string;
    no: string;
    one_classid: number;
    two_classid: number;
    three_classid: number;
    video_url: string;
    video_thumb: string;
    video_length: number | null;
    thumbs: string;
    content: string;
    pictures: string;
    specs: string;
    postage: string;
    hits: number;
    status: string;
    isrecom: number;
    sale_nums: number;
    refuse_reason: string;
    issale: number;
    type: string;
    original_price: string;
    present_price: string;
    goods_desc: string;
    href: string;
    live_isshow: number;
    low_price: string;
    admin_id: number;
    commission: string;
    share_income: string;
    lat: string;
    lng: string;
    city: string | null;
    address: string | null;
    label_id: string | null;
    collects: number;
    shares: number;
    three_classinfo: ThreeClassInfo;
    one_class_name: string;
    two_class_name: string;
    three_class_name: string;
    video_url_format: string;
    video_thumb_format: string;
    thumbs_format: string[];
    specs_format: Spec[];
    pictures_format: string[];
    iscollect: string;
    is_sale_platform: string;
    comment_nums: number;
}

// 店铺信息
export interface ShopInfo {
    uid: string;
    sale_nums: string;
    quality_points: string;
    service_points: string;
    express_points: string;
    certificate: string;
    other: string;
    service_phone: string;
    province: string;
    city: string;
    area: string;
    status: string;
    user_nickname: string;
    name: string;
    avatar: string;
    composite_points: string;
    goods_nums: string;
    address_format: string;
    certificate_desc: string;
    isattention: string;
}

// 评论列表
export interface Comment {
    // 如果有字段可以补充
}

// 商品详情条目
export interface GoodsDetailItem {
    goods_info: GoodsInfo;
    shop_info: ShopInfo;
    comment_lists: Comment[];
}

// 接口返回数据
export interface ApiResponse {
    ret: number;
    data: {
        code: number;
        msg: string;
        info: GoodsDetailItem[];
    };
    msg: string;
}
