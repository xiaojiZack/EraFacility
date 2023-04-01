F.sidebarMap = function() {
    let mapId = V.location.mapId;
    let board = Boards.getBoard(mapId);
    let coord = V.location.coord;
    let showSize = 2;
    let top = Math.max(0,coord[0]-showSize);
    let left = Math.max(0,coord[1]-showSize);
    let right = Math.min(board[1].length-1, coord[1]+showSize);
    let bottom = Math.min(board.length-1, coord[0]+showSize);
    T.printText = [];
    
    for (let x = top;x<=bottom;x++){
        for (let y=left;y<=right;y++){
            let ctx = ".";
            if (board[x][y] !== '.' && board[x][y] !== ''){
                let spot = worldMap[mapId][board[x][y]];
                ctx = spot.name;
            }
            
            let cellclass = ctx !== "." ? " fillcell" : "";
            if (coord[0] == x && coord[1] == y) cellclass = " localcell"
            T.printText.push(
				`<div class='sidebarmapcell${cellclass}' data-row='${x}' data-col='${y}'>${ctx}</div>`
			);
        }
        T.printText.push("<br>");
    } 
}