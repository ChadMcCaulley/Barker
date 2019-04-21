import React, {Component} from "react";
import {connect} from "react-redux";
import Moment from "react-moment"; // for timestamp
import {Link} from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.png";
import { setPageOwner } from "../store/actions/auth";
import ReplyForm from "../containers/ReplyForm";

class MessageItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            renderReplyForm: false
        };
    }
    addReplyForm = event => {
        event.preventDefault();
        this.setState({renderReplyForm: !this.state.renderReplyForm});
    }
    render(){
        const   profileImageUrl = this.props.profileImageUrl,
                username        = this.props.username,
                messageUser     = this.props.messageUser,
                date            = this.props.date,
                text            = this.props.text,
                isCorrectUser   = this.props.isCorrectUser,
                removeMessage   = this.props.removeMessage;
        return(
            <div>
                <li className="list-group-item">
                    <img 
                        src={profileImageUrl || DefaultProfileImg} 
                        alt={username}
                        width="30%"
                        height="30%"
                        className="timeline-image"
                    />
                    <div className="message-area">
                        <Link to={`/users/${messageUser._id}/userpage`} onClick={() => {setPageOwner(messageUser)}} id="message-username">@{username} &nbsp;</Link>
                        <span className="text-muted">
                            <Moment className="text-muted" format="Do MMM YYYY">
                                {date}
                            </Moment>
                        </span>
                        <p> {text} </p>
                        <a className="btn btn-primary btn-xsm"> 
                            FOLLOW
                        </a>
                        <a className="btn btn-success btn-xsm" onClick={this.addReplyForm}> 
                            REPLY
                        </a>
                        {isCorrectUser &&
                            <a className="btn btn-danger btn-xsm" onClick={removeMessage}> 
                                DELETE
                            </a>
                        }
                    </div> 
                </li>
                {this.state.renderReplyForm && (
                    <ReplyForm messageRepliedTo={messageUser}/>
                )}
            </div> 
        )
    }
}

function mapStateToProps(state){
    return{
        messages: state.messages
    } 
}
   
export default connect(mapStateToProps)(MessageItem);