F.RGBdec2hex = function(red,bule,green){
    let text = "#";
    const RGB = [red,bule,green]
    for (let v in RGB){
        let shu = RGB[v].toString(16);
        if (shu.length<2){
            shu='0'+shu
        }
        text+=shu;
    }
    return text;
}

F.Progressbar = function(args){
    const {id, value,max,width,height,color,backColor} =args
    let text ="";
    if (id){
        text = text+`<style>`
        +`#${id} {`
        +(width? `width:${width};`:'')
        +(height? `height:${height};`:'')
        +(color?`color:'${color}';`:'')
        +(backColor?`background-color:${backColor};`:'')
        +`}`
        +(color?`#${id}::-moz-progress-bar { background: ${color}; }`:'')
        +(backColor?`#${id}::-webkit-progress-bar { background: ${backColor}; }`:'')
        +(color?`#${id}::-webkit-progress-value { background: ${color}; }`:'')
        +`</style>`
    }
    text = text+`<progress `
        +(id?`id = '${id}'`:``)
        +(value?` value=${value}`:` `)
        +(max?` max=${max}`:` `)
        +`></progress>`
    
    return `<<print "${text}" >>`
}