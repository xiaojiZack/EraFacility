export type P = [number, number];

export type Dict<T = any, K extends string = any> = {
	[key in K]?: T;
};

export type race =
	| "human"
	| "elvin"
	| "deamon"
	| "wolves"
	| "drawf"
	| "goblin"
	| "catvinx"
	| "centaur"
	| "bestiary"
	| "orc"
	| "titan"
	| "dracon"
	| "kijin";

export type jobclass = "scholar" | "mage" | "ranger" | "medics" | "warrior" | "alchemist" | "";

export type statskey = "ATK" | "DEF" | "MTK" | "MDF" | "STR" | "CON" | "DEX" | "INT" | "WIL" | "PSY" | "ALR" | "LUK";

export type bonuskey = "health" | "stamina" | "mana" | "ATK" | "DEF" | "MTK" | "MDF";

export type basekey =
	| "health"
	| "stamina"
	| "sanity"
	| "mana"
	| "hydration"
	| "nutrition"
	| "clean"
	| "alcohol"
	| "stress"
	| "libido";

export type palamkey =
	| "ecstacy"
	| "lust"
	| "surrend"
	| "fear"
	| "mortify"
	| "humiliate"
	| "pain"
	| "depress"
	| "resist"
	| "favo"
	| "deference"
	| "hypno"
	| "satisfy"
	| "superior"
	//ecstacy track
	| "esM"
	| "esB"
	| "esC"
	| "esU"
	| "esV"
	| "esA"
	//pain track
	| "paM"
	| "paB"
	| "paC"
	| "paU"
	| "paV"
	| "paA";

export type ablkey =
	//基础能力, max level 20
	//Magic Skill, limited by Magica
	//魔法技能，受魔法等级限制
	| "magica"
	| "lumen"
	| "ark"
	| "flare"
	| "ions"
	| "vitae"
	| "terra"
	| "electron"
	//Physical Skill
	| "sword"
	| "wrestle"
	| "running"
	//life skill
	| "cooking"
	| "plant"
	| "medicine"
	| "craft"
	| "fishing"
	| "gather"
	| "sing"
	| "dance"
	| "instrument"
	| "paint";

export type sblkey =
	| "technique"
	| "endurance"
	| "submissive"
	| "refuse"

	//mental
	| "hypnosis" //催眠
	| "obey" //服从
	| "desire"
	| "serve"
	| "exhibition"
	| "promscuity" //luan
	| "masochism" //M
	| "sadicism" //S

	//extra
	| "bestial" //shou
	| "gangbang"
	| "tentacles"
	| "pergnant"
	| "sexaddic"
	| "drugaddic"
	| "cumaddic"
	| "Vcumpie"
	| "Acumpie";

export type expkey =
	//basic
	| "M"
	| "B"
	| "C"
	| "U"
	| "V"
	| "A"
	| "W"
	| "orgasm"
	| "orgM"
	| "orgB"
	| "orgC"
	| "orgU"
	| "orgV"
	| "orgA"
	| "orgW"
	| "strongOrg"
	| "deepOrg"
	| "multiOrg"
	//general
	| "kiss"
	| "cum"
	| "milk"
	| "pee"
	| "swallow"
	| "analsex"
	| "vagisex"
	| "titjob"
	| "oraljob"
	//
	| "ejacV"
	| "ejacA"
	| "devB"
	| "devA"
	| "devU"
	| "devV"
	| "devW"
	| "tentacles"
	| "insertion"
	| "sextoy"
	| "filmed"
	//
	| "eject"
	| "handSkill"
	| "mouthSkill"
	| "breastSkill"
	| "waistSkill"
	| "footSkill"
	| "wombInsert"

	//extra
	| "mascho"
	| "expose"
	| "pregnant"
	| "spawn"
	| "gangbang"
	| "bestial"
	| "sleepsex"
	| "raped"
	| "TS"
	| "homo"
	| "love"
	| "serve"
	| "onani"
	| "drugs"
	| "submi"
	| "hypno"
	| "train"
	| "sadic";

export type markkey = "hypno" | "ecstacy" | "surrend" | "deference" | "pain" | "fear" | "humiliate" | "mortify" | "resist"| "hypno";
