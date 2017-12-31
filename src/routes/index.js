import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {BrowserHistory} from "../history";
import {HomePage} from "./home";
import {LayoutMain} from "../containers/layout_main/layout_main";
import {LayoutChildren} from '../containers/layout_children/layout_children';
import {lexicon as MenuLexicon} from '../containers/layout_main/lexicon';
import {connect} from "react-redux";

import {ArticlesPage} from './articles';
import {ArticlePage} from './article';
import {ComplaintsPage} from "./complaints";
import {ContactsPage} from "./contacts";
import {SettingsPage} from "./settings";
import {ListOfPlacesPage} from "./list_of_places";


document.addEventListener("backbutton", () => {
    if (window.location.pathname === '/') {
        console.log('backbutton');
        try {
            let confirmed = function (buttonIndex) {
                if (buttonIndex === 1) {
                    console.log("navigator.app.exitApp");
                    navigator.app.exitApp();
                }
            };
            navigator.notification.confirm('', confirmed, 'Exit?');
        } catch (err) {
            console.log(err);
        }
    }
}, false);


const ChildrenRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <LayoutChildren {...rest} title={rest.title}>
                <Component {...matchProps} />
            </LayoutChildren>
        )}/>
    )
};


const MainRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <LayoutMain {...rest} title={rest.title}>
                <Component {...matchProps} />
            </LayoutMain>
        )}/>
    )
};

@connect(
    state => ({ // получаем данные из store
        currentLocal: state.intl
    }), //
    dispatch => ({
        changeLang: (type, value) => {
            dispatch({type: type, payload: value})
        }
    })
)
export class RouterWrapper extends Component {
    render() {
        const {currentLocal} = this.props;
        return (
            <Router history={BrowserHistory}>
                <Route>
                    <Switch>
                        <MainRoute exact path="/" title="Главная" component={HomePage}/>
                        <ChildrenRoute
                            exact
                            path={MenuLexicon[currentLocal].menu.list_of_places.href}
                            title={MenuLexicon[currentLocal].menu.list_of_places.text}
                            component={ListOfPlacesPage}/>
                        <ChildrenRoute
                            exact
                            path={MenuLexicon[currentLocal].menu.complaints.href}
                            title={MenuLexicon[currentLocal].menu.complaints.text}
                            component={ComplaintsPage}
                        />
                        <ChildrenRoute
                            exact
                            path={MenuLexicon[currentLocal].menu.articles.href}
                            title={MenuLexicon[currentLocal].menu.articles.text}
                            component={ArticlesPage}
                        />
                        <ChildrenRoute
                            path={'/article/:id'}
                            component={ArticlePage}
                        />
                        <ChildrenRoute
                            exact
                            path={MenuLexicon[currentLocal].menu.contacts.href}
                            title={MenuLexicon[currentLocal].menu.contacts.text}
                            component={ContactsPage}
                        />
                        <ChildrenRoute
                            exact
                            path={MenuLexicon[currentLocal].menu.settings.href}
                            title={MenuLexicon[currentLocal].menu.settings.text}
                            component={SettingsPage}
                        />
                    </Switch>
                </Route>
            </Router>
        )
    }
}