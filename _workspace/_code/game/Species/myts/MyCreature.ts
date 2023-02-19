declare function lan(arg, ...args): string;
declare function slog(type: "log" | "warn" | "error", ...args): void;
declare function draw(arr: any[]): any;
declare var D: typeof window.D;
declare function maybe(arr: Array<[string, number]>):string;
declare class Trait{static data: Dict<{name:any,group:any,rate:number}>;};

import { Dict } from "_code/game/types/base";
import { bodypartInfo, genderFull } from "_code/game/types/charatypes";
import { RandomSpeciesName } from "../CommonFunc";
import { Creature } from "../Creature";
import { MyOrgans } from "./MyOrgans";
import { MySpecies } from "./MySpecies";

export interface MyCreature extends Creature{
    body: Dict<MyOrgans | bodypartInfo>;
    r?:MySpecies;
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
		this.source = {};
		this.state = [];
		this.tsv = {};
		this.abl = {};
		this.sbl = {};
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
		this.randomSituAbility();
		if (!this.r) {
			this.RandomInitBody();
			this.RandomInitApp();
		} else {
			let adj = {
				bodysize: random(5),
				breasts: {sizeLv: this.gender === "male" ? 0 : random(10),},
				penis: {sizeLv: this.gender === "female" ? 0 : random(7)},
			};
			this.initSpecies(adj);
			this.randomTrait();
		}
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
		let personality = Tl[maybe(temp)];//按概率抽取一个人格后取中文名
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
		arr.forEach((T)=>{
			let con = T.conflict?T.conflict:[];
			arr.forEach((T2)=>{
				if (con.includes(T2.name[0]) && !conflicT.includes(T2) && !T2==T ) conflicT.push(T2);
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
}

MyCreature.data = {};