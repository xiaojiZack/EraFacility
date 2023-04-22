F.summonChara = function(){
    F.updateLocationChara()
    Com.updateScene()
}

F.updateLocationChara = function(){
    V.location.chara = [];
    for (const cid in C){
        const chara = C[cid]
        console.log(chara)
        if(chara.location.mapId == V.location.mapId 
            && chara.location.coord[0] == V.location.coord[0]
            && chara.location.coord[1] == V.location.coord[1])
            V.location.chara.push(cid)
    }
}

/**
 * 绕过指令系统，仅仅改变坐标位置
 * @param {*} mapId 
 * @param {*} coord 
 */
F.changeLocation = function(mapId,x,y){
    let loc = V.location;
    loc.mapId = mapId;
    loc.coord = [x,y];
    let board = Boards.getBoard(V.location.mapId);
    V.location.spotid = board[x][y];
    V.location.printname = worldMap[V.location.mapId][V.location.spotid].name;
    return ""
}
DefineMacros("changeLoc", F.changeLocation)