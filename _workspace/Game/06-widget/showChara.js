F.initSCTrait = function(){
    const TransTrait = [];
    for (let i in T.showChara.traits){
        let trait = Trait.set("trait",T.showChara.traits[i]);
        const groupname = D.TraitGroup[trait.group];
        if (TransTrait[groupname]) {TransTrait[groupname].push(trait.name[0])}
        else {TransTrait[groupname] = [trait.name[0]]};
    }
    console.log(TransTrait) 
    
    let order = ["性格","堕落","体质","心智","SM倾向","行为模式","其他"];
    T.printtext = [];
    
    for (let i in order){
        let key = order[i];
        if (TransTrait[key]){
            let text = ((Config.debug || T.showChara.cid == "player" || key=="性格")?`<div>`:'<div class="blur">')+
            `${key}:`;
            for (let T in TransTrait[key]){
                let Tname = TransTrait[key][T];
                text= text+`[${Tname}]`;
            }
            T.printtext.push(text+'</div>');
        }
    }
}

F.initSCBaseBar = function(){
    T.printtext = [];
    for(let i in D.basekey){
        let key = D.basekey[i];
        let cnname = D.basicNeeds[key]?D.basicNeeds[key][0]:D.basicPalam[key][0];
        let color = F.RGBdec2hex(D.basecolor[key][0],D.basecolor[key][1],D.basecolor[key][2]);
        T.printtext.push(
            `<div class="SCBaseBar">
            ${cnname}:
            <<=F.Progressbar({
                id:'baseprogress${key}',
                value:${T.showChara.base[key][0]},
                max:${T.showChara.base[key][1]},
                color:'${color}',
                backColor:"#333",
                width:"130px",
                height:"10px"
                })>>`+
            ((Config.debug && T.showChara.cid !== "player")?`${T.showChara.base[key][0]}/${T.showChara.base[key][1]}`:``)+
            `</div>`
        )
    }
}

F.initSCExp = function(){
    T.printtext = [];
    for (let i in D.exp){
        let expname = (T.showChara.exp[i].aware?D.exp[i][0]:'??')+"经验";
        T.printtext.push(
            `<div>`
            +`${expname}:${(T.showChara.exp[i].aware?T.showChara.exp[i].aware:0)}`
            +`</div>`
        )
    }
}

F.initSCSbl = function(){
    T.printtext = [];
    for (let i in T.showChara.sbl){
        T.printtext.push(
            ((Config.debug || T.showChara.cid == "player")?`<div>`: `<div class = "blur">`)
            +`${D.sbl[i][0]}:Lv.${T.showChara.sbl[i]}`
            +`</div>`
        )
    }
}

F.SCchangeDiv = function(pagename){
    const allpages = ['SCbox1','SCbox2','SCbox3','SCbox4','SCbox5'];
    const allbutton = ['Divbutton1','Divbutton2','Divbutton3','Divbutton4','Divbutton5']
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
    const c = T.showChara;
    const sexorgan = D.sexorgan;
    T.printtext = [];
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
            T.printtext.push(text);
        }
    }
}

F.initSCVirginity = function(){
    const virginity = T.showChara.virginity;
    T.printtext = [];
    for (let key in virginity){
        let record = virginity[key];
        if (record.length==0) continue;
        T.printtext.push(
            `${D.VirginityDict[key]}:${record[2]}被${record[0]}夺走了。[${record[1]}]`
        )
    }
    if (T.printtext.length == 0) T.printtext.push('还没有任何初体验')
}

F.initSCEquip = function(){
    T.printtext = [];
    const equip = T.showChara.equip;
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
        T.printtext.push(text)
    }
}

F.initVagueEquipDescribe = function(){
    T.printtext = [];
    const equip = T.showChara.equip;
    const reveals = T.showChara.reveals;
    
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
                    index=Object.keys(clothReveals).indexOf(layer);
                    revealsDetail[layer].cover=Object.keys(clothReveals)[index-1];
                    revealsDetail[layer].layer = layer;
                }
                if (clothReveals[layer].expose==1 && revealsDetail[layer].expose<2){
                    revealsDetail[layer].expose=1;
                    index=Object.keys(clothReveals).indexOf(layer);
                    revealsDetail[layer].cover=Object.keys(clothReveals)[index-1];
                    revealsDetail[layer].layer = layer;
                } 
            }
        }
    })
    console.log(revealsDetail)
    if(Object.keys(clothcover).length == 0) T.printtext.push(draw([
        `${T.showChara.name}什么都没穿。`,
        `${T.showChara.name}正一丝不挂。`
    ]))
    else{
        Object.keys(revealsDetail).forEach((layer)=>{
            if (revealsDetail[layer].expose==3){
                T.printtext.push(draw([
                    `${T.showChara.name}穿着${equip[layer].name[0]}。`,
                    `${T.showChara.name}今天的${D.equipSlot[layer]}是${equip[layer].name[0]}。`
                ]))
            }
            if (revealsDetail[layer].expose==2){
                let coverClothName = equip[revealsDetail[layer].cover].name[0]
                T.printtext.push(draw([
                    `透过${coverClothName},似乎可以看到${equip[layer].name[0]}`,
                    `${equip[layer].name[0]}在${coverClothName}下若隐若现。`,
                    `在${D.bodyDict[revealsDetail[layer].layer]}处，好像能看见${T.showChara.name}的${equip[layer].name[0]}。`
                ]))
            }
            if (revealsDetail[layer].expose==1){
                let coverClothName = equip[revealsDetail[layer].cover].name[0]
                T.printtext.push(draw([
                    `透过${coverClothName},可以清楚地看到${equip[layer].name[0]}`,
                    `在${coverClothName}下能直接看到${T.showChara.name}的${equip[layer].name[0]}。`,
                    `在${D.bodyDict[revealsDetail[layer].layer]}处，${T.showChara.name}的${equip[layer].name[0]}清晰可见。`
                ]))
            }
        })
    }
}

F.initSCPalam = function(group = D.palam){
    T.printtext = [];
    const palam = T.showChara.palam
    for (let key of group){
        T.printtext.push(
            `<div class="SCPalamBar">`+
            `<div>
            ${D.palam[key][0]}:
            </div>
            <div>
            <<=F.Progressbar({
                id:'Palamprogress${key}',
                value:${palam[key][0]},
                max:${palam[key][1]},
                color:"#fff",
                backColor:"#333",
                width:"120px",
                height:"20px"
            })>></div><div></div>
            </div>`
        )
    }
}

F.initSCMark = function(){
    T.printtext = [];
    let m = T.showChara.mark;
    for (let i in m){
        T.printtext.push(
            ((Config.debug || T.showChara.cid == "player")?
            "<div>":`<div class = "blur">`)+
            `${D.mark[i][0]}:
            Lv.${m[i].lv}
            </div>
        `)
    }
}