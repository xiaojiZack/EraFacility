import { genderFull } from "_code/game/types/charatypes";
import { Organs } from "../Organs";
import { OrganVessel } from "./Vessel";

export const VesselAbleOrgans = ['stomach','bladder','testicles','testicle','vagina','uetrus','intestine','breast']

export interface MyOrgans extends Organs{
    vessel?:OrganVessel;
    Parasite?:Array<any>;
}

export class MyOrgans extends Organs{
    initUrethral(gender: genderFull, config, height) {
		const option: any = this.group;

		//fix the group if it's an object
		if (typeof option === "object" && option[gender]) {
			this.group = option[gender];
		}

		return this;
	}
    initUetrus(height: number, config) {
		this.size[0] = MyOrgans.UetrusDiameter(height, this.sizeLv);
		this.size[1] = MyOrgans.UetrusDepth(height);
		this.initCapacity(config.capacity, height);

		return this;
	}
	initTesticles(config){
		this.capacity = [0,Math.floor(config.capacity.default*random(0.8,1.2))]
		return this;
	}
    public static UetrusDiameter(height: number, sizeLv: number){
        const max = this.strechLevelSize(height) * 0.6;
		return Math.floor(max + sizeLv * max) + random(-1, 1);
    }
    public static UetrusDepth(height: number){
        return Math.floor(height / 40 + 0.5) + random(-2, 4);
    }
    addVessel(obj){
        if (VesselAbleOrgans.includes(this.name)) {
            obj.capacity = this.capacity? this.capacity[1]:obj.capacity;
            this.vessel = new OrganVessel(obj)
        }
    }
    initSexStats(part: string) {
		switch (part) {
			case "vagina":
			case "anus":
			case "penis":
            case "uetrus":
			case "urethral":
				if (!this.size) this.size = [0, 0];
			case "mouth":
			case "clitoris":
				if (!this.size) this.size = 0;
			case "breasts":
				if (!this.sizeLv) this.sizeLv = 0;
				if (!this.sens) this.sens = 0;
				break;
			default:
		}

		return this;
	}
}