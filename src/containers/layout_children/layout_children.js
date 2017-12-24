import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {BrowserHistory} from "../../history";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';

import Typography from 'material-ui/Typography';

import Hidden from "material-ui/es/Hidden/Hidden";
import Drawer from "material-ui/es/Drawer/Drawer";
import List from 'material-ui/List';

import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import {lexicon} from "./lexicon";
import '../layout_main/layout_main.css';

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
export class LayoutChildren extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return { }
    }

    createMenu() {
        const {currentLocal} = this.props;

        const menu = [];
        let index = 0;

        for (let prop in lexicon[currentLocal].menu) {
            if('href' in lexicon[currentLocal].menu[prop]){
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
            } else {
                menu.push(
                    <ListItem key={index}>
                        <ListItemIcon className={'fonts-white'}>
                            {lexicon[currentLocal].menu[prop].icon}
                        </ListItemIcon>
                        <button type="button" style={{backgroundColor: 'transparent', border: 'none'}} className={'fonts-white'} onClick={lexicon[currentLocal].menu[prop].onClick}>
                            <Typography color="inherit">
                                {lexicon[currentLocal].menu[prop].text}
                            </Typography>
                        </button>
                    </ListItem>
                );
            }
            index++
        }

        return menu;
    }



    render() {
        const {classes, title, children} = this.props;
        console.log(this);

        return (
            <div className={'layout-main_root'}>
                <div className={'layout-main_app-frame'}>
                    <div className={'layout-children_header-wrapper'}>
                        <AppBar position="static" className={'layout-children_app-bar'}>
                            <Toolbar className={'layout-children_tool-bar'}>

                                <IconButton
                                    onClick={()=>{
                                        BrowserHistory.goBack()
                                    }}
                                    className={'layout-children_arrow-button'}
                                >
                                    <ArrowBack/>
                                </IconButton>
                                <Typography type="title" color="inherit" className={'layout-children_flex'}>
                                    {title}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </div>
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