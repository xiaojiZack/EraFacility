//------------------------------------------------------------------------
//
//  Dialog system
//
//------------------------------------------------------------------------
/**
 * @name Dialogs
 * @description
 * A dialog system for handle dialog flow and selection
 */
class Dialogs {
	constructor(title) {
		const raw = scEra.getPsg(title).split("\n");
		this.logs = [];
		this.option = {
			title,
			phase: 0,
			next: "Next",
			end: "End",
		};
		this.init(raw);

		if (Config.debug) console.log(this.logs);
	}
	/*--------------------------------------------
	 *  init the dialog
	 *--------------------------------------------*/
	init(raw) {
		let config,
			text = [];
		//parse the event text and clean the comment
		raw.forEach((line) => {
			//if the line is a config, then parse it
			if (line[0] === "#") {
				config = JSON.parse(line.replace("#:", "")) || {};
			} else if (line.match(/^\/\*(.+)\*\/$/)) {
				//clean comment
			} else {
				text.push(line);
			}
			if (line === "<fr>" || raw[raw.length - 1] === line) {
				this.logs.push({ text, config });
				config = {};
				text = [];
			}
		});

		this.option.phase = this.logs.length;
	}
	//-----------------------------------------------------------------------
	/**
	 * @name Dialog.wiki
	 * @description
	 * Wikify the dialog and config.
	 * during the wikify process, the dialog will be added to the history automatically.
	 * the next button text will be set automatically.
	 * if the dialog is the last one, then the config will be stored to the msg.
	 * @param {{text:string[] config}} dialog
	 * @param {number} id
	 */
	//---------------------------------------------------------------------
	static wiki(dialog, id) {
		if (!dialog) {
			slog("warn", "Error on wikify the dialog: the dialog is undefined or null:", dialog, S.msg, id);
		}

		let config = dialog.config || {};
		let txt = P.txt(dialog.text);

		//add to history
		S.history.push(txt);

		//set the next button text
		const { type = "", next = "Next", code = "" } = config;

		const select = new SelectCase();
		select.else(next).case("return", "Back").case("jump", "End").case(["endPhase", "endEvent", "end"], "Continue");

		V.event.next = select.has(type);

		//if is the last msg, then store the config to the msg
		if (id === S.msg.logs.length - 1) {
			S.msg.config = config;
		}

		//wikify the text
		P.flow(txt);

		//if has twine code and not history mode, then wikify the code
		if (code && V.mode !== "history") {
			new Wikifier("#hidden", code);
		}
	}
	/*---------------------------------------------------------------
	 *
	 * init the event scene
	 *
	 *-------------------------------------------------------------*/
	static InitScene(first) {
		const e = V.event;
		let title = e.fullTitle;

		if (e.ep) {
			title += `_ep${e.ep}`;
			Dialogs.record("ep", `ep${e.ep}`);
		}

		if (e.sp) {
			title += `:sp${e.sp}`;
			Dialogs.record("sp", `sp${e.sp}`);
		}

		console.log("InitScene", title);

		S.msg = new Dialogs(title);
		T.eventTitle = title;

		const log = S.msg.logs[0];
		if (!log) return "";

		this.wiki(log, 0);

		T.msgId = 0;
	}

	static trigger() {
		//set a onclick event to the div
		$("#contentMsg").on("click", function () {
			Dialogs.next();
		});

		//when MsgEnd trigger, then flow to next chapter
		$("dialog").on("MsgEnd", function () {
			Dialogs.nextScene();
		});

		//trun a trigger
		$("dialog").trigger("initScene", [T.eventTitle, V.event, S.msg]);
	}

