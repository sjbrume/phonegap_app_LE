import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Typography from 'material-ui/Typography';

export class ArticlesPage extends Component {

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
                <ul className="articles__list">
                    <li className="articles__item">

                        <Link className="articles__link" to={"/article/265"}>
                            <Typography type="subheading" gutterBottom>
                                265 - Про застосування реєстраторів розрахункових операцій у сфері торгівлі,
                                громадського
                                харчування та послуг
                            </Typography>
                        </Link>
                    </li>
                    <li className="articles__item">
                        <Link className="articles__link" to={"/article/481"}>
                            <Typography type="subheading" gutterBottom>
                                481 - Про державне регулювання виробництва і обігу спирту етилового, коньячного і
                                плодового,
                                алкогольних напоїв та тютюнових виробів
                            </Typography>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}