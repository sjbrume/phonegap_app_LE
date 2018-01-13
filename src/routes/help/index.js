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

export class HelpPage extends Component {

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
                        <div className="help_description"> выбор типа лицензии
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
                            поиск вашего места вашего местоположения
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
                            приложение в процессе поиска вашего местоположения
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
                            заведение с лицензией
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
                            заведение без лицензии
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
                            группа заведений с лицензией
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
                            группа заведений без лицензии
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
                            ваше место расположения на карте
                        </div>
                    </li>


                </ul>
            </div>
        )
    }
}