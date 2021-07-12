const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

function generate(el) {
  let children = genChildren(el);
  let code = `_c('${el.tag}',${el.attrs.length ? genProps(el.attrs) : ""}${
    children ? "," + children : ""
  })`;
  return code;
}

function genChildren(el) {
  const children = el.children;
  if (children) {
    return children.map((child) => {
      return genChild(child);
    });
  }
}

function genChild(node) {
  if (node.type === 1) {
    return generate(node);
  }
  if (node.type === 3) {
    const text = node.text;
    //{{title}} aa bb {{message}}  {{a.b}}   {{title}}->_v(_s(title)+'aa'+'bb'+_s(test))
    const tokens = [];
    const rawTokens = [];
    let match = "",
      tokenValue = "",
      index = 0,
      lastIndex = defaultTagRE.lastIndex;
    while ((match = defaultTagRE.exec(text))) {
      index = match.index;
      if (index > lastIndex) {
        rawTokens.push((tokenValue = text.slice(lastIndex, index)));
        tokens.push(JSON.stringify(tokenValue));
      }
      const exp = match[1].trim();
      tokens.push(`_s(${exp})`);
      rawTokens.push({ "@binding": exp });
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
      rawTokens.push((tokenValue = text.slice(lastIndex)));
      tokens.push(JSON.stringify(tokenValue));
    }

    if (tokens.length === 0) {
      return `_v(${JSON.stringify(text)})`;
    } else {
      return `_v(${tokens.join("+")})`;
    }
  }
}
function genProps(attrs) {
  let obj = {};
  attrs.forEach((element) => {
    if (element.name === "style") {
      let styles = {};
      obj[element.name] = `${element.value}`;
    } else {
      obj[element.name] = element.value;
    }
  });
  return JSON.stringify(obj);
}
//"<template id='test'>testtest<div style='color:red'>{{title}} aa bb {{test}}</div></template>"
//_c('div',{id:'test'},_t("testtest"),_c('style',{style:{color:red}},_s(_v{title})))

export default generate;
