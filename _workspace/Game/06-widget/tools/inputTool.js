F.Textbox = function(args){
    const { id, minlen, maxlen, size, on, value, inp } = args
    const txt = `type='text' `
            +(id? `id='${id}' ` : '')
            +(minlen? `minlength='${minlen}' ` : '')
            +(maxlen? `maxlength='${maxlen}' ` : '')
            +(size? `size='${size}' ` : '')
            +(on? `onchange='${on}' `: '')
            +(inp? `oninnput='${inp}' `:'')
            +(value? `value='${value}' `: '')

    return `<<print "<input ${txt} >" >>`
}

F.Intbox = function(args){
    const { id, minlen, maxlen, size, on, value, inp } = args
    const txt = `type='text' `
            +(id? `id='${id}' ` : '')
            +(minlen? `minlength='${minlen}' ` : '')
            +(maxlen? `maxlength='${maxlen}' ` : '')
            +(size? `size='${size}' ` : '')
            +(on? `onchange='${on}' `: '')
            +(inp? `oninnput='${inp}' `:'')
            +(value? `value='${value}' `: '')

    return `<<print "<input ${txt} >" >>`
}

F.Listbox = function(args){
    const { id, opt, names, on, focus, def } = args
    const h = `<select `
            + (id? `id='${id}' ` : '')
            + (on? `onchange='${on}' ` : '')
            + (focus? ` autofocus` : '' )
            +' >'
        
    const opts = []
    
    let deftxt
    
    for(let i =0; i < opt.length; i++){
        const v = opt[i]
        const txt = `<option value='${v}' ${v==def?  `selected ` : '' }>${names ? names[i] : opt[i] }</option>`

        if(v==def) deftxt = txt;
        else opts.push(txt);
    }

    opts.push(deftxt)

    return `<<print "${h}${opts.join('')}</select>" >>`

}

F.Range = function(args){
    const { id, value, on } = args
    const txt = `<input type='range' ` + (id? `id='${id}' ` : '') + (value? `value='${value}' `:'') + (on? `onchange='${on}' ` : '') + ` class='slider' >`

    return `<<print "${txt}" >>`
}