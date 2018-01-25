import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {MAP_CLUSTERING_FILTER, MAP_CLUSTERING_LOAD} from "../../store/map/action_types";
import {lexicon} from './lexicon';

function mapStateToProps(state) {
    return {
        clustering: state.map.clustering,
        filter: state.map.filter,
        currentLocal: state.currentLocal,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setStore: (type, payload) => {
            dispatch({type, payload})
        }
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class MapFilter extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.onChange = this.onChange.bind(this);
    }

    get initialState() {
        return {}
    }

    onChange(event) {
        console.log(event.target.value);
        const value = event.target.value ? event.target.value : 'alcohol';
        this.props.setStore(MAP_CLUSTERING_FILTER, value);
        this.props.setStore(MAP_CLUSTERING_LOAD, true);
    }

    render() {
        const {currentLocal} = this.props;
        return (
            <div className="map-filter_wrapper">
                <input onChange={this.onChange} className="map-filter_input" checked={this.props.filter === 'alcohol'}
                       id="filter-alco" type="radio" name="filter" value={'alcohol'}/>
                <label htmlFor="filter-alco" className="map-filter_toggle">
                    {lexicon[currentLocal].filter.alcohol}
                </label>
                <input onChange={this.onChange} className="map-filter_input" checked={this.props.filter === 'tobacco'}
                       id="filter-tobac" type="radio" name="filter" value={'tobacco'}/>
                <label htmlFor="filter-tobac" className="map-filter_toggle">
                    {lexicon[currentLocal].filter.tobacco}
                </label>
            </div>
        )
    }
}