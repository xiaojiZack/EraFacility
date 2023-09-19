function createMoveComs(){
    let cn_dict = {'N':"北","S":"南","E":"东","W":"西"};
    for (let dir of ['N','E','S','W']){
        let newCom = Com.new("system",{
            id:"0-move-"+dir,
            name:`向${cn_dict[dir]}移动`,
            tags:['Alone'],
            time:5,
        });
        newCom.Set(
            "dir",dir
        );
        newCom.Effect(()=>{
            return moveComEffect(newCom.dir);
        }).Check(()=>{
            return moveComCheck(newCom.dir);
        }).Filter(()=>{
            if (V.moveable == false) return false
            return !!(V.currentFilter == "常规" || V.currentFilter == "all");
        })
    }
    
}

function moveComCheck(dir){
    let newlocation = clone(V.location.coord);
    switch(dir){
        case("N"):newlocation[0] = newlocation[0]-1;break;
        case("E"):newlocation[1] = newlocation[1]+1;break;
        case("S"):newlocation[0] = newlocation[0]+1;break;
        case("W"):newlocation[1] = newlocation[1]-1;break;
    }
    
    let map = worldMap[V.location.mapId];
    if (newlocation[0]<0 || newlocation[0]>=map.mapsize.x
        || newlocation[1]<0 || newlocation[1]>=map.mapsize.y){
        T.reason = "到达地图边界"; return false; 
    }
    let loc1 = {x:V.location.coord[0],y:V.location.coord[1]};
    let loc2 = {x:newlocation[0],y:newlocation[1]};
    if(F.isConnected(loc1, loc2,Boards.getBoard(V.location.mapId)) == false)
        {T.reason = "无法到达"; return false;}
    let spotid = Boards.getBoard(V.location.mapId)[newlocation[0]][newlocation[1]];
    if (map[spotid].locked)
        {T.reason = "地点上锁"; return false;}
    else if (map[spotid].inOpenHour() == false)
        {T.reason = "不在开放时间"; return false;}
    return true;
}

function moveComEffect(dir){
    switch(dir){
        case("N"):V.location.coord[0] = V.location.coord[0]-1;break;
        case("E"):V.location.coord[1] = V.location.coord[1]+1;break;
        case("S"):V.location.coord[0] = V.location.coord[0]+1;break;
        case("W"):V.location.coord[1] = V.location.coord[1]-1;break;
    }
    updateLocation();
    NPCFollowMove(V.location.mapId,V.location.coord)
    Com.updateMovement();
}

function updateLocation(){
    let map = worldMap[V.location.mapId], coord = V.location.coord;
    let board = Boards.getBoard(V.location.mapId);
    V.location.spotid = board[coord[0]][coord[1]];
    V.location.printname = worldMap[V.location.mapId][V.location.spotid].name;
    F.refrashSideBar();
}




function createJumpMoveComs(){
    //非网格跳转移动指令
    let newCom = Com.new("system",{
        id:"0-move-jump",
        name:`跳转移动`,
        tags:[],
        time:0,
    });
    newCom.Effect(()=>{
        V.location.mapId = T.jumpMove.mapId;
        V.location.coord = T.jumpMove.coord;
        T.jumpMove.allowjump = false;
        updateLocation();
        NPCFollowMove(V.location.mapId,V.location.coord)
        Com.updateMovement();
    }).Check(()=>{
        console.log(T.jumpMove);
        return T.jumpMove.allowjump;
    }).Filter(()=>{
        //不可用一般方式调用
        return false
    })
    
}

function NPCFollowMove(mapid, coor){
    Object.keys(V.chara).forEach((cid)=>{
        let chara = V.chara[cid];
        if (chara.tags.has('跟随') && cid !== "player"){
            chara.location.mapId = mapid;
            Object.assign(chara.location.coord,coor)
            F.NPC2NewPalace(chara,mapid,coor);
        }
    })

}


///插入系指令快速函数
function addVInsertTags(target, player, comid){
    let t = target;
    let p = player;
    t.tags.add('V占用', t, {'inf':{'source':p.cid, 'com':comid}});
    p.tags.add('C占用', p, {'inf':{'source':t.cid, 'com':comid}});
    p.tags.add('P插入', p, {'inf':{'source':t.cid, 'com':comid}});
    t.tags.add('V被插入', t, {'inf':{'source':p.cid, 'com':comid}});
}

function addAInsertTags(target, player, comid){
    let t = target;
    let p = player;
    t.tags.add('A占用', t, {'inf':{'source':p.cid, 'com':comid}});
    p.tags.add('C占用', p, {'inf':{'source':t.cid, 'com':comid}});
    p.tags.add('P插入', p, {'inf':{'source':t.cid, 'com':comid}});
    t.tags.add('A被插入', t, {'inf':{'source':p.cid, 'com':comid}});
}

