"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useScrollTrigger;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

function getScrollY(ref) {
  return ref.pageYOffset !== undefined ? ref.pageYOffset : ref.scrollTop;
}

function defaultTrigger(event, store, options) {
  var _options$disableHyste = options.disableHysteresis,
      disableHysteresis = _options$disableHyste === void 0 ? false : _options$disableHyste,
      _options$threshold = options.threshold,
      threshold = _options$threshold === void 0 ? 100 : _options$threshold;
  var previous = store.current;
  store.current = event ? getScrollY(event.currentTarget) : previous;

  if (!disableHysteresis && previous !== undefined) {
    if (store.current < previous) {
      return false;
    }
  }

  return store.current > threshold;
}

var defaultTarget = typeof window !== 'undefined' ? window : null;

function useScrollTrigger() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$getTrigger = options.getTrigger,
      getTrigger = _options$getTrigger === void 0 ? defaultTrigger : _options$getTrigger,
      _options$target = options.target,
      target = _options$target === void 0 ? defaultTarget : _options$target,
      other = (0, _objectWithoutProperties2.default)(options, ["getTrigger", "target"]);

  var store = _react.default.useRef();

  var _React$useState = _react.default.useState(function () {
    return getTrigger(null, store, other);
  }),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      trigger = _React$useState2[0],
      setTrigger = _React$useState2[1];

  _react.default.useEffect(function () {
    var handleScroll = function handleScroll(event) {
      setTrigger(getTrigger(event, store, other));
    };

    handleScroll(null); // Re-evaluate trigger when dependencies change

    target.addEventListener('scroll', handleScroll);
    return function () {
      target.removeEventListener('scroll', handleScroll);
    }; // See Option 3. https://github.com/facebook/react/issues/14476#issuecomment-471199055
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, getTrigger, JSON.stringify(other)]);

  return trigger;
}