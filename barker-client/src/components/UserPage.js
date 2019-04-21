import React from "react";
import DefaultProfileImg from "../images/default-profile-image.png";

const UserPage = props => {
    const username = props.pageOwner.user.username;
    const profileImageUrl = props.pageOwner.user.profileImageUrl;
    return(
        <form className="col-sm-3">
            <div className="panel-body">
                <img 
                    src={profileImageUrl || DefaultProfileImg}
                    alt={username}
                    width="200"
                    height="200"
                    className="img-thumbnail"
                />
                <h1> {username} </h1>
            </div>
        </form>
    )
}

export default UserPage;