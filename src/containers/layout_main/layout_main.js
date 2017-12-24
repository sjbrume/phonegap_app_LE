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
        this.setState({mobileOpen: !this.state.mobileOpen});
    };


    createMenu() {
        const {currentLocal} = this.props;

        const menu = [];
        let index = 0;

        for (let prop in lexicon[currentLocal].menu) {
            menu.push(
                <ListItem key={index}>
                    <ListItemIcon className={'fonts-white'}>
                        {lexicon[currentLocal].menu[prop].icon}
                    </ListItemIcon>
                    <Link className={'fonts-white'} to={lexicon[currentLocal].menu[prop].href}>
                        <Typography color="inherit">
                            {lexicon[currentLocal].menu[prop].text}
                        </Typography>
                    </Link>
                </ListItem>
            );
            index++
        }

        return menu;
    }

    render() {
        const {children, menuPosition} = this.props;

        return (
            <div className={'layout-main_root'}>
                <div className={'layout-main_app-frame'}>

                    <Header onClick={this.handleDrawerToggle}/>

                    {/* Mobile menu*/}
                    <Hidden mdUp>
                        <Drawer
                            type="temporary"
                            anchor={menuPosition}
                            open={this.state.mobileOpen}
                            classes={{
                                paper: menuPosition === MENU_LEFT ? 'layout-main_drawer-paper' : 'layout-main_drawer-paper--bottom',
                            }}
                            onRequestClose={this.handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            <List>
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