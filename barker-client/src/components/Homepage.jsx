import React from "react";
import {Link} from "react-router-dom";

const Homepage = () => (
    <div className="home-hero">
        <h1> New to Warbler?</h1>
        <Link to="/signup" className="btn btn-primary"> Sign up here </Link>
    </div>
)

export default Homepage;