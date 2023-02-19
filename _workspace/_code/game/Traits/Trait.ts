import { Dict } from "../types";
declare var D: typeof window.D;

export interface Talent {
	type: "talent" | "trait";
	name: [string, string?];
	des: [string, string?];

	group: string;
	conflict: string[];

	rate?: number;

	effect?: Function;
}

export interface Trait extends Talent {
	id: string;
	order: number;
	get: any;
	lose: any;

	onOrder?: Function;
	onSource?: Function;
	onFix?: Function;
}

export interface setTrait {
	id?: string;
	name: string | string[];
	des: string | string[];
	order?: number;
	group: string;
	conflict?: string[];
	sourceEffect?: Array<[string, number, string?]>;
	rate?: number;
}

export class Talent {
	constructor({ name, des, rate = 0.5, conflict = [], group = "Netural" } = {} as any) {
		this.type = "talent";
		this.name = name;
		this.des = des;
		this.group = group;
		this.conflict = conflict;
		this.group = "";
		this.rate = rate;
		this.effect = function () {};
	}
	Effects(callback) {
		this.effect = callback;
		return this;
	}
}

export class Trait extends Talent {
	static data: Dict<Trait>;
	public static init() {
		D.traits.forEach((obj) => {
			let id;
			if (typeof obj.name == "string") id = obj.name;
			else id = `${obj.name[1] || obj.name[0]}`;
			obj.id = id;
			Trait.data[id] = new Trait(obj as setTrait);
		});
		console.log(Trait.data);
	}
	public static set(type, name) {
		const traitdata = Object.values(Trait.data).filter((trait) => {
			return trait.name.includes(name) && trait.type == type;
		});

		if (traitdata) {
			return traitdata[0];
		} else {
			console.log("trait has not found:", name);
			return null;
		}
	}
	public static get(type: "trait" | "talent", name: string, key: string = "", event?: string) {
		const traitdata = this.set(type, name);
		if (traitdata) {
			if (key == "") {
				return traitdata;
			}
			if (traitdata[key] && event) {
				return traitdata[key](event);
			}
			if (traitdata[key]) return traitdata[key];
			else {
				console.log("key has not found:", name, key);
				return null;
			}
		} else {
			return null;
		}
	}
	public static list(type) {
		return Object.values(Trait.data).filter((trait) => {
			return trait.group == type;
		});
	}
	constructor(
		{ id, name, des, order, group = "mental", rate = 0.5, sourceEffect = [], conflict = [] } = <setTrait>{}
	) {
		if (typeof name == "string") {
			name = [name, name];
		}
		if (typeof des == "string") {
			des = [des, des];
		}
		super({ name, des, rate, conflict, group });
		this.type = "trait";
		this.id = id;
		this.order = order;
		this.group = group;
		this.get = {};
		this.lose = {};
		this.conflict = conflict;

		this.init(sourceEffect);
	}
	init(source) {
		if (source?.length) {
			source.forEach(([key, value, option]) => {
				if (option) {
					this.lose[key] = value;
				} else {
					this.get[key] = value;
				}
			});
		}
	}

	initConflict(conflict) {
		//let traitname in conflict to be trait id
		conflict.forEach((traitname, index) => {
			conflict[index] = Trait.get("trait", traitname).id;
		});
		this.conflict = conflict;
	}

	Order(callback) {
		this.onOrder = callback;
		return this;
	}
	Source(callback) {
		this.onSource = callback;
		return this;
	}
	Fix(callback) {
		this.onFix = callback;
		return this;
	}
}

Trait.data = <Dict<Trait>>{};

export function findConflic(source, conflicGroup) {
	let conflicArr = source.filter((val) => conflicGroup.includes(val));
	if (conflicArr.length < 2) {
		return source;
	} else {
		let index = random(conflicArr.length - 1);
		source.delete(conflicGroup);
		source.push(conflicArr[index]);
		return source;
	}
}

export async function InitTraitsConflict() {
	Object.values(Trait.data).forEach((trait) => {
		if (trait.conflict) {
			trait.initConflict(trait.conflict);
		}
	});
}

export const traitslist: Array<setTrait> = [
];

export const talentlist = [
];
