import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../redux/actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Login = ({ login, auth: { isAuthenticated } }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const { username, password } = formData;

    const onSubmit = e => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div>
            {isAuthenticated ? <Redirect to="/dashboard" /> : null}
            <form onSubmit={onSubmit}>
                <input name="username" placeholder="Username" type="text" onChange={onChange} value={username} />
                <input name="password" placeholder="Password" type="password" onChange={onChange} value={password} />
                <button type="submit" className="btn btn-success">
                    Login
                </button>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

Login.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { login })(Login);
