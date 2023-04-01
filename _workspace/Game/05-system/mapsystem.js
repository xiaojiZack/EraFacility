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