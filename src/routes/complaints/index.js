import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class ComplaintsPage extends Component {

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
                Complaints
            </div>
        )
    }
}