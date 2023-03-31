import "./App.css";
import Tabs from "./Components/Tabs/tabs";
import Dashboard from "./Pages/Dashboard";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth } from "./Firebase/config";
import MyComponent from "./Components/MyComponent";

function App() {
  const [activeuser, setActiveuser] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // const uid = user.uid;
      setActiveuser(true);
      // ...
    } else {
      setActiveuser(false);
      // User is signed out
      // ...
    }
  });
  return (
    <BrowserRouter>
      {activeuser ? (
        <>
          <Routes>
            <Route element={<MyComponent />} path="/"></Route>
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route element={<Tabs />} path="/"></Route>
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
