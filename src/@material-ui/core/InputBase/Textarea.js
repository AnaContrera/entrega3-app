"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _debounce = _interopRequireDefault(require("debounce"));

var _reactHelpers = require("../utils/reactHelpers");

// < 1kb payload overhead when lodash/debounce is > 3kb.
function getStyleValue(computedStyle, property) {
  return parseInt(computedStyle[property], 10) || 0;
}

var useEnhancedEffect = typeof window !== 'undefined' ? _react.default.useLayoutEffect : _react.default.useEffect;
var styles = {
  /* Styles applied to the shadow textarea element. */
  shadow: {
    // Visibility needed to hide the extra text area on iPads
    visibility: 'hidden',
    // Remove from the content flow
    position: 'absolute',
    // Ignore the scrollbar width
    overflow: 'hidden',
    height: '0'
  }
};
/**
 * @ignore - internal component.
 *
 * To make public in v4+.
 */

var Textarea = _react.default.forwardRef(function Textarea(props, ref) {
  var onChange = props.onChange,
      rows = props.rows,
      rowsMax = props.rowsMax,
      style = props.style,
      value = props.value,
      other = (0, _objectWithoutProperties2.default)(props, ["onChange", "rows", "rowsMax", "style", "value"]);

  var _React$useRef = _react.default.useRef(value != null),
      isControlled = _React$useRef.current;

  var inputRef = _react.default.useRef(null);

  var _React$useState = _react.default.useState({}),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];

  var shadowRef = _react.default.useRef(null);

  var handleRef = (0, _reactHelpers.useForkRef)(ref, inputRef);

  var syncHeight = _react.default.useCallback(function () {
    var input = inputRef.current;
    var inputShallow = shadowRef.current;
    var computedStyle = window.getComputedStyle(input);
    inputShallow.style.width = computedStyle.width;
    inputShallow.value = input.value || props.placeholder || 'x'; // The height of the inner content

    var innerHeight = inputShallow.scrollHeight;
    var boxSizing = computedStyle['box-sizing']; // Measure height of a textarea with a single row

    inputShallow.value = 'x';
    var singleRowHeight = inputShallow.scrollHeight; // The height of the outer content

    var outerHeight = innerHeight;

    if (rows != null) {
      outerHeight = Math.max(Number(rows) * singleRowHeight, outerHeight);
    }

    if (rowsMax != null) {
      outerHeight = Math.min(Number(rowsMax) * singleRowHeight, outerHeight);
    }

    outerHeight = Math.max(outerHeight, singleRowHeight);

    if (boxSizing === 'content-box') {
      outerHeight -= getStyleValue(computedStyle, 'padding-bottom') + getStyleValue(computedStyle, 'padding-top');
    } else if (boxSizing === 'border-box') {
      outerHeight += getStyleValue(computedStyle, 'border-bottom-width') + getStyleValue(computedStyle, 'border-top-width');
    }

    setState(function (prevState) {
      // Need a large enough different to update the height.
      // This prevents infinite rendering loop.
      if (outerHeight > 0 && Math.abs((prevState.outerHeight || 0) - outerHeight) > 1) {
        return {
          innerHeight: innerHeight,
          outerHeight: outerHeight
        };
      }

      return prevState;
    });
  }, [setState, rows, rowsMax, props.placeholder]);

  _react.default.useEffect(function () {
    var handleResize = (0, _debounce.default)(function () {
      syncHeight();
    }, 166); // Corresponds to 10 frames at 60 Hz.

    window.addEventListener('resize', handleResize);
    return function () {
      handleResize.clear();
      window.removeEventListener('resize', handleResize);
    };
  }, [syncHeight]);

  useEnhancedEffect(function () {
    syncHeight();
  });

  var handleChange = function handleChange(event) {
    if (!isControlled) {
      syncHeight();
    }

    if (onChange) {
      onChange(event);
    }
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("textarea", (0, _extends2.default)({
    value: value,
    onChange: handleChange,
    ref: handleRef,
    style: (0, _extends2.default)({
      height: state.outerHeight,
      overflow: state.outerHeight === state.innerHeight ? 'hidden' : null
    }, style)
  }, other)), _react.default.createElement("textarea", {
    "aria-hidden": true,
    className: props.className,
    readOnly: true,
    ref: shadowRef,
    tabIndex: -1,
    style: (0, _extends2.default)({}, styles.shadow, style)
  }));
});

process.env.NODE_ENV !== "production" ? Textarea.propTypes = {
  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * @ignore
   */
  onChange: _propTypes.default.func,

  /**
   * @ignore
   */
  placeholder: _propTypes.default.string,

  /**
   * Minimum umber of rows to display.
   */
  rows: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * Maximum number of rows to display.
   */
  rowsMax: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * @ignore
   */
  style: _propTypes.default.object,

  /**
   * @ignore
   */
  value: _propTypes.default.any
} : void 0;
var _default = Textarea;
exports.default = _default;