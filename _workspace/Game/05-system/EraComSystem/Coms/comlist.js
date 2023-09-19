//指令的初始化

Com.new("system",{
    id:"debug",
    name:"com测试",
    tags:["debug"],
    time:5,
}).Filter(
    function(){
        if (V.currentFilter == "常规" && Config.debug) return true;
        return false
    })
    .Effect(
        function(){
            if (V.system.debug) setMsg()
        }
    )
    .Check(
        function(){
            return true;
        }
    )
    .Order(function(){
        return 0; //一般不写此函数，由ComOrder计算
    })
    //.Tags
    //.AlterName
    //.ForceAble()

Com.new("wait10",{
    id:"wait10",
    name:"持续10分钟",
    tags:[],
    time:10,
}).Filter(
    ()=>{return true}
).Effect(()=>{})

Com.new("askFollow",{
    id:"askFollow",
    name:"命令跟随",
    tags:[],
    time:0,
}).Filter(
    ()=>{
    if (V.tc !== ""){
        if (V.target.tags.has('跟随')){
            return false
        }
        if (V.target.todo != ""){
            return false
        }
        return true
    }
    return false
}
).Effect(()=>{
    if (V.tc !== ""){
        V.target.tags.add('跟随',V.target);
        V.target.todo = "follow";
    }
})

Com.new("offFollow",{
    id:"offFollow",
    name:"取消跟随",
    tags:[],
    time:0,
}).Filter(
    ()=>{
        if (V.tc !== ""){
            if (V.target.tags.has('跟随')){
                return true
            }
        }
        return false
    }
).Effect(()=>{
    V.target.tags.del('跟随',V.target);
    V.target.todo = "";
})
//移动类指令统一生成
createMoveComs();
createJumpMoveComs();

let loadCom_test = function(){
    Com.new("test_insect",{
        id:"test_insect",
        name:"插入测试",
        tags:['性行为','V破处','V插入','V','精液','V内射', '妊娠可能'],
        time:5,
    }).Filter(
        ()=>{
            if (V.target == null || V.target.body == null) return false
            if(V.target.body['vagina']){
                return true
            }
            return false
        }
    ).Effect(()=>{
        let extraTags = CheckInsert(V.target, V.player, 'V');

        let t = V.target;
        let p = V.player;
        let s = V.target.source;

        addVInsertTags(t,p,"test_insect")

        t.tags.add('插入测试', t);
        p.tags.add('插入测试(主)', t);

    }).Check(()=>{
        //插入前检测，如润滑、尺寸
        if (V.tags.has('V占用')){
            T.reason = "目标tag: V占用"
            return false
        }
        return true
    })

    console.log('测试com加载完成');
}


let loadCom_daily = function(){
    Com.new("chat",{
        id:"chat",
        name:"聊天",
        tags:[],
        time:5,
    }).Filter(
        ()=>{
            if (V.tc !== ""){
                if (V.target.tags.has('口占用') || V.player.tags.has('口占用')){
                    return false
                }
                else if (V.target.tags.has('昏迷')){
                    return false
                }
                return true
            }
            return false
        }
    ).Effect(()=>{
        let s = V.target.source;
        s.favo += 50;
    }).Order(()=>{
        return 0
    })

    console.log('日常com加载完成');
}


loadCom_daily()
loadCom_test()