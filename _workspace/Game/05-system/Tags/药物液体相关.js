/**
 * 记录体内液体注入排出相关，药物效果，存储状态相关
*/

/**
 * 注入和排出标记，仅记录此动作是否发生，具体液体业务由其他函数完成
 */
CharaTag.new("射精",{
    inf:{}, //额外信息
    type:['keep'], //持续检测类型
    visiable: false, //是否显示
    describe:"",
    dot:[],
    checkSource:{
    },
    derive:[],
}).setTrigger((chara)=>{

})
CharaTag.new("排泄",{
    inf:{}, //额外信息
    type:['keep'], //持续检测类型
    visiable: false, //是否显示
    describe:"",
    dot:[],
    checkSource:{
    },
    derive:[],
}).setTrigger((chara)=>{

})
CharaTag.new("喷乳",{
    inf:{}, //额外信息
    type:['keep'], //持续检测类型
    visiable: false, //是否显示
    describe:"",
    dot:[],
    checkSource:{
    },
    derive:[],
}).setTrigger((chara)=>{

})
CharaTag.new("肠内灌注",{
    inf:{}, //额外信息
    type:['keep'], //持续检测类型
    visiable: false, //是否显示
    describe:"",
    dot:[],
    checkSource:{
    },
    derive:[],
}).setTrigger((chara)=>{

})
CharaTag.new("血液注射",{
    inf:{}, //额外信息
    type:['keep'], //持续检测类型
    visiable: false, //是否显示
    describe:"",
    dot:[],
    checkSource:{
    },
    derive:[],
}).setTrigger((chara)=>{

})
CharaTag.new("口腔灌注",{
    inf:{}, //额外信息
    type:['keep'], //持续检测类型
    visiable: false, //是否显示
    describe:"",
    dot:[],
    checkSource:{
    },
    derive:[],
}).setTrigger((chara)=>{

})
CharaTag.new("腔内灌注",{
    inf:{}, //额外信息
    type:['keep'], //持续检测类型
    visiable: false, //是否显示
    describe:"",
    dot:[],
    checkSource:{
    },
    derive:[],
}).setTrigger((chara)=>{

})
CharaTag.new("部位注射",{
    inf:{}, //额外信息
    type:['keep'], //持续检测类型
    visiable: false, //是否显示
    describe:"",
    dot:[],
    checkSource:{
    },
    derive:[],
}).setTrigger((chara)=>{

})

/**
 * 药物效果，提供dot，由其他函数触发
 */


/**
 * 储存液体带来的一些异常状态，如储液满足、过胀等
 */


/**
 * 成瘾相关条目，提供dot
 */