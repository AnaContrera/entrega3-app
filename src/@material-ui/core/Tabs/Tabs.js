"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _warning = _interopRequireDefault(require("warning"));

var _clsx = _interopRequireDefault(require("clsx"));

var _reactEventListener = _interopRequireDefault(require("react-event-listener"));

var _debounce = _interopRequireDefault(require("debounce"));

var _normalizeScrollLeft = require("normalize-scroll-left");

var _animate = _interopRequireDefault(require("../internal/animate"));

var _ScrollbarSize = _interopRequireDefault(require("./ScrollbarSize"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _TabIndicator = _interopRequireDefault(require("./TabIndicator"));

var _TabScrollButton = _interopRequireDefault(require("./TabScrollButton"));

var _withForwardedRef = _interopRequireDefault(require("../utils/withForwardedRef"));

/* eslint-disable no-restricted-globals */
// < 1kb payload overhead when lodash/debounce is > 3kb.
var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      overflow: 'hidden',
      minHeight: 48,
      WebkitOverflowScrolling: 'touch' // Add iOS momentum scrolling.

    },

    /* Styles applied to the flex container element. */
    flexContainer: {
      display: 'flex'
    },

    /* Styles applied to the flex container element if `centered={true}` & `!variant="scrollable"`. */
    centered: {
      justifyContent: 'center'
    },

    /* Styles applied to the tablist element. */
    scroller: {
      position: 'relative',
      display: 'inline-block',
      flex: '1 1 auto',
      whiteSpace: 'nowrap'
    },

    /* Styles applied to the tablist element if `!variant="scrollable"`. */
    fixed: {
      overflowX: 'hidden',
      width: '100%'
    },

    /* Styles applied to the tablist element if `variant="scrollable"`. */
    scrollable: {
      overflowX: 'scroll',
      // Hide dimensionless scrollbar on MacOS
      scrollbarWidth: 'none',
      // Firefox
      '&::-webkit-scrollbar': {
        display: 'none' // Safari + Chrome

      }
    },

    /* Styles applied to the `ScrollButtonComponent` component. */
    scrollButtons: {},

    /* Styles applied to the `ScrollButtonComponent` component if `scrollButtons="auto"` or scrollButtons="desktop"`. */
    scrollButtonsDesktop: (0, _defineProperty2.default)({}, theme.breakpoints.down('xs'), {
      display: 'none'
    }),

    /* Styles applied to the `TabIndicator` component. */
    indicator: {}
  };
};

exports.styles = styles;

