import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useData } from "../hooks/useData";

export function ProductCount({ id, producto, precio }) {
  const { listProducts } = useData();
  const { AddCart } = useContext(CartContext);
  const [cantidadV, setCantidadV] = useState(0);

  const SentToCart = () => {
    const product = listProducts.find((product) => product.id === id);
    if (product && Number(cantidadV) <= Number(product.cantidad)) {
      AddCart(id, producto, +cantidadV, precio);
      alert("Se envió los datos al carrito");
      setCantidadV(0);
    } else {
      alert("La cantidad de productos en stock es insuficiente.");
    }
  };

  return (
    <>
      <div className="card w-50 mx-auto my-2 text-center">
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text mx-auto fs-6">
              {producto ? producto : "No se ha agregado producto"}
            </span>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Cantidad a vender:</span>
            <input
              type="number"
              onChange={(e) => {
                setCantidadV(e.target.value);
              }}
              className="form-control"
              placeholder="15..."
              value={cantidadV}
            />
          </div>
          <button onClick={SentToCart}>Mandar al carrito</button>
        </div>
      </div>
    </>
  );
}
