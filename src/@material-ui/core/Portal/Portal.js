"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("@material-ui/utils");

var _reactHelpers = require("../utils/reactHelpers");

function getContainer(container) {
  container = typeof container === 'function' ? container() : container; // #StrictMode ready

  return _reactDom.default.findDOMNode(container);
}

var useEnhancedEffect = typeof window !== 'undefined' ? _react.default.useLayoutEffect : _react.default.useEffect;
/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */

var Portal = _react.default.forwardRef(function Portal(props, ref) {
  var children = props.children,
      container = props.container,
      _props$disablePortal = props.disablePortal,
      disablePortal = _props$disablePortal === void 0 ? false : _props$disablePortal,
      onRendered = props.onRendered;

  var _React$useState = _react.default.useState(null),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      mountNode = _React$useState2[0],
      setMountNode = _React$useState2[1];

  var childRef = _react.default.useRef(null);

  var handleRef = (0, _reactHelpers.useForkRef)(children.ref, childRef);
  useEnhancedEffect(function () {
    if (!disablePortal) {
      setMountNode(getContainer(container) || document.body);
    }
  }, [container, disablePortal]);

  _react.default.useImperativeHandle(ref, function () {
    return mountNode || childRef.current;
  }, [mountNode]);

  useEnhancedEffect(function () {
    if (onRendered && mountNode) {
      onRendered();
    }
  }, [mountNode, onRendered]);

  if (disablePortal) {
    _react.default.Children.only(children);

    return _react.default.cloneElement(children, {
      ref: handleRef
    });
  }

  return mountNode ? _reactDom.default.createPortal(children, mountNode) : mountNode;
});

process.env.NODE_ENV !== "production" ? Portal.propTypes = {
  /**
   * The children to render into the `container`.
   */
  children: _propTypes.default.node.isRequired,

  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func]),

  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: _propTypes.default.bool,

  /**
   * Callback fired once the children has been mounted into the `container`.
   */
  onRendered: _propTypes.default.func
} : void 0;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  Portal['propTypes' + ''] = (0, _utils.exactProp)(Portal.propTypes);
}

var _default = Portal;
exports.default = _default;