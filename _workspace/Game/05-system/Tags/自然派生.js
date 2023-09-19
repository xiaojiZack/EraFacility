
/*
此处为放置tag数据的地方，自然派生指的是除指令和场景效果外，由于palam自身数值
导致的tag，大部分为不可见tag
*/
CharaTag.new("测试tag",{
    inf:{}, //额外信息
    type:['keep'], //持续检测类型
    visiable: false, //是否显示
    describe:"测试tag",
    dot:[{          //效果描述
        source:"lust",
        value:0,
        type:"permin",
        inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
    },{
        source:"lust",
        value:2,
        type:"get",
        ing:0
    }],
    checkSource:{
        //持续检测
        'lust':{
            type:">",
            value:1
        }
    },
    derive:[],
}).setTrigger((chara)=>{
    //自动触发判定
    return false
})

let loadTags_basic = function(){
    CharaTag.new("自然消退",{
        inf:{},
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"人物palam自然消退",
        dot:[
            {          //效果描述
                source:"lust",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"deference",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"ecstacy",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"esA",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"esB",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"esC",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"esV",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"esM",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"esW",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"esU",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"surrend",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"fear",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"mortify",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"humiliate",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"pain",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"depress",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"resist",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"favo",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"deference",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"satisfy",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"superior",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"hypno",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"paM",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"paB",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"paC",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"paU",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"paV",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"paA",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"paW",
                value:-1,
                type:"permin",
                inf:0
            },{
                source:"stamina",
                value:1,
                type:"permin",
                inf:0
            }
        ],
    }).setTrigger((chara)=>{
        return true
    })

    CharaTag.new("睡觉中",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"睡觉中",
        dot:[{          //效果描述
            source:"health",
            value:2,
            type:"permin",
            inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{
            source:'stamina',
            value:5,
            type:"permin",
            inf:0
        },{
            source:'awareness',
            value:-10,
            type:"nolarger",
            inf:100
        }],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return false
    })
    console.log('成功加载基础tag')
}

