import React, {Component} from 'react';
import './complaints.css';
import {FormComplaints} from "../../blocks/form/form_complaints/form_complaints";
import {connect} from "react-redux";
import CircularProgress from 'material-ui/Progress/CircularProgress';
import {TABLE_NAME} from "../../config";


const lexicon = {
	'RU': {
		load_map: ' Загрузка карты...'

	},
	'UKR': {
		load_map: 'Завантаження карти ...'
	}
};

function mapStateToProps(state) {
	return {
		currentLocal: state.intl,
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
		},
		version: {
			version: state.websql.version.version,
			loading: state.websql.version.loading,
			error: state.websql.version.error,
			success: state.websql.version.success,
		}
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
export class ComplaintsPage extends Component {

	static propTypes = {};

	static defaultProps = {};

	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.searchCompany = this.searchCompany.bind(this);
	}

	get initialState() {
		return {
			loading: true,
			company: null,
			isSearchCompany: false,
		}
	}

	// async componentWillReceiveProps(nextProps) {
	//     const {db, set,} = nextProps;
	//     if (db !== this.props.db.db && set.success && !this.state.loading && !this.state.loading.company) {
	//         console.log('componentWillReceiveProps: ',nextProps);
	//         console.log('componentWillReceiveProps: ',this.props);
	//         const data = await this.searchCompany();
	//         console.log(data);
	//     }
	// }

	async componentWillMount() {
		console.log('componentWillMount');
		if (this.props.match.params.id) {

			const data = await this.searchCompany();
			console.log('data: ', data);
		} else {
			this.setState({loading: false});
		}
	}

	searchCompany() {
		const {db} = this.props;

		this.setState({loading: true});
		return new Promise((resolve, reject) => {
			console.log('searchCompany', this.props);
			if (this.props.match.params.id) {


				console.log('setInterval: ', db);
				if (('db' in db) && ('transaction' in db.db)) {

					const executeSql = `SELECT * FROM ${TABLE_NAME} WHERE id = ?;`;
					db.db.transaction((tx) => {
						tx.executeSql(executeSql,
							[this.props.match.params.id],
							(sqlTransaction, sqlResultSet) => {
								console.log(sqlResultSet.rows.item);
								if (sqlResultSet.rows.item) {
									this.setState({company: sqlResultSet.rows.item(0), loading: false});
									resolve(sqlResultSet.rows.item(0))
								} else {
									this.setState({loading: false});

									resolve(false)
								}
							}, (sqlTransaction, sqlEerror) => {
								console.log(sqlTransaction, sqlEerror);
							})
					});
				}


				try {
					// ('db' in db)
					// && ('transaction' in db.db)

				} catch (err) {
					console.log(err);
					this.setState({loading: false});
				}
			} else {
				this.setState({loading: false});

				resolve(true);
			}
		}).then((res) => res)
	}

	render() {
		const {currentLocal} = this.props;
		console.log(this);
		return (
			<div className="complaints_wrapper">
				{
					this.state.loading && <div className="loading-panel_wrapper">
						<div>
							<CircularProgress style={{
								display: 'block',
								color: '#0277bd',
								margin: '0 auto'
							}} size={60} thickness={7}/>
							<div className="loading-panel_content">
								{lexicon[currentLocal].load_map}
							</div>
						</div>
					</div>
				}
				{
					!this.state.loading &&
					<FormComplaints
						params={this.props.match.params}
						initialValues={{
							...(this.state.company && this.state.company.company ? {
								company: this.state.company && this.state.company.company ? this.state.company.company : '',

							} : null),
							...(this.state.company && this.state.company.id ? {
								address_id: this.state.company && this.state.company.id ? this.state.company.id : '',
							} : null),
							...(this.state.company && this.state.company.address ? {
								address: this.state.company && this.state.company.address ? this.state.company.address : '',
							} : null),

						}}/>
				}
			</div>
		)
	}
}
