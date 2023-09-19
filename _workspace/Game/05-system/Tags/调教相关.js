/**
 * 存放由调教指令及调教装备引起的一些状态
 * 
 */

/**
 * （被）插入类状态，记录是否有插入，inf记录插入物来源
 */
let LoadTags_insert = function(){
    CharaTag.new("V被插入",{
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
    CharaTag.new("A被插入",{
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
    CharaTag.new("M被插入",{
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
    CharaTag.new("B被插入",{
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
    CharaTag.new("U被插入",{
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
    CharaTag.new("W被插入",{
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
    CharaTag.new("P插入",{
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
    CharaTag.new("触手插入",{
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
    console.log('成功加载插入tag')
}

/**
 * 占用相关，记录部位是否有占用，inf记录占用的指令
 */
let LoadTags_occupy = function(){
    CharaTag.new("手占用",{
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
    CharaTag.new("口占用",{
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
    CharaTag.new("胸占用",{
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
    CharaTag.new("V占用",{
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
    CharaTag.new("A占用",{
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
    CharaTag.new("脚占用",{
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
    CharaTag.new("C占用",{
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
    console.log('成功加载占用tag')
}
/**
 * 装具相关，记录装备的使用情况，同时提供dot
 */

/**
 * 异常状态，露出、妊娠、拘束、锁定、快去了
 */

/**
 * 高潮相关
 */
let LoadTags_orgasm = function(){
    CharaTag.new("V绝顶",{
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
    CharaTag.new("A绝顶",{
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
    CharaTag.new("M绝顶",{
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
    CharaTag.new("B绝顶",{
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
    CharaTag.new("C绝顶",{
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
    CharaTag.new("W绝顶",{
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
    CharaTag.new("U绝顶",{
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

    CharaTag.new("绝顶",{
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
    console.log('成功加载绝顶tag')
}

/**
 * 指令效果，对于持续性指令效果，仅提供dot
 */
let LoadTags_comdot = function(){
    CharaTag.new("插入测试",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"指令【插入测试】的dot测试",
        dot:[{          //效果描述
            source:"resist",
            value:100,
            type:"noless",
            inf:2 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"V",
            value:1,
            type:"",
            inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
        },
        derive:[],
    }).setTrigger((chara)=>{

    })
    CharaTag.new("插入测试(主)",{
        inf:{}, //额外信息
        type:['keep'], //持续检测类型
        visiable: true, //是否显示
        describe:"指令【插入测试】的dot测试",
        dot:[{          //效果描述
            source:"resist",
            value:100,
            type:"noless",
            inf:2 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },{          //效果描述
            source:"P",
            value:1,
            type:"",
            inf:0 //对于如noless之类的type，此处inf用于辅助信息，判断等级
        },],
        checkSource:{
        },
        derive:[],
    }).setTrigger((chara)=>{

    })

    console.log('成功加载指令tag')
}

/**
 * 魔法、淫纹相关
 */



LoadTags_insert()
LoadTags_occupy()
LoadTags_orgasm()
LoadTags_comdot()