import React, {Component} from 'react';
import {LanguageSwitcher} from "../../blocks/switcher/language-switcher/language-switcher";
import {MenuPosSwitcher} from "../../blocks/switcher/menu-pos_switcher/menu-pos_switcher";

export class SettingsPage extends Component {
    static propTypes = {}

    static defaultProps = {}


    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    render() {
        return (
            <div>
                <LanguageSwitcher/>
                <MenuPosSwitcher/>
            </div>
        )
    }
}

