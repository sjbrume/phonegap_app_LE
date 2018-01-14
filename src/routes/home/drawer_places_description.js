import React, {Component} from 'react';
import {lexicon} from './lexicon';


function mapStateToProps(state) {
    return {
        currentLocal: state.intl,
        drawer_places_description: state.drawer_places_description,
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
export class DrawerPlacesDescription extends Component {

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
        const {drawer_places_description, currentLocal,data} = this.props;
        return (
            <div>
                {
                    drawer_places_description.isOpen && drawer_places_description.description && <Drawer
                        onClick={() => this.toggleDescription(false, null)}
                        onKeyDown={() => this.toggleDescription(false, null)}
                        anchor="bottom"
                        open={drawer_places_description.isOpen}
                        onClose={() => this.toggleDescription(false, null)}
                    >
                        <div className="places-description_wrapper" style={{
                            padding: '0 15px'
                        }}>
                            <h3 className="places-description_title">
                                {lexicon[currentLocal].company_desc.company}: {data.company}
                            </h3>
                            <p className="places-description_text">
                                {lexicon[currentLocal].company_desc.license_type}: {data.license_type === 'alcohol' ? lexicon[currentLocal].company_desc.alcohol : lexicon[currentLocal].company_desc.tobacco}
                                <br/>
                                {lexicon[currentLocal].company_desc.license_number}: {data.license} <br/>
                                {lexicon[currentLocal].company_desc.license_start_at}/{lexicon[currentLocal].company_desc.license_end_at}: {data.license_start_at}
                                — {data.license_end_at}
                            </p>
                            <Button type="button" raised
                                    style={{backgroundColor: '#b3e5fc', color: '#334148', marginBottom: '15px'}}
                                    color="primary">
                                <Link className={'fonts-white'} to={'/complaints/' + data.id}>
                                    Сообщить о нарушении
                                </Link>
                            </Button>

                        </div>
                    </Drawer>
                }
            </div>
        )
    }
}