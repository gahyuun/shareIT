import { Component } from './src/core/Component';
import Header from './src/components/Header';

export default class App extends Component {
  template() {
    const header = this.addChild(Header);
    return `<router-view>${header.template()}</router-view>`;
  }
}
