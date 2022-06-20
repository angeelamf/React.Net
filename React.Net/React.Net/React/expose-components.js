import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import Home from './Components/home.jsx';
//import { ServerStyleSheet } from 'styled-components';

global.React = React;
global.ReactDOM = ReactDOM;
global.ReactDOMServer = ReactDOMServer;
//global.Styled = { ServerStyleSheet };

global.Components = { Home };
