"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ScrollbarSize;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _debounce = _interopRequireDefault(require("debounce"));

// < 1kb payload overhead when lodash/debounce is > 3kb.
var styles = {
  width: 99,
  height: 99,
  position: 'absolute',
  top: -9999,
  overflow: 'scroll'
};
/**
 * @ignore - internal component.
 * The component is originates from https://github.com/STORIS/react-scrollbar-size.
 * It has been moved into the core in order to minimize the bundle size.
 */

function ScrollbarSize(props) {
  var onChange = props.onChange,
      other = (0, _objectWithoutProperties2.default)(props, ["onChange"]);

  var scrollbarHeight = _react.default.useRef();

  var nodeRef = _react.default.useRef(null);

  var setMeasurements = function setMeasurements() {
    scrollbarHeight.current = nodeRef.current.offsetHeight - nodeRef.current.clientHeight;
  };

  _react.default.useEffect(function () {
    var handleResize = (0, _debounce.default)(function () {
      var prevHeight = scrollbarHeight.current;
      setMeasurements();

      if (prevHeight !== scrollbarHeight.current) {
        onChange(scrollbarHeight.current);
      }
    }, 166); // Corresponds to 10 frames at 60 Hz.

    window.addEventListener('resize', handleResize);
    return function () {
      handleResize.clear();
      window.removeEventListener('resize', handleResize);
    };
  }, [onChange]);

  _react.default.useEffect(function () {
    setMeasurements();
    onChange(scrollbarHeight.current);
  }, [onChange]);

  return _react.default.createElement("div", (0, _extends2.default)({
    style: styles,
    ref: nodeRef
  }, other));
}

process.env.NODE_ENV !== "production" ? ScrollbarSize.propTypes = {
  onChange: _propTypes.default.func.isRequired
} : void 0;