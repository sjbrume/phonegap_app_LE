import React, {Component} from 'react';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {connect} from "react-redux";
import {lexicon} from './lexicon';
import {Link} from "react-router-dom";




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
        const {currentLocal} = this.props;
        return (
            <div>
                <List className={''}>
                    <Link
                        to={'/help_faq'}
                        style={{
                            textDecoration: 'none'
                        }}
                    >
                        <ListItem button>
                            <ListItemText primary={lexicon[currentLocal].faq}/>
                        </ListItem>
                    </Link>
                    <Divider light/>
                    <Link
                        style={{
                            textDecoration: 'none'
                        }}
                        to={'/help_conventions'}>
                        <ListItem button>
                            <ListItemText primary={lexicon[currentLocal].conventions}/>
                        </ListItem>
                    </Link>
                    <Divider/>

                </List>
            </div>
        )
    }
}