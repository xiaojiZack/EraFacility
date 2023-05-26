const { randomInt } = require("crypto");

class TimeEventList{
    constructor(){
        this.event = [];
        return this;
    }
    append(charaid, eventid, time, args=[]){
        this.event.push([charaid,eventid,time,args]);
        this.sort();
        return this;
    }
    delete(record){
        this.event = this.event.filter(item=>item!=record)
        console.log(this.event,record)
        this.sort();
    }
    sort(){
        this.event.sort(function(x,y){
            return x[3]-y[3];
        })
        return this;
    }
    update(passTime=1){
        this.event.forEach((record)=>{
            record[2] -= passTime;
        })
    }
    getHasHappend(getNumber = 1){
        let records = [];
        this.event.forEach((record)=>{
            if (record[2]<=0 && records.length<getNumber)
                records.push(record)
        })
        return records;
    }
    getBycharaId(charaId, checklist = []){
        let records = [];
        let events = checklist.length>0?checklist:this.event; //如果没有指定范围，则查找所有时间戳.

        events.forEach((record)=>{
            if (record[0]==charaId){
                records.push(record);
            }
        })
        return records;
    }
    getByeventId(eventId, checklist = []){
        let records = [];
        let events = checklist?checklist:this.event; //如果没有指定范围，则查找所有时间戳.
        events.forEach((record)=>{
            if (record[1]==eventId){
                records.push(record);
            }
        })
        return records;
    }
}

V.timeEventList = new TimeEventList();

//执行对应代办事项
F.charaAction = function(chara, cid, passTime){
    if(cid == 'player') return;
    const HasHappen = V.timeEventList.getHasHappend(V.timeEventList.event.length)
    HasHappen.forEach(record => {
        if (record[0] == cid){
            exectionRecord(chara, record);
            V.timeEventList.delete(record);
            F.planTask(chara,passTime);
        }
    });
    if (V.timeEventList.getBycharaId(cid).length == 0){
        F.planTask(chara,passTime);
    }
    
}

function exectionRecord(chara, record){
    const [charaid, eventid, time, args] = record;
    switch(eventid){
        case("move"):
            F.NPCMove(chara, args.place)
            break;
        case("beginWork"):
            let task = Task.get(args.task);
            task.effect(chara);
            break;
        case("endWork"):
            let endtask = Task.get(args.task);
            endtask.endeffect(chara);
            break;
        case("setState"):break;
        case("changeEquip"):break;
    }
}

F.planTask = function(chara,passTime=0){
    let schedules = chara.kojoData.schedule;
    let preset = chara.kojoData.preset;
    let location = chara.location;
    let date = V.date;
    let fixTime = date.time+passTime;
    if (chara.todo == '跟随'){
        //与主人公交互时
    }

    schedules.forEach((entry)=>{
        const schedule = entry[1];
        //check date
        let fixStarthour = schedule.starthour;
        let fixEndhour = schedule.starthour>schedule.endhour?schedule.endhour+24:schedule.endhour;
        if (fixTime/60>=fixStarthour && fixTime/60<fixEndhour 
        &&(schedule.weekday == "all" || schedule.weekday.includes(date.week))
        &&(randomInt(100)<schedule.rate) && chara.todo == ''){
            let place = schedule.location;
            if (place == "home") place = chara.kojoData.home; 
            if (F.NPCMove(chara, place)!=true){
                let obj = {place:place};
                V.timeEventList.append(chara.cid, 'move', 5, obj)
            }
            else{
                let obj = {task:entry[0]};
                V.timeEventList.append(chara.cid, 'beginWork', 1, obj)
                chara.todo = entry[0];
                V.timeEventList.append(chara.cid, 'endWork', 
                60*(schedule.stayhour)-(fixTime-60*fixStarthour), obj)
            }
            
        }
    })

    if (chara.todo == ''){
        //完全空闲时
    }
    
}

F.NPCMove = function(chara, place){
    let mapid = chara.location.mapId;
    let coord = chara.location.coord;
    let [Tmapid, Tspot] = place.split('_');
    let [nextmapid, nextcoor]=['', ''];
    if (mapid != Tmapid){
        Tspot = Boards.get(mapid).entries[0];
    }
    let Tcoord = Boards.get(mapid).findcoor(Tspot);
    console.log(coord,Tcoord, mapid, Tmapid);
    if (coord[0] == Tcoord[0] && coord[1] == Tcoord[1] && mapid == Tmapid){
        //到达目的地
        return true
    }
    else if (coord[0] == Tcoord[0] && coord[1] == Tcoord[1] && mapid != Tmapid){
        //需要跳转地图
        nextmapid = Tmapid;
        nextcoor = Boards.get(Tmapid).entries[0];
    }
    else{
        let path = F.findPath(Boards.getBoard(mapid),coord, Tcoord);
        nextcoor = path.shift();
        nextmapid = mapid;
    }
    chara.location.mapId = nextmapid;
    chara.coord = nextcoor;
    
}