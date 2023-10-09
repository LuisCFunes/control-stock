import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
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

  function getData(){
    axios.get("https://script.google.com/macros/s/AKfycbx4i5NY8tMytoUzLfZnLDffUtNuJGf1JLRxfn6hpuqSXqUSUklBg9fxt6NDwTuDgGbc/exec")
    .then((res) => {
      const datos = res.data;
      console.log("Datos obtenidos:", datos);
      setLista(datos);
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
  };


  const agregar = () => {
    const datos = {
      Producto,
      Cantidad,
    };

    axios
      .post(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6ecWQd4niERCO3Az6GjteTRt3-YMZZ2ZafUc0CK9lZK44WrWFnoSN8LyCbfjSLkP1ufGacGWuKXu6/pub?gid=0&single=true&output=csv",
        datos,
      )
      .then(() => {
        limpiarInput();
        notificacion.fire({
          title: <p>Registo exitoso!</p>,
          html: `<i>El producto <b>${Producto}</b> fue registrado con exito</i>`,
          icon: "success",
        });
        limpiarInput();
        getData();
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
          <button className="btn btn-success" onClick={getData}>
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
          {listaEmpleados.map((fila, index) => (
            <tr className="text-center" key={index}>
              {fila.map((valor, subIndex) => (
                <td key={subIndex}>{valor}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </main>
  );
}

export default App;
