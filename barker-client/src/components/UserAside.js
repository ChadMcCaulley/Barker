import React from "react";
import {Link} from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.png";

const UserAside = ({profileImageUrl, username, email, messages}) => (
    <form className="col-sm-3">
        <div className="panel-body">
            <img 
                src={profileImageUrl || DefaultProfileImg}
                alt={username}
                width="200"
                height="200"
                className="img-thumbnail"
            />
            <Link className="panel-body-link"> {username} </Link>
            <Link className="panel-body-link"> {email} </Link>
            <div className="Followers-comments">
                <div> Comments {messages.length} </div>
            </div>
        </div>    
    </form>
)

export default UserAside;