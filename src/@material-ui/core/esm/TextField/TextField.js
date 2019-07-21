import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import ReactDOM from 'react-dom';
import warning from 'warning';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Input from '../Input';
import FilledInput from '../FilledInput';
import OutlinedInput from '../OutlinedInput';
import InputLabel from '../InputLabel';
import FormControl from '../FormControl';
import FormHelperText from '../FormHelperText';
import Select from '../Select';
import withStyles from '../styles/withStyles';
var variantComponent = {
  standard: Input,
  filled: FilledInput,
  outlined: OutlinedInput
};
var styles = {
  /* Styles applied to the root element. */
  root: {}
};
/**
 * The `TextField` is a convenience wrapper for the most common cases (80%).
 * It cannot be all things to all people, otherwise the API would grow out of control.
 *
 * ## Advanced Configuration
 *
 * It's important to understand that the text field is a simple abstraction
 * on top of the following components:
 *
 * - [FormControl](/api/form-control/)
 * - [InputLabel](/api/input-label/)
 * - [FilledInput](/api/filled-input/)
 * - [OutlinedInput](/api/outlined-input/)
 * - [Input](/api/input/)
 * - [FormHelperText](/api/form-helper-text/)
 *
 * If you wish to alter the properties applied to the `input` element, you can do so as follows:
 *
 * ```jsx
 * const inputProps = {
 *   step: 300,
 * };
 *
 * return <TextField id="time" type="time" inputProps={inputProps} />;
 * ```
 *
 * For advanced cases, please look at the source of TextField by clicking on the
 * "Edit this page" button above. Consider either:
 *
 * - using the upper case props for passing values directly to the components
 * - using the underlying components directly as shown in the demos
 */

