//--------------------------------------------------
// declare zone
//--------------------------------------------------
declare var msg_end: HTMLElement;
declare var T: typeof window.T;

//--------------------------------------------------
//
// function
//
//--------------------------------------------------

export const flow = function (text: string, time = 60, hasDashline?) {
	let dashline = hasDashline ? "<<dashline>>" : "";
	new Wikifier(null, `<<append #contentMsg transition>><<timed ${time}ms>>${text}${dashline}<</timed>><</append>>`);

	setTimeout(() => {
		msg_end.scrollIntoView();
	}, time);

	msg_end.scrollIntoView();
};

export const clearComment = function (text) {
	//clean the comment like <!-- --> or /* */
	return text.replace(/<!--[\s\S]*?-->/g, "").replace(/\/\*[\s\S]*?\*\//g, "");
};

export const converTxt = function (text) {
	const trans = function (t) {
		let script = false;

		//clean the comment
		t = clearComment(t);

		//clean the <fr> tag trans to <br>
		if (t.includes("<fr>")) {
			t = t.replace("<fr>", "<br>");
		}
		//if is script zone, skip it until the end of the script
		if ((t.includes("<script") && !t.includes("/script")) || (t.includes("<<run") && !t.includes(">>"))) {
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
			//add a <br> tag to the end of the line if the line is not a macro or don't have a <br> tag
			if (!t.match(/<<if|<<select|<<case|<<\/|<<switch|<<else|<<run|<script|<br>/)) {
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

export const setMsg = function (msg: string, add?) {
	if (!T.msg) T.msg = [];

	if (add) {
		if (!T.msg.length) T.msg[0] = "";
		T.msg[T.msg.length - 1] += msg;
	} else if (msg.includes("<fr>")) {
		T.msg = T.msg.concat(msg.split("<fr>"));
	} else {
		T.msg.push(msg);
	}
};

export const resetMsg = function () {
	T.msg = [];
	T.msgId = 0;
	T.noMsg = 0;
};

export const clearMsg = function(){
	if (document.getElementById("contentMsg")) {
		const element = document.getElementById("contentMsg");
		element.innerHTML = "";
	  } else {
		console.log("无法清空Msg，可能是Msg不存在");
	  }
}

export const errorView = function (text: string) {
	return `<div class='error-view'><span class='error'>${text}</span></div>`;
};