let loadTags_palam = function(){
    CharaTag.new("抑郁Lv1",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"抑郁Lv1",
        dot:[{          //效果描述
            source:"san",
            value:-0.5,
            type:"permin",
            inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{
            source:"stress",
            value:1,
            type:"permin",
            ing:0
        }],
        checkSource:{
            //持续检测
            'depress':{
                type:">",
                value:2
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.palam['depress'][0]>=4
    })

    CharaTag.new("抑郁Lv2",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"抑郁Lv2",
        dot:[{          //效果描述
            source:"san",
            value:-1,
            type:"permin",
            inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{
            source:"stress",
            value:2,
            type:"permin",
            ing:0
        }],
        checkSource:{
            //持续检测
            'depress':{
                type:">",
                value:4
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.palam['depress'][0]>=6
    })

    CharaTag.new("快感Lv1",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"快感Lv1",
        dot:[{          //效果描述
            source:"lust",
            value:1,
            type:"noless",
            inf:4 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{
            source:"san",
            value:-0.5,
            type:"nolarger",
            ing:800
        },{
            source:"stamina",
            value:-0.5,
            type:"nolarger",
            ing:600
        },{
            source:"libido",
            value:1,
            type:"noless",
            ing:500
        },{
            source:"surrend",
            value:1,
            type:"noless",
            ing:2
        }],
        checkSource:{
            //持续检测
            'ecstacy':{
                type:">",
                value:3
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.palam['ecstacy'][0]>=4
    })

    CharaTag.new("快感Lv2",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"快感Lv2",
        dot:[{          //效果描述
            source:"lust",
            value:2,
            type:"noless",
            inf:6 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{
            source:"san",
            value:-1,
            type:"nolarger",
            ing:600
        },{
            source:"stamina",
            value:-0.5,
            type:"nolarger",
            ing:200
        },{
            source:"libido",
            value:2,
            type:"noless",
            ing:800
        },{
            source:"surrend",
            value:2,
            type:"noless",
            ing:4
        },{
            source:"awareness",
            value:-5,
            type:"nolarger",
            ing:4
        }],
        checkSource:{
            //持续检测
            'ecstacy':{
                type:">",
                value:5
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.palam['ecstacy'][0]>=6
    })

    CharaTag.new("好意Lv1",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"好意Lv1",
        dot:[{          //效果描述
            source:"resist",
            value:-2,
            type:"nolarger",
            inf:2 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
            'favo':{
                type:">",
                value:3
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.palam['favo'][0]>=4
    })

    CharaTag.new("好意Lv2",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"好意Lv2",
        dot:[{          //效果描述
            source:"resist",
            value:-5,
            type:"nolarger",
            inf:2 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
            'favo':{
                type:">",
                value:5
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.palam['favo'][0]>=6
    })

    CharaTag.new("恐惧Lv1",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"恐惧Lv1",
        dot:[{          //效果描述
            source:"resist",
            value:-1,
            type:"nolarger",
            inf:3 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{ 
            source:"surrend",
            value:1,
            type:"noless",
            inf:3 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{ 
            source:"depress",
            value:1,
            type:"noless",
            inf:3 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
            'fear':{
                type:">",
                value:3
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.palam['fear'][0]>=4
    })

    CharaTag.new("恐惧Lv2",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"恐惧Lv2",
        dot:[{          //效果描述
            source:"resist",
            value:-5,
            type:"nolarger",
            inf:3 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{ 
            source:"surrend",
            value:5,
            type:"noless",
            inf:3 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{ 
            source:"depress",
            value:3,
            type:"noless",
            inf:4 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
            'fear':{
                type:">",
                value:5
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.palam['fear'][0]>=6
    })

    CharaTag.new("屈辱Lv1",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"屈辱Lv1",
        dot:[{          //效果描述
            source:"resist",
            value:2,
            type:"noless",
            inf:4 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"superior",
            value:-2,
            type:"permin",
            inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"surrend",
            value:3,
            type:"noless",
            inf:3 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
            'humiliate':{
                type:">",
                value:3
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.palam['humiliate'][0]>=4
    })

    CharaTag.new("屈辱Lv2",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"屈辱Lv2",
        dot:[{          //效果描述
            source:"resist",
            value:5,
            type:"noless",
            inf:6 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"superior",
            value:-4,
            type:"permin",
            inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"surrend",
            value:6,
            type:"noless",
            inf:5 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"stress",
            value:1,
            type:"permin",
            inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"depress",
            value:1,
            type:"permin",
            inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
            'humiliate':{
                type:">",
                value:5
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.palam['humiliate'][0]>=6
    })

    CharaTag.new("情欲Lv1",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"情欲Lv1",
        dot:[{          //效果描述
            source:"libido",
            value:2,
            type:"noless",
            inf:600 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"satisfy",
            value:-1,
            type:"permin",
            inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        }],
        checkSource:{
            //持续检测
            'lust':{
                type:">",
                value:3
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.palam['lust'][0]>=4
    })

    CharaTag.new("情欲Lv2",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"情欲Lv2",
        dot:[{          //效果描述
            source:"libido",
            value:4,
            type:"noless",
            inf:800 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"satisfy",
            value:-2,
            type:"permin",
            inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        }],
        checkSource:{
            //持续检测
            'lust':{
                type:">",
                value:5
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.palam['lust'][0]>=6
    })

    CharaTag.new("羞耻Lv1",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"羞耻Lv1",
        dot:[{          //效果描述
            source:"surrend",
            value:2,
            type:"noless",
            inf:4 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"resist",
            value:2,
            type:"noless",
            inf:4 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        }],
        checkSource:{
            //持续检测
            'mortify':{
                type:">",
                value:3
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.palam['mortify'][0]>=4
    })

    CharaTag.new("羞耻Lv2",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"羞耻Lv2",
        dot:[{          //效果描述
            source:"surrend",
            value:4,
            type:"noless",
            inf:6 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"resist",
            value:4,
            type:"noless",
            inf:6 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        }],
        checkSource:{
            //持续检测
            'mortify':{
                type:">",
                value:5
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.palam['mortify'][0]>=6
    })

    CharaTag.new("苦痛Lv1",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"苦痛Lv1",
        dot:[{          //效果描述
            source:"surrend",
            value:3,
            type:"noless",
            inf:4 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"resist",
            value:2,
            type:"noless",
            inf:4 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"depress",
            value:2,
            type:"noless",
            inf:3 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"fear",
            value:4,
            type:"noless",
            inf:4 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"san",
            value:-0.5,
            type:"permin",
            inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"stamina",
            value:-1,
            type:"permin",
            inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        }],
        checkSource:{
            //持续检测
            'pain':{
                type:">",
                value:3
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.palam['pain'][0]>=4
    })

    CharaTag.new("苦痛Lv2",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"苦痛Lv2",
        dot:[{          //效果描述
            source:"surrend",
            value:6,
            type:"noless",
            inf:6 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"resist",
            value:4,
            type:"noless",
            inf:6 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"depress",
            value:4,
            type:"noless",
            inf:6 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"fear",
            value:8,
            type:"noless",
            inf:6 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"san",
            value:-1,
            type:"permin",
            inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"stamina",
            value:-2,
            type:"permin",
            inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        }],
        checkSource:{
            //持续检测
            'pain':{
                type:">",
                value:5
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.palam['pain'][0]>=6
    })

    CharaTag.new("反感Lv1",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"反感Lv1",
        dot:[{          //效果描述
            source:"favo",
            value:-2,
            type:"permin",
            inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"surrend",
            value:-2,
            type:"permin",
            inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
            'resist':{
                type:">",
                value:3
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.palam['resist'][0]>=4
    })

    CharaTag.new("反感Lv2",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"反感Lv2",
        dot:[{          //效果描述
            source:"favo",
            value:-5,
            type:"permin",
            inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"surrend",
            value:-5,
            type:"permin",
            inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
            'resist':{
                type:">",
                value:5
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.palam['resist'][0]>=6
    })

    CharaTag.new("恭顺Lv1",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"恭顺Lv1",
        dot:[{          //效果描述
            source:"resist",
            value:-1,
            type:"permin",
            inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
            'deference':{
                type:">",
                value:3
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.palam['deference'][0]>=4
    })

    CharaTag.new("恭顺Lv2",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"恭顺Lv2",
        dot:[{          //效果描述
            source:"resist",
            value:-2,
            type:"permin",
            inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
            'deference':{
                type:">",
                value:5
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.palam['deference'][0]>=6
    })
    console.log('成功加载palamTag')
}

/**
 * MARK
 * scstacy，提高order，当lust低于某值时持续增长lust
    fear，提高order，当fear低于某值时持续增长fear
    humiliate,提高order，当superior高于某值时持续降低superior
    hypno，当hypno低于某值时持续增长hypno
    mortify, 提高order，降低superior最大值
    pain, 提高order，
    resist,降低order，当resist低于某值时持续增长resist
    surrend，提高order，当surrend低于某值时持续增长surrend
 */
let loadTags_mark = function(){
    CharaTag.new("快感刻印Lv1",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"快感刻印Lv1",
        dot:[{          //效果描述
            source:"lust",
            value:0.5,
            type:"noless",
            inf:2 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['ecstacy'].lv>=1
    })

    CharaTag.new("快感刻印Lv2",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"快感刻印Lv2",
        dot:[{          //效果描述
            source:"lust",
            value:1,
            type:"noless",
            inf:3 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['ecstacy'].lv>=2
    })

    CharaTag.new("快感刻印Lv3",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"快感刻印Lv3",
        dot:[{          //效果描述
            source:"lust",
            value:2,
            type:"noless",
            inf:4 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['ecstacy'].lv>=3
    })

    CharaTag.new("恐惧刻印Lv1",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"恐惧刻印Lv1",
        dot:[{          //效果描述
            source:"fear",
            value:0.5,
            type:"noless",
            inf:2 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['fear'].lv>=1
    })

    CharaTag.new("恐惧刻印Lv2",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"恐惧刻印Lv2",
        dot:[{          //效果描述
            source:"fear",
            value:1,
            type:"noless",
            inf:3 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['fear'].lv>=2
    })

    CharaTag.new("恐惧刻印Lv3",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"恐惧刻印Lv3",
        dot:[{          //效果描述
            source:"fear",
            value:2,
            type:"noless",
            inf:4 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['fear'].lv>=3
    })

    CharaTag.new("受辱刻印Lv1",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"受辱刻印Lv1",
        dot:[{          //效果描述
            source:"superior",
            value:-0.5,
            type:"nohigher",
            inf:4 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['humiliate'].lv>=1
    })

    CharaTag.new("受辱刻印Lv2",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"受辱刻印Lv2",
        dot:[{          //效果描述
            source:"superior",
            value:-1,
            type:"nohigher",
            inf:3 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['humiliate'].lv>=2
    })

    CharaTag.new("受辱刻印Lv3",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"受辱刻印Lv3",
        dot:[{          //效果描述
            source:"superior",
            value:-2,
            type:"nohigher",
            inf:2 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['humiliate'].lv>=3
    })

    CharaTag.new("催眠刻印Lv1",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"催眠刻印Lv1",
        dot:[{          //效果描述
            source:"hypno",
            value:0.5,
            type:"noless",
            inf:2 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['hypno'].lv>=1
    })

    CharaTag.new("催眠刻印Lv2",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"催眠刻印Lv2",
        dot:[{          //效果描述
            source:"hypno",
            value:1,
            type:"noless",
            inf:3 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['hypno'].lv>=2
    })

    CharaTag.new("催眠刻印Lv3",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"催眠刻印Lv3",
        dot:[{          //效果描述
            source:"hypno",
            value:2,
            type:"noless",
            inf:4 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['hypno'].lv>=3
    })

    CharaTag.new("羞耻刻印Lv1",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"羞耻刻印Lv1",
        dot:[],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['mortify'].lv>=1
    })

    CharaTag.new("羞耻刻印Lv2",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"羞耻刻印Lv2",
        dot:[],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['mortify'].lv>=2
    })

    CharaTag.new("羞耻刻印Lv3",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"羞耻刻印Lv3",
        dot:[],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['mortify'].lv>=3
    })

    CharaTag.new("苦痛刻印Lv1",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"苦痛刻印Lv1",
        dot:[],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['pain'].lv>=1
    })

    CharaTag.new("苦痛刻印Lv2",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"苦痛刻印Lv2",
        dot:[],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['pain'].lv>=2
    })

    CharaTag.new("苦痛刻印Lv3",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"苦痛刻印Lv3",
        dot:[],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['pain'].lv>=3
    })

    CharaTag.new("反发刻印Lv1",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"反发刻印Lv1",
        dot:[{          //效果描述
            source:"resist",
            value:0.5,
            type:"noless",
            inf:2 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['resist'].lv>=1
    })

    CharaTag.new("反发刻印Lv2",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"反发刻印Lv2",
        dot:[{          //效果描述
            source:"resist",
            value:1,
            type:"noless",
            inf:3 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['resist'].lv>=2
    })

    CharaTag.new("反发刻印Lv3",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"反发刻印Lv3",
        dot:[{          //效果描述
            source:"resist",
            value:2,
            type:"noless",
            inf:4 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['resist'].lv>=3
    })

    CharaTag.new("屈服刻印Lv1",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"屈服刻印Lv1",
        dot:[{          //效果描述
            source:"surrend",
            value:0.5,
            type:"noless",
            inf:2 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['surrend'].lv>=1
    })

    CharaTag.new("屈服刻印Lv2",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"屈服刻印Lv2",
        dot:[{          //效果描述
            source:"surrend",
            value:1,
            type:"noless",
            inf:3 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['surrend'].lv>=2
    })

    CharaTag.new("屈服刻印Lv3",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: false, //是否显示
        describe:"屈服刻印Lv3",
        dot:[{          //效果描述
            source:"surrend",
            value:2,
            type:"noless",
            inf:4 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.mark['surrend'].lv>=3
    })
    console.log('成功加载markTag')
}

/**
 * 状态派生
 * 如低意识导致的昏迷
 */
let loadTags_palam_state = function(){
    CharaTag.new("昏迷",{
        inf:{}, //额外信息
        type:['palam'], //持续检测类型
        visiable: true, //是否显示
        describe:"",
        dot:[{          //效果描述
            source:"awareness",
            value:10,
            type:"noless",
            inf:300 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
            'awareness':{
                type:"<",
                value:300
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.base['awareness'][0]<100
    })

    CharaTag.new("虚弱",{
        inf:{}, //额外信息
        type:['palam'], //持续检测类型
        visiable: true, //是否显示
        describe:"",
        dot:[{          //效果描述
            source:"stamina",
            value:-10,
            type:"nohigher",
            inf:500 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"stamina",
            value:-1,
            type:"nohigher",
            inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
            'health':{
                type:"<",
                value:300
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.base['health'][0]<200
    })

    CharaTag.new("发情",{
        inf:{}, //额外信息
        type:['palam'], //持续检测类型
        visiable: true, //是否显示
        describe:"",
        dot:[{          //效果描述
            source:"lust",
            value:10,
            type:"noless",
            inf:3 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
            'libido':{
                type:">",
                value:300
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.base['libido'][0]>600
    })

    CharaTag.new("心智破碎",{
        inf:{}, //额外信息
        type:['palam'], //持续检测类型
        visiable: true, //是否显示
        describe:"",
        dot:[{          //效果描述
            source:"fear",
            value:-10,
            type:"nohigher",
            inf:3 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"favo",
            value:-10,
            type:"nohigher",
            inf:3 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"humiliate",
            value:-10,
            type:"nohigher",
            inf:3 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"depress",
            value:-10,
            type:"nohigher",
            inf:5 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"deference",
            value:-5,
            type:"nohigher",
            inf:4 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"humiliate",
            value:-10,
            type:"nohigher",
            inf:3 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"mortify",
            value:-10,
            type:"nohigher",
            inf:3 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"resist",
            value:-10,
            type:"nohigher",
            inf:3 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"superior",
            value:-10,
            type:"nohigher",
            inf:3 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"surrend",
            value:-10,
            type:"nohigher",
            inf:3 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
            'sanity':{
                type:"<",
                value:400
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.base['sanity'][0]<100
    })

    CharaTag.new("力竭",{
        inf:{}, //额外信息
        type:['palam'], //持续检测类型
        visiable: true, //是否显示
        describe:"",
        dot:[{          //效果描述
            source:"health",
            value:-0.1,
            type:"nohigher",
            inf:500 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"awareness",
            value:-0.1,
            type:"nohigher",
            inf:300 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
            'stamina':{
                type:"<",
                value:100
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.base['stamina'][0]<50
    })

    CharaTag.new("紧张",{
        inf:{}, //额外信息
        type:['palam'], //持续检测类型
        visiable: true, //是否显示
        describe:"",
        dot:[{          //效果描述
            source:"sanity",
            value:-0.05,
            type:"nohigher",
            inf:300 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"sanity",
            value:-0.05,
            type:"nohigher",
            inf:100 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
            //持续检测
            'stress':{
                type:">",
                value:400
            }
        },
        derive:[],
    }).setTrigger((chara)=>{
        //自动触发判定
        return chara.base['stress'][0]>600
    })
    console.log('成功加载palam状态派生tag')
}

loadTags_basic()
loadTags_palam()
loadTags_mark()
loadTags_palam_state()