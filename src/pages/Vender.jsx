import {  useState } from "react";
import {ProductCount} from "../components";
import { useData } from "../hooks/useData";

export default function Vender() {
  
  const { listProducts } = useData();

  const [infoProduct, setInfoProduct] = useState({
    id: "",
    producto: "",
    cantidad: 0,
    precio: 0,
  });

  const handleSendProductData = (data) => {
    setInfoProduct((prevValues) => ({
      ...prevValues,
      id: data.id,
      producto: data.producto,
      cantidad: Number(data.cantidad),
      precio: data.precio,
    }));
  };

  return (
    <main className="container">
      <ProductCount id={infoProduct.id} producto={infoProduct.producto} precio={infoProduct.precio}/>
      <table className="table table-sm bordered">
        <thead className="table-dark">
          <tr className="text-center">
            <th scope="col">#Id</th>
            <th scope="col">Producto</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio</th>
            <th className="w-50" scope="col">
              Agregar a la venta
            </th>
          </tr>
        </thead>
        <tbody>
          {listProducts.map((product) => (
            <tr className="text-center" key={product.id}>
              <th scope="row">{product.id}</th>
              <td scope="row">{product.producto}</td>
              <td scope="row">{product.cantidad}</td>
              <td scope="row">{product.precio}</td>
              <td scope="row">
                <button
                  className="btn btn-primary btn-sm m-0 rounded-0"
                  onClick={() => {
                    handleSendProductData(product);
                  }}
                >
                  Vender
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
