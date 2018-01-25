import React, {Component} from 'react';
import {connect} from "react-redux";
import Drawer from 'material-ui/Drawer';
import {MAP_DUPLICATE_POSITION} from "../../store/map/action_types";
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
        duplicate_position: state.map.duplicate_position,
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
            duplicate_position: {
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
            this.props.dispatch(MAP_DUPLICATE_POSITION, null);
        }
    }

    createPlacesDescription(duplicate_position) {
        const {currentLocal} = this.props;

        let array = [];
        for (let key in duplicate_position) {
            console.log(key);
            if (parseInt(key) === 0 || typeof parseInt(key) === 'number' && parseInt(key)){
                let item = duplicate_position[key];
                console.log(item);
                array.push(<div key={item.id_code.toString()} className="places-description_wrapper" style={{
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
        // const {duplicate_position} = this.state;
        const {currentLocal, duplicate_position} = this.props;
        console.log(this);
        // console.log(this.props);
        if (!duplicate_position) {
            return null
        }


        return (
            <Drawer
                onClick={() => this.toggleDescription(false, null)}
                onKeyDown={() => this.toggleDescription(false, null)}
                anchor="bottom"
                open={duplicate_position !== null}
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
                        duplicate_position && this.createPlacesDescription(duplicate_position)
                    }
                </div>
            </Drawer>
        )

        // return (
        //     <div className="loading-panel_wrapper" style={{zIndex: '10000'}}>
        //         <div className="loading-panel_content">
        //             AddressSelectionDialog
        //         </div>
        //     </div>
        // )
    }
}

