F.initSCTrait = function(){
    const TransTrait = [];
    for (let i in V.showChara.traits){
        let trait = Trait.set("trait",V.showChara.traits[i]);
        const groupname = D.TraitGroup[trait.group];
        if (TransTrait[groupname]) {TransTrait[groupname].push(trait.name[0])}
        else {TransTrait[groupname] = [trait.name[0]]};
    }
    console.log(TransTrait) 
    
    let order = ["性格","堕落","体质","心智","SM倾向","行为模式","其他"];
    T.printText = [];
    
    for (let i in order){
        let key = order[i];
        if (TransTrait[key]){
            let text = ((V.showChara.flag.showTrait || V.showChara.cid == "player" || key=="性格")?`<div>`:'<div class="blur">')+
            `${key}:`;
            for (let T in TransTrait[key]){
                let Tname = TransTrait[key][T];
                text= text+`[${Tname}]`;
            }
            T.printText.push(text+'</div>');
        }
    }
}

F.initSCBaseBar = function(){
    T.printText = [];
    for(let i in D.basekey){
        let key = D.basekey[i];
        let cnname = D.basicNeeds[key]?D.basicNeeds[key][0]:D.basicPalam[key][0];
        let color = F.RGBdec2hex(D.basecolor[key][0],D.basecolor[key][1],D.basecolor[key][2]);
        T.printText.push(
            `<div class="SCBaseBar">
            ${cnname}:
            <<=F.Progressbar({
                id:'baseprogress${key}',
                value:${V.showChara.base[key][0]},
                max:${V.showChara.base[key][1]},
                color:'${color}',
                backColor:"#333",
                width:"130px",
                height:"10px"
                })>>`+
            ((Config.debug && V.showChara.cid !== "player")?`${V.showChara.base[key][0]}/${V.showChara.base[key][1]}`:``)+
            `</div>`
        )
    }
}

F.initSCExp = function(){
    T.printText = [];
    for (let i in D.exp){
        let expname = (V.showChara.exp[i].aware?D.exp[i][0]:'??')+"经验";
        T.printText.push(
            `<div>`
            +`${expname}:${(V.showChara.exp[i].aware?V.showChara.exp[i].aware:0)}`
            +`</div>`
        )
    }
}

F.initSCSbl = function(){
    T.printText = [];
    for (let i in V.showChara.sbl){
        T.printText.push(
            ((V.showChara.flag.showSbl || V.showChara.cid == "player")?`<div>`: `<div class = "blur">`)
            +`${D.sbl[i][0]}:Lv.${V.showChara.sbl[i]}`
            +`</div>`
        )
    }
}

F.SCchangeDiv = function(pagename){
    const allpages = ['SCbox1','SCbox2','SCbox3','SCbox4'];
    const allbutton = ['Divbutton1','Divbutton2','Divbutton3','Divbutton4']
    for (let i of allpages){
        var hidepage = document.getElementById(i);
        hidepage.style.display = "none";
    }
    var page = document.getElementById("SCbox"+pagename);
    page.style.display = "grid";
    for (let i of allbutton){
        var unselectB = document.getElementById(i);
        unselectB.style.color = "#fff";
    }
    var button = document.getElementById("Divbutton"+pagename);
    button.style.color="darkmagenta";
}

F.initSCBody = function(){
    const c = V.showChara;
    const sexorgan = D.sexorgan;
    T.printText = [];
    for (let o of sexorgan){
        let oname = D.bodyDict[o];
        if (c.body[o]){
            let organ = c.body[o];
            let DepthWord ="深度";
            if (o=="penis") DepthWord="长度"
            let text = `<div class='SCOrgan'>`
            +`<div class='SCOrganName'>${o}</div>`
            +(organ.sens>=0?`<div class='SCOption'>感度:Lv${organ.sens}</div>`:``)
            +(organ.size?
                (`<div class='SCOption'>`+(organ.size.length==2?`直径:${organ.size[0]}mm`:`直径:${organ.size}mm`)
                +(organ.size[1]>=0?`,${DepthWord}:${organ.size[1]}mm`:``)+'</div>')
                :``
             )
            +(o=="breasts"?`<div class='SCOption'>${D.breastSize[organ.sizeLv][0]}</div>`:``)
            +(o=="penis"?`<div class='SCOption'>${D.penisSize[organ.sizeLv][0]}</div>`:``)
            +(organ.vessel?`<div class='SCOrganVessel'>腔内液量: `
            +`<<=F.Progressbar({
                id:'baseprogress${o}',
                value:${organ.vessel.current},
                max:${organ.vessel.capacity},
                color:"#fff",
                backColor:"#333",
                width:"200px",
                height:"20px"
                })>> 
                ${organ.vessel.current}ml
                </div>`:``)
            +`</div>`;
            T.printText.push(text);
        }
    }
}

F.initSCVirginity = function(){
    const virginity = V.showChara.virginity;
    T.printText = [];
    for (let key in virginity){
        let record = virginity[key];
        if (record.length==0) continue;
        T.printText.push(
            `${D.VirginityDict[key]}:${record[2]}被${record[0]}夺走了。[${record[1]}]`
        )
    }
    if (T.printText.length == 0) T.printText.push('还没有任何初体验')
}

F.initSCEquip = function(){
    T.printText = [];
    const equip = V.showChara.equip;
    for (let equipStyle in D.equipSlot){
        let text = D.equipSlot[equipStyle]+":"
        if (equipStyle == "bottom"){ //插件额外处理 TODO

        }
        else{
            if (Object.keys(equip[equipStyle]).length == 0){
                text = text+"无";
            }
            else{
                text = text + `${equip[equipStyle].name[0]}`;
            }
        }
        T.printText.push(text)
    }
}

