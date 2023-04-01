F.Get_Msg_Map_neighbor = function(){
    if (V.location.spotid !== "road") return ""; //仅在道路上显示周边建筑

    let direction = {"N":"北","S":"南","E":"东","W":"西"};
    let local = V.location.coord;
    let mapsize = worldMap[V.location.mapId].mapsize;
    let board = Boards.getBoard(V.location.mapId);
    T.neighborCoor = []; 
    T.neighbordir = [];
    for (let dir in direction){
        let txt = "";
        let newPoi = clone(local);
        switch(dir){
            case("N"):newPoi[0]--;break;
            case("E"):newPoi[1]++;break;
            case("S"):newPoi[0]++;break;
            case("W"):newPoi[1]--;break;
        }
        if (newPoi[0]<0 || newPoi[1]<0 
            || newPoi>=mapsize.x || newPoi>=mapsize.y)
            continue;
        let spotid = board[newPoi[0]][newPoi[1]];
        if (["road",".",""].includes(spotid)) continue; //部分建筑不检查
        let spotname = worldMap[V.location.mapId][spotid].name;
        let title = `Msg_Spots_${V.location.mapId}_${spotid}_preview`
        if (Story.has(title)) {
            T.neighborCoor.push(newPoi);
            T.neighbordir.push(direction[dir]);
			txt += Story.get(title).text;
		}
        else{
            txt += `${direction[dir]}边是${spotname}。`;
        }
        
        setTimeout(() => {
            P.flow(txt, 30, 0);
        }, 100);
    }
    
}