	/*---------------------------------------------------------------
	 *
	 * handle the flow when click on the contents panel or next button
	 *
	 *-------------------------------------------------------------*/
	static next() {
		//if the select is waiting for user input, then return
		if (T.selectwait) {
			return;
		}
		//if after select but not the end of msg, then return wait for the next msg
		if (T.afterselect && T.msgId < S.msg.logs.length - 1) {
			delete T.afterselect;
			return;
		}

		T.msgId++;
		let dialog = S.msg.logs[T.msgId];

		//if is the end of msg, then flow to next chapter
		if (T.msgId < S.msg.logs.length) {
			this.wiki(dialog, T.msgId);
		}
		//if is the end of msg, then turn on a trigger
		else {
			$("dialog").trigger("MsgEnd");
			return;
		}
	}
	/*---------------------------------------------------------------
	 *
	 * on the end of msg.
	 *
	 * -------------------------------------------------------------*/
	static nextScene() {
		const e = V.event;
		const config = S.msg.config;
		const { type = "end", exit = S.defaultExit, exitButton = "Next Step" } = config;

		console.log("nextScene", type, config, e, V.selectId);

		switch (type) {
			case "return":
				this.return(config);
				break;
			case "jump":
				this.jump(config);
				break;
			case "endPhase":
				this.endPhase(config);
				break;
			case "selectEnd":
				e.lastId = V.selectId;
				e.sp = V.selectId;
				this.InitScene();
				break;
			default:
				e.next = exitButton;
				e.exit = exit;
				V.mode = "normal";
				new Wikifier("#hidden", `<<goto 'EventEnd'>>`);
		}
	}
	/*---------------------------------------------------------------
	 * return to the last ep
	 * usually used in the end of sp, then back to the last selection
	 * -------------------------------------------------------------*/
	static return(config) {
		const e = V.event;
		const { phase } = config;
		if (phase) T.msgId = phase;

		e.sp = 0;
		e.lastId = V.selectId;
		V.selectId = 0;

		this.InitScene();
	}
	/*---------------------------------------------------------------
	 * jump to the other event
	 * usually used in the end of ep or sp, then jump to the other event
	 * -------------------------------------------------------------*/
	static jump(config) {
		const e = V.event;
		const setList = ["name", "eid", "ch", "ep"];
		setList.forEach((key) => {
			if (config[key]) e[key] = config[key];
		});

		new Wikifier(null, `<<timed 100ms>><<goto 'EventStart'>><</timed>>`);
	}
	/*---------------------------------------------------------------
	 * end the phase
	 * usually used in the end of ep or sp, then go to next ep or sp
	 * -------------------------------------------------------------*/
	static endPhase(config) {
		const e = V.event;
		const setList = ["name", "eid", "ch", "ep", "sp"];
		let setflag;
		setList.forEach((key) => {
			if (config[key]) {
				e[key] = config[key];
				setflag = true;
			}
		});

		//if doesn't set any branch point, then just goto the next ep
		if (!setflag) {
			e.ep++;
		}

		T.msgId = 0;
		e.lastId = V.selectId;
		V.selectId = 0;

		if (!config.sp) e.sp = 0;

		this.InitScene();
	}
	//---------------------------------------------------------------
	//  record the dialog to the memory
	//  char is the type of the point, like ep, sp, etc.
	//  point is the point of the dialog, like ep1, sp1, etc.
	//---------------------------------------------------------------
	static record(char, point) {
		const { type, id } = V.event;
		let now = point;

		if (char === "sp" && V.event.ep) {
			now = `ep${V.event.ep}:` + point;
		}

		let memory = setPath(V, `memory.${type}.${id}`);
		if (!memory || !memory[point]) {
			setPath(V, `memory.${type}.${id}.${point}`, []);
			memory = setPath(V, `memory.${type}.${id}`);
		}
		if (!memory[point].includes(now)) {
			memory[point].push(now);
		}
	}
}

window.Dialogs = Dialogs;

P.flow = function (text, time = 60, hasDashline) {
	let dashline = hasDashline ? "<<dashline>>" : "";
	new Wikifier(null, `<<append #contentMsg transition>><<timed ${time}ms>>${text}${dashline}<</timed>><</append>>`);

	setTimeout(() => {
		msg_end.scrollIntoView();
	}, time);

	msg_end.scrollIntoView();
};

P.clearComment = function (text) {
	return text.replace(/\s/g, "").replace(/\/\*(.+)\*\//g, "");
};

/**
 * @name P.txt
 * @description convert text
 * @param {string | string[]} text
 */
P.txt = function (text) {
	const trans = function (t) {
		let script = false;

		//clean the comment
		t = P.clearComment(t);

		//clean the <fr> tag trans to <br>
		if (t.includes("<fr>")) {
			t = t.replace("<fr>", "<br>");
		}
		//if is script zone, skip it until the end of the script
		else if ((t.includes("<script") && !t.includes("/script")) || (t.includes("<<run") && !t.includes(">>"))) {
			script = true;
		}
		//
		else if (script && t.has("/script", ">>")) {
			script = false;
		}
		//
		else if (script) {
			//skip the script zone
		}
		//
		else {
			//add a <br> tag to the end of the line if the line is not a macro
			if (!t.match(/<<if|<<select|<<case|<<\/|<<switch|<<else|<<run|<script/)) {
				t += "<br>";
			}
		}

		return t;
	};

	//start to convert the text

	//if the text is a string and not include \n, then convert it
	if (typeof text === "string" && !text.includes("\n")) {
		return trans(text);
	}
	//if the text is a string and include \n, then split it
	else if (typeof text === "string") {
		text = text.split("\n");
	}

	const txt = [];

	for (let i = 0; i < text.length; i++) {
		txt[i] = trans(text[i]);
	}

	return txt.join("");
};