var Tabs =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Tabs, _React$Component);

  function Tabs() {
    var _this;

    (0, _classCallCheck2.default)(this, Tabs);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Tabs).call(this));
    _this.state = {
      indicatorStyle: {},
      scrollerStyle: {
        overflow: 'hidden',
        marginBottom: null
      },
      showLeftScroll: false,
      showRightScroll: false,
      mounted: false
    };

    _this.getConditionalElements = function () {
      var _this$props = _this.props,
          classes = _this$props.classes,
          ScrollButtonComponent = _this$props.ScrollButtonComponent,
          scrollButtons = _this$props.scrollButtons,
          theme = _this$props.theme,
          variant = _this$props.variant;
      var _this$state = _this.state,
          showLeftScroll = _this$state.showLeftScroll,
          showRightScroll = _this$state.showRightScroll;
      var conditionalElements = {};
      var scrollable = variant === 'scrollable';
      conditionalElements.scrollbarSizeListener = scrollable ? _react.default.createElement(_ScrollbarSize.default, {
        className: classes.scrollable,
        onChange: _this.handleScrollbarSizeChange
      }) : null;
      var scrollButtonsActive = showLeftScroll || showRightScroll;
      var showScrollButtons = scrollable && (scrollButtons === 'auto' && scrollButtonsActive || scrollButtons === 'desktop' || scrollButtons === 'on');
      conditionalElements.scrollButtonLeft = showScrollButtons ? _react.default.createElement(ScrollButtonComponent, {
        direction: theme.direction === 'rtl' ? 'right' : 'left',
        onClick: _this.handleLeftScrollClick,
        visible: showLeftScroll,
        className: (0, _clsx.default)(classes.scrollButtons, scrollButtons !== 'on' && classes.scrollButtonsDesktop)
      }) : null;
      conditionalElements.scrollButtonRight = showScrollButtons ? _react.default.createElement(ScrollButtonComponent, {
        direction: theme.direction === 'rtl' ? 'left' : 'right',
        onClick: _this.handleRightScrollClick,
        visible: showRightScroll,
        className: (0, _clsx.default)(classes.scrollButtons, scrollButtons !== 'on' && classes.scrollButtonsDesktop)
      }) : null;
      return conditionalElements;
    };

    _this.getTabsMeta = function (value, direction) {
      var tabsMeta;

      if (_this.tabsRef) {
        var rect = _this.tabsRef.getBoundingClientRect(); // create a new object with ClientRect class props + scrollLeft


        tabsMeta = {
          clientWidth: _this.tabsRef.clientWidth,
          scrollLeft: _this.tabsRef.scrollLeft,
          scrollLeftNormalized: (0, _normalizeScrollLeft.getNormalizedScrollLeft)(_this.tabsRef, direction),
          scrollWidth: _this.tabsRef.scrollWidth,
          left: rect.left,
          right: rect.right
        };
      }

      var tabMeta;

      if (_this.tabsRef && value !== false) {
        var children = _this.tabsRef.children[0].children;

        if (children.length > 0) {
          var tab = children[_this.valueToIndex.get(value)];

          process.env.NODE_ENV !== "production" ? (0, _warning.default)(tab, ["Material-UI: the value provided `".concat(value, "` to the Tabs component is invalid."), 'None of the Tabs children have this value.', _this.valueToIndex.keys ? "You can provide one of the following values: ".concat(Array.from(_this.valueToIndex.keys()).join(', '), ".") : null].join('\n')) : void 0;
          tabMeta = tab ? tab.getBoundingClientRect() : null;
        }
      }

      return {
        tabsMeta: tabsMeta,
        tabMeta: tabMeta
      };
    };

    _this.handleLeftScrollClick = function () {
      _this.moveTabsScroll(-_this.tabsRef.clientWidth);
    };

    _this.handleRightScrollClick = function () {
      _this.moveTabsScroll(_this.tabsRef.clientWidth);
    };

    _this.handleScrollbarSizeChange = function (scrollbarHeight) {
      _this.setState({
        scrollerStyle: {
          overflow: null,
          marginBottom: -scrollbarHeight
        }
      });
    };

    _this.handleTabsRef = function (ref) {
      _this.tabsRef = ref;
    };

    _this.moveTabsScroll = function (delta) {
      var theme = _this.props.theme;
      var multiplier = theme.direction === 'rtl' ? -1 : 1;
      var nextScrollLeft = _this.tabsRef.scrollLeft + delta * multiplier; // Fix for Edge

      var invert = theme.direction === 'rtl' && (0, _normalizeScrollLeft.detectScrollType)() === 'reverse' ? -1 : 1;

      _this.scroll(invert * nextScrollLeft);
    };

    _this.scrollSelectedIntoView = function () {
      var _this$props2 = _this.props,
          theme = _this$props2.theme,
          value = _this$props2.value;

      var _this$getTabsMeta = _this.getTabsMeta(value, theme.direction),
          tabsMeta = _this$getTabsMeta.tabsMeta,
          tabMeta = _this$getTabsMeta.tabMeta;

      if (!tabMeta || !tabsMeta) {
        return;
      }

      if (tabMeta.left < tabsMeta.left) {
        // left side of button is out of view
        var nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.left - tabsMeta.left);

        _this.scroll(nextScrollLeft);
      } else if (tabMeta.right > tabsMeta.right) {
        // right side of button is out of view
        var _nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.right - tabsMeta.right);

        _this.scroll(_nextScrollLeft);
      }
    };

    _this.scroll = function (value) {
      (0, _animate.default)('scrollLeft', _this.tabsRef, value);
    };

    _this.updateScrollButtonState = function () {
      var _this$props3 = _this.props,
          scrollButtons = _this$props3.scrollButtons,
          theme = _this$props3.theme,
          variant = _this$props3.variant;
      var scrollable = variant === 'scrollable';

      if (scrollable && scrollButtons !== 'off') {
        var _this$tabsRef = _this.tabsRef,
            scrollWidth = _this$tabsRef.scrollWidth,
            clientWidth = _this$tabsRef.clientWidth;
        var scrollLeft = (0, _normalizeScrollLeft.getNormalizedScrollLeft)(_this.tabsRef, theme.direction); // use 1 for the potential rounding error with browser zooms.

        var showLeftScroll = theme.direction === 'rtl' ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
        var showRightScroll = theme.direction !== 'rtl' ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;

        if (showLeftScroll !== _this.state.showLeftScroll || showRightScroll !== _this.state.showRightScroll) {
          _this.setState({
            showLeftScroll: showLeftScroll,
            showRightScroll: showRightScroll
          });
        }
      }
    };

    if (typeof window !== 'undefined') {
      _this.handleResize = (0, _debounce.default)(function () {
        _this.updateIndicatorState(_this.props);

        _this.updateScrollButtonState();
      }, 166); // Corresponds to 10 frames at 60 Hz.

      _this.handleTabsScroll = (0, _debounce.default)(function () {
        _this.updateScrollButtonState();
      }, 166); // Corresponds to 10 frames at 60 Hz.
    }

    return _this;
  }

  (0, _createClass2.default)(Tabs, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        mounted: true
      });
      this.updateIndicatorState(this.props);
      this.updateScrollButtonState();

      if (this.props.action) {
        this.props.action({
          updateIndicator: this.handleResize
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      // The index might have changed at the same time.
      // We need to check again the right indicator position.
      this.updateIndicatorState(this.props);
      this.updateScrollButtonState();

      if (this.state.indicatorStyle !== prevState.indicatorStyle) {
        this.scrollSelectedIntoView();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.handleResize.clear();
      this.handleTabsScroll.clear();
    }
  }, {
    key: "updateIndicatorState",
    value: function updateIndicatorState(props) {
      var theme = props.theme,
          value = props.value;

      var _this$getTabsMeta2 = this.getTabsMeta(value, theme.direction),
          tabsMeta = _this$getTabsMeta2.tabsMeta,
          tabMeta = _this$getTabsMeta2.tabMeta;

      var left = 0;

      if (tabMeta && tabsMeta) {
        var correction = theme.direction === 'rtl' ? tabsMeta.scrollLeftNormalized + tabsMeta.clientWidth - tabsMeta.scrollWidth : tabsMeta.scrollLeft;
        left = Math.round(tabMeta.left - tabsMeta.left + correction);
      }

      var indicatorStyle = {
        left: left,
        // May be wrong until the font is loaded.
        width: tabMeta ? Math.round(tabMeta.width) : 0
      };

      if ((indicatorStyle.left !== this.state.indicatorStyle.left || indicatorStyle.width !== this.state.indicatorStyle.width) && !isNaN(indicatorStyle.left) && !isNaN(indicatorStyle.width)) {
        this.setState({
          indicatorStyle: indicatorStyle
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          action = _this$props4.action,
          centered = _this$props4.centered,
          childrenProp = _this$props4.children,
          classes = _this$props4.classes,
          className = _this$props4.className,
          Component = _this$props4.component,
          indicatorColor = _this$props4.indicatorColor,
          innerRef = _this$props4.innerRef,
          onChange = _this$props4.onChange,
          ScrollButtonComponent = _this$props4.ScrollButtonComponent,
          scrollButtons = _this$props4.scrollButtons,
          _this$props4$TabIndic = _this$props4.TabIndicatorProps,
          TabIndicatorProps = _this$props4$TabIndic === void 0 ? {} : _this$props4$TabIndic,
          textColor = _this$props4.textColor,
          theme = _this$props4.theme,
          value = _this$props4.value,
          variant = _this$props4.variant,
          other = (0, _objectWithoutProperties2.default)(_this$props4, ["action", "centered", "children", "classes", "className", "component", "indicatorColor", "innerRef", "onChange", "ScrollButtonComponent", "scrollButtons", "TabIndicatorProps", "textColor", "theme", "value", "variant"]);
      var scrollable = variant === 'scrollable';
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(!centered || !scrollable, 'Material-UI: you can not use the `centered={true}` and `variant="scrollable"` properties ' + 'at the same time on a `Tabs` component.') : void 0;

      var indicator = _react.default.createElement(_TabIndicator.default, (0, _extends2.default)({
        className: classes.indicator,
        color: indicatorColor
      }, TabIndicatorProps, {
        style: (0, _extends2.default)({}, this.state.indicatorStyle, TabIndicatorProps.style)
      }));

      this.valueToIndex = new Map();
      var childIndex = 0;

      var children = _react.default.Children.map(childrenProp, function (child) {
        if (!_react.default.isValidElement(child)) {
          return null;
        }

        process.env.NODE_ENV !== "production" ? (0, _warning.default)(child.type !== _react.default.Fragment, ["Material-UI: the Tabs component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n')) : void 0;
        var childValue = child.props.value === undefined ? childIndex : child.props.value;

        _this2.valueToIndex.set(childValue, childIndex);

        var selected = childValue === value;
        childIndex += 1;
        return _react.default.cloneElement(child, {
          fullWidth: variant === 'fullWidth',
          indicator: selected && !_this2.state.mounted && indicator,
          selected: selected,
          onChange: onChange,
          textColor: textColor,
          value: childValue
        });
      });

      var conditionalElements = this.getConditionalElements();
      return _react.default.createElement(Component, (0, _extends2.default)({
        className: (0, _clsx.default)(classes.root, className),
        ref: innerRef
      }, other), _react.default.createElement(_reactEventListener.default, {
        target: "window",
        onResize: this.handleResize
      }), _react.default.createElement("div", {
        className: classes.flexContainer
      }, conditionalElements.scrollButtonLeft, conditionalElements.scrollbarSizeListener, _react.default.createElement("div", {
        className: (0, _clsx.default)(classes.scroller, scrollable ? classes.scrollable : classes.fixed),
        style: this.state.scrollerStyle,
        ref: this.handleTabsRef,
        role: "tablist",
        onScroll: this.handleTabsScroll
      }, _react.default.createElement("div", {
        className: (0, _clsx.default)(classes.flexContainer, centered && !scrollable && classes.centered)
      }, children), this.state.mounted && indicator), conditionalElements.scrollButtonRight));
    }
  }]);
  return Tabs;
}(_react.default.Component);

process.env.NODE_ENV !== "production" ? Tabs.propTypes = {
  /**
   * Callback fired when the component mounts.
   * This is useful when you want to trigger an action programmatically.
   * It currently only supports `updateIndicator()` action.
   *
   * @param {object} actions This object contains all possible actions
   * that can be triggered programmatically.
   */
  action: _propTypes.default.func,

  /**
   * If `true`, the tabs will be centered.
   * This property is intended for large views.
   */
  centered: _propTypes.default.bool,

  /**
   * The content of the component.
   */
  children: _propTypes.default.node,

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
   * Determines the color of the indicator.
   */
  indicatorColor: _propTypes.default.oneOf(['secondary', 'primary']),

  /**
   * @ignore
   * from `withForwardRef`
   */
  innerRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),

  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {any} value We default to the index of the child (number)
   */
  onChange: _propTypes.default.func,

  /**
   * The component used to render the scroll buttons.
   */
  ScrollButtonComponent: _propTypes.default.elementType,

  /**
   * Determine behavior of scroll buttons when tabs are set to scroll:
   *
   * - `auto` will only present them when not all the items are visible.
   * - `desktop` will only present them on medium and larger viewports.
   * - `on` will always present them.
   * - `off` will never present them.
   */
  scrollButtons: _propTypes.default.oneOf(['auto', 'desktop', 'on', 'off']),

  /**
   * Properties applied to the `TabIndicator` element.
   */
  TabIndicatorProps: _propTypes.default.object,

  /**
   * Determines the color of the `Tab`.
   */
  textColor: _propTypes.default.oneOf(['secondary', 'primary', 'inherit']),

  /**
   * @ignore
   */
  theme: _propTypes.default.object.isRequired,

  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this property to `false`.
   */
  value: _propTypes.default.any,

  /**
   *  Determines additional display behavior of the tabs:
   *
   *  - `scrollable` will invoke scrolling properties and allow for horizontally
   *  scrolling (or swiping) of the tab bar.
   *  -`fullWidth` will make the tabs grow to use all the available space,
   *  which should be used for small views, like on mobile.
   *  - `standard` will render the default state.
   */
  variant: _propTypes.default.oneOf(['standard', 'scrollable', 'fullWidth'])
} : void 0;
Tabs.defaultProps = {
  centered: false,
  component: 'div',
  indicatorColor: 'secondary',
  ScrollButtonComponent: _TabScrollButton.default,
  scrollButtons: 'auto',
  textColor: 'inherit',
  variant: 'standard'
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiTabs',
  withTheme: true
})((0, _withForwardedRef.default)(Tabs));

exports.default = _default;