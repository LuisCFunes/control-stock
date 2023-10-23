import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../App.css";
import { ListProducts } from "../components/ListProducts";
import { supabase } from "../supabase/client";

export default function Home() {
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState();

  const limpiarInput = () => {
    setProducto("");
    setCantidad("");
  };

  async function putData() {
    const datos = {
      producto,
      cantidad,
    };

    if (datos.producto === "" && datos.cantidad === "") {
      alert("Llena el formulario");
      return;
    }

    try {
      const { error } = await supabase.from("Productos").insert(datos).select();
      if (error) throw error;
      limpiarInput();
      withReactContent(Swal).fire({
        title: <p>Registro exitoso!</p>,
        html: `<i>El producto <b>${producto}</b> fue registrado con éxito</i>`,
        icon: "success",
      });
      limpiarInput();
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
      <div className="card text-center">
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre del Producto:
            </span>
            <input
              type="text"
              onChange={(e) => {
                setProducto(e.target.value);
              }}
              className="form-control"
              value={producto}
              placeholder="Collar de perlas..."
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Cantidad:
            </span>
            <input
              type="number"
              onChange={(e) => {
                setCantidad(e.target.value);
              }}
              className="form-control"
              value={cantidad}
              placeholder="15..."
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          <div>
            <button className="btn btn-success m-2" onClick={putData}>
              Registrar
            </button>
          </div>
        </div>
      </div>

      <ListProducts />
    </main>
  );
}