F.sourceCheck = function (chara, cid) {
	//source的处理。根据条件对source的获得值进行加减。

	//根据特定条件进行数值处理

	//根据素质进行数值处理. 数值buff最后处理
	F.tagBuff(chara,cid);
	F.traitSource(chara, cid);
};

F.ablSource = function (chara, cid) {
	//根据Abl等级对数值进行处理.
	//还得看现在处理的角色当前的执行指令……哎？
	//当前执行指令详细 T.actionDetail 、T.CharaCounterDetail
	// com 模式则储存在 T.selectCom, T.lastCom, T.inputCom
};

F.traitSource = function (chara, cid) {
	chara.traits.forEach((t) => {
		const data = Trait.get("trait", t);
		//get 和 lose 是一个obj，分别对应获得和失去的数值变化。
		//onSource 是一个函数，用于对数值进行例外处理。
		for (let i in data.get) {
			if (chara.source[i] && chara.source[i] > 0) {
				chara.source[i] *= data.get[i];
			}
			if (chara.basesource[i]  && chara.basesource[i]>0){
				chara.basesource *= data.get[i];
			}
		}

		for (let i in data.lose) {
			if (chara.source[i] && chara.source[i] < 0) {
				chara.source[i] *= data.lose[i];
			}
			if (chara.basesource[i]  && chara.basesource[i]<0){
				chara.basesource *= data.lose[i];
			}
		}

		if (typeof data.onSource == "function") {
			// 执行素质的例外处理。
			data.onSource(cid);
		}
	});
};

F.tagBuff = function (chara,cid){
	let Ctags = chara.tags;
	const Csource = chara.source;
	const Cbase = chara.basesource;
	for (let index in Ctags.data){
		let tag = Ctags.data[index];
		let dots = tag.dot;
		Object.values(dots).forEach((dot)=>{
			if (dot.source in D.palam){
				switch (dot.type) {
					case "get":
						if (Csource[dot.source]>0){
							Csource[dot.source] =Csource[dot.source]*dot.value;
						}
						break;
					case "lose":
						if (Csource[dot.source]<0){
							Csource[dot.source] =Csource[dot.source]*dot.value;
						}
						break;
					case "buff":
						Csource[dot.source] =Csource[dot.source]*dot.value;
						break;
				
					default:
						break;
				}
			}
			else if (D.basekey.includes(dot.source)){
				switch (dot.type) {
					case "get":
						if (Cbase[dot.source]>0){
							Cbase[dot.source] =Cbase[dot.source]*dot.value;
						}
						break;
					case "lose":
						if (Cbase[dot.source]<0){
							Cbase[dot.source] =Cbase[dot.source]*dot.value;
						}
						break;
					case "buff":
						Cbase[dot.source] =Cbase[dot.source]*dot.value;
						break;
				
					default:
						break;
				}
			}
		})
	}
}

F.sourceUp = function (chara) {
	//根据处理结果进行反馈。并输出结果文字到 S.sourceResult下。当启用显示结果数值时，会显示在COM after之后。
	let base = Object.values(D.basekey);
	let palam = Object.keys(D.palam);

	let retext = [chara.name + "数值变动："];
	for (let i in chara.source) {
		let msg = "";
		if (chara.source[i] !== 0) {
			//将变动记录作为文本记录到 S.msg 里面。
			const v = chara.source[i];
			const lv = chara.palam[i][0] + 1;
			// TODO
			// 此处如果选用每分钟计时的话，可能会大量显示
			msg = `>> ${lan(D.palam[i])}${v > 0 ? " + " : " - "}${v} = ${chara.palam[i][1] + v} / ${S.palamLv[lv]}`;
		}
		if (palam.includes(i) && chara.source[i]) {
			let lv = chara.palam[i][0] + 1;
			chara.palam[i][1] += chara.source[i];

			//palam lv的处理， 顺便在这里记录变动文本？
			while (chara.palam[i][1] >= S.palamLv[lv] && chara.palam[i][0]<=S.palamLv.length) {
				chara.palam[i][1] -= S.palamLv[lv];
				//use clamp to limit the palam lv
				chara.palam[i][0] += 1;//Math.clamp(chara.palam[i][0] + 1, 0, S.palamLv.length);
				lv += 1;
			}
			while (chara.palam[i][1]<0 && chara.palam[i][0]>0){
				chara.palam[i][1] += S.palamLv[lv-1];
				chara.palam[i][0] -= 1;
				lv -= 1;
			}
			if (chara.palam[i][1]<0){
				chara.palam[i][1] = 0;
			}
		}
		
		if (msg) retext.push(msg);
		//清空数值
		chara.source[i] = 0;
	}
	console.log(chara.basesource)
	for (let i in chara.basesource){
		if (base.includes(i) && chara.basesource[i]) {
			chara.base[i][0] = Math.clamp(chara.base[i][0] + chara.basesource[i], -100, chara.base[i][1] * 1.5);
		}
		chara.basesource[i] = 0;
	}
	if (retext.length > 1) P.msg(retext.join("<br>") + "<<dashline>>");
};

