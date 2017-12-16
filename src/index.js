import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto'
import {Provider} from 'react-redux';
import {Store} from './store/store'
import {RouterWrapper} from "./routes/index";
import './index.css'

ReactDOM.render(
    <Provider store={Store}>
        <RouterWrapper/>
    </Provider>, document.getElementById('root'));
