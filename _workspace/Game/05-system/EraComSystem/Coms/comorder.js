/**
 * 用于计算通用执行度的。
 * 当指令执行度低于0时，即可被执行。（全局执行度=0）
 * 根据执行指令带有的tag、人物带有的tag、mark、sexskill决定。
 * 同时负责返回具体明细T.order。
 * --------指令tag---------
 * X:受对应感度影响，常态不同程度的加值
 * X破处:根据部位加值, 表示此行为可以导致破处
 * 精液：受精液中毒影响
 * 饮精：受饮精经验影响
 * V/A内射：受对应内射中毒影响，常态不同程度的加值,根据插入尺寸、润滑程度进行调整
 * V/A插入：检查尺寸、润滑
 * 侍奉：受侍奉等级影响
 * 妊娠/寄生可能：受苗床中毒影响，以及需要判断生理周期。
 * 将受束缚：受受虐等级影响，常态大加值。
 * 施虐：受施虐等级影响，常态0
 * 兽奸：受兽奸等级影响，常态大加值
 * 道具：常态小加值
 * 药物：受药渍等级影响，常态大加值
 * 露出：受露出癖影响，常态小加值
 * 苦痛：受受虐癖影响
 * 性行为：受性瘾影响
 * 触手：触手中毒，常态大加值
 * 轮奸：TODO需要额外进行判断
 * 恐怖: 常态加值
 * 多重插入:TODO
 * --------刻印------------
 * 除反发以外均根据等级减值
 * --------tag------------
 * 昏迷：极大减值
 * 虚弱：小减值
 * 发情：带有性行为属性时大加值
 * 心智破碎：大减值
 * 力竭：小减值
 * 紧张：小加值
 * 束缚：大减值（可能要根据束缚类型判断,TODO）
 * --------其他------------
 * 顺从等级减值
 * 抗拒等级加值
 * 当滥交等级较低时，且好感度不高时，性行为大加值；
 * 催眠等级减值
 * 欲望等级加值
 * favo等级加值
 * --------人物特质--------
 * 根据人物特质加减值
 * --------特殊------------
 * 慕恋、挚爱、
 */