var TextField = React.forwardRef(function TextField(props, ref) {
  var autoComplete = props.autoComplete,
      autoFocus = props.autoFocus,
      children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      defaultValue = props.defaultValue,
      error = props.error,
      FormHelperTextProps = props.FormHelperTextProps,
      fullWidth = props.fullWidth,
      helperText = props.helperText,
      id = props.id,
      InputLabelProps = props.InputLabelProps,
      inputProps = props.inputProps,
      InputProps = props.InputProps,
      inputRef = props.inputRef,
      label = props.label,
      multiline = props.multiline,
      name = props.name,
      onBlur = props.onBlur,
      onChange = props.onChange,
      onFocus = props.onFocus,
      placeholder = props.placeholder,
      _props$required = props.required,
      required = _props$required === void 0 ? false : _props$required,
      rows = props.rows,
      rowsMax = props.rowsMax,
      _props$select = props.select,
      select = _props$select === void 0 ? false : _props$select,
      SelectProps = props.SelectProps,
      type = props.type,
      value = props.value,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'standard' : _props$variant,
      other = _objectWithoutProperties(props, ["autoComplete", "autoFocus", "children", "classes", "className", "defaultValue", "error", "FormHelperTextProps", "fullWidth", "helperText", "id", "InputLabelProps", "inputProps", "InputProps", "inputRef", "label", "multiline", "name", "onBlur", "onChange", "onFocus", "placeholder", "required", "rows", "rowsMax", "select", "SelectProps", "type", "value", "variant"]);

  var _React$useState = React.useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      labelWidth = _React$useState2[0],
      setLabelWidth = _React$useState2[1];

  var labelRef = React.useRef(null);
  React.useEffect(function () {
    if (variant === 'outlined') {
      // #StrictMode ready
      var labelNode = ReactDOM.findDOMNode(labelRef.current);
      setLabelWidth(labelNode != null ? labelNode.offsetWidth : 0);
    }
  }, [variant, required]);
  process.env.NODE_ENV !== "production" ? warning(!select || Boolean(children), 'Material-UI: `children` must be passed when using the `TextField` component with `select`.') : void 0;
  var InputMore = {};

  if (variant === 'outlined') {
    if (InputLabelProps && typeof InputLabelProps.shrink !== 'undefined') {
      InputMore.notched = InputLabelProps.shrink;
    }

    InputMore.labelWidth = labelWidth;
  }

  var helperTextId = helperText && id ? "".concat(id, "-helper-text") : undefined;
  var InputComponent = variantComponent[variant];
  var InputElement = React.createElement(InputComponent, _extends({
    "aria-describedby": helperTextId,
    autoComplete: autoComplete,
    autoFocus: autoFocus,
    defaultValue: defaultValue,
    fullWidth: fullWidth,
    multiline: multiline,
    name: name,
    rows: rows,
    rowsMax: rowsMax,
    type: type,
    value: value,
    id: id,
    inputRef: inputRef,
    onBlur: onBlur,
    onChange: onChange,
    onFocus: onFocus,
    placeholder: placeholder,
    inputProps: inputProps
  }, InputMore, InputProps));
  return React.createElement(FormControl, _extends({
    className: clsx(classes.root, classNameProp),
    error: error,
    fullWidth: fullWidth,
    ref: ref,
    required: required,
    variant: variant
  }, other), label && React.createElement(InputLabel, _extends({
    htmlFor: id,
    ref: labelRef
  }, InputLabelProps), label), select ? React.createElement(Select, _extends({
    "aria-describedby": helperTextId,
    value: value,
    input: InputElement
  }, SelectProps), children) : InputElement, helperText && React.createElement(FormHelperText, _extends({
    id: helperTextId
  }, FormHelperTextProps), helperText));
});
process.env.NODE_ENV !== "production" ? TextField.propTypes = {
  /**
   * This property helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,

  /**
   * If `true`, the `input` element will be focused during the first mount.
   */
  autoFocus: PropTypes.bool,

  /**
   * @ignore
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The default value of the `input` element.
   */
  defaultValue: PropTypes.any,

  /**
   * If `true`, the `input` element will be disabled.
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the label will be displayed in an error state.
   */
  error: PropTypes.bool,

  /**
   * Properties applied to the [`FormHelperText`](/api/form-helper-text/) element.
   */
  FormHelperTextProps: PropTypes.object,

  /**
   * If `true`, the input will take up the full width of its container.
   */
  fullWidth: PropTypes.bool,

  /**
   * The helper text content.
   */
  helperText: PropTypes.node,

  /**
   * The id of the `input` element.
   * Use this property to make `label` and `helperText` accessible for screen readers.
   */
  id: PropTypes.string,

  /**
   * Properties applied to the [`InputLabel`](/api/input-label/) element.
   */
  InputLabelProps: PropTypes.object,

  /**
   * Properties applied to the Input element.
   * It will be a [`FilledInput`](/api/filled-input/),
   * [`OutlinedInput`](/api/outlined-input/) or [`Input`](/api/input/)
   * component depending on the `variant` prop value.
   */
  InputProps: PropTypes.object,

  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,

  /**
   * This property can be used to pass a ref callback to the `input` element.
   */
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * The label content.
   */
  label: PropTypes.node,

  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   */
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),

  /**
   * If `true`, a textarea element will be rendered instead of an input.
   */
  multiline: PropTypes.bool,

  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,

  /**
   * @ignore
   */
  onBlur: PropTypes.func,

  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   */
  onChange: PropTypes.func,

  /**
   * @ignore
   */
  onFocus: PropTypes.func,

  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder: PropTypes.string,

  /**
   * If `true`, the label is displayed as required and the `input` element` will be required.
   */
  required: PropTypes.bool,

  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Render a [`Select`](/api/select/) element while passing the Input element to `Select` as `input` parameter.
   * If this option is set you must pass the options of the select as children.
   */
  select: PropTypes.bool,

  /**
   * Properties applied to the [`Select`](/api/select/) element.
   */
  SelectProps: PropTypes.object,

  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   */
  type: PropTypes.string,

  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any,

  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled'])
} : void 0;
export default withStyles(styles, {
  name: 'MuiTextField'
})(TextField);