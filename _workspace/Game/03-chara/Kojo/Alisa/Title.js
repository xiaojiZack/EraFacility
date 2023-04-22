/*
Alisa
*/

let actions = [], events=[], preset=[]

let kojoCard = {
    charaname: "Alisa",
    color: "blue", //口上颜色
    intro: `学园长Alisa,作者硝基`,
    home: `academyLevel_office`,
    relation: [],
    sleeptime: 22,
    wakeuptime: 8,
    //日程表:动作,地点,日期,开始时间,结束时间,持续时间,几率
    scheduler: [
        ["Act_game","home","all",8,22,14,100],
        ["sleep","home","all",22,8,10,100]
    ],
    //服装设置
    preset: preset,
    //事件设置
    events: events,
    //动作设置
    action: actions,
    filter: ()=>{
        return 1;
    },
    callname:[
        ["player","你"]
    ],
    update:()=>{}
}

/**
 * Action 设定
 */
kojoCard.actions = [
    {
        id:"game",
        name:"打游戏",
        type:"Interact",
        tags:["alone"],
        placement:"academyLevel_office",
        setting:["kojo"],
        actPart:["hands"],
        targetPart:["None"],
        effect:()=>{
            let chara = C['Alisa'];
            if (chara.mood<50) chara.mood = 50;
        }
    }
]

/**
 * Event 设定
 */

kojoCard.events = [
    {
        id:"testEvent",
        title:"Alisa_Event_Test",
        config:[],
        cond:()=>{return true},
        branch:[],
        branchCond:()=>{}
    }
]

/**
 * preset 设定
 */
kojoCard.preset = [
    [
        ["home",[
            ["head","耳机"],
            ["outfitUp","衬衫(敞开)"],
            ["innerUp","普通胸罩"],
            ["innerBt","三角内裤"],
            ["feet","毛绒拖鞋"]
        ]],
        ["sleep",[
            ["innerBt","三角内裤"],
        ]]
    ]
]

/**
 * update 设定
 */
kojoCard.update= function(){
    let chara = C[kojoCard.charaname];
    if (chara.flag.changeEquip){
        kojoCard.preset=chara.flag.changeEquip;
    }
}
KojoInstall(kojoCard)
