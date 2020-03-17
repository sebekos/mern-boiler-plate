import React from "react";

const Register = () => {
    const onSubmit = e => {
        e.preventDefault();
        console.log("submit");
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input placeholder="Email" type="text" name="username"></input>
                <input placeholder="Password" type="text" name="password"></input>
                <input placeholder="Confirm Password" type="text" name="password2"></input>
                <input placeholder="Key" type="text" name="key"></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Register;
