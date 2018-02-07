import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {lexicon} from './lexicon';
import logo from './logo.png';
import {Button} from "material-ui";
import {INFO_DIALOG_TOGGLE} from "../../store/info_dialog/action_types";
import {Link, Redirect} from "react-router-dom";
import {Store} from '../../store/store';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import {getStatistic} from "../../store/info_dialog/actions";

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
            redirect: null
        }
    }

    componentDidMount() {

    }

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
            <div className="loading-panel_wrapper" style={{zIndex: '10000'}}>
                <div className="info-dialog_content">
                    <div className="info-dialog_logo">
                        <img src={logo} alt="" className="info-dialog_img"/>
                    </div>
                    <div className="info-dialog_text">
                        <div className="info-dialog_text-title" style={{fontSize: '1rem'}}>
                            {lexicon[currentLocal].info_dialog.introtext}
                        </div>
                    </div>
                    <div className="info-dialog_text">
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
                            {lexicon[currentLocal].info_dialog.close}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}