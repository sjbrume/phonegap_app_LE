import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {BrowserHistory} from "../../history";
import withStyles from 'material-ui/styles/withStyles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';

import Typography from 'material-ui/Typography';


import {styles} from './style';
import Hidden from "material-ui/es/Hidden/Hidden";
import Drawer from "material-ui/es/Drawer/Drawer";
import List from 'material-ui/List';

import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import {lexicon} from "./lexicon";


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
@withStyles(styles, {withTheme: true})
export class LayoutChildren extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return { }
    }

    createMenu() {
        const {classes, currentLocal} = this.props;

        const menu = [];
        let index = 0;

        for (let prop in lexicon[currentLocal].menu) {
            menu.push(
                <ListItem key={index}>
                    <ListItemIcon className={classes.colorWhite}>
                        {lexicon[currentLocal].menu[prop].icon}
                    </ListItemIcon>
                    <Link className={classes.colorWhite} to={lexicon[currentLocal].menu[prop].href}>
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
        const {classes, title, children} = this.props;
        console.log(this);

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <div className={classes.headerWrapper}>
                        <AppBar position="static" className={classes.appBar}>
                            <Toolbar className={classes.toolbar}>

                                <IconButton
                                    onClick={()=>{
                                        BrowserHistory.goBack()
                                    }}
                                    className={classes.arrowButton}
                                >
                                    <ArrowBack/>
                                </IconButton>
                                <Typography type="title" color="inherit" className={classes.flex}>
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
                                docked: classes.drawerDocked,
                                paper: classes.drawerPaper,
                            }}
                        >
                            <List>
                                {this.createMenu()}
                            </List>
                        </Drawer>
                    </Hidden>
                    <main className={classes.content}>
                        {children}
                    </main>
                </div>
            </div>
        );
    }
}