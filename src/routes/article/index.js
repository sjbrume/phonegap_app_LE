import React, {Component} from 'react';
import ReactHtmlParser from 'react-html-parser';
import CircularProgress from 'material-ui/Progress/CircularProgress';

export class ArticlePage extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.getArticles = this.getArticles.bind(this);
    }

    get initialState() {
        this.getArticles();

        return {
            loading: true,
            text: null
        }
    }

    async getArticles() {
        const URL = `assets/articles/${this.props.match.params.id}.html`;

        const data = await new Promise(function(resolve, reject) {
            let xhr = new XMLHttpRequest;
            xhr.onload = function() {
                resolve(xhr.responseText)
            };
            xhr.onerror = function() {
                reject(new TypeError('Local request failed'))
            };
            xhr.open('GET', URL);
            xhr.send(null)
        });

        this.setState({
            loading: false,
            text: data
        })

    }


    render() {
        console.log(this);
        const {loading,text} = this.state;
        if(loading ){
            return (    <CircularProgress style={{
                    margin: '60% auto',
                    display:'block'
                }} size={60} thickness={7} />
            )
        }
        return (
            <div className="article__wrapper">
                { text && ReactHtmlParser(text) }
            </div>
        )
    }
}