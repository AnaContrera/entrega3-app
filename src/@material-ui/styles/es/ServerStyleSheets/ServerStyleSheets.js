import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import { SheetsRegistry } from 'jss';
import StylesProvider from '../StylesProvider';
import createGenerateClassName from '../createGenerateClassName';

class ServerStyleSheets {
  constructor(options = {}) {
    this.options = options;
  }

  collect(children) {
    // This is needed in order to deduplicate the injection of CSS in the page.
    const sheetsManager = new Map(); // This is needed in order to inject the critical CSS.

    this.sheetsRegistry = new SheetsRegistry(); // A new class name generator

    const generateClassName = createGenerateClassName();
    return React.createElement(StylesProvider, _extends({
      sheetsManager: sheetsManager,
      serverGenerateClassName: generateClassName,
      sheetsRegistry: this.sheetsRegistry
    }, this.options), children);
  }

  toString() {
    return this.sheetsRegistry ? this.sheetsRegistry.toString() : '';
  }

  getStyleElement(props) {
    return React.createElement('style', _extends({
      id: 'jss-server-side',
      key: 'jss-server-side',
      dangerouslySetInnerHTML: {
        __html: this.toString()
      }
    }, props));
  }

}

export default ServerStyleSheets;