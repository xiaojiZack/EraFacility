declare function groupmatch(arg, ...args): boolean;
import { Dict } from "_code/game/types/base";
import { genderFull } from "_code/game/types/charatypes";
import { BodyRatio, fixPenisProduce } from "../CommonFunc";
import { Species } from "../Species";
import { MyOrgans } from "./MyOrgans";

export interface MySpecies extends Species{

}

export class MySpecies extends Species{
    public static data: Dict<MySpecies>;
    configureBody(gender: genderFull, height: number, adj?: any) {
		//configure the organs
		const body: Dict<MyOrgans> = {};

		const set = clone(this.bodyConfig.settings);
		//add produce to bodyparts
		for (const key in this.produce) {
			if (set[key]) {
				set[key].produce = this.produce[key];
			}
		}

		//add adj to bodyparts
		if (adj) {
			for (const key in adj) {
				if (set[key]) {
					set[key].adj = adj[key];
				}
			}
		}

		for (const key in set) {
			const part: any = set[key];

			if (gender == "female" && groupmatch(key, "penis", "prostate", "testicles")) {
				continue;
			}
			if (gender == "male" && groupmatch(key, "vagina", "clitoris", "uterus")) {
				continue;
			}

			if (gender == "herm") {
				if (key == "clitoris" && !part.herm) continue;
				if (key == "prostate" && !part.herm) continue;
				if (key == "testicles" && !part.herm) continue;
			}

			body[key] = new MyOrgans(part);
			switch (key) {
				case "vagina":
					body[key].initVagina(height, part.capacity);
					break;
				case "anus":
					body[key].initAnal(height, part);
					break;
				case "penis":
					body[key].initPenis(part?.scale || 1);
					break;
				case "urethral":
					body[key].initUrethral(gender, part, height);
					break;
				case "mouth":
					body[key].initMouth(height);
					break;
				case "clitoris":
					body[key].initClitoris(BodyRatio(height));
					break;
                case "uetrus":
                    body[key].initUetrus(height,part);
                    break;
				case "testicles":
					body[key].initTesticles(part);
			}
			if (part.capacity && !body[key].capacity) {
				body[key].initCapacity(part.capacity, height);
			}
            body[key].addVessel(part);
		}

		//the urethral depent on gender and other organ, so init it at last.
		if (body.urethral) {
			body.urethral.initUrethralSize(height, body.penis);
		}

		return body;
	}
}

MySpecies.data = {};