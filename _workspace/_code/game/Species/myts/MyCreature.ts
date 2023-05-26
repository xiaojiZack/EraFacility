declare function lan(arg, ...args): string;
declare function slog(type: "log" | "warn" | "error", ...args): void;
declare function draw(arr: any[]): any;
declare var D: typeof window.D;
declare function maybe(arr: Array<[string, number]>):string;
declare class Trait{
	static get(arg0: string, arg1:string)
	static data: Dict<{name:any,group:any,rate:number}>;
};

import { Dict } from "_code/game/types/base";
import { bodypartInfo, genderFull } from "_code/game/types/charatypes";
import { GenerateHeight, GenerateWeight, RandomBodysize, RandomBreastssize, RandomPenissize, RandomSpeciesName } from "../CommonFunc";
import { Creature } from "../Creature";
import { MyOrgans } from "./MyOrgans";
import { MySpecies } from "./MySpecies";
import { CharaTagManager } from "./Tags";

export interface MyCreature extends Creature{
    body: Dict<MyOrgans | bodypartInfo>;
    r?:MySpecies;
	tags:CharaTagManager;
	basesource: Dict<number>;
}

export class MyCreature extends Creature{
    static data: Dict<MyCreature>;
    static newId(species) {
		const len = Object.keys(MyCreature.data).length;
		return `${species}_${len}`;
	}
	
    constructor(obj = {} as MyCreature) {
        super();
		const { type = "charatemplate", species = "human" } = obj;
		this.type = type;
		this.species = species;
		this.id = MyCreature.newId(species);

		this.name = "";
		this.gender = "none";
		this.traits = [];
		this.talent = [];
		this.skill = [];
		this.stats = {};
		this.base = {};
		this.palam = {};
		this.appearance = {};
		this.body = {};
		this.bodysize = 1;
		this.basesource = {};
		this.source = {};
		this.state = [];
		this.tsv = {};
		this.abl = {};
		this.sbl = {};
		this.tags = new CharaTagManager();
	}
    Init(obj = {} as MyCreature) {
		const { name = "", gender = "" } = obj;
		console.log("init creature:", obj);
		this.r = MySpecies.data[this.species];

		this.name = name;
		if (gender) {
			this.gender = gender;
		} else {
			let g: genderFull[] = ["female", "herm", "male"];
			this.gender = g[random(2)];
		}

		if (!this.name) {
			if (!this.r) this.name = lan(draw(D.randomCharaNamePool));
			else this.name = RandomSpeciesName(this.species);
			this.randomchara = true;
		}

		this.InitCommon();

		if (this.r) {
			this.initSpecies(obj);
		}

		if (this.randomchara) {
			this.RandomInitDefault();
		}

		$(document).trigger(":initCreature", [this, obj]);

		return this;
	}
	RandomInitDefault() {
		this.randomStats();
		this.randomAbility();
		if (!this.r) {
			this.RandomInitBody();
			this.RandomInitApp();
		} else {
			let adj = {
				bodysize: RandomBodysize(),
				breasts: {size: this.gender === "male" ? 0 : RandomBreastssize(),},
				penis: {size: this.gender === "female" ? 0 : RandomPenissize()},
			};
			this.initSpecies(adj);
			this.randomTrait();
		}
		this.randomSituAbility();
	}
	initSpecies(obj = {} as any) {
		console.log(obj)
		this.bodysize = obj.bodysize || random(5);
		this.initApp(obj);
		this.body = this.r.configureBody(this.gender, this.appearance.height, obj);
		this.init3Size();
		this.initTalent(obj);
		this.initTraits(obj);
		this.initSkill(obj);

		if (this.r.temper) this.temper = this.r.temper;
	}
	initApp(obj = {} as any) {
		const app = this.appearance;
		obj = obj.appearance?obj.appearance:obj;
		app.height = obj.height || GenerateHeight(this.bodysize);
		app.weight = obj.weight || GenerateWeight(app.height);
		app.beauty = 1000;

		const list = ["haircolor", "eyecolor", "skincolor", "hairstyle"];
		list.forEach((key) => {
			if (obj[key]) app[key] = obj[key];
			else if (this.r?.avatar[key]) app[key] = draw(this.r.avatar[key]);
			else app[key] = draw(D[key + "Pool"]);
		});
	}
	initEquipment() {
		this.equip = {};
		Object.keys(D.equipSlot).forEach((key) => {
			this.equip[key] = {};
		});
		//特殊处理
		this.equip["bottom"] = [];
		this.equip.tags = [];
		return this;
	}
	initBase() {
		this.base = {};
		Object.keys(D.basicNeeds).forEach((key) => {
			this.base[key] = [1000, 1000];
			this.basesource[key] = 0;
		});
		Object.keys(D.basicPalam).forEach((key) => {
			this.base[key] = [0, 1200];
			this.basesource[key] = 0
		});
		return this;
	}
	randomTrait(){
		let tryTrait = [];
		let pool = [];
		let Tl = Trait.data;
		let temp = [];
		Object.keys(Tl).forEach((Tid)=>{
			let T = Tl[Tid];
			if (T.group == 'personality') temp.push([T.name[1],100*T.rate]);
			else if (T.group == 'fallen') null;
			else pool.push(T);
		})
		let personality = Tl[maybe(temp)];//按概率抽取一个人格
		tryTrait.push(personality);
		pool.forEach((T)=>{if (random(100)<100*T.rate) tryTrait.push(T);})
		tryTrait = this.sloveTraitConflict(tryTrait);
		let realTrait = [];
		tryTrait.forEach((T)=>{ //取得素质的程序名
			realTrait.push(T.name[1]);
		})
		this.traits = realTrait;
		return this;
	}
	findTraitConflict(arr:[any]){
		let conflicT = [];
		arr.forEach((trait1)=>{
			let con = trait1.conflict?trait1.conflict:[];
			arr.forEach((trait2)=>{
				if (con.includes(trait2.name[1]) && !conflicT.includes(trait2) && trait2!==trait1 ) conflicT.push(trait2);
			})
		})
		return conflicT;
	}
	sloveTraitConflict(arr){
		let conflictsPool = this.findTraitConflict(arr);
		while (conflictsPool.length>0){
			let tryDel = draw(conflictsPool)
			if (!(tryDel.group == "personality")) arr.delete(tryDel) //随机抽取1个非人格素质删除
			conflictsPool = this.findTraitConflict(arr);
		}
		return arr;
	}
	randomSituAbility() {
		Object.keys(D.sbl).forEach((key) => {
			this.sbl[key] = 0;
		});
		if (this.traits.includes('H')) this.sbl['desire'] = 1;
		if (this.traits.includes('Obey')) this.sbl['serve'] = 1;
		if (this.traits.includes('Haughty')) this.sbl['refuse'] = 1;
		if (this.traits.includes('TinyEvil')) this.sbl['technique'] = 1;
		if (this.traits.includes('Revolt')) this.sbl['refuse'] = 2;
	}
}

MyCreature.data = {};
