import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../Firebase/config";

const LoginTab = () => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const forgotPass = (e) => {
        e.preventDefault();
        const email = prompt("Enter Your Registered Email");

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Password reset email sent successfull");
                alert("Please also check your spam folder.");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    const loginuser = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                // window.location.reload();
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };


    return (
        <div className="LoginTab">
            <div className="FormWrapper">
                <form className="Lgn-FormInput">
                    <label>Email Address<br></br><input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} /></label>
                    <label>Password<br></br><input
                        type="password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)} /></label>
                    <button className="login-submit" type="submit" value="Submit" onClick={loginuser}>Log In</button>
                    <a className="forgotpass" href="/" onClick={forgotPass}>Forgot Password?</a>
                </form>
            </div>
        </div>
    );
};
export default LoginTab;