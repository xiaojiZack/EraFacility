/**
 * 插入前相关检查函数
 * 润滑检查、尺寸检查、处女检查
 */

function CheckVLub(chara){
    /**
     * 检查V的润滑程度，根据人物的liquid.total,返回润滑等级
     * 润滑等级
     * ---------------
     * 100  |   1
     * 300  |   2
     * 1000 |   3
     * 3000 |   4
     * 8000 |   5
     */
    let l = chara.liquid['thighs'].total;
    if (l<100){return 0};
    if (l<300){return 1};
    if (l<1000){return 2};
    if (l<3000){return 3};
    if (l<8000){return 4};
    return 5;
}

function CheckALub(chara){
    let l = chara.liquid['auns'].total;
    if (l<100){return 0};
    if (l<300){return 1};
    if (l<1000){return 2};
    if (l<3000){return 3};
    if (l<8000){return 4};
    return 5;
}

function CheckVSizeLv(chara){
    if (chara.body['vagina']){
        return chara.body['vagina'].sizeLv
    }
    return false
    
}

function CheckASizeLv(chara){
    if (chara.body['anus']){
        return chara.body['anus'].sizeLv
    } 
    return false
}

function CheckPSizeLv(chara){
    if (chara.body['penis']){
        return chara.body['penis'].sizeLv
    } 
    return false
}

function CheckVirginity(chara, part){
    /**
     * 检查处女特征，返回T/F
     */
    if(chara.virginity[part]){
        if (chara.virginity[part].length == 0){
            return true
        }
    }
    return false
}

function CheckInsert(target, player, Tpart, insert_size = -1){
    // 对于插入行为的额外差分的判断，可能用于KOJO上调用差分？
    let comfort_size_diff = 0
    let comfort_lub = 3
    let extraTags = [];
    if (CheckVirginity(target, Tpart)){
        if (Tpart == 'V'){
            extraTags.push('V破处')
        }
        else if (Tpart == 'A'){
            extraTags.push('A破处')
        }
    }

    if (insert_size == -1){
        insert_size = CheckPSizeLv(player)
    }
    let accom_size = 0
    if (Tpart == 'V'){
        accom_size = CheckVSizeLv(target)
    }
    else if(Tpart == 'A'){
        accom_size = CheckASizeLv(target)
    }

    if (insert_size - accom_size > comfort_size_diff){
        extraTags.push('苦痛')
        extraTags.push('扩张')
    }

    let lub = 0
    if (Tpart == 'V'){
        lub = CheckVLub(target)
    }
    else if (Tpart == 'A'){
        lub = CheckALub(target)
    }
    if (lub< comfort_lub + (insert_size-accom_size-comfort_size_diff)){
        extraTags.push('润滑不足')
    }


    return extraTags
}
F.CheckInsert = CheckInsert