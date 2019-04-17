import React from "react";
import Moment from "react-moment"; // for timestamp
import {Link} from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.png";
import { setPageOwner } from "../store/actions/auth";
import currentUser from "../store/reducers/currentUser";

const MessageItem = ({
    date, 
    profileImageUrl, 
    text, 
    username, 
    removeMessage,
    messageUser,
    isCorrectUser
}) => (
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
                <Link onClick={() => {console.log(messageUser); setPageOwner(messageUser)}} id="message-username">@{username} &nbsp;</Link>
                <span className="text-muted">
                    <Moment className="text-muted" format="Do MMM YYYY">
                        {date}
                    </Moment>
                </span>
                <p> {text} </p>
                <a className="btn btn-primary btn-xsm"> 
                    FOLLOW
                </a>
                {isCorrectUser &&
                    <a className="btn btn-danger btn-xsm" onClick={removeMessage}> 
                        DELETE
                    </a>
                }
            </div> 
        </li>
    </div>
)

export default MessageItem;