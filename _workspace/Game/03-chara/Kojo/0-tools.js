function KojoInstall(obj){
    const {
        charaname,
        color,
        intro,
        sleeptime,
        wakeuptime,
        home,
        present = [],
        action = [],
        relation = [],
        events = [],
        filter = ()=>{return 1},
        update = ()=>{},
        callname = []
    } = obj;
    let newKojo = Kojo.set(charaname,color)
    .Intro(intro)
    .SleepTime(sleeptime)
    .WakeupTime(wakeuptime)
    .Home(home);
    for (let Sets of present){
        newKojo.Preset(Sets[0],Sets[1]);
    }
    for (let entrys of relation){
        newKojo.Relation(entrys[0],entrys[1],entrys[2]);
    }
    for (let entrys of action){
        newKojo.Action(entrys);
    }
    for (let entrys of events){
        newKojo.Event(entrys);
    }
    newKojo.Filter=filter;
    newKojo.update = update;
    for (let entrys of callname){
        newKojo.CallName(entrys);
    }
    return newKojo
}

/**
 * 
 * @param {*} Kojo Kojo类对象
 * @description
 *  返回对应Kojo中对玩家的称呼
 * @example
 *  <<callyou>>
 */
F.callPlayer = function(){
    let Kojo = T.RuningKojo
    return Kojo.Callname['player']?Kojo.Callname['player']:"你";
}
DefineMacros("callyou", F.callPlayer);