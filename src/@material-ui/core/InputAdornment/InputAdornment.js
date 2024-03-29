"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _warning = _interopRequireDefault(require("warning"));

var _Typography = _interopRequireDefault(require("../Typography"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _withFormControlContext = _interopRequireDefault(require("../FormControl/withFormControlContext"));

var _FormControlContext = _interopRequireDefault(require("../FormControl/FormControlContext"));

var styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    height: '0.01em',
    // Fix IE 11 flexbox alignment. To remove at some point.
    maxHeight: '2em',
    alignItems: 'center'
  },

  /* Styles applied to the root element if `variant="filled"`. */
  filled: {
    '&$positionStart': {
      marginTop: 16
    }
  },

  /* Styles applied to the root element if `position="start"`. */
  positionStart: {
    marginRight: 8
  },

  /* Styles applied to the root element if `position="end"`. */
  positionEnd: {
    marginLeft: 8
  },

  /* Styles applied to the root element if `disablePointerEvents=true`. */
  disablePointerEvents: {
    pointerEvents: 'none'
  }
};
exports.styles = styles;

var InputAdornment = _react.default.forwardRef(function InputAdornment(props, ref) {
  var children = props.children,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      classes = props.classes,
      className = props.className,
      _props$disablePointer = props.disablePointerEvents,
      disablePointerEvents = _props$disablePointer === void 0 ? false : _props$disablePointer,
      _props$disableTypogra = props.disableTypography,
      disableTypography = _props$disableTypogra === void 0 ? false : _props$disableTypogra,
      muiFormControl = props.muiFormControl,
      position = props.position,
      variantProp = props.variant,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "component", "classes", "className", "disablePointerEvents", "disableTypography", "muiFormControl", "position", "variant"]);
  var variant = variantProp;

  if (variantProp && muiFormControl) {
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(variantProp !== muiFormControl.variant, 'Material-UI: The `InputAdornment` variant infers the variant property ' + 'you do not have to provide one.') : void 0;
  }

  if (muiFormControl && !variant) {
    variant = muiFormControl.variant;
  }

  return _react.default.createElement(_FormControlContext.default.Provider, {
    value: null
  }, _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className, variant === 'filled' && classes.filled, position === 'start' && classes.positionStart, position === 'end' && classes.positionEnd, disablePointerEvents && classes.disablePointerEvents),
    ref: ref
  }, other), typeof children === 'string' && !disableTypography ? _react.default.createElement(_Typography.default, {
    color: "textSecondary"
  }, children) : children));
});

process.env.NODE_ENV !== "production" ? InputAdornment.propTypes = {
  /**
   * The content of the component, normally an `IconButton` or string.
   */
  children: _propTypes.default.node.isRequired,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * Disable pointer events on the root.
   * This allows for the content of the adornment to focus the input on click.
   */
  disablePointerEvents: _propTypes.default.bool,

  /**
   * If children is a string then disable wrapping in a Typography component.
   */
  disableTypography: _propTypes.default.bool,

  /**
   * @ignore
   */
  muiFormControl: _propTypes.default.object,

  /**
   * The position this adornment should appear relative to the `Input`.
   */
  position: _propTypes.default.oneOf(['start', 'end']),

  /**
   * The variant to use.
   * Note: If you are using the `TextField` component or the `FormControl` component
   * you do not have to set this manually.
   */
  variant: _propTypes.default.oneOf(['standard', 'outlined', 'filled'])
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiInputAdornment'
})((0, _withFormControlContext.default)(InputAdornment));

exports.default = _default;