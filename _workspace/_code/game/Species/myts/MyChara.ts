import { Dict, sblkey } from "_code/game/types/base";
import { Chara } from "../Characters";
declare var D: typeof window.D;

export interface MyChara extends Chara{
    schedule:any;
}


export class MyChara extends Chara{
    static data: Dict<MyChara>;
    static new(CharaId: string, obj): MyChara {
		//create a new character and add to database
		let chara = new MyChara(CharaId, obj).Init(obj).initChara(obj);
		this.data[CharaId] = chara;
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
		$(document).trigger(":initCharacter", [this, obj]);
        return this;
	}
    initSituAbility() {
		Object.keys(D.sbl).forEach((key) => {
			this.sbl[key] = 0;
		});
		return this;
	}
}