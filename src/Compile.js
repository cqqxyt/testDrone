

import generate from './generate'
export const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

// Regular Expressions for parsing tags and attributes
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
const doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being passed as HTML comment when inlined in page
const comment = /^<!\--/;
const conditionalComment = /^<!\[/;

const regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
class Compile {
  constructor(template, data) {
    this.compileToFunctions(template);
  }
  compileToFunctions(template) {
    const templateNode = parseHTML(template);
    generate(templateNode)
    return templateNode
  }
}

function createAst(tagName, attrs) {
  return {
    tag: tagName,
    type: 1,
    children: [],
    parent: null,
    attrs: attrs,
  };
}

let root,
  currentParent,
  stack = [];
//[div]
function handleStart(tag) {
  const node = createAst(tag.tagName, tag.attrs);
  //   console.log(node);
  if (!root) {
    root = node;
  }
  currentParent = node;
  stack.push(node);
}

function handleEnd(tag) {
  let element = stack.pop();
  currentParent = stack[stack.length - 1];
  if (currentParent) {
    element.parent = currentParent;
    currentParent.children.push(element);
  }
}
function chars(text) {
  if (!text) {
    return;
  }
  text = text.replace(/\s/g, "");
  const node = {
    type: 3,
    text,
  };
  currentParent.children.push(node);
}

function parseHTML(html) {
  // "   <template id='test'>testtest<div>{{title}}</div></template>"
  var index = 0;
  while (html) {
    let textEnd = html.indexOf("<");
    if (textEnd === 0) {
      const start = parseStartMatch();
      if (start) {
        handleStart(start);
        continue;
      }

      const end = html.match(endTag);
      if (end) {
        handleEnd(end);
        advance(end[0].length);
        continue;
      }
    }

    let text;
    if (textEnd >= 0) {
      text = html.substring(0, textEnd);
      chars(text);
      advance(text.length);
    }
    if (textEnd < 0) {
      text = html;
    }
  }

  function advance(n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartMatch() {
    const start = html.match(startTagOpen);
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
        index: index,
      };
      advance(start[0].length);
      let close, attr;
      while (
        !(close = html.match(startTagClose)) &&
        (attr = html.match(attribute))
      ) {
        attr.start = index;
        advance(attr[0].length);
        attr.end = index;
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5],
        });
      }
      if (close) {
        advance(close[0].length);
        match.end = index;
      }
      return match;
    }
  }

  return root
}

export default Compile