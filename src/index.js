import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto'
import {Provider} from 'react-redux';
import {Store} from './store/store'
import {RouterWrapper} from "./routes/index";
import './index.css'
import {init_db} from "./store/websql/actions";


Store.dispatch(init_db(Store.getState().websql));


ReactDOM.render(
    <Provider store={Store}>
        <RouterWrapper/>
    </Provider>, document.getElementById('root'));
