import React from "react";
// We only have a production build of the "eventless" react-dom to
// compare it with so we have to make sure this is also always using
// the production build.
import ReactDOM from "react-dom/cjs/react-dom.production.min.js";

import { getDeepestFirstChild, noop } from "../utils";

class SyntheticEventTest extends React.Component {
  // Since the other test also requires a ref and attaches cDM and cWU
  // hooks, we mimic this behavior so we don't get false numbers because
  // of the call overhead.
  //
  // The plan is that we can inline a much much easier "event system" in
  // react without using refs, cDM, and cWU.
  ref = React.createRef();
  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    const { depth } = this.props;
    const recurse = depth > 1 ? <SyntheticEventTest depth={depth - 1} /> : null;

    return (
      <div onClick={noop} onClickCapture={noop} ref={this.ref}>
        {recurse}
      </div>
    );
  }
}

export default (root, elementDepth) => {
  return () => {
    ReactDOM.render(<SyntheticEventTest depth={elementDepth} />, root);

    const element = getDeepestFirstChild(root);
    element.dispatchEvent(new Event("click", { bubbles: true }));

    ReactDOM.unmountComponentAtNode(root);
  };
};
