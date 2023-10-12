import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { supabase } from "./supabase/client";

const notificacion = withReactContent(Swal);

function App() {
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState();
  const [listaEmpleados, setLista] = useState([]);

  const limpiarInput = () => {
    setProducto("");
    setCantidad("");
  };

  async function getData() {
    try {
      const result = await supabase.from("Productos").select("*");
      if (result.error) throw result.error;
      if (result.data != null) {
        console.log("Datos obtenidos:", result.data);
        setLista(result.data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function agregar() {
    const datos = {
      producto,
      cantidad,
    };

    try {
      const { data, error } = await supabase
        .from("Productos")
        .insert(datos)
        .select();
      if (error) throw error;
      limpiarInput();
      notificacion.fire({
        title: <p>Registro exitoso!</p>,
        html: `<i>El producto <b>${producto}</b> fue registrado con éxito</i>`,
        icon: "success",
      });
      limpiarInput();
      getData();
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
        <div className="card-header">Gestion de Inventario</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              {" "}
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
              {" "}
              Cantidad:{" "}
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
          <button className="btn btn-success m-2" onClick={agregar}>
            Registrar
          </button>
          <button className="btn btn-success" onClick={getData}>
            Ver Datos
          </button>
        </div>
      </div>

      <Table responsive striped bordered hover className="mt-4">
        <thead className="thead-dark">
          <tr className="text-center">
            <th scope="col">#Id</th>
            <th scope="col">Producto</th>
            <th scope="col">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {listaEmpleados.map((product) => (
            <tr className="text-center" key={product.id}>
              <th scope="row">{product.id}</th>
              <td>{product.producto}</td>
              <td>{product.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </main>
  );
}

export default App;
