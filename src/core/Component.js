import { updateDom } from './Dom';

export class Component {
  constructor(root = '', props = {}) {
    this.componentRoot = root;
    this.eventListeners = [];
    this.children = [];
    this.state = {};
    this.props = props;
  }

  setProps(props) {
    this.props = { ...this.props, ...props };
  }
  setState(newState) {
    if (JSON.stringify(newState) === JSON.stringify(this.state)) return; // state값이 일치했을 때 return
    this.state = {
      ...this.state,
      ...newState,
    }; // state 변경해주고
    this.render();
  }

  addChild(child, ...args) {
    const component = new child(...args);
    this.children.push(component);
    return component;
  }

  render() {
    updateDom(this);
  }

  template() {}

  setEvent() {}

  clearEvent() {
    this.eventListeners.map(({ eventType, eventListener }) => {
      this.componentRoot.removeEventListener(eventType, eventListener);
    });
    this.eventListeners = [];
  }

  addEvent(eventType, selector, callback) {
    const getTarget = (eventDom) => {
      const targets = [...this.componentRoot.querySelectorAll(selector)];
      if (targets.includes(eventDom)) return eventDom;
    };

    const eventListener = (event) => {
      const target = getTarget(event.target);
      if (!target) return;
      callback(event, target);
    };

    this.componentRoot.addEventListener(eventType, eventListener);
    this.eventListeners.push({
      eventType,
      eventListener,
    });
  }

  mounted() {}
}
