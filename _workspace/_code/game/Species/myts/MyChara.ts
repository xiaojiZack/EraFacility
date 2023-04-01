import { Dict, sblkey } from "_code/game/types/base";
import { Chara } from "../Characters";
declare var D: typeof window.D;
declare var C: typeof window.C;
declare class Items {
	static getByName(arg0: string, equip: any): any
}
export interface MyChara extends Chara{
    schedule:any;
	location?:any;
}


export class MyChara extends Chara{
    static data: Dict<MyChara>;
    static new(CharaId: string, obj): MyChara {
		//create a new character and add to database
		let chara = new MyChara(CharaId, obj).Init(obj).initChara(obj);
		MyChara.data[CharaId] = chara;
		return chara;
	}
    initChara(obj) {
		this.initMark();
		this.initExp();
		this.initSkin();
		this.initLiquid();
		this.initReveals();
		this.initVirginity();
		this.initDaily();
		this.initFlag();
		this.initLiquid();
        this.initSituAbility();
		this.initLocation(obj);
		if (obj.stats) {
			this.Stats(obj.stats);
		}
		if (obj.abl) {
			this.Ability(obj.abl);
		}
		if (obj.sbl) {
			this.SituAbility(obj.sbl);
		}
		if (obj.exp) {
			this.Exp(obj.exp);
		}
		if (obj.flag) {
			this.Flag(obj.flag);
		}
		if (obj.virginity) {
			this.Virginity(obj.virginity);
		}
		if (obj.equip) {
			obj.equip.forEach((e)=>{
				this.getOnEquip(e)
			})
		}
		$(document).trigger(":initCharacter", [this, obj]);
        return this;
	}
	initLocation(obj?){
		this.location = obj.location?obj.location:{mapId:"academyLevel",coord:[4,4]};
	}
    initSituAbility() {
		Object.keys(D.sbl).forEach((key) => {
			this.sbl[key] = 0;
		});
		return this;
	}
	initReveals() {
		this.reveals = {};

		const ignore = ["vagina", "penis", "buttL", "buttR"];
		this.reveals.expose = 3;
		this.reveals.reveal = 1500;

		this.reveals.detail = {};
		this.reveals.cloth = {}
		D.skinlayer.forEach((k) => {
			if (ignore.includes(k) === false) this.reveals.detail[k] = { expose: 3, block: 3 };
			//衣物处理
			this.reveals.cloth[k] = [];
		});
		//额外处理
		this.reveals.detail.genital = { expose: 3, block: 3 };
		this.reveals.detail.butts = { expose: 3, block: 3 };
		this.reveals.parts = Object.keys(this.reveals.detail);
		this.reveals.tags = {}; 
		this.reveals.cloth={};
		this.reveals.parts.forEach((k)=>{
			this.reveals.cloth[k] = {};
			Object.keys(D.equipSlot).forEach((layer)=>{
				let equip = this.equip[layer];
				if (Object.keys(equip).length>0){ //该层衣物存在
					if (equip.cover[k]) this.reveals.cloth[k][equip.category] = { expose: 3, block: 3 };
				}
			})
		})

		return this;
	}
	getOnEquip(equip){
		if (typeof equip !== "object") equip = Items.getByName("clothes",equip)[1]
		let category = equip.category;
		let canequip = equip.checkputon?equip.checkputon():true;
		if (canequip){
			let trystrip = category=="bottom"?[]:[this.equip[category]];
			if(equip.tags.includes("outfit")){
				if (category=="innerUp") trystrip.push(this.equip["innerBt"]);
				if (category=="outfitUp") trystrip.push(this.equip["outfitBt"]);
			}
			let canstrip = true;//检查能否替换
			trystrip.forEach((k)=>{
				if (Object.keys(k).length>0)
					canstrip=(canstrip && k.checkstrip?
							k.checkstrip():true)
			})
			if(canstrip){ //可以脱下冲突衣物
				trystrip.forEach((removeCloth)=>{
					if(removeCloth.strip){
						removeCloth.strip(this);
						this.equip.tags = this.equip.tags.filter(
							x => !removeCloth.tags.some(y => y === x))
					}
					this.equip[removeCloth.category]={};
				})
				this.equip[category] = equip;
				if(equip.puton)equip.puton(this);
				this.equip.tags = this.equip.tags.concat(equip.tags)
				this.UpdateReveals();
				return true;
			}
		}
		return false;
	}

