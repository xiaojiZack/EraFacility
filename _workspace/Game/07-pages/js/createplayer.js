
F.DPset = function(key,value){
    V.playerdesign[key] = value;
    return V.playerdesign;
}

D.StartBouns={
    "魅惑":"不知道为什么，你总是能让人听你的话。",
    "启动资金":"初始携带5000额外资金。"
}

F.CPchangeBouns = function(value){
    V.playerdesign.Bouns = value;
    const output = `<<replace "#BounsDes">>说明:<<=D.StartBouns[$playerdesign.Bouns]>><</replace>>`
    new Wikifier(null, output);
}

F.CPRandomPlayer = function(){
    const design = V.playerdesign;
    MyChara.new("player",design).initChara(design);
    const player = MyChara.data["player"]
    player.birthday[1] = design.BirthdayM?design.BirthdayM:1;
    player.birthday[2] = design.BirthdayD?design.BirthdayD:1;
    CPRandomVirginity(player,design.SexExp);
    CPGetBouns(player, design.Bouns);
    console.log(player);
    return player;
}

const CPRandomVirginity = function(chara, sexexp){
    if (chara.gender !== "male" && sexexp !== "no"){
        chara.setVirginity("vigina", "不明", "不明", "不明");
        chara.setVirginity("kiss", "不明", "不明", "不明");
    }
    if (chara.gender !== "female" && sexexp !== "no"){
        chara.setVirginity("penis", "不明", "不明", "不明");
        chara.setVirginity("kiss", "不明", "不明", "不明");
        chara.setVirginity("viginasex", "不明", "不明", "不明");
    }
    var RandomExp = {};
    if (chara.gender !== 'male'){
        if (chara.virginity["vigina"].length>0){
            RandomExp['V'] = random(1,5);
            RandomExp['orgV'] = random(0,2);
            RandomExp['orgasm'] = RandomExp['orgV'];
            RandomExp['semen'] = random(0,2);
            RandomExp['vagisex'] = random(1,2);
        }
    }
    if (chara.gender !== 'female'){
        if (chara.virginity["penis"].length>0){
            RandomExp['C'] = random(1,5);
            RandomExp['orgC'] = random(0,2);
            RandomExp['orgasm'] = RandomExp['orgC'];
            RandomExp['cum'] = RandomExp['orgC'];
            RandomExp['insertion'] = 1;
        }
    }
    if (chara.virginity["kiss"].length>0){
        RandomExp['M'] = random(1,5);
        RandomExp['kiss'] = 1;
    }
    if (sexexp == "a lot"){
        Object.keys(RandomExp).forEach((k)=>{
            RandomExp[k] = RandomExp[k]*3+2;
        })
    }
    chara.Exp(RandomExp);
}

const CPGetBouns = function(chara,Bouns){
    if (Bouns == "魅惑"){
        chara.traits.push("Sedure");
    }
    if (Bouns == "启动资金"){
        V.money = 6000;
    }
}

F.InitNewGame = function(){
    V.facilityName = "";
    V.money = 1000;
    V.facilityLevel = 0;
    V.facilityFame = {};


}

F.CPdetermine = function(){
    delete V.playerdesign;
}