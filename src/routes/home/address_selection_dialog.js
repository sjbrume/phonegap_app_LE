import React, {Component} from 'react';
import {connect} from "react-redux";
import Drawer from 'material-ui/Drawer';
import { MAP_GET_ADDRESS_INFO, MAP_SET_CENTER} from "../../store/map/action_types";
import {lexicon} from './lexicon';
import {Button} from "material-ui";
import {ListItem, ListItemIcon} from 'material-ui/List';
import ArrowBack from 'material-ui-icons/ArrowBack';
import Typography from 'material-ui/Typography';

import {Link} from "react-router-dom";
import {GLOBAL_STYLE} from "../../config";

function mapStateToProps(state) {
    return {
        currentLocal: state.intl,
        my_location: state.my_location,
        address_info: state.map.address_info,
        map_center: state.map.center,
        db: {
            db: state.websql.db.db,
            loading: state.websql.db.loading,
            error: state.websql.db.error,
            success: state.websql.db.success,
        },
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
export class AddressSelectionDialog extends Component {
    static propTypes = {};

    static defaultProps = {};


    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.toggleDescription = this.toggleDescription.bind(this);
        this.createPlacesDescription = this.createPlacesDescription.bind(this);
    }

    get initialState() {
        return {
            address_info: {
                '0': {
                    id: 3662,
                    region_id: 0,
                    id_code: '1988022708',
                    address: 'Біляївський р-н, с. Усатове, вул. Гагаріна, 2-В, Торгівельний комплекс',
                    lng: 30.665517,
                    lat: 46.522461,
                    license: '171511640081',
                    company: 'Руденко Надія Іванівна',
                    license_start_at: '2017-04-09',
                    license_end_at: '2018-04-09',
                    license_type: 'alcohol',
                    status: 'active'
                },
                '1': {
                    id: 11737,
                    region_id: 0,
                    id_code: '2704401738',
                    address: 'Біляївський р-н, с. Усатове, вул. Гагаріна, 2-В, магазин',
                    lng: 30.665517,
                    lat: 46.522461,
                    license: '171511640331',
                    company: 'Бабак Олег Пилипович',
                    license_start_at: '2017-11-15',
                    license_end_at: '2018-11-15',
                    license_type: 'alcohol',
                    status: 'active'
                },
                '2': {
                    id: 11737,
                    region_id: 0,
                    id_code: '2704401738',
                    address: 'Біляївський р-н, с. Усатове, вул. Гагаріна, 2-В, магазин',
                    lng: 30.665517,
                    lat: 46.522461,
                    license: '171511640331',
                    company: 'Бабак Олег Пилипович',
                    license_start_at: '2017-11-15',
                    license_end_at: '2018-11-15',
                    license_type: 'alcohol',
                    status: 'active'
                },
                '3': {
                    id: 11737,
                    region_id: 0,
                    id_code: '2704401738',
                    address: 'Біляївський р-н, с. Усатове, вул. Гагаріна, 2-В, магазин',
                    lng: 30.665517,
                    lat: 46.522461,
                    license: '171511640331',
                    company: 'Бабак Олег Пилипович',
                    license_start_at: '2017-11-15',
                    license_end_at: '2018-11-15',
                    license_type: 'alcohol',
                    status: 'active'
                }
            }
        }
    }

    toggleDescription(open, data) {
        if (!open) {
            this.props.dispatch(MAP_GET_ADDRESS_INFO, []);
        }
    }

    createPlacesDescription(address_info) {
        const {currentLocal, map_center} = this.props;
        console.log(address_info);
        let array = [];
        if(map_center.lat !== address_info[0].lat) {
            this.props.dispatch(MAP_SET_CENTER, {
                lat: address_info[0].lat,
                lng: address_info[0].lng,
            })
        }
        for (let i = 0; i <address_info.length; i++){
            let item = address_info[i];
            console.log(item);
            if(item.license_type === 'mixed') {
                array.push(<div key={item.id.toString()} className="places-description_wrapper" style={{
                    padding: '0 15px',
                    borderBottom: '1px solid rgba(102, 102, 102, 0.1)',
                }}>
                    <h3 className="places-description_title">
                        {lexicon[currentLocal].company_desc.company}: {item.company}
                    </h3>
                    <p className="places-description_text">
                        {lexicon[currentLocal].company_desc.measures} <br/>
                    </p>
                    <Button type="button" raised
                            style={{backgroundColor: '#b3e5fc', color: '#334148', marginBottom: '15px'}}
                            color="primary">
                        <Link className={'fonts-white'} to={'/complaints/' + item.id}>
                            {lexicon[currentLocal].company_desc.report_abuse}
                        </Link>
                    </Button>

                </div>)
            } else {
                array.push(<div key={item.id.toString()} className="places-description_wrapper" style={{
                    padding: '0 15px',
                    borderBottom: '1px solid rgba(102, 102, 102, 0.1)',
                }}>
                    <h3 className="places-description_title">
                        {lexicon[currentLocal].company_desc.company}: {item.company}
                    </h3>
                    <p className="places-description_text">
                        {lexicon[currentLocal].company_desc.license_type}: {item.license_type === 'alcohol' ? lexicon[currentLocal].company_desc.alcohol : lexicon[currentLocal].company_desc.tobacco}
                        <br/>
                        {lexicon[currentLocal].company_desc.license_number}: {item.license} <br/>
                        {lexicon[currentLocal].company_desc.license_start_at}/{lexicon[currentLocal].company_desc.license_end_at}: {item.license_start_at}
                        — {item.license_end_at}
                    </p>
                    <Button type="button" raised
                            style={{backgroundColor: '#b3e5fc', color: '#334148', marginBottom: '15px'}}
                            color="primary">
                        <Link className={'fonts-white'} to={'/complaints/' + item.id}>
                            {lexicon[currentLocal].company_desc.report_abuse}
                        </Link>
                    </Button>

                </div>)
            }

        }

        return array;
    }

    render() {
        // const {address_info} = this.state;
        const {address_info} = this.props;
        console.log(this);
        // console.log(this.props);
        if (!address_info.length) {
            return null
        }


        return (
            <Drawer
                onClick={() => this.toggleDescription(false, null)}
                onKeyDown={() => this.toggleDescription(false, null)}
                anchor="bottom"
                open={address_info !== null}
                onClose={() => this.toggleDescription(false, null)}
            >
                <div>
                    <button
                        type="button"
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            padding: 0,
                            color: GLOBAL_STYLE.menu.fontColor,
                            textDecoration: 'none',
                            width: '100%'
                        }}
                        className={'fonts-white'}
                        onClick={() => this.toggleDescription(false, null)}
                    >
                        <ListItem
                            style={{
                                borderBottom: '1px solid rgba(102, 102, 102, 0.1)',
                            }}
                        >
                            <ListItemIcon
                                style={{
                                    color: '#424242',
                                    textDecoration: 'none'
                                }}
                            >
                                <ArrowBack/>
                            </ListItemIcon>
                            <Typography
                                style={{
                                    color: '#424242',
                                    textDecoration: 'none'
                                }}
                                color="inherit"
                            >
                                Назад
                            </Typography>
                        </ListItem>
                    </button>
                    {
                        address_info && this.createPlacesDescription(address_info)
                    }
                </div>
            </Drawer>
        )


    }
}

