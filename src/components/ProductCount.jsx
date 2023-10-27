import { useEffect } from "react";
import { useState } from "react";

export default function ProductCount({id, p, c}) {
  const [ productos, setProductos ] = useState([]);
  const [cantidadV, setCantidadV] = useState("");

  const handleCantidadVender = () => {
    const producto = {c:parseInt(cantidadV), id,p};
    setProductos([...productos, producto]);
  };

  useEffect(() =>{
    console.log(productos);
  }, [productos]);

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
              value={cantidadV}
              placeholder="15..."
            />
            
          </div>
          <button onClick={() => {handleCantidadVender()}}>Mandar</button>
        </div>
      </div>
    </>
  );
}