F.usualComOrder = function(comTag, Tchara=V.target, chara=C[V.pc]){
    //-----指令tag------
    let comOrder = 0;
    console.log('F.usualComOrder()',comTag,Tchara)
    if (comTag.has('Alone')) return comOrder
    if (Tchara == null) return comOrder
    if (Object.keys(Tchara).length == 0) return comOrder;

    console.log('comorder init part', comOrder)
    let V = Tchara.body.vagina;
    let A = Tchara.body.anus;
    let B = Tchara.body.breasts;
    let C = Tchara.body.clitoris;
    let M = Tchara.body.mouth;
    let W = Tchara.body.urethral;
    let U = Tchara.body.uetrus;
    T.order = "";

    console.log('comorder comTag part', comTag, comOrder)
    if (comTag.has('V')){
        comOrder += V.sens*5;
        T.order = T.order-`|V感觉[${V.sens*5}]`
    }
    console.log(T.order)
    if (comTag.has('A')){
        comOrder -= A.sens*5;
        T.order = T.order+`|A感觉[${A.sens*5}]`
    }
    if (comTag.has('B')){
        comOrder -= B.sens*5;
        T.order = T.order+`|B感觉[${B.sens*5}]`
    }
    if (comTag.has('C')){
        comOrder -= C.sens*5;
        T.order = T.order+`|C感觉[${C.sens*5}]`
    }
    if (comTag.has('W')){
        comOrder -= W.sens*5;
        T.order = T.order+`|W感觉[${W.sens*5}]`
    }
    if (comTag.has('M')){
        comOrder += M.sens*5;
        T.order = T.order+`|M感觉[${M.sens*5}]`
    }
    if (comTag.has('U')){
        comOrder -= U.sens*5;
        T.order = T.order+`|U感觉[${U.sens*5}]`
    }

    if(CheckVirginity(Tchara,'vagina') && comTag.has('V破处')){
        comOrder += 20
        T.order = T.order+`|破处[${20}]`
    }
    if(CheckVirginity(Tchara,'anus') && comTag.has('A破处')){
        comOrder += 5
        T.order = T.order+`|A破处[${5}]`
    }

    if(comTag.has('精液')){
        comOrder += 10 - 5*Tchara.sbl.cumaddic
        T.order = T.order+`|精液[${10 - 5*Tchara.sbl.cumaddic}]`
    }

    if(comTag.has('饮精')){
        comOrder += 10 - 5*Math.floor(Tchara.exp.swallow.total/1000)
        T.order = T.order+`|饮精[${10 - 5*Math.floor(Tchara.exp.swallow.total/1000)}]`
    }

    if(comTag.has('V内射')){
        comOrder += 10 - 5*Tchara.sbl.Vcumpie
        T.order = T.order+`|V内射[${10 - 5*Tchara.sbl.Vcumpie}]`
    }
    if(comTag.has('A内射')){
        comOrder += 5 - 5*Tchara.sbl.Acumpie
        T.order = T.order+`|A内射[${10 - 5*Tchara.sbl.Vcumpie}]`
    }
    if (!T.insertSize) T.insertSize = CheckPSizeLv(chara);
    if(comTag.has('V插入')){
        comOrder += Math.max(5*(3-CheckVLub(Tchara)),0);
        T.order = T.order+`|V润滑[${Math.max(5*(3-CheckVLub(Tchara)),0)}]`
        comOrder += 5*Math.max(T.insertSize-CheckVSizeLv(Tchara),0);
        T.order = T.order+`|V插入尺寸[${5*Math.max(T.insertSize-CheckVSizeLv(Tchara),0)}]`
    }
    if(comTag.has('A插入')){
        comOrder += Math.max(5*(3-CheckALub(Tchara)),0);
        T.order = T.order+`|A润滑[${Math.max(5*(3-CheckVLub(Tchara)),0)}]`
        comOrder += 5*Math.max(T.insertSize-CheckASizeLv(Tchara),0);
        T.order = T.order+`|A插入尺寸[${5*Math.max(T.insertSize-CheckVSizeLv(Tchara),0)}]`
    }
    if(comTag.has('侍奉')){
        comOrder += -Tchara.sbl.serve*2;
        T.order = T.order+`|侍奉行为[${-Tchara.sbl.serve*2}]`
    }

    if(comTag.has('妊娠/寄生可能')){
        //需要根据生理期判断
        comOrder += 50-20*Tchara.sbl.pergaddic;
        T.order = T.order+`|妊娠/寄生可能[${50-20*Tchara.sbl.pergaddic}]`
    }

    if(comTag.has('将受束缚')){
        comOrder += 10-3*Tchara.sbl.masochism;
        T.order = T.order+`|将受束缚[${10-3*Tchara.sbl.masochism}]`
    }

    if(comTag.has('施虐')){
        comOrder += -3*Tchara.sbl.sadicism;
        T.order = T.order+`|施虐[${-3*Tchara.sbl.sadicism}]`
    }

    if(comTag.has('苦痛')){
        comOrder += -3*Tchara.sbl.masochism;
        T.order = T.order+`|苦痛[${-3*Tchara.sbl.masochism}]`
    }

    if(comTag.has('兽奸')){
        comOrder += 50-20*Tchara.sbl.bestial;
        T.order = T.order+`|兽奸[${50-20*Tchara.sbl.bestial}]`
    }

    if(comTag.has('道具')){
        comOrder += 2;
        T.order = T.order+`|道具[${2}]`
    }

    if(comTag.has('药物')){
        comOrder += 30-15*Tchara.sbl.drugaddic;
        T.order = T.order+`|药物[${30-15*Tchara.sbl.drugaddic}]`
    }

    if(comTag.has('露出')){
        comOrder += 10-5*Tchara.sbl.exhibition;
        T.order = T.order+`|露出[${10-5*Tchara.sbl.exhibition}]`
    }

    if(comTag.has('性行为')){
        comOrder += -2*Math.max(Tchara.palam.lust[0]-3,0);
        T.order = T.order+`|性行为[${-2*Math.max(Tchara.palam.lust[0]-3,0)}]`
    }

    if(comTag.has('触手')){
        comOrder += 50-20*Tchara.sbl.tentacles;
        T.order = T.order+`|触手[${50-20*Tchara.sbl.tentacles}]`
    }
    if(comTag.has('轮奸')){
        comOrder += 30-10*Tchara.sbl.gangbang;
        T.order = T.order+`|轮奸[${30-10*Tchara.sbl.gangbang}]`
    }
    if(comTag.has('恐怖')){
        comOrder += 5;
        T.order = T.order+`|恐怖[${5}]`
    }
    console.log('comorder mark part', comOrder)
    //---------MARK--------
    let mark = Tchara.mark;
    Object.keys(mark).forEach((markName)=>{
        if (markName == "resist"){
            comOrder += 5*mark[markName].lv;
        }
        else{
            comOrder -= 3*mark[markName].lv;
        }
    })

    console.log('comorder tag part', comOrder)
    //--------Tag-----------
    let tags = Tchara.tags;
    if(tags.has('昏迷')){
        console.log(comOrder)
        comOrder -= 999;
    }
    if(tags.has('虚弱')){
        comOrder -= 5;
    }
    if(tags.has('发情') && comTag.has('性行为')){
        comOrder -= 10;
    }
    if(tags.has('心智破碎')){
        comOrder -= 50;
    }
    if(tags.has('力竭')){
        comOrder -= 5;
    }
    if(tags.has('紧张')){
        comOrder += 5;
    }
    if(tags.has('束缚')){
        comOrder -= 10;
    }

    console.log('comorder dev part', comOrder)
    comOrder -= 5*Tchara.sbl.submissive;
    comOrder += 5*Tchara.sbl.refuse;
    if (Tchara.sbl.promscuity && Tchara.palam.favo[0]<4 && comTag.has('性行为')){
        comOrder += 15;
    }
    comOrder -= 5*Tchara.sbl.hypnosis;
    comOrder -= 5*Tchara.sbl.desire;
    comOrder -= 2*Tchara.flag.favo;

    console.log('comorder traits part', comOrder)
    Tchara.traits.forEach((traitname)=>{
        let trait = Trait.get('trait',traitname);
        if (trait){
            comOrder -= trait.order;
        }
    })
    return comOrder

}