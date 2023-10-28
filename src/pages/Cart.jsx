import { useContext } from "react";
import { ListProducts } from "../components/ListProducts";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const resetCart = () => {
    setCart[[]];
    window.location.reload();
  };
  return (
    <>
      <ListProducts list={cart}/>
      <button
        className="d-flex justify-content-center btn btn-primary mx-auto rounded-0"
        onClick={resetCart}
      >
        Facturar
      </button>
    </>
  );
}
