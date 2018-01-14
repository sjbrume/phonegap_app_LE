import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {BrowserHistory} from "../history";

import {Store} from '../store/store';

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
import {ComplaintsMap} from "./complaints_map/complaints_map";
import {HelpPage} from "./help/index";
import {MENU_TOGGLE} from "../store/menu_toggle/reducer";
import {exit_app} from "../utils/exit_app";
import {COMPLAINTS_MAP_TOGGLE} from "../store/complaints_map/reducer";
import {HelpConventionsPage} from "./help_conventions/index";
import {HelpFAQPage} from "./help_faq/index";
import {DRAWER_PLACES_DESCRIPTION_TOGGLE} from "../store/drawer_places_description/reducers";
import {WEBSQL_SEARCH_REMOVE} from "../store/websql/action_types";


window.Store = Store;
window.BrowserHistory = BrowserHistory;

document.addEventListener("backbutton", () => {
    console.log('backbutton');
    console.log('Store.getState().menu_toggle', Store.getState().menu_toggle);
    if (Store.getState().menu_toggle) {
        Store.dispatch({type: MENU_TOGGLE, payload: false});
        return true;
    }
    if (Store.getState().complaints_map) {
        Store.dispatch({type: COMPLAINTS_MAP_TOGGLE, payload: false});
        return true;
    }
    if (Store.getState().drawer_places_description.isOpen) {
        Store.dispatch({type: DRAWER_PLACES_DESCRIPTION_TOGGLE, payload: {
            isOpen: false,
            description: null
        }});

        if (Store.getState().search_result) {
            this.props.dispatch(WEBSQL_SEARCH_REMOVE, null)
        }
        return true;
    }
    if (window.location.hash === '#/' && !Store.getState().menu_toggle) {
        console.log('exit');

        try {

            exit_app()


        } catch (err) {
            console.log(err);
        }
        return true;
    } else {
        BrowserHistory.goBack();
    }

    return true;
});


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
                            path={MenuLexicon[currentLocal].menu.help.href}
                            title={MenuLexicon[currentLocal].menu.help.text}
                            component={HelpPage}/>

                        <ChildrenRoute
                            exact
                            path={MenuLexicon[currentLocal].menu.help_conventions.href}
                            title={MenuLexicon[currentLocal].menu.help_conventions.text}
                            component={HelpConventionsPage}/>

                        <ChildrenRoute
                            exact
                            path={MenuLexicon[currentLocal].menu.help_faq.href}
                            title={MenuLexicon[currentLocal].menu.help_faq.text}
                            component={HelpFAQPage}/>

                        <ChildrenRoute
                            exact
                            path={MenuLexicon[currentLocal].menu.complaints.href}
                            title={MenuLexicon[currentLocal].menu.complaints.text}
                            component={ComplaintsPage}
                        />
                        <ChildrenRoute
                            exact
                            path={MenuLexicon[currentLocal].menu.complaints_map.href}
                            title={MenuLexicon[currentLocal].menu.complaints_map.text}
                            component={ComplaintsMap}
                        />
                        <ChildrenRoute
                            exact
                            path={MenuLexicon[currentLocal].menu.complaints.href + '/:id'}
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