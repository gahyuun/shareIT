import { updateElement } from './diff';

let oldComponent;

export function enrollEvent(component) {
  component.setEvent();
  component.children.map((child) => {
    child.setEvent();
  });
}
export function mounted(component) {
  component.mounted();
  component.children.map((child) => {
    child.mounted();
  });
}
export function clearEvent(component) {
  component.clearEvent();
  component.children.map((child) => {
    child.clearEvent();
  });
}

export function updateDom(component) {
  const { componentRoot } = component;
  clearEvent(component);

  const newNode = componentRoot.cloneNode(true);
  newNode.innerHTML = component.template();

  const oldChildNodes = [...componentRoot.childNodes];
  const newChildNodes = [...newNode.childNodes];

  const max = Math.max(oldChildNodes.length, newChildNodes.length);
  for (let i = 0; i < max; i++) {
    updateElement(componentRoot, newChildNodes[i], oldChildNodes[i]);
  }
  enrollEvent(component);
  mounted(component);
} // 리렌더링

export function createDom(component) {
  const { componentRoot } = component;
  if (oldComponent) {
    clearEvent(oldComponent);
  }
  oldComponent = component;

  const newNode = componentRoot.cloneNode(true);
  newNode.innerHTML = component.template();
  const oldChildNodes = [...componentRoot.childNodes];
  const newChildNodes = [...newNode.childNodes];
  const max = Math.max(oldChildNodes.length, newChildNodes.length);

  for (let i = 0; i < max; i++) {
    updateElement(componentRoot, newChildNodes[i], oldChildNodes[i]);
  }
  enrollEvent(component);
  mounted(component);
} // 렌더링
