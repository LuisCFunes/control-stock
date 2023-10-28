import {  useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { supabase } from "../supabase/client";
import ProductCount from "../components/ProductCount";
import { useData } from "../hooks/useData";

export default function Vender() {
  
  const { listProducts } = useData();
  const [cantidad, setCantidad] = useState(0);
  const [producto, setProducto] = useState("");
  const [id, setId] = useState("");

  const handleSendProductData = (data) => {
    setId(data.id);
    setProducto(data.producto);
    setCantidad(parseInt(data.cantidad));
  };

  async function updateData() {
    try {
      const { error } = await supabase
        .from("Productos")
        .update({
          id: id,
          producto: producto,
          cantidad: cantidad,
        })
        .eq("id", id)
        .select();
      if (error) throw error;
      withReactContent(Swal).fire({
        title: <p>Actualizado con exito!</p>,
        icon: "success",
      });
      setEditar(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró registrar el producto!",
        footer: JSON.parse(JSON.stringify(error)).message,
      });
    }
  }

  return (
    <main className="container">
      <ProductCount id={id} p={producto}/>
      <table className="table table-sm bordered">
        <thead className="table-dark">
          <tr className="text-center">
            <th scope="col">#Id</th>
            <th scope="col">Producto</th>
            <th scope="col">Cantidad</th>
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
