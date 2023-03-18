//执行对应代办事项
F.charaAction = function(chara, cid){
    HasHappen = V.timeEventList.getHasHappend(V.timeEventList.event.length)
    HasHappen.forEach(record => {
        if (record[0] == cid){
            exectionRecord(chara, eventid, args);
            V.timeEventList.delete(record);
        }
    });
}

function exectionRecord(chara, eventid, args){
    switch(eventid){
        case("move"):break;
        case("beginWork"):break;
        case("endWork"):break;
        case("setState"):break;
        case("changeEquip"):break;
    }
}
