import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { chainPropTypes, getDisplayName } from '@material-ui/utils';
import useTheme from '../useTheme';
export function withThemeCreator(options = {}) {
  const {
    defaultTheme
  } = options;

  const withTheme = Component => {
    if (process.env.NODE_ENV !== 'production' && Component === undefined) {
      throw new Error(['You are calling withTheme(Component) with an undefined component.', 'You may have forgotten to import it.'].join('\n'));
    }

    const WithTheme = React.forwardRef(function WithTheme(props, ref) {
      const {
        innerRef
      } = props,
            other = _objectWithoutPropertiesLoose(props, ["innerRef"]);

      const theme = useTheme() || defaultTheme;
      return React.createElement(Component, _extends({
        theme: theme,
        ref: innerRef || ref
      }, other));
    });
    process.env.NODE_ENV !== "production" ? WithTheme.propTypes = {
      /**
       * Use that property to pass a ref callback to the decorated component.
       * @deprecated
       */
      innerRef: chainPropTypes(PropTypes.oneOfType([PropTypes.func, PropTypes.object]), props => {
        if (props.innerRef == null) {
          return null;
        }

        return new Error('Material-UI: the `innerRef` prop is deprecated and will be removed in v5. ' + 'Refs are now automatically forwarded to the inner component.');
      })
    } : void 0;

    if (process.env.NODE_ENV !== 'production') {
      WithTheme.displayName = `WithTheme(${getDisplayName(Component)})`;
    }

    hoistNonReactStatics(WithTheme, Component);

    if (process.env.NODE_ENV !== 'production') {
      // Exposed for test purposes.
      WithTheme.Naked = Component;
    }

    return WithTheme;
  };

  return withTheme;
} // Provide the theme object as a property to the input component.
// It's an alternative API to useTheme().
// We encourage the usage of useTheme() where possible.

const withTheme = withThemeCreator();
export default withTheme;