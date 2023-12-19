import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

export default function SubTotal() {
  const { cart } = useContext(CartContext);
  const subtotal = cart.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
  return subtotal;
}
