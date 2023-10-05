import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from 'react-bootstrap/Table';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const notificacion = withReactContent(Swal);

function App() {
  const [Producto, setProducto] = useState("");
  const [Cantidad, setCantidad] = useState();
  const [listaEmpleados, setLista] = useState([]);

  const limpiarInput = () => {
    setProducto("");
    setCantidad("");
  };

  function ver() {
    axios
      .get("https://sheet.best/api/sheets/2ac1bbad-b4f9-42e6-a015-a1104f02e7df")
      .then((res) => {
        setLista(res.data);
      });
  }

  const agregar = () => {
    const datos = {
      Producto,
      Cantidad,
    };

    axios.post(
      "https://sheet.best/api/sheets/2ac1bbad-b4f9-42e6-a015-a1104f02e7df",
      datos
    )
      .then(() => {
        limpiarInput();
        notificacion.fire({
          title: <p>Registo exitoso!</p>,
          html: `<i>El producto <b>${Producto}</b> fue registrado con exito</i>`,
          icon: "success",
        });
        limpiarInput();
        ver();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se logro registrar el producto!",
          footer: JSON.parse(JSON.stringify(error)).message,
        });
      });
  };

  

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
              value={Producto}
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
              value={Cantidad}
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
          <button className="btn btn-success" onClick={ver}>
            Ver Datos
          </button>
        </div>
      </div>

      <Table responsive striped bordered hover className="mt-4">
        <thead className="thead-dark">
          <tr className="text-center">
            <th scope="col">Producto</th>
            <th scope="col">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {listaEmpleados.map((valor) => {
            return (
              <tr className="text-center" key={valor.Producto}>
                <td>{valor.Producto}</td>
                <td>{valor.Cantidad}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </main>
  );
}

export default App;
