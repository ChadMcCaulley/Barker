import React from "react";
import {Link} from "react-router-dom";

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
                <h1> You made it to the real homepage </h1>
            </div>  
        );
    }
}

export default Homepage;