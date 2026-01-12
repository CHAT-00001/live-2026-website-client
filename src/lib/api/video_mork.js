import {json} from '@sveltejs/kit';

// 模拟视频数据
const videos = [
    {
        id: 1,
        title: '探索神秘的山脉风景',
        description: '一场说走就走的旅行，探索大自然的壮丽景色',
        url: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4',
        thumbnail: 'https://picsum.photos/400/600?random=1',
        duration: '02:30',
        author: '旅行家小明',
        authorAvatar: 'https://picsum.photos/200/200?random=1',
        views: '12.5万',
        likes: '8.2万',
        comments: '1256',
        shares: '3245',
        favorites: '4.5万',
        followers: '23.5万',
        tags: ['旅行', '风景', '自然'],
        danmaku: [
            {text: '太美了！', time: 2, color: '#ffffff'},
            {text: '这个地方我去过', time: 5, color: '#ff0000'},
            {text: '求位置', time: 8, color: '#00ff00'}
        ],
        hotComments: [
            {
                id: 101,
                userName: '摄影爱好者',
                userAvatar: 'https://picsum.photos/200/200?random=101',
                content: '这摄影技术太厉害了，构图和光线把握得恰到好处',
                likes: '2453',
                time: '3天前'
            },
            {
                id: 102,
                userName: '环球旅行者',
                userAvatar: 'https://picsum.photos/200/200?random=102',
                content: '请问这是在哪里？我也想去',
                likes: '1876',
                time: '2天前'
            }
        ]
    },
    {
        id: 2,
        title: '城市夜景延时摄影',
        description: '用延时摄影记录城市夜晚的繁华与美丽',
        url: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4',
        thumbnail: 'https://picsum.photos/400/600?random=2',
        duration: '01:45',
        author: '城市光影',
        authorAvatar: 'https://picsum.photos/200/200?random=2',
        views: '8.7万',
        likes: '6.3万',
        comments: '987',
        shares: '2134',
        favorites: '3.2万',
        followers: '18.2万',
        tags: ['城市', '夜景', '摄影'],
        danmaku: [
            {text: '哇塞，好美', time: 3, color: '#ffffff'},
            {text: '这是哪个城市？', time: 6, color: '#0000ff'},
            {text: '喜欢这种感觉', time: 9, color: '#ffff00'}
        ],
        hotComments: [
            {
                id: 201,
                userName: '城市猎人',
                userAvatar: 'https://picsum.photos/200/200?random=201',
                content: '这是上海外滩吧？太震撼了',
                likes: '1754',
                time: '4天前'
            },
            {
                id: 202,
                userName: '夜景爱好者',
                userAvatar: 'https://picsum.photos/200/200?random=202',
                content: '请问用的什么设备拍摄的？参数是多少？',
                likes: '1243',
                time: '3天前'
            }
        ]
    },
    {
        id: 3,
        title: '美食制作教程：意大利面',
        description: '教你制作正宗的意大利风味意大利面',
        url: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4',
        thumbnail: 'https://picsum.photos/400/600?random=3',
        duration: '03:10',
        author: '美食家小王',
        authorAvatar: 'https://picsum.photos/200/200?random=3',
        views: '15.6万',
        likes: '10.2万',
        comments: '2345',
        shares: '4567',
        favorites: '6.8万',
        followers: '35.7万',
        tags: ['美食', '烹饪', '意大利面'],
        danmaku: [
            {text: '看起来好好吃', time: 4, color: '#ffffff'},
            {text: '我要试试', time: 7, color: '#ff00ff'},
            {text: '这个酱汁怎么做？', time: 10, color: '#00ffff'}
        ],
        hotComments: [
            {
                id: 301,
                userName: '吃货小张',
                userAvatar: 'https://picsum.photos/200/200?random=301',
                content: '刚试过了，味道真的不错，谢谢分享！',
                likes: '3245',
                time: '2天前'
            },
            {
                id: 302,
                userName: '意大利留学生',
                userAvatar: 'https://picsum.photos/200/200?random=302',
                content: '作为在意大利留学的人，这个做法很正宗！',
                likes: '2178',
                time: '1天前'
            }
        ]
    },
    {
        id: 4,
        title: '宠物猫的日常生活',
        description: '记录我家猫咪的搞笑日常',
        url: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4',
        thumbnail: 'https://picsum.photos/400/600?random=4',
        duration: '02:15',
        author: '铲屎官日记',
        authorAvatar: 'https://picsum.photos/200/200?random=4',
        views: '20.8万',
        likes: '15.3万',
        comments: '3456',
        shares: '6789',
        favorites: '9.2万',
        followers: '42.3万',
        tags: ['宠物', '猫', '搞笑'],
        danmaku: [
            {text: '太可爱了', time: 2, color: '#ffffff'},
            {text: '我家猫也这样', time: 5, color: '#ff0000'},
            {text: '猫咪的眼神太逗了', time: 8, color: '#00ff00'}
        ],
        hotComments: [
            {
                id: 401,
                userName: '爱猫人士',
                userAvatar: 'https://picsum.photos/200/200?random=401',
                content: '我家也有一只这样的猫，太像了！',
                likes: '4321',
                time: '5天前'
            },
            {
                id: 402,
                userName: '动物行为学家',
                userAvatar: 'https://picsum.photos/200/200?random=402',
                content: '这只猫的行为很典型，它正在展现猫科动物的捕猎本能',
                likes: '2765',
                time: '4天前'
            }
        ]
    }
];

// @ts-ignore
export async function GET({params}) {
    if (params.id) {
        const video = videos.find(v => v.id === parseInt(params.id));
        if (!video) {
            return new Response(null, {status: 404});
        }
        return json(video);
    } else {
        return json(videos);
    }
}