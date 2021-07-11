const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

function generate(el){
    let children = genChildren(el)
    console.log(children)
    let code = `_c('${el.tag}',${
        el.attrs.length ? genProps(el.attrs):''
    }${children?','+children:''})`
    // console.log(code)
}
function genChildren(el){
    const children = el.children
    if(children){
        return children.map(child=>{
            return genChild(child)
        }).join(',')
    }
}

function genChild(node){
    let str = ''
    if(node.type===1){
        return generate(node)
    }
    if(node.type===3){
        console.log(node)
        const text = node.text
        if(defaultTagRE.test(text)){//{{title}} aa bb {{test}}   {{title}}->_s(_v(title))+_v('aa')+_v('bb')_s(_v(test))
            let tokens = []
            let match = '',index = 0 ,lastIndex = defaultTagRE.lastIndex
            console.log('lastIndex',lastIndex)
            while(match = defaultTagRE.exec(text)){
                console.log('text',text.slice(index, lastIndex))
                tokens.push(JSON.stringify(text.slice(index, lastIndex)))
                index = match.index
                lastIndex = defaultTagRE.lastIndex
                console.log('index', index)
                console.log(' defaultTagRE.lastIndex', defaultTagRE.lastIndex)
            }
            console.log( tokens)
            return `_s(_v(${text}))`
        }else{
            return `_v(${JSON.stringify(text)})`
        }
    }

    return str
}
function genProps(attrs){
    let obj = {}
    attrs.forEach(element => {
        if(element.name === 'style'){
            let styles = {}
            obj[element.name] = `{${element.value}}`
        }else{
            obj[element.name] = element.value
        }
    });
    return JSON.stringify(obj)
}
//"<template id='test'>testtest<div style='color:red'>{{title}} aa bb {{test}}</div></template>"
//_c('div',{id:'test'},_t("testtest"),_c('style',{style:{color:red}},_s(_v{title})))

export default generate