
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
    derive:"",
}).setTrigger((chara)=>{
    //自动触发判定
    return false
})

CharaTag.new("自然消退",{
    inf:{},
    type:['keep'], //持续检测类型
    visiable: true, //是否显示
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
