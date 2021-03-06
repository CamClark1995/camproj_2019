import React from "react"
import PropTypes from "prop-types"
class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {time: posted_at(props.created_at)}
    }

    componentDidMount() {
        this.timerID = setInterval(()=>this.tick(), 60000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({time: posted_at(this.props.created_at)})
    }

    render () {
        return (
            <div className={'post_div'}>
                <PostContent content={this.props.content }/>
                <PostInfo name={this.props.username} time={this.state.time}/>
            </div>
        );
    }
}

class PostInfo extends React.Component {
    render () {
        return (
            <div className={'post_info'}>
                <div>{this.props.name}</div>
                <div>{this.props.time}</div>
            </div>
        );
    }
}

class PostContent extends React.Component {
    render () {
        return (
            <div className={'post_content'}>
                {this.props.content}
            </div>
        );
    }
}

function posted_at(datetime) {
    let postedTime = new Date(datetime);
    let currentTime = new Date();
    let seconds = Math.round((currentTime.getTime() - postedTime.getTime())/1000);
    let minutes = Math.round(seconds/60);
    let hours = Math.round(minutes/60);
    let days = Math.round(hours / 60);
    if (days > 0) {
        return days===1 ?  days + ' day ago' :  days + ' days ago';
    } else if (hours > 0) {
        return hours===1 ? hours + ' hour ago' : hours + ' hours ago';
    } else if (minutes > 0) {
        return minutes===1 ? minutes + ' minute ago' : minutes + ' minutes ago';
    } else {
        return 'seconds ago';
    }
}

// Post.propTypes = {
//   content: PropTypes.string,
//   username: PropTypes.string,
//   time: PropTypes.string
// };
export default Post
