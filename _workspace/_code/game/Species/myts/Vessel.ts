import { Dict } from "_code/game/types";
declare function slog(type: "log" | "warn" | "error", ...args): void;

export type Conduct = {
    inflateRequire?:number;
    conductRate:number;
}

export type Produce = {
    produceType: "day"|"excite"|"other"
    speed?:number; //unit ml/h
    fixSpeed?:number;
    fullDecay?:number //if it is 1, it will not produce when it is full 
}

export const fullLv = 4;
export const liquidType = ['lovejuice','cum','milk'];

export interface OrganVessel{
    capacity:number;
    current:number;
    liquid:Dict<number,string>;
    inflateLv:number;
    leakRate?:number;
    fixLeakRate?:number;
    injectRate:number;
    fixInjectRate:number;
    enjectRate?:number;
    fixEnjectRate?:number;
    conduct?:Dict<Conduct,string>;
    produce?:Dict<Produce,string>;
}

export class OrganVessel{
    constructor(obj){
        this.capacity = obj.capacity? obj.capacity:0;
        this.current = 0;
        this.liquid = {};
        this.inflateLv = this.CalInflayeLv();
        if (obj.conduct) this.conduct = obj.conduct;
        if (obj.leakRate) {
            this.leakRate = obj.leakRate;
            this.fixLeakRate = this.FixLeakRate();
        }
        if (obj.enjectRate) {
            this.enjectRate = obj.enjectRate;
            this.fixEnjectRate = this.FixEnjectRate();
        }
        if (obj.injectRate) {
            this.injectRate = obj.injectRate;
            this.fixInjectRate = this.FixInjectRate();
        }
        else {
            this.injectRate = 1;
            this.fixInjectRate = this.FixInjectRate();
        }
        if (obj.produce){
            this.produce = {};
            Object.keys(obj.produce).forEach((k)=>{
                this.produce[k] = obj.produce[k];
            })
            this.FixProduce();
        }
    }

    Set(key,value){
        slog("warn",`try set `+key+' to '+value)
        this[key] = value;
    }

    CalInflayeLv(){ //以25%为界限为一档
        return Math.min(Math.ceil((this.current/this.capacity)*4),8);
    }

    FixLeakRate(){
        if (!this.leakRate) return;
        var rate = 1;
        switch(this.inflateLv){
            case(0):rate = 0.25;break;
            case(1):rate = 0.25;break;
            case(2):rate = 0.5;break;
            case(3):rate = 0.75;break;
            case(4):rate = 1;break;
            case(5):rate = 1.25;break;
            case(6):rate = 1.5;break;
            case(7):rate = 1.75;break;
            case(8):rate = 2;break;
        }
        return Math.min(rate*this.leakRate,1);
    }
    FixEnjectRate(){
        if (!this.enjectRate) return;
        var rate = 1;
        switch(this.inflateLv){
            case(0):rate = 0.25;break;
            case(1):rate = 0.25;break;
            case(2):rate = 0.5;break;
            case(3):rate = 0.75;break;
            case(4):rate = 1;break;
            case(5):rate = 1.25;break;
            case(6):rate = 1.5;break;
            case(7):rate = 1.75;break;
            case(8):rate = 2;break;
        }
        return Math.min(rate*this.enjectRate,1);
    }
    FixInjectRate(){
        if (!this.injectRate) return;
        var rate = 0;
        switch(this.inflateLv){
            case(0):rate = 1;break;
            case(1):rate = 1;break;
            case(2):rate = 1;break;
            case(3):rate = 1;break;
            case(4):rate = 0.75;break;
            case(5):rate = 0.5;break;
            case(6):rate = 0.25;break;
            case(7):rate = 0.1;break;
            case(8):rate = 0.05;break;
        }
        return Math.min(rate*this.injectRate,1);
    }
    FixProduce(){
        if (!this.produce) return this;
        if (this.inflateLv>=4){
            Object.keys(this.produce).forEach((k)=>{
                var p = this.produce[k]
                p.fullDecay = p.fullDecay? p.fullDecay:1;
                var decay = p.fullDecay;
                p.fixSpeed = p.speed - (this.inflateLv-3)*decay;
                p.fixSpeed = Math.max(0,p.fixSpeed);
            })
        }
        return this;
    }
    CalCurrent(){
        this.current = 0;
        Object.keys(this.liquid).forEach((k) =>{
            this.current += this.liquid[k];
        })
    }
    ClearSmallLiquid(){
        Object.keys(this.liquid).forEach((k)=>{
            if (this.liquid[k]<1){
               delete this.liquid[k]; 
            }
        })
    }
    UpdataVessel(){     
        this.ClearSmallLiquid();
        this.CalCurrent();   
        this.CalInflayeLv();
        this.FixLeakRate();
        this.FixEnjectRate();
        this.FixInjectRate();
        this.FixProduce();
        return this;
    }
    Inject(liquid){
        var rate = this.fixInjectRate;
        liquid.forEach((k) =>{
            var injectv = rate*liquid[k];
            this.liquid[k] = this.liquid[k]? this.liquid[k]+injectv:injectv;
        })
        this.UpdataVessel();
        return this;
    }
    Enject(){
        var rate = this.fixEnjectRate;
        var liquid = {};
        Object.keys(this.liquid).forEach((k)=>{
            liquid[k] = Math.ceil(this.liquid[k]*rate);
            this.liquid[k] -= liquid[k];
        })
        this.UpdataVessel();
        return liquid;
    }
    Leak(timeRate?:number){
        if (!this.conduct) return;
        var rate = timeRate? this.fixLeakRate:this.fixLeakRate*timeRate;
        var leakLiquid = {};
        Object.keys(this.conduct).forEach((ck)=>{
            let cond = this.conduct[ck];
            if (cond.inflateRequire? this.inflateLv>=cond.inflateRequire:true){
                leakLiquid[ck] = {};
                Object.keys(this.liquid).forEach((lk)=>{
                    var cr = ck=="absorb"? this.leakRate*timeRate:rate; //absorb not be effected by influate
                    var tryLeakVolume = Math.ceil(this.liquid[lk]*cr*cond.conductRate);
                    var realLeakVolume = Math.min(this.liquid[lk], tryLeakVolume)
                    leakLiquid[ck][lk] += realLeakVolume;
                    this.liquid[lk] -= realLeakVolume;
                })
            }
        })
        this.UpdataVessel();
        return leakLiquid;
    }
    Addliquid(liquid:Dict<number>){
        Object.keys(liquid).forEach((k)=>{
            this.liquid[k] = this.liquid[k]?this.liquid[k]+liquid[k]:liquid[k];
        })
        this.UpdataVessel();
        return this;
    }
    Produce(timeRate?:number, which="all"){
        timeRate = timeRate?timeRate:1;
        let p = this.produce;
        var l = this.liquid;
        if (which == "all"){    //所有day类型液体可以生产
            this.FixProduce();
            Object.keys(this.produce).forEach((k)=>{
                var pl = p[k].fixSpeed*timeRate;
                if (p[k].produceType == "day") l[k] = l[k]? l[k]+pl:pl;
            })
            this.UpdataVessel();
        }
        else{
            if (Object.keys(p).includes(which)){
                var pl = p[which].fixSpeed*timeRate;
                l[which] = l[which]? l[which]+pl:pl;
            }
            else slog('warn', "this organ can not produce"+which);
        }
    }
}