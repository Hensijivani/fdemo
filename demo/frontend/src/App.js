import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from 'react-router-dom'; 

import Home from "./Page/Home/Home";
import Cart from "./Page/Cart/Cart";
import PlaceOrder from "./Page/PlaceOrder/PlaceOrder";
import Footer from "./Components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./Components/LoginPopup/LoginPopup";
import StoreContextProvider from "./Context/StoreContext";
import AdminPanel from "./Components/AdminPanel";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <StoreContextProvider>
      <div>
        {/* {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
        <Navbar setShowLogin={setShowLogin} /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </StoreContextProvider>
  );
}

export default App;



