import React from "react";
import ReactDOM from "react-slim-dom/cjs/react-dom.production.min.js";

import { getDeepestFirstChild } from "../utils";

class SlimEventTest extends React.Component {
  state = { counter: 0 };
  increment = () =>
    this.setState(s => ({ counter: s.counter + 1 }), this.props.called);

  render() {
    const { depth, called } = this.props;
    const recurse =
      depth > 1 ? <SlimEventTest depth={depth - 1} called={called} /> : null;

    return (
      <div onClick={this.increment} onClickCapture={this.increment}>
        {recurse}
      </div>
    );
  }
}

export default root => {
  return () => {
    let calls = 0;
    let called = () => calls++;

    ReactDOM.render(<SlimEventTest depth={100} called={called} />, root);

    const element = getDeepestFirstChild(root);
    for (let i = 0; i < 100; i++) {
      element.click();
    }

    ReactDOM.unmountComponentAtNode(root);

    // Sanity test.
    if (calls !== 20000) {
      throw new Error();
    }
  };
};
