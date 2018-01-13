/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import createBrowserHistory from 'history/createBrowserHistory';
import {Store} from './store/store';
import {MENU_TOGGLE} from "./store/menu_toggle/reducer";
const BrowserHistory = createBrowserHistory();
const unlisten = BrowserHistory.listen((location, action) => {
    // location is an object like window.location
    Store.dispatch({type: MENU_TOGGLE, payload: false});
    console.log(action, location.pathname, location.state)
})
// Navigation manager, e.g. history.push('/home')
// https://github.com/mjackson/history
export { BrowserHistory};
