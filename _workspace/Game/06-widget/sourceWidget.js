F.sourceGet = function(cid,palam,value){
	C[cid].source[palam] += value;
	F.sourceCheck(C[cid],cid);
	F.sourceUp(C[cid]);
	F.refrashSideBar();
	return "";
}
DefineMacros("sourceGet", F.sourceGet)