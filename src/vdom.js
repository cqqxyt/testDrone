export function createDom(node) {
  let { tag, children, text, data } = node;
  if (typeof tag === "string") {
    node.el = document.createElement(tag);
    Object.keys(data).map((item) => {
      node.el.setAttribute(item, data[item]);
    });
    children.forEach((child) => {
      node.el.appendChild(createDom(child));
    });
  } else {
    node.el = document.createTextNode(text);
  }
  return node.el;
}

export function createElement(tag, data = {}, ...children) {
  return VNode(tag, data, children);
}

export function createText(text) {
  return VNode(undefined, undefined, undefined, text);
}

export function VNode(
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  return {
    tag,
    data,
    children,
    text,
    elm,
    context,
    componentOptions,
    asyncFactory,
  };
}
