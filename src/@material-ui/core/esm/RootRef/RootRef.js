import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { exactProp } from '@material-ui/utils';
import { setRef } from '../utils/reactHelpers';
/**
 * ⚠️⚠️⚠️
 * If you want the DOM element of a Material-UI component check out
 * [/getting-started/faq/#how-can-i-access-the-dom-element](FAQ: How can I access the DOM element?)
 * first.
 *
 * This component uses `findDOMNode` which is deprecated in React.StrictMode.
 *
 * Helper component to allow attaching a ref to a
 * wrapped element to access the underlying DOM element.
 *
 * It's highly inspired by https://github.com/facebook/react/issues/11401#issuecomment-340543801.
 * For example:
 * ```jsx
 * import React from 'react';
 * import RootRef from '@material-ui/core/RootRef';
 *
 * class MyComponent extends React.Component {
 *   constructor() {
 *     super();
 *     this.domRef = React.createRef();
 *   }
 *
 *   componentDidMount() {
 *     console.log(this.domRef.current); // DOM node
 *   }
 *
 *   render() {
 *     return (
 *       <RootRef rootRef={this.domRef}>
 *         <SomeChildComponent />
 *       </RootRef>
 *     );
 *   }
 * }
 * ```
 */

var RootRef =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RootRef, _React$Component);

  function RootRef() {
    _classCallCheck(this, RootRef);

    return _possibleConstructorReturn(this, _getPrototypeOf(RootRef).apply(this, arguments));
  }

  _createClass(RootRef, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.ref = ReactDOM.findDOMNode(this);
      setRef(this.props.rootRef, this.ref);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var ref = ReactDOM.findDOMNode(this);

      if (prevProps.rootRef !== this.props.rootRef || this.ref !== ref) {
        if (prevProps.rootRef !== this.props.rootRef) {
          setRef(prevProps.rootRef, null);
        }

        this.ref = ref;
        setRef(this.props.rootRef, this.ref);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.ref = null;
      setRef(this.props.rootRef, null);
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return RootRef;
}(React.Component);

process.env.NODE_ENV !== "production" ? RootRef.propTypes = {
  /**
   * The wrapped element.
   */
  children: PropTypes.element.isRequired,

  /**
   * Provide a way to access the DOM node of the wrapped element.
   * You can provide a callback ref or a `React.createRef()` ref.
   */
  rootRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired
} : void 0;

if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_ENV !== "production" ? RootRef.propTypes = exactProp(RootRef.propTypes) : void 0;
}

export default RootRef;