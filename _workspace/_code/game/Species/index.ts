export * from "./bodyparts";
export * from "./BasicData";
export * from "./CommonFunc";

export * from "./Organs";
export * from "./Species";
export * from "./Creature";

export * from "./InitFunc";

import { Organs } from "./Organs";
import { Species } from "./Species";
import { Creature } from "./Creature";
import { Chara } from "./Characters";
import { species } from "./BasicData";
import { bodyDict, bodyGroup, Psize, existency, bodysize, sexorgan } from "./bodyparts";
import {
	GenerateHeight,
	GenerateWeight,
	BodyRatio,
	BodySizeCalc,
	HeadSize,
	RandomSpeciesName,
	fixPenisProduce,
} from "./CommonFunc";
import { fixLanArr, InitSpecies, initBodyObj, listAllParts } from "./InitFunc";
import { initCycle, initParasite, setCycle } from "./CommonFunc";
import { getScar, skinCounter } from "./Scars";
import { MyChara } from "./myts/MyChara";
import { MyCreature } from "./myts/MyCreature";
import { MyOrgans } from "./myts/MyOrgans";
import { MySpecies } from "./myts/MySpecies";

const module = {
	name: "Creatures",
	version: "1.0.0",
	des: "A module for species and character system.",
	data: {
		species,
		bodyDict,
		bodyGroup,
		Psize,
		existency,
		bodysize,
		sexorgan,
	},
	database: {
		Species: MySpecies.data,
		Creature: MyCreature.data,
		Chara: MyChara.data,
	},
	classObj: {
		MyOrgans,
		MySpecies,
		MyCreature,
		MyChara,
	},
	func: {
		GenerateHeight,
		GenerateWeight,
		RandomSpeciesName,
		listAllParts,
		setCycle,
		BodyRatio,
		getScar,
		skinCounter,
		Fix: {
			LanArr: fixLanArr,
			BodySizeCalc,
			HeadSize,
			PenisProduce: fixPenisProduce,
		},
		Init: {
			InitSpecies,
			BodyObj: initBodyObj,
			Womb: initCycle,
			parasite: initParasite,
		},
	},
	config: {
		globaldata: true,
	},
	Init: ["InitSpecies"],
};

declare function addModule(module): boolean;
addModule(module);
