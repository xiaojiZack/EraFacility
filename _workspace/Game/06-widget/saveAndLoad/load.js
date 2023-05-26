Save.onLoad.add(function(save) {
    const history = save.state.history
    for (let stage of history){
        for (let index in stage.variables.chara){
            let data = stage.variables.chara[index]
            data = JSON.parse(data)

            let newchara =new MyChara(index, {});
            stage.variables.chara[index] = Object.assign(newchara,data)
            
            // load body organ
            for (let part in stage.variables.chara[index].body){
                let body = stage.variables.chara[index].body;
                let newOrgan = new MyOrgans(body[part]);
                newOrgan = Object.assign(newOrgan,body[part]);
                if (body[part].vessel){
                    let newVessel = new OrganVessel(body[part].vessel);
                    newVessel = Object.assign(newVessel,body[part].vessel)
                    newOrgan.vessel = newVessel;
                }
                body[part] = newOrgan;
            }

            //load equip
            for (let part in stage.variables.chara[index].equip){
                let data = stage.variables.chara[index].equip;
                if (Object.keys(D.equipSlot).includes(part)){
                    if (part == "bottom"){
                        for (let index in data[part]){
                            let newcloth = Items.get(data[part][index].id);
                            newcloth = Object.assign(newcloth,data[part][index]);
                            data[part][index] = newcloth;
                        }
                    }
                    else if (data[part].id != undefined){
                        let newcloth = Items.get(data[part].id)
                        newcloth = Object.assign(newcloth,data[part])
                        data[part] = newcloth;
                    }
                }
            }

            //load tagsManager
            let tags = new CharaTagManager();
            stage.variables.chara[index].tags = Object.assign(tags, stage.variables.chara[index].tags)
        }

        //time event
        let timeEventList = new TimeEventList();
        let data = stage.variables.timeEventList;
        timeEventList = Object.assign(timeEventList,data);
        stage.variables.timeEventList = timeEventList;
    }
})
