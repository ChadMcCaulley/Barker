import React from "react";
import UserAside from "./UserAside";

const UserPage = props => {
    return(
        <div className="row">
            <UserAside 
                profileImageUrl={props.profileImageUrl}
                username={props.username}
                email={props.email}
                messages={props.messages}
                followers={props.followers}
            />
        </div>
    )
}

export default UserPage;