const { threadId } = require("worker_threads");

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

F.sidebarBaseBar = function(){
    if (V.tc != "") V.showChara = C[V.tc]
    else V.showChara = C[V.pc]
    T.printText = [];
    for(let i in D.basekey){
        let key = D.basekey[i];
        let color = F.RGBdec2hex(D.basecolor[key][0],D.basecolor[key][1],D.basecolor[key][2]);
        let cnname = D.basicNeeds[key]?D.basicNeeds[key][0]:D.basicPalam[key][0];
        if (V.showChara.base[key][0]){
            T.printText.push(
                `<div {line-height:6px; }><div class="sidebarBaseDescribe">${cnname}:<<sidebarBaseDescribe "${key}">></div>`+
                `<div class="sidBarBaseBar">
                <<=F.Progressbar({
                    id:'sidebarbaseprogress${key}',
                    value:${V.showChara.base[key][0]},
                    max:${V.showChara.base[key][1]},
                    color:'${color}',
                    backColor:"#333",
                    width:"150px",
                    height:"2px"
                    })>>`+
                `</div></div>`
            )
        }
            
    }
}

F.sideBarGeneralPalam = function(group){
    T.printText = [];
    const palam = V.showChara.palam
    for (let key of group){
        if (!palam[key][0]==0){
            let choose
            D.palamDescribe[key].forEach((tmp)=>{
                if (tmp[0]<= palam[key][0]){
                    choose = tmp
                }
            })
            let sentence = choose[1].replace("tc",V.showChara.name);
            T.printText.push(`<span class="sidebarPalamDescribe">`+ sentence +`</span>`)
        }
    }
}

F.sideBarEquipDescribe = function(){
    T.tags = [`<div class="sidebarEquipDescribe">`];
    let chara = V.showChara;
    Object.keys(chara.reveals.clothSumUp).forEach((layer)=>{
        let equip = chara.equip[layer];
        if (chara.reveals.clothSumUp[layer].expose>1){
            T.tags.push("["+equip.name[0]+"]");
        }
        else if(chara.reveals.clothSumUp[layer].expose==1){
            T.tags.push("["+equip.name[0]+"(隐约)]")
        }
    })
    if (T.tags.length==0) T.tags.push("全裸");
    let banTags = ["no pangci", "no bra", "see pangci", "see bra"];
    Object.keys(chara.reveals.tags).forEach((key)=>{
        if(!banTags.includes(key) && chara.reveals.tags[key]>1)
            T.tags.push("["+D.revealsTags[key]+"]");
        else if (!banTags.includes(key) && chara.reveals.tags[key]==1)
            T.tags.push("["+D.revealsTags[key]+'(隐约)]');
    })
    T.tags.push(`</div>`)
}

F.sidebarLiquidDescribe = function(){
    T.printText = [`<div class="sidebarLiquidDescribe">`];
    let cLiquid = V.showChara.liquid;
    for (let place in cLiquid){
        let placename = D.bodyDict[place];
        let liquids = cLiquid[place];
        let max2Lq = [["",0],["",0]];//最多的两种液体
        for (let lq in liquids){
            if (lq == "total") continue;
            if (liquids[lq]>max2Lq[0][1]) max2Lq[0]=[lq,liquids[lq]];
            else if (liquids[lq]>max2Lq[1][1]) max2Lq[1]=[lq,liquids[lq]];
        }
        let lqWord = max2Lq[0][0]+max2Lq==""?"":"和"+max2Lq[1][0];
        let count = 0;let total = liquids.total;
        let sentence ="";
        if (total==0) sentence = "";//sentence = D.liquidDescribe[place][0][1];
        else{
            while(count < D.liquidDescribe[place].length && D.liquidDescribe[place][count][0]<total)
                count +=1;
            sentence = D.liquidDescribe[place][count][0][1];
        }

        sentence = sentence.replace("tc",V.showChara.name);
        sentence = sentence.replace("lq",lqWord);
        T.printText.push(sentence)
    }
    T.printText.push(`</div>`);

}

F.sidebarTag = function(){
    T.printText = [`<div class="sidebarTag">`];
    let tags = V.showChara.tags.data;
    tags.forEach((tag)=>{
        if (tag.visiable){
            let sentence = '['+tag.name+']'
            T.printText.push(sentence)
        }
    })
    T.printText.push('</div>');
}

F.refrashSideBarTime = function(){
    if (document.getElementById("sideBarShowTime"))
        new Wikifier(null, `<<replace #sideBarShowTime>> <<sideBarShowTime>><</replace>>`);
}

F.refrashSideBarMoney=function(){
    if (document.getElementById("sideBarShowMoney"))
        new Wikifier(null, `<<replace #sideBarShowMoney>> <<sideBarShowMoney>><</replace>>`);
}

F.refrashSideBarChara=function(){
    if (document.getElementById("sidebarShowChara"))
        new Wikifier(null, `<<replace #sidebarShowChara>> <<sidebarShowChara>><</replace>>`);
}

F.refrashSideBarMap=function(){
    if (document.getElementById("sidebarMap"))
        new Wikifier(null, `<<replace #sidebarMap>> <<sidebarMap>><</replace>>`);
}

F.refrashSideBar = function(){
    F.refrashSideBarChara();
    F.refrashSideBarTime();
    F.refrashSideBarMoney();
    F.refrashSideBarMap();
}