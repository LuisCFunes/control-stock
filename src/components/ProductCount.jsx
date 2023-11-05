import { useEffect,useState,useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCount({id, p, c,pr}) {

  const {cart, AddCart} = useContext(CartContext);
  const [cantidadV, setCantidadV] = useState(0);

  useEffect(() =>{
    console.log(cart);
    setCantidadV("");
  }, [cart]);

  return (
    <>
      <div className="card w-50 mx-auto my-2 text-center">
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text mx-auto fs-4" id="basic-addon1">
              {p ? p : "No a agregado producto"}
            </span>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Cantidad a vender:
            </span>
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
          <button onClick={() => {AddCart(id,p,+cantidadV,pr)}}>Mandar</button>
        </div>
      </div>
    </>
  );
}
