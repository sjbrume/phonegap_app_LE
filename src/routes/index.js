import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {BrowserHistory} from "../history";
import {HomePage} from "./home";
import {LayoutMain} from "../containers/layout_main/layout_main";

const MainRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <LayoutMain {...rest} title={rest.title}>
                <Component {...matchProps} />
            </LayoutMain>
        )}/>
    )
};

export class RouterWrapper extends Component {
    render() {
        return (
            <Router history={BrowserHistory} basename="/">
                <Route>
                    <Switch>
                        <MainRoute exact path="/" title="Главная" component={HomePage}/>
                    </Switch>
                </Route>
            </Router>
        )
    }
}