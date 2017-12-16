import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import {FormSearch} from "../form/form_search";

const styles = {
    headerWrapper: {
        padding: '8px',
        backgroundColor: '#0277bd'
    },
    toolbar:{
        minHeight: 'auto',
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 10,
    },
};

@withStyles(styles)
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
        const {classes} = this.props;
        console.log(this);
        return (
            <div className={classes.headerWrapper}>
                <AppBar position="static" color="default">
                    <Toolbar className={classes.toolbar}>
                        <IconButton className={classes.menuButton}>
                            <MenuIcon/>
                        </IconButton>
                        <FormSearch/>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}