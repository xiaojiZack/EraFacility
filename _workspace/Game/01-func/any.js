//在05-system\mapSystem.js内定义
F.summonChara = function () {};

//在05-system\timeSystem.js内定义
F.passtime = function () {};

F.charaEvent = function() {};

F.you = function () {
	return C[V.pc].callname?C[V.pc].callname:C[V.pc].name;
};
DefineMacros("you", F.you);

F.dashline = function () {
	return "----------------------------------------";
};
DefineMacros("dashline", F.dashline);

F.nameTag = function(cid){
	return "";
}
DefineMacros("nameTag", F.nameTag)
