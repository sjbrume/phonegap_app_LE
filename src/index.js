import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto'
import {Provider} from 'react-redux';
import {Store} from './store/store'
import {RouterWrapper} from "./routes/index";
import './index.css'
import {init_db} from "./store/websql/actions";
import {getStatistic} from "./store/info_dialog/actions";



try{
    Store.dispatch(getStatistic());
    if (navigator && navigator.hasOwnProperty('network') && navigator.network.connection.type === 'none') {
        console.log(`NETWORK STATUS: ${navigator.network.connection.type}`);
    } else {
        Store.dispatch(init_db(Store.getState().websql));
    }
} catch (err) {
    console.log(err);
    Store.dispatch(init_db(Store.getState().websql));
}

ReactDOM.render(
    <Provider store={Store}>
        <RouterWrapper/>
    </Provider>, document.getElementById('root'));
