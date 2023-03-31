import "./nav.css"
import { FiSearch } from "react-icons/fi";
import { RiNotification2Line } from "react-icons/ri";

const NavMenu = () => {
    return (
        <div className="menu-wrapper">
            <h1 className="logo">Panel Tech</h1>
            <div className="searchbar">
                <FiSearch /><input type="text" placeholder="Search..." />
            </div>
            <div className="user">
                <RiNotification2Line className="notification" />
                <img className="user-img" src={require("../../Assets/Images/user-img.png")} alt="logo" />
            </div>
        </div>
    );
}

export default NavMenu;