import React, {Component} from 'react';
import {Input} from "material-ui";
import {withStyles} from 'material-ui/styles';

const styles = {
    fullWidth: {
        width: '100%',
    },
};

@withStyles(styles)
export class InputAutocomplete extends Component {

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
        const {classes,input, label, type, meta, styleWrap,placeholder} = this.props;
        return (
            <Input
                className={classes.fullWidth + ' input--no-border'}
                value={input.value}
                placeholder={placeholder}
            />
        )
    }
}