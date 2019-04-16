import React from "react";
import {Link} from "react-router-dom";
import MessageTimeline from "./MessageTimeline";

const Homepage = ({currentUser}) => {
    if(!currentUser.isAuthenticated){
        return(
            <div className="home-hero">
                <h1> New to Barker?</h1>
                <Link to="/signup" className="btn btn-primary"> Sign up here </Link>
            </div>
        );
    } else {
        return (
            <div> 
                <MessageTimeline
                    profileImageUrl={currentUser.user.profileImageUrl}
                    username={currentUser.user.username}
                    email={currentUser.user.email}
                    messages={currentUser.user.messages}
                />
            </div>  
        );
    }
}

export default Homepage;