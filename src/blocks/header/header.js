import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Search from 'material-ui-icons/Search';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import {FormSearch} from "../form/form_search";
import {connect} from "react-redux";
import '../../containers/layout_main/layout_main.css';
import {MENU_BOTTOM, MENU_LEFT} from "../../store/menu-position/action_types";
import {GLOBAL_STYLE} from "../../config";


@connect(
    state => ({ // получаем данные из store
        currentLocal: state.intl,
        menuPosition: state.menuPosition
    }), //
    dispatch => ({
        changeLang: (type, value) => {
            dispatch({type: type, payload: value})
        }
    })
)
export class Header extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    render() {
        const {menuPosition,onClick} = this.props;
        return (
            <div className={'layout-main_header-wrapper'} style={{
                backgroundColor: GLOBAL_STYLE.menu.backgroundColor
            }}>
                <AppBar position="static" className={'layout-main_app-bar'} color="default">
                    <Toolbar className={'layout-children_tool-bar'}>

                        {
                            menuPosition === MENU_LEFT && <IconButton
                                onClick={onClick}
                                className={'layout-main_menu-button'}
                            >
                                <MenuIcon/>
                            </IconButton>
                        }

                        {
                            menuPosition === MENU_BOTTOM &&
                            <IconButton
                                className={'layout-main_search-button-mobile'}
                            >
                                <Search/>
                            </IconButton>
                        }



                        <IconButton
                            className={'layout-main_search-button'}
                        >
                            <Search/>
                        </IconButton>

                        <FormSearch/>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}