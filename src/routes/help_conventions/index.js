import React, {Component} from 'react';
import PropTypes from 'prop-types';

import filter_places from './image/filter_places.png'
import find_geolication_loading from './image/find_geolication_loading.png'
import find_geolication_inactive from './image/find_geolication_inactive.png'

import marker_license_active from '../home/marker_license_active.svg'
import marker_license_canceled from '../home/marker_license_canceled.svg'
import cluster_marker_active from '../../cluster_marker_active.png'
import cluster_marker_canceled from '../../cluster_marker_canceled.png'
import my_location from '../complaints_map/my_location_icon.png';
import {connect} from "react-redux";
import {lexicon} from './lexicon';

function mapStateToProps(state) {
    return {
        currentLocal: state.intl,
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
export class HelpConventionsPage extends Component {

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
        const {currentLocal} = this.props;
        return (
            <div>
                <ul className="articles__list help_list">

                    <li className="help_item">
                        <div className="help_image" style={{
                            width: '130px',
                            flexShrink: 0,
                        }}>
                            <img src={filter_places} alt=""/>
                        </div>
                        <div className="help_description">
                            {
                                lexicon[currentLocal].filter_places
                            }
                        </div>
                    </li>

                    <li className="help_item">
                        <div className="help_image" style={{
                            width: '50px',
                            flexShrink: 0,
                        }}>
                            <img src={find_geolication_inactive} alt=""/>
                        </div>
                        <div className="help_description">
                            {lexicon[currentLocal].find_geolication_inactive}
                            </div>
                    </li>

                    <li className="help_item">
                        <div className="help_image" style={{
                            width: '50px',
                            flexShrink: 0,
                        }}>
                            <img src={find_geolication_loading} alt=""/>
                        </div>
                        <div className="help_description">
                            {lexicon[currentLocal].find_geolication_loading}
                        </div>
                    </li>

                    <li className="help_item">
                        <div className="help_image" style={{
                            width: '25px',
                            flexShrink: 0,
                        }}>
                            <img src={marker_license_active} alt=""/>
                        </div>
                        <div className="help_description">
                            {lexicon[currentLocal].marker_license_active}
                        </div>
                    </li>

                    <li className="help_item">
                        <div className="help_image" style={{
                            width: '25px',
                            flexShrink: 0,
                        }}>
                            <img src={marker_license_canceled} alt=""/>
                        </div>
                        <div className="help_description">
                            {lexicon[currentLocal].marker_license_canceled}
                        </div>
                    </li>

                    <li className="help_item">
                        <div className="help_image" style={{
                            width: '50px',
                            flexShrink: 0,
                        }}>
                            <img src={cluster_marker_active} alt=""/>
                        </div>
                        <div className="help_description">
                            {lexicon[currentLocal].cluster_marker_active}
                        </div>
                    </li>

                    <li className="help_item">
                        <div className="help_image" style={{
                            width: '50px',
                            flexShrink: 0,
                        }}>
                            <img src={cluster_marker_canceled} alt=""/>
                        </div>
                        <div className="help_description">
                            {lexicon[currentLocal].cluster_marker_canceled}
                        </div>
                    </li>

                    <li className="help_item">
                        <div className="help_image" style={{
                            width: '50px',
                            flexShrink: 0,
                        }}>
                            <img src={my_location} alt=""/>
                        </div>
                        <div className="help_description">
                            {lexicon[currentLocal].my_location}
                        </div>
                    </li>


                </ul>
            </div>
        )
    }
}