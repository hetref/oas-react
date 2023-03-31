import React, { useEffect, useState } from "react";
import "./Styles/dashboard.css";
import NavMenu from "../Components/NavMenu/nav";
import { auth } from "../Firebase/config";
import { BsFillCartPlusFill } from "react-icons/bs";
import axios from "axios";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    imagePath: "/images/product-images/product.png",
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
    imagePath: "/images/product-images/product.png",
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
    imagePath: "/images/product-images/product.png",
  },
  {
    id: 4,
    name: "Product 4",
    price: 400,
    imagePath: "/images/product-images/product.png",
  },
];

const Dashboard = () => {
  //   const [cartItemsLocalStorage, setCartItemsLocalStorage] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const logoutuser = () => {
    auth.signOut();
    // window.location.reload();
  };

  const addtocart = (product) => {
    console.log("added to cart");
    console.log(product);
  };

  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:8080/user",
      data: {
        email: auth.currentUser.email,
      },
    }).then((resp) => {
      console.log(resp.data);
      setUserName(resp.data.userfname + " " + resp.data.userlname);
      setUserEmail(resp.data.email);
      setUserPhone(resp.data.phone);
      console.log(userName);
      console.log(userEmail);
      console.log(userPhone);
    });
  }, []);

  return (
    <>
      <NavMenu />
      <div className="wrapper">
        <div className="dashboard">
          <div className="dashb-head">
            <section>
              <h3 className="client">
                <span className="greeting">
                  Hi! <span className="red">{userName}</span>
                </span>
                <br />
                {userEmail} <br />
                {userPhone}
              </h3>
            </section>
            <section>
              <button onClick={logoutuser} className="logout">
                Log out
              </button>
            </section>
          </div>
          <h2 className="product-heading">Products</h2>
          <div className="products-list">
            {products.map((product) => (
              <div className="product" key={product.id}>
                <div className="productDiv">
                  <section>
                    <img
                      className="product-image"
                      src={process.env.PUBLIC_URL + product.imagePath}
                      alt={product.name}
                    />
                  </section>
                  <section>
                    <h2>{product.name}</h2>
                    <p>{product.price}</p>
                  </section>
                </div>
                <div id="addtocartbtn">
                  <button onClick={() => addtocart(product)}>
                    <span style={{ marginRight: "6px" }}>Cart</span>
                    <BsFillCartPlusFill />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="cart-wrapper">
          <div id="cart_heading">
            <h3 className="cart-heading">Cart</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
