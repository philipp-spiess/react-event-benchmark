import React from "react";
// ReactSlimDOM is a custom react-dom build with all event related logic
// removed. It weights 30% less (hence "slim"). It only contains the
// production build so we also need to import the production build of
// react-dom above.
import ReactSlimDOM from "react-slim-dom";

import { getDeepestFirstChild, noop } from "../utils";

class NativeEventTest extends React.Component {
  ref = React.createRef();
  componentDidMount() {
    this.ref.current.addEventListener("click", noop);
    this.ref.current.addEventListener("click", noop, true);
  }
  componentWillUnmount() {
    this.ref.current.removeEventListener("click", noop);
    this.ref.current.removeEventListener("click", noop, true);
  }
  render() {
    const { depth } = this.props;
    const recurse = depth > 1 ? <NativeEventTest depth={depth - 1} /> : null;

    return <div ref={this.ref}>{recurse}</div>;
  }
}

export default (root, elementDepth) => {
  return () => {
    ReactSlimDOM.render(<NativeEventTest depth={elementDepth} />, root);

    const element = getDeepestFirstChild(root);
    element.dispatchEvent(new Event("click", { bubbles: true }));

    ReactSlimDOM.unmountComponentAtNode(root);
  };
};
