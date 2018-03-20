import React, {Component} from 'react';
import {connect} from "react-redux";
import {lexicon} from './lexicon';
import logo from './logo.png';
import logo_ua from './logo_ua.svg';
import {Button} from "material-ui";
import {INFO_DIALOG_TOGGLE} from "../../store/info_dialog/action_types";
import {Link, Redirect} from "react-router-dom";

import CircularProgress from 'material-ui/Progress/CircularProgress';
import PriorityHigh from 'material-ui-icons/PriorityHigh';
import InfoOutline from 'material-ui-icons/InfoOutline';
import Dialog, {
    DialogActions,
    DialogContent,
} from 'material-ui/Dialog';

import Slide from 'material-ui/transitions/Slide';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

import BG from './1-flag-ukraini-b.jpg';

function mapStateToProps(state) {
    return {
        currentLocal: state.intl,
        info_dialog: state.info_dialog,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: (type, payload) => {
            dispatch({type, payload})
        }
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class StatisticPage extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = this.initialState;

    }

    get initialState() {
        return {
            open: false,
            redirect: null
        }
    }

    componentDidMount() {

    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };


    getStatisticNumber(object, item) {
        for (let prop in object) {
            if (item.type === prop) {
                console.log(object[prop]);
                return <span
                    className="info-dialog_text-content">{object[prop]}</span>;
            }
        }
        return <span className="info-dialog_text-content">{item.number}</span>;
    }

    render() {
        const {currentLocal, info_dialog: {loading, success}} = this.props;
        const {redirect} = this.state;
        const data = (new Date().getDate().toString().length === 1 ? '0' + new Date().getDate() : new Date().getDate()) +
            '.' + ((new Date().getMonth() + 1).toString().length === 1 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) +
            '.' + new Date().getFullYear();

        if (redirect) {
            return (<Redirect to="/"/>)
        }
        if (loading) {
            return (<div className="loading-panel_wrapper" style={{zIndex: '10000'}}>
                <div className="info-dialog_content">
                    <CircularProgress style={{
                        display: 'block',
                        color: '#0277bd',
                        margin: '0 auto',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                    }} size={60} thickness={7}/>
                </div>
            </div>)
        }


        return (
            <div className="loading-panel_wrapper">
                <div

                    className="info-dialog_content">

                    <Button
                        onClick={this.handleClickOpen}
                        type="button"
                        raised
                        style={{
                            backgroundColor: '#fff',
                            color: 'rgb(58, 126, 206)',
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            zIndex: 100,
                            maxWidth: '40px',
                            minWidth: 'inherit',
                        }}
                        color="primary"
                    >
                        <InfoOutline/>
                    </Button>


                    <Dialog
                        open={this.state.open}
                        transition={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogContent>
                            <div style={{
                                display: 'flex',
                                maxWidth: '220px',
                                margin: '0 auto'
                            }}>
                                <div
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        display: 'inline-block'
                                    }}
                                    className="info-dialog_logo">
                                    <img src={logo} alt="" className="info-dialog_img"/>
                                </div>
                                <div
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        display: 'inline-block'
                                    }}
                                    className="info-dialog_logo">
                                    <img src={logo_ua} alt="" className="info-dialog_img"/>
                                </div>
                            </div>
                            <div className="info-dialog_text">
                                <div className="info-dialog_text-title" style={{fontSize: '1rem'}}>
                                    {lexicon[currentLocal].info_dialog.info}
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                {lexicon[currentLocal].info_dialog.close}
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <div style={{
                        display: 'block',
                        width: '100%',
                        minHeight: '215px',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        right: 0,
                        zIndex: 0,
                        overflow: 'hidden',
                    }}>
                        <img
                            style={{
                                display: 'block',
                                maxWidth: '115%',
                                minHeight: '100%',
                                position: 'absolute',
                                transform: 'translate(-50%,-50%)',
                                top: '50%',
                                left: '50%',
                            }}
                            src={BG} alt=""/>
                    </div>

                    <div style={{
                        display: 'flex',
                        maxWidth: '220px',
                        margin: '0 auto'
                    }}>
                        <div style={{
                            position: 'relative',
                            display: 'inline-block'
                        }} className="info-dialog_logo">
                            <img src={logo} alt="" className="info-dialog_img"/>
                        </div>
                        <div style={{
                            position: 'relative',
                            display: 'inline-block'
                        }} className="info-dialog_logo">
                            <img src={logo_ua} alt="" className="info-dialog_img"/>
                        </div>
                    </div>
                    <div style={{
                        position: 'relative'
                    }} className="info-dialog_text">
                        <div className="info-dialog_text-title" style={{fontSize: '1rem'}}>
                            {lexicon[currentLocal].info_dialog.introtext}
                        </div>
                    </div>

                    <div style={{
                        position: 'relative'
                    }} className="info-dialog_text">
                        <div className="info-dialog_text-title">
                            {lexicon[currentLocal].info_dialog.title}
                        </div>
                        <div style={{textAlign: 'center', paddingBottom: 20}} className="info-dialog_text-title">
                            {data}
                        </div>

                        {
                            lexicon[currentLocal].info_dialog.content.map((item, index) => <div key={index + item.type}
                                                                                                className="info-dialog_text-row">
                            <span className="info-dialog_text-type">
                                {item.title}:
                            </span>
                                {this.getStatisticNumber(success, item)}
                            </div>)
                        }

                    </div>
                    <div style={{
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <Link to="/help" style={{
                            textDecoration: 'none'
                        }}>
                            <Button type="button" onClick={() => {
                                this.props.dispatch(INFO_DIALOG_TOGGLE, false);
                            }} raised style={{
                                backgroundColor: '#b3e5fc',
                                color: '#334148',
                            }}
                                    color="primary">
                                {lexicon[currentLocal].info_dialog.help}
                            </Button>
                        </Link>
                        <Button onClick={() => {
                            this.props.dispatch(INFO_DIALOG_TOGGLE, false);
                            this.setState({redirect: '/'});
                        }} type="button" raised
                                style={{backgroundColor: '#b3e5fc', color: '#334148'}} color="primary">
                            {lexicon[currentLocal].info_dialog.continue}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}