F.initVagueEquipDescribe = function(){
    T.printText = [];
    const equip = V.showChara.equip;
    const reveals = V.showChara.reveals;
    
    const clothcover = [
        "cover","head","face","ears","hands","neck","outfitUp","outfitBt","feet","innerUp","legs","innerBt","chest","bottom"
    ]
    //衣物的可见性组合
    const revealsDetail = {};
    clothcover.forEach((layer)=>{
        for (const key of Object.keys(reveals.cloth)){
            const clothReveals=reveals.cloth[key];
            if (Object.keys(clothReveals).includes(layer)){
                revealsDetail[layer] = revealsDetail[layer]?revealsDetail[layer]:{expose:0}
                if (clothReveals[layer].expose==3) {
                    revealsDetail[layer].expose=3;
                }
                if (clothReveals[layer].expose==2 && revealsDetail[layer].expose<3){
                    revealsDetail[layer].expose=2;
                    let index=Object.keys(clothReveals).indexOf(layer);
                    revealsDetail[layer].cover=Object.keys(clothReveals)[index-1];
                    revealsDetail[layer].layer = key;
                }
                if (clothReveals[layer].expose==1 && revealsDetail[layer].expose<2){
                    revealsDetail[layer].expose=1;
                    let index=Object.keys(clothReveals).indexOf(layer);
                    revealsDetail[layer].cover=Object.keys(clothReveals)[index-1];
                    revealsDetail[layer].layer = key;
                } 
            }
        }
    })
    console.log(revealsDetail)
    if(Object.keys(clothcover).length == 0) T.printText.push(draw([
        `${V.showChara.name}什么都没穿。`,
        `${V.showChara.name}全裸中。`
    ]))
    else{
        Object.keys(revealsDetail).forEach((layer)=>{
            if (revealsDetail[layer].expose==3 && !['innerBt','innerUp'].has(layer)){
                T.printText.push(draw([
                    `穿着${equip[layer].name[0]}。`,
                    `${V.showChara.name}正穿着${equip[layer].name[0]}。`,
                    `${V.showChara.name}今天的${D.equipSlot[layer]}是${equip[layer].name[0]}。`
                ]))
            }
            if (revealsDetail[layer].expose == 3 && layer=="innerBt"){
                T.printText.push(draw([
                    `可以直接看到${V.showChara.name}的${equip[layer].name[0]}。`,
                    `${V.showChara.name}的${equip[layer].name[0]}正露在外面。`,
                    `下半身直接露出了${equip[layer].name[0]}。`,
                    `${V.showChara.name}的下身由于没有其他衣物的遮挡，可以看见今天的内裤是${equip[layer].name[0]}`
                ]))
            }
            if (revealsDetail[layer].expose == 3 && layer=="innerUp"){
                T.printText.push(draw([
                    `可以直接看到${V.showChara.name}的${equip[layer].name[0]}。`,
                    `${V.showChara.name}的${equip[layer].name[0]}正露在外面。`,
                    `上半身露出了${equip[layer].name[0]}。`,
                    `${V.showChara.name}的上身由于没有其他衣物的遮挡，可以看见今天的内衣是${equip[layer].name[0]}`
                ]))
            }
            if (revealsDetail[layer].expose==2){
                let coverClothName = equip[revealsDetail[layer].cover].name[0]
                T.printText.push(draw([
                    `透过${coverClothName},可以清楚地看到${equip[layer].name[0]}`,
                    `在${coverClothName}下能直接看到${V.showChara.name}的${equip[layer].name[0]}。`,
                    `在${D.bodyDict[revealsDetail[layer].layer]}处，${V.showChara.name}的${equip[layer].name[0]}清晰可见。`
                ]))
            }
            if (revealsDetail[layer].expose==1){
                let coverClothName = equip[revealsDetail[layer].cover].name[0]
                T.printText.push(draw([
                    `透过${coverClothName},似乎可以看到${equip[layer].name[0]}`,
                    `${equip[layer].name[0]}在${coverClothName}下若隐若现。`,
                    `在${D.bodyDict[revealsDetail[layer].layer]}处，好像能看见${V.showChara.name}的${equip[layer].name[0]}。`
                ]))
            }
        })
    }
}

F.initSCPalam = function(group = D.palam){
    T.printText = [];
    const palam = V.showChara.palam
    for (let key of group){
        T.printText.push(
            `<div class="SCPalamBar">`+
            `<div>
            ${D.palam[key][0]}Lv.${palam[key][0]}:
            </div>
            <div>
            <<=F.Progressbar({
                id:'Palamprogress${key}',
                value:${palam[key][1]},
                max:${S.palamLv[palam[key][0]+1]},
                color:"#fff",
                backColor:"#333",
                width:"120px",
                height:"20px"
            })>></div><div></div>
            </div>`
        )
    }
}

F.generalPalamDescribe = function(group = D.palam){
    T.printText = [];
    const palam = V.showChara.palam
    for (let key of group){
        let choose
        D.palamDescribe[key].forEach((tmp)=>{
            if (tmp[0]<= palam[key][0]){
                choose = tmp
            }
        })
        let sentence = D.palamDescribe[key][palam[key][0]][1].replace("tc",V.showChara.name);
        T.printText.push(sentence)
    }
}

F.initSCMark = function(){
    T.printText = [];
    let m = V.showChara.mark;
    for (let i in m){
        T.printText.push(
            ((V.showChara.flag.showMark || V.showChara.cid == "player")?
            "<div>":`<div class = "blur">`)+
            `${D.mark[i][0]}:
            Lv.${m[i].lv}
            </div>
        `)
    }
}