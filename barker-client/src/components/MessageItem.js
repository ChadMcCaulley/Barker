import React from "react";
import Moment from "react-moment"; // for timestamp
import {Link} from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.png";

const MessageItem = ({
    date, 
    profileImageUrl, 
    text, 
    username, 
    removeMessage, 
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
                <Link id="message-username" to="/">@{username} &nbsp;</Link>
                <span className="text-muted">
                    <Moment className="text-muted" format="Do MMM YYYY">
                        {date}
                    </Moment>
                </span>
                <p> {text} </p>
                {isCorrectUser &&
                    <a className="btn btn-danger btn-sm" onClick={removeMessage}> 
                        DELETE
                    </a>
                }
            </div> 
        </li>
    </div>
)

export default MessageItem;