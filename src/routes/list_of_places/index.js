import React, {Component} from 'react';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import ArrowDropUp from 'material-ui-icons/ArrowDropUp';
import InfiniteScroll from 'react-infinite-scroll-component';
import {connect} from "react-redux";
import CircularProgress from 'material-ui/Progress/CircularProgress';
import {TABLE_NAME} from "../../config";
import {lexicon} from '../home/lexicon';

class Accordion extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.isOpen = this.isOpen.bind(this);
    }

    get initialState() {
        return {
            open: false
        }
    }

    isOpen() {
        this.setState({open: !this.state.open})
    }

    render() {
        const {open} = this.state;
        const {data,currentLocal} = this.props;
        console.log(this.props);
        return (
            <div className="accordion_wrapper">
                <button onClick={this.isOpen} className="accordion_header">
                    <div className="accordion_title">
                        {data.company}
                    </div>
                    {
                        !open && <ArrowDropDown className="accordion_arrow"/>
                    }
                    {
                        open && <ArrowDropUp className="accordion_arrow"/>
                    }

                </button>
                <div className={"accordion_content " + (open ? 'accordion_content--active' : '')}>
                    <div className="places-description_wrapper">
                        <p className="places-description_text">
                            {lexicon[currentLocal].company_desc.license_type}: {data.license_type === 'alcohol' ? lexicon[currentLocal].company_desc.alcohol : lexicon[currentLocal].company_desc.tobacco}
                            <br/>
                            {lexicon[currentLocal].company_desc.license_number}: {data.license} <br/>
                            {lexicon[currentLocal].company_desc.license_start_at}/{lexicon[currentLocal].company_desc.license_end_at}: {data.license_start_at}
                            — {data.license_end_at}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        currentLocal: state.intl,
        list_of_places: state.websql.list_of_places,

        db: {
            db: state.websql.db.db,
            loading: state.websql.db.loading,
            error: state.websql.db.error,
            success: state.websql.db.success,
        },
        data: {
            loading: state.websql.data.loading,
            error: state.websql.data.error,
            success: state.websql.data.success,
        },
        set: {
            loading: state.websql.set.loading,
            error: state.websql.set.error,
            success: state.websql.set.success,
        }
    }
}


@connect(mapStateToProps)
export class ListOfPlacesPage extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.generateDivs = this.generateDivs.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    get initialState() {
        return {
            places: [],
            min: 0,
            step: 30,
        }
    }

    componentDidMount() {
        this.generateDivs()
    }

    // componentWillReceiveProps(nextProps) {
    //     // console.log('componentWillReceiveProps', nextProps);
    //
    //     const {db, data, set} = nextProps;
    //
    //     if (data.success !== this.props.data.success) {
    //         this.generateDivs();
    //     }
    //
    //     if (set.success !== this.props.set.success) {
    //         this.generateDivs();
    //     }
    //
    //     if (db.success !== this.props.db.success) {
    //         this.generateDivs();
    //     }
    // }

    shouldComponentUpdate = (nextProps, nextState) => {
        // console.log('shouldComponentUpdate', nextProps);
        // console.log('shouldComponentUpdate', nextState);

        const {db, data, set} = nextProps;

        const OLD_LENGTH = this.state.places.length;
        const NEW_LENGTH = nextState.places.length;

        if (NEW_LENGTH !== OLD_LENGTH) {
            return true
        }


        if (data.success !== this.props.data.success) {
            // this.generateDivs();
            return true
        }

        if (db.success !== this.props.db.success) {
            // this.generateDivs();
            return true
        }

        if (set.success !== this.props.set.success) {
            this.generateDivs();
            return true
        }
        return false
    };

    refresh() {
        this.generateDivs()
    }

    async generateDivs() {
        console.log('generateDivs', this.props);
        const {db,currentLocal} = this.props;


        let moreDivs = [];
        const MIN = this.state.min;
        const MAX = this.state.min + this.state.step;

        const Data = await new Promise((resolve, reject) => {
           try {
               db.db.transaction((tx) => {
                   tx.executeSql(`SELECT * FROM ${TABLE_NAME} WHERE rowid >= ? AND rowid <= ?`,
                       [MIN, MAX],
                       (sqlTransaction, sqlResultSet) => {
                           console.log(sqlTransaction, sqlResultSet);
                           resolve(sqlResultSet.rows)
                       }, (sqlTransaction, sqlEerror) => {
                           console.log(sqlTransaction, sqlEerror);
                           reject(sqlEerror);
                       });
               });
           } catch (err) {
               console.error ('generateDivs: ',err);
           }
        });

        for(let i = 0; i < Data.length; i++) {
            moreDivs.push(<Accordion key={Data.item(i).id} currentLocal={currentLocal} data={Data.item(i)}/>)
        }

        this.setState({
            places: [...this.state.places, ...moreDivs],
            min: this.state.min + this.state.step
        });


    }

    renderLoading = (content) => (<div className="loading-panel_wrapper">
        <div>
            <CircularProgress style={{
                display: 'block',
                color: '#0277bd',
                margin: '0 auto'
            }} size={60} thickness={7}/>
        </div>
    </div>);

    render() {
        const {db, data, set} = this.props;
        console.log(this.state);
        if (db.success && data.success && set.success) {

            return (

                <InfiniteScroll
                    pullDownToRefresh
                    pullDownToRefreshContent={<h3 style={{textAlign: 'center'}}>&#8595; Pull down to refresh</h3>}
                    releaseToRefreshContent={<h3 style={{textAlign: 'center'}}>&#8593; Release to refresh</h3>}
                    refreshFunction={this.refresh}
                    next={this.generateDivs}
                    hasMore={true}
                    loader={<div className="loading-panel_wrapper">
                        <div>
                            <CircularProgress style={{
                                display: 'block',
                                color: '#0277bd',
                                margin: '0 auto'
                            }} size={60} thickness={7}/>
                        </div>
                    </div>}>
                    {this.state.places}
                </InfiniteScroll>
            );
        } else {
            return this.renderLoading()
        }

    }
}