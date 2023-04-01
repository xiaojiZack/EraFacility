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
        return 0;
    });

//移动类指令统一生成
createMoveComs();
createJumpMoveComs();
