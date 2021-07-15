import { createDom } from "./vdom";
import Watcher from "./watcher";

export function lifecycle(vm) {
  vm.prototype._update = function(vnode) {
    const prenode = vm._vnode;
    if (!prenode) {
      this.$el = patch(this.$el, vnode);
    } else {
      this.$el = patch(prenode, vnode);
    }
    vnode.el = this.$el;
    vm._vnode = vnode;
  };
}

function patch(oldDom, vnode) {
  let dom;
  if (oldDom.nodeType) {
    const parent = oldDom.parentNode;
    dom = createDom(vnode);
    parent.replaceChild(dom, oldDom);
    // parent.insertBefore(dom, oldDom.nextSiblings);
    // parent.removeChild(oldDom);
  } else {
    //diff
    //节点标签不同 div->p 直接替换就结束
    if (oldDom.tag !== vnode.tag) {
      oldDom.el.parentNode.replaceChild(createDom(vnode), oldDom.el);
    }
    //内容不同
    if (oldDom.text !== vnode.text) {
      oldDom.el.textContent = vnode.text;
    }
    //属性不同 挨个对比
    let el = (vnode.el = oldDom.el);
    updateProtites(oldDom.data, vnode);

    //更新儿子
    //老的有儿子，新的也有儿子 dom-diff

    const oldChildren = oldDom.children || [];
    const newChildren = vnode.children || [];
    if (oldChildren.length > 0 && newChildren.length > 0) {
      updateChildren(el, oldChildren, newChildren);
    } else if (oldChildren.length > 0) {
      //老的有儿子，新的没有儿子，删除
      el.innerHtml = "";
    } else if (newChildren.length > 0) {
      //老的没儿子，新的有儿子，插入
      newChildren.forEach((child) => {
        el.appendChild(createDom(child));
      });
    }
  }
  return dom;
}
function updateChildren(el, oldChildren, newChildren) {
  let oldStartIndex = 0,
    oldEndIndex = oldChildren.length - 1;
  let newStartIndex = 0,
    newEndIndex = newChildren.length - 1;
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (isSameVNode(oldChildren[oldStartIndex], newChildren[newStartIndex])) {
      patch(oldChildren[oldStartIndex], newChildren[newStartIndex]);
      oldStartIndex++;
      newStartIndex++;
    } else if (
      isSameVNode(oldChildren[oldEndIndex], newChildren[newEndIndex])
    ) {
      patch(oldChildren[oldEndIndex], newChildren[newEndIndex]);
      oldEndIndex--;
      newEndIndex--;
    }
  }

  if (newStartIndex <= newEndIndex) {
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      const nextEle = newChildren[newEndIndex + 1]
        ? newChildren[newEndIndex + 1].el
        : null;
      if (nextEle) {
        el.insertBefore(createDom(newChildren[i]), nextEle);
      } else {
        el.appendChild(createDom(newChildren[i]));
      }
    }
  }
}

function isSameVNode(oldVnode, newVnode) {
  return oldVnode.tag === newVnode.tag && oldVnode.key === newVnode.key;
}
function updateProtites(oldProps, vnode) {
  const newProps = vnode.data;
  let el = vnode.el;

  //老的有，新的没有
  for (let key in oldProps) {
    if (!newProps[key]) {
      el.removetAttribute(key);
    }
  }
  //老的没有，新的有
  for (let key in newProps) {
    el.setAttribute(key, newProps[key]);
  }
}
export function mountComponent(vm, el) {
  vm.$el = el;
  let updateComponent = function() {
    vm._update(vm._render());
  };
  new Watcher(vm, updateComponent);
}
