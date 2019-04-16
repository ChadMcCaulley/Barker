import React, {Component} from "react";
import {connect} from "react-redux";
import {postNewMessage} from "../store/actions/messages";

class MessageForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages: this.props.messages,
            message: ""
        };
    }
    handleNewMessage = event => {
        event.preventDefault();
        this.props.postNewMessage(this.state.message);  //post new message to database
        this.setState({message: ""}); // reset message
        this.props.history.push("/");
    }
    render(){
        return(
            <form onSubmit={this.handleNewMessage} id="message-form">
                {this.props.errors.message && <div className="alert alert-danger">{this.props.errors}</div>}
                <textarea 
                    rows="8"
                    cols="20" 
                    type="text"
                    className="form-control"
                    value={this.state.message}
                    onChange={e => this.setState({message: e.target.value})}
                />
                <button type="submit" className="btn btn-success pull-right">
                    Add New Message!
                </button>
            </form>
        )
    }
}
function mapStateToProps(state){
    return{
        messages: state.currentUser.user.messages,
        errors: state.errors
    };
}


export default connect(mapStateToProps, {postNewMessage})(MessageForm);