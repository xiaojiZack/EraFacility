/**
 * 行为相关tag，一般用于限制人物的行动
 * 比如与主人公交互时，高好感或者特定情况下暂时取消日程表
 */

/**
 * 特殊tag，当被绑缚、插入、昏迷、高快感、高痛苦时自动触发
 * 可由其他指令及状态触发
 * 带有此tag时，取消移动相关指令，取消跟随
 */
CharaTag.new("不可移动",{
    inf:{}, //额外信息
    type:['keep'], //持续检测类型
    visiable: false, //是否显示
    describe:"",
    dot:[],
    checkSource:{
    },
    derive:[],
}).setTrigger((chara)=>{
    let flag = false;
    flag = (chara.palam['ecstacy'][0]>=5) || flag;
    flag = (chara.palam['pain'][0]>=5) || flag;
    flag = (chara.tags.has('昏迷')) || flag;
    flag = (chara.tags.has('睡觉中')) || flag;
    return flag;
})

/**
 * 特殊tag,通过特别命令让人物跟随玩家
 * 目前仅能通过指令触发和取消
 */

CharaTag.new("跟随",{
    inf:{}, //额外信息
    type:['keep'], //持续检测类型
    visiable: false, //是否显示
    describe:"",
    dot:[],
    checkSource:{
    },
    derive:["暂停日程"],
}).setTrigger((chara)=>{

})

/**
 * 特殊tag，暂时取消日程表的执行
 * 仅能通过其他tag伴生
 */
CharaTag.new("暂停日程",{
    inf:{}, //额外信息
    type:['keep'], //持续检测类型
    visiable: false, //是否显示
    describe:"",
    dot:[],
    checkSource:{
    },
    derive:[],
})


/**
 * TODO
 * 场地相关，在不带有“私密”特征地块及有他人目击情况下
 * 给予“公开”tag，用于公开露出、公开性爱、目击性事等。
 * 需要完善场地系统
 * 仅通过自身触发
 */

CharaTag.new("公开",{
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