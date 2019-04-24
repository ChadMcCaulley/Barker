import React, {Component} from "react";

export default class ForgotPassword extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: ""
        };
    }
    handleChange = e => {
        this.setState({
            email: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.onAuth(this.state.email);
    }
    render(){
        const {email} = this.state;
        const {errors, history, removeError} = this.props;
        history.listen(() => {
            removeError();  
        });
        return(
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h2> Forgot Password </h2>
                            {errors.message && <div className="alert alert-danger">{errors.message}</div>}
                            <input 
                                className="form-control" 
                                id="email" 
                                name="email" 
                                onChange={this.handleChange} 
                                value={email} 
                                type="text"
                            />
                            <button className="btn btn-primary btn-block btn-lg" type="submit"> Reset Password </button>
                        </form>
                    </div>
                </div>
            </div>            
        )
    }
}