F.trackCheck = function (chara, cid, time=1) {
	// equip, 持续动作的追踪和处理
	// the equip, the track and process of the continuous action
	// something like this:
	/*
      for(const [equip, data] of Object.entries(chara.equip)){
         if(equip.source){
            //do something
         }
      }

   */
  chara.tags.update(chara)
  F.gatherTagDot(chara,time)
};

F.gatherTagDot = function(chara, passTime){
	let Ctags = chara.tags;
	const dotSum = F.blankDotSum();
	const baseDotSum = F.blankBaseDotSum();
	const Csource = chara.palam;
	let CBase = chara.base
	for (let index in Ctags.data){
		let tag = Ctags.data[index];
		let dots = tag.dot;
		Object.values(dots).forEach((dot)=>{
			if (dot.source in D.palam){
				switch (dot.type) {
					case "once":
						dotSum[dot.source]+=dot.value;
						//Ctags.del(tag)
						break;
		
					case "permin":
						dotSum[dot.source]+=dot.value*passTime;
						break;
					
					case "noless":
						if (Csource[dot.source][0]+1<dot.inf){
							dotSum[dot.source]+=dot.value*passTime;
						}
						break;
					
					case "nohigher":
						if (Csource[dot.source][0]+1>dot.inf){
							dotSum[dot.source]+=dot.value*passTime;
						}
						break;
					
					case "keep":
						if (Csource[dot.source][0]+1!=dot.inf){
							dotSum[dot.source]+=dot.value*passTime;
						}
						break;
					
					case "fix":
						break;
				
					default:
						break;
				}
			}
			else if (D.basekey.includes(dot.source)){
				switch (dot.type) {
					case "once":
						baseDotSum[dot.source]+=dot.value;
						//Ctags.del(tag)
						break;
		
					case "permin":
						baseDotSum[dot.source]+=dot.value*passTime;
						break;
					
					case "noless":
						if (CBase[dot.source][0]<dot.inf){
							baseDotSum[dot.source]+=dot.value*passTime;
						}
						break;
					
					case "nohigher":
						if (CBase[dot.source][0]+1>dot.inf){
							baseDotSum[dot.source]+=dot.value*passTime;
						}
						break;
					
					case "keep":
						if (CBase[dot.source][0]+1!=dot.inf){
							baseDotSum[dot.source]+=dot.value*passTime;
						}
						break;
					
					case "fix":
						break;
				
					default:
						break;
				}
			}
		})
	}

	Object.keys(dotSum).forEach((key)=>{
		let value = dotSum[key];
		chara.source[key] += value;
	})
	Object.keys(baseDotSum).forEach((key)=>{
		let value = baseDotSum[key];
		chara.basesource[key] += value;
	})
}

F.blankDotSum = function(){
	let dotSum = {};
	for (let key in D.palam){
		dotSum[key] = 0
	}
	return dotSum
}
F.blankBaseDotSum = function(){
	let dotSum ={}
	for (let key in D.basekey){
		dotSum[D.basekey[key]] = 0
	}
	return dotSum
}