import React from "react";
import {Switch, Route, withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Homepage from "../components/Homepage";
import UserPage from "../components/UserPage";
import AuthForm from "../components/AuthForm";
import ForgotPassword from "../components/ForgotPassword";
import {authUser, forgotPassword} from "../store/actions/auth";
import {removeError} from "../store/actions/errors";
import withAuth from "../hocs/withAuth";
import MessageForm from "../containers/MessageForm";

const Main = props => {
    const {authUser, errors, removeError, currentUser, pageOwner} = props;
    return(
        <div className="container">
            <Switch>
                <Route exact path="/" render={props => <Homepage currentUser={currentUser} {...props}/>}/>
                <Route exact path="/signin" render={props => {
                    return (
                        <AuthForm 
                            removeError={removeError}
                            errors={errors} 
                            onAuth={authUser} 
                            buttonText="Log in" 
                            heading="Welcome Back" 
                            {...props}
                        /> 
                    )
                }}/>
                <Route exact path="/signup" render={props => {
                    return (
                        <AuthForm 
                            removeError={removeError}
                            errors={errors} 
                            onAuth={authUser} 
                            buttonText="Sign Me Up!" 
                            heading="Welcome to Barker" 
                            signUp 
                            {...props}
                        /> 
                    )
                }}/>
                <Route exact path="/forgotPassword" render={props => {
                    return(
                        <ForgotPassword
                            removeError={removeError}
                            errors={errors}
                            onAuth={forgotPassword}
                            {...props}
                        />
                    )
                }}/>
            </Switch>
            <Route path="/users/:id/userpage" render={props => <UserPage pageOwner={currentUser} {...props}/>}/>
            <Route path="/users/:id/messages/new" component={withAuth(MessageForm)} />
        </div>
    )
}

function mapStateToProps(state){
    return{
        currentUser: state.currentUser,
        errors: state.errors
    };
}

export default withRouter(connect(mapStateToProps, {authUser, removeError})(Main));    // gets props from router to component