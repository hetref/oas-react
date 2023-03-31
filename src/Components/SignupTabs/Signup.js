import React, { useState } from "react";
import { auth } from "../../Firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

const SignupTab = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pass, setPass] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const validateEmail = () => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
    const inputNumber = event.target.value;
    if (!isNaN(inputNumber)) {
      setPhoneNumber(inputNumber);
    }
  };

  const validatePhoneNumber = () => {
    const pattern = /^\d{+10}$/;
    if (!pattern.test(phoneNumber)) {
      setPhoneNumberError("Please enter a valid phone number");
    } else {
      setPhoneNumberError("");
    }
  };

  const registerUser = (e) => {
    e.preventDefault();
    validateEmail();
    validatePhoneNumber();
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        axios({
          method: "post",
          url: "http://localhost:8080/register",
          data: {
            fname,
            lname,
            email,
            phone: phoneNumber,
          },
        }).then((resp) => {
          console.log(resp);
          window.location.reload();
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <div className="SignupTab">
      <div className="FormWrapper">
        <form className="FormInput" onSubmit={registerUser}>
          <div className="input-col1">
            <label>
              First Name<br></br>
              <input
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </label>
            <br></br>
            <label>
              Last Name<br></br>
              <input
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </label>
          </div>
          <div className="input-col2">
            {emailError && <div className="errors">{emailError}</div>}
            <label>
              Email Address <br></br>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={validateEmail}
              />
            </label>
            {phoneNumberError && (
              <div className="errors">{phoneNumberError}</div>
            )}
            <label>
              Phone No. <br></br>
              <input
                type="number"
                value={phoneNumber}
                onChange={handlePhoneChange}
                onBlur={validatePhoneNumber}
              />
            </label>
            <label>
              Password<br></br>
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </label>
          </div>
          <button className="login-submit" type="submit" value="Submit">
            Sign Up!
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignupTab;
