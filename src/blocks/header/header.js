import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Search from 'material-ui-icons/Search';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import {FormSearch} from "../form/form_search";
import {connect} from "react-redux";
import {styles} from '../../containers/layout_main/style';
import {MENU_BOTTOM, MENU_LEFT} from "../../store/menu-position/action_types";


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
        const {classes,menuPosition,onClick} = this.props;
        console.log(this);
        return (
            <div className={classes.headerWrapper}>
                <AppBar position="static" className={classes.appBar} color="default">
                    <Toolbar className={classes.toolbar}>

                        {
                            menuPosition === MENU_LEFT && <IconButton
                                onClick={onClick}
                                className={classes.menuButton}
                            >
                                <MenuIcon/>
                            </IconButton>
                        }

                        {
                            menuPosition === MENU_BOTTOM &&
                            <IconButton
                                className={classes.searchButtonMobile}
                            >
                                <Search/>
                            </IconButton>
                        }



                        <IconButton
                            className={classes.searchButton}
                        >
                            <Search/>
                        </IconButton>

                        {/*<FormSearch/>*/}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}