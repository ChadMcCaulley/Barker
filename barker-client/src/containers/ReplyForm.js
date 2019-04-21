import React, {Component} from "react";
import {connect} from "react-redux";
import {postNewMessage} from "../store/actions/messages";

class ReplyForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: ""
        };
    }
    handleNewMessage = event => {
        event.preventDefault();
        this.props.postNewMessage(this.state.message, true);  //post new message to database
        this.setState({message: ""}); // reset message and remove replyForm
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
                    SUBMIT
                </button>
            </form>
        )
    }
}
function mapStateToProps(state){
    return{
        errors: state.errors
    };
}


export default connect(mapStateToProps, {postNewMessage})(ReplyForm);