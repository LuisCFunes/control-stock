import Vender from "./pages/Vender";
import Home from "./pages/Home";
import Facturar from "./pages/Facturar";
import Navigation from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { CartContext } from "./context/CartContext";

function App() {
  const [cart, setCart] = useState([]);

  const AddCart = (id,producto, cantidad) => {
    const productoAgregado = {id,producto,cantidad};
    const newCart = [...cart];
    const hasCart = newCart.find((prod) => prod.id === productoAgregado.id);

    if (hasCart){
      hasCart.cantidad += cantidad;
    } else {
      newCart.push(productoAgregado);
    }
    setCart(newCart);
  };

  return (
    <>
      <CartContext.Provider value={{cart, AddCart, setCart}}>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Vender" element={<Vender />} />
            <Route path="/Facturar" element={<Facturar />} />
          </Routes>
        </BrowserRouter>
      </CartContext.Provider>
    </>
  );
}

export default App;
