F.showIpadCharalist = function(){
    T.printText = [];
    console.log(C)
    Object.keys(C).forEach((cid)=>{
        let temptext = "";
        let chara = C[cid];
        temptext += `<div class="IpadCharaButton"><<button '${chara.name}'>><<set T.showChara = C['${chara.cid}']>>
            <<replace #customOverlayContent>><<showChara>><</replace>>
            <</button>></div>`
        console.log(chara);
        for(let i in D.basekey){
            let key = D.basekey[i];
            let cnname = D.basicNeeds[key]?D.basicNeeds[key][0]:D.basicPalam[key][0];
            let color = F.RGBdec2hex(D.basecolor[key][0],D.basecolor[key][1],D.basecolor[key][2]);
            temptext += `
            ${cnname}:
            <<=F.Progressbar({
                id:'baseprogress${key}',
                value:${chara.base[key][0]},
                max:${chara.base[key][1]},
                color:'${color}',
                backColor:"#333",
                width:"30px",
                height:"5px"
                })>>`
        }
        T.printText.push(temptext);
    })
}