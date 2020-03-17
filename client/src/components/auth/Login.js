import React from "react";

const Login = () => {
    const onSubmit = e => {
        e.preventDefault();
        console.log("submit");
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input placeholder="Username" type="text" name="username"></input>
                <input placeholder="Password" type="text" name="password"></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Login;
