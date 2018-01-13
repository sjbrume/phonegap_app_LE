import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Button from 'material-ui/Button';

import Hidden from 'material-ui/Hidden';
import MenuIcon from 'material-ui-icons/Menu';

import {ListItem, ListItemIcon} from 'material-ui/List';
import {Link} from "react-router-dom";
import Typography from 'material-ui/Typography';

import {connect} from "react-redux";

import {lexicon} from './lexicon';
import {MENU_BOTTOM, MENU_LEFT} from "../../store/menu-position/action_types";
import {Header} from "../../blocks/header/header";

import './layout_main.css';
import {GLOBAL_STYLE} from "../../config";
import {MENU_TOGGLE} from "../../store/menu_toggle/reducer";


@connect(
    state => ({ // получаем данные из store
        currentLocal: state.intl,
        menuPosition: state.menuPosition,
        menu_toggle: state.menu_toggle
    }), //
    dispatch => ({
        setStore: (type, value) => {
            dispatch({type: type, payload: value})
        }
    })
)
export class LayoutMain extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.createMenu = this.createMenu.bind(this);
    }

    get initialState() {
        return {
            mobileOpen: false,
        }
    }

    handleDrawerToggle = () => {
        this.props.setStore(MENU_TOGGLE, !this.props.menu_toggle);
    };


    createMenu() {
        const {currentLocal} = this.props;

        const menu = [];
        let index = 0;

        for (let prop in lexicon[currentLocal].menu) {
            if (!lexicon[currentLocal].menu[prop].menu_hidden) {
                if ('href' in lexicon[currentLocal].menu[prop]) {
                    menu.push(
                        <Link
                            key={index}
                            to={lexicon[currentLocal].menu[prop].href}
                            style={{
                                color: GLOBAL_STYLE.menu.fontColor,
                                textDecoration: 'none'
                            }}
                        >

                            <ListItem>
                                <ListItemIcon style={{
                                    color: GLOBAL_STYLE.menu.fontColor,
                                    textDecoration: 'none !important'
                                }}>
                                    {lexicon[currentLocal].menu[prop].icon}
                                </ListItemIcon>

                                <Typography color="inherit">
                                    {lexicon[currentLocal].menu[prop].text}
                                </Typography>
                            </ListItem>
                        </Link>
                    );
                } else {
                    menu.push(
                        <button
                            type="button"
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                padding: 0,
                                color: GLOBAL_STYLE.menu.fontColor,
                                textDecoration: 'none',
                                width: '100%'
                            }}
                            className={'fonts-white'}
                            onClick={lexicon[currentLocal].menu[prop].onClick}
                        >
                            <ListItem key={index}
                                      style={'style' in lexicon[currentLocal].menu[prop] ? lexicon[currentLocal].menu[prop].style.wrapper : {}}
                            >
                                <ListItemIcon
                                    style={{
                                        color: GLOBAL_STYLE.menu.fontColor,
                                        textDecoration: 'none'
                                    }}
                                >
                                    {lexicon[currentLocal].menu[prop].icon}
                                </ListItemIcon>
                                <Typography
                                    style={{
                                        color: GLOBAL_STYLE.menu.fontColor,
                                        textDecoration: 'none'
                                    }}
                                    color="inherit"
                                >
                                    {lexicon[currentLocal].menu[prop].text}
                                </Typography>
                            </ListItem>
                        </button>
                    );
                }

            }

            index++
        }

        return menu;
    }

    render() {
        const {children, menuPosition, menu_toggle} = this.props;

        return (
            <div className={'layout-main_root'}>
                <div className={'layout-main_app-frame'}>

                    <Header onClick={this.handleDrawerToggle}/>

                    {/* Mobile menu*/}
                    <Hidden mdUp>
                        <Drawer
                            type="temporary"
                            anchor={menuPosition}
                            open={menu_toggle}
                            classes={{
                                paper: menuPosition === MENU_LEFT ? 'layout-main_drawer-paper' : 'layout-main_drawer-paper--bottom',
                            }}

                            onRequestClose={this.handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            <List
                                style={{
                                    backgroundColor: GLOBAL_STYLE.menu.backgroundColor,
                                    paddingTop: '0'
                                }}
                            >
                                {this.createMenu()}
                            </List>
                        </Drawer>
                    </Hidden>
                    {
                        menuPosition === MENU_BOTTOM && <Button
                            onClick={this.handleDrawerToggle}
                            fab
                            color="primary"
                            aria-label="add"
                            className={'layout-main_menu-button-bottom'}
                            style={{
                                backgroundColor: GLOBAL_STYLE.menu.backgroundColor,
                                color: GLOBAL_STYLE.menu.fontColor,
                                textDecoration: 'none'
                            }}
                        >
                            <MenuIcon/>
                        </Button>
                    }


                    {/* Desctop menu*/}

                    <Hidden mdDown implementation="css">
                        <Drawer
                            type="permanent"
                            open
                            classes={{
                                docked: 'layout-main_drawer-docked',
                                paper: 'layout-main_drawer-paper',
                            }}
                        >
                            <List>
                                {this.createMenu()}
                            </List>
                        </Drawer>
                    </Hidden>
                    <main className={'layout-main_content'}>
                        {children}
                    </main>
                </div>
            </div>
        );
    }
}