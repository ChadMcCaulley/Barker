import React from "react";
import MessageList from "../containers/MessageList";
import UserAside from "./UserAside";

const MessageTimeLine = props => {
    return(
        <div className="row">
            <UserAside 
                profileImageUrl={props.profileImageUrl}
                username={props.username}
                email={props.email}
                messages={props.messages}
            />
            <MessageList />
        </div>
    )
}

export default MessageTimeLine;