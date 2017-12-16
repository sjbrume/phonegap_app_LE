import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import MenuIcon from 'material-ui-icons/Menu';
import {FormSearch} from "../../blocks/form/form_search";
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Typography from 'material-ui/Typography';

import {connect} from "react-redux";
import {styles} from './style';

import {lexicon} from './lexicon';


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
        const {classes, currentLocal} = this.props;

        const menu = [];
        let index = 0;

        for (let prop in lexicon[currentLocal].menu) {
            menu.push(
                <ListItem key={index}>
                    <ListItemIcon className={classes.colorWhite}>
                        {lexicon[currentLocal].menu[prop].icon}
                    </ListItemIcon>
                    <a className={classes.colorWhite} href={lexicon[currentLocal].menu[prop].href}>
                        <Typography color="inherit">
                            {lexicon[currentLocal].menu[prop].text}
                        </Typography>
                    </a>
                </ListItem>
            );
            index++
        }

        return menu;
    }

    render() {
        const {classes, theme, children} = this.props;
        console.log(this);

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <div className={classes.headerWrapper}>
                        <AppBar position="static" className={classes.appBar} color="default">
                            <Toolbar className={classes.toolbar}>
                                <IconButton
                                    onClick={this.handleDrawerToggle}
                                    className={classes.menuButton}
                                >
                                    <MenuIcon/>
                                </IconButton>
                                <FormSearch/>
                            </Toolbar>
                        </AppBar>
                    </div>
                    {/* Mobile menu*/}
                    <Hidden mdUp>
                        <Drawer
                            type="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            classes={{
                                paper: classes.drawerPaper,
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
                    {/* Desctop menu*/}

                    <Hidden mdDown implementation="css">
                        <Drawer
                            type="permanent"
                            open
                            classes={{
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