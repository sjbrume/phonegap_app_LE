import React, {Component} from 'react';
import {CHANGE_LANG, RU} from "../../store/intl/action_types";
import {LanguageSwitcher} from "../../blocks/language-switcher/language-switcher";
import {Header} from "../../blocks/header/header";
import {SideBarMenu} from "../../blocks/menu/menu-left";


export class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }


    render() {
        console.log(this);
        return (
            <div>
                HomePage
            </div>
        )
    }
}

//
// {/*<div>*/}
// {/*<Header/>*/}
// {/*HomePage*/}
// {/*/!*<LanguageSwitcher/>*!/*/}
// {/*</div>*/}