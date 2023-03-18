function createMoveComs(){
    let cn_dict = {'N':"北","S":"南","E":"东","W":"西"};
    for (let dir of ['N','E','S','W']){
        let newCom = Com.new("system",{
            id:"0-move-"+dir,
            name:`向${cn_dict[dir]}移动`,
            tags:[],
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
            if (V.currentFilter == "常规" || V.currentFilter == "all") return true;
            return false
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
    console.log(newlocation,map.mapsize);
    if (newlocation[0]<0 || newlocation[0]>=map.mapsize.x
        || newlocation[1]<0 || newlocation[1]>=map.mapsize.y){
        T.reason = "到达地图边界"; return false; 
    }
    let loc1 = {x:V.location.coord[0],y:V.location.coord[1]};
    let loc2 = {x:newlocation[0],y:newlocation[1]};
    if(F.isConnected(loc1, loc2,Boards.getBoard(V.location.mapId)) == false)
        {T.reason = "无法到达"; return false;}
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
    Com.updateMovement();
}

function updateLocation(){
    let map = worldMap[V.location.mapId], coord = V.location.coord;
    let board = Boards.getBoard(V.location.mapId);
    V.location.spotid = board[coord[0]][coord[1]];
    V.location.printname = worldMap[V.location.mapId][V.location.spotid].name;
    refrashSideBarMap();
}

function refrashSideBarMap(){
    if (document.getElementById("sidebarMap"))
        new Wikifier(null, `<<replace #sidebarMap>> <<sidebarMap>><</replace>>`);
    //$("#siderbarMap").remove();
}