	getOffEquip(equip){
		let canstrip = equip.checkstrip?equip.checkstrip():true
		if (canstrip){
			this.equip[equip.category]={};
			if (equip.strip)equip.strip();
		}
		return this;
	}
	
	UpdateReveals(){
		//according to the cloth, calculate the reveals and the visible of cloth
		this.initReveals();
		this.reveals.parts.forEach((k)=>{
			//search according to the cover relationship from clothcover
			this.CalvisibleAndTouchable(k, clothcover,{expose:3,block:3});
		})
		this.CalRevealsLevel();
		
	}
	//递归计算可见度和可触碰度，从父继承
	CalvisibleAndTouchable(skin,forest, VT){
		let newVt = VT;
		for (let layer of forest){
			if (Object.keys(this.reveals.cloth[skin]).includes(layer)){
				this.reveals.cloth[skin][layer] = VT;
				newVt = {expose:this.equip[layer].cover[skin][0],block:this.equip[layer].cover[skin][1]}
				if (VT.expose == 1 && newVt.expose == 1) //Hazy see can not go deep
					newVt.expose = 0;
				VT = newVt;
			}
		}
		this.reveals.detail[skin]=VT;
	}
	CalRevealsLevel(){
	//cal skin reveals and expose value
	//total 2000
	// genital:1000, anus:300, breasts:400
	// private:100, butts:100, thighs:50, abdomen:50
	// special bouns: no pangci:50, no bra:20, see pangci:100, see bra:50
		let tags = this.reveals.tags;
		for (let part of ["genital","anus","breasts","private","butts","thighs","abdomen"])
			tags[part] = this.reveals.detail[part].expose;
		if (this.reveals.detail["genital"].expose == 0 && !this.equip.tags.includes("pangci"))
			tags["no pangci"] = 3;
		else tags["no pangci"] = 0;
		if (this.reveals.detail["breasts"].expose == 0 && !this.equip.tags.includes("bra"))
			tags["no bra"] = 3;
		else tags["no bra"] = 0;
		tags ["see pangci"] = this.equip.tags.includes["pangci"]?this.reveals.cloth["genital"]["innerBt"].expose:0
		tags ["see bra"] = this.equip.tags.includes["bra"]?this.reveals.cloth["breasts"]["innerBt"].expose:0
		if (this.gender == "male"){
			tags["see bra"] = 0;
			tags["no bra"] = 0;
		}

		this.reveals.reveal = 0;
		for (let key in tags){
			this.reveals.reveal += Math.floor(revealsPoints[key]*(tags[key]/3));
		}
		this.reveals.expose = 0;
		for (let level in exposeLevel){
			this.reveals.expose = this.reveals.reveal>exposeLevel[level]?
				parseInt(level):this.reveals.expose
		}
	}

}

//衣物层间的互相遮挡关系
export const clothcover = [
	"cover","head","face","ears","hands","neck","outfitUp","outfitBt","feet","innerUp","legs","innerBt","chest","bottom"
]

export const revealsPoints = {
	"genital": 1000,
	"anus": 300,
	"breasts": 400,
	"private":100,
	"butts":100, 
	"thighs":50, 
	"abdomen":50,
	"no pangci":50, 
	"no bra":20, 
	"see pangci":100, 
	"see bra":50
}

export const exposeLevel = {
	"1":50,
	"2":100,
	"3":400,
	"4":800,
	"5":1400,
}