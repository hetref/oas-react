import React, { useState } from "react";
import LoginTab from "../SignupTabs/login";
import SignupTab from "../SignupTabs/Signup";
import "./tabs.css"
import "../SignupTabs/form.css"

const Tabs = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    const handleTab1 = () => {

        setActiveTab("tab1");
    };
    const handleTab2 = () => {

        setActiveTab("tab2");
    };
    return (
        <div className="Tabs">
            <ul className="nav">
                <li
                    className={activeTab === "tab1" ? "active" : ""}
                    onClick={handleTab1}
                >
                    Log In
                </li>
                <li
                    className={activeTab === "tab2" ? "active" : ""}
                    onClick={handleTab2}
                >
                    Sign Up!
                </li>
            </ul>

            <div className="outlet">
                {activeTab === "tab1" ? <LoginTab /> : <SignupTab />}
            </div>
        </div>
    );
};
export default Tabs;