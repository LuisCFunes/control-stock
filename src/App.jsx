import Vender from "./pages/Vender";
import Home from "./pages/Home";
import Navigation from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { CartContext } from "./context/CartContext";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <>
      <CartContext.Provider value={{cart, setCart}}>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Vender" element={<Vender />} />
          </Routes>
        </BrowserRouter>
      </CartContext.Provider>
    </>
  );
}

export default App;
