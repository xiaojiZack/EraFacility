F.getSave= function() {
    console.log(Save.get())

}

Save.onSave.add(function (save) {
	/* code to process the save object before it's saved */
    const history = save.state.history
    for (let stage of history){
        console.log(stage)
        for (let index in stage.variables.chara){
            stage.variables.chara[index] = JSON.stringify(stage.variables.chara[index])
        }
        //stage.variables.chara = [1,23,4];
    }
});