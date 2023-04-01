F.summonChara = function () {};

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
