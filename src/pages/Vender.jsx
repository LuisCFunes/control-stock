import Table from "react-bootstrap/esm/Table";
import { supabase } from "../supabase/client";
import OrdenarLista from "../utilities/ordenarLista";
import { useEffect, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export default function Vender() {
  const [producto, setProducto] = useState();
  const [cantidad, setCantidad] = useState();
  const [cantidadVender, setCantidadVender] = useState();
  const [id, setId] = useState();
  const [listaEmpleados, setLista] = useState([]);
  const [editar, setEditar] = useState(false);
  let cVender = 0;

  const limpiarInput = () => {
    setEditar(false);
    setProducto("");
    setCantidad("");
    setCantidadVender("");
  };

  async function fetchData() {
    try {
      const { data, error } = await supabase.from("Productos").select("*");
      if (error) throw error;
      if (data != null) {
        setLista(OrdenarLista(data));
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function updateData() {
    if (cantidadVender > cantidad) {
      alert("La cantidad que quieres vender es mayor a la que hay en stock");
      return;
    } else {
      cVender = cantidad - cantidadVender;
    }
    try {
      const { error } = await supabase
        .from("Productos")
        .update({
          id: id,
          producto: producto,
          cantidad: cVender,
        })
        .eq("id", id)
        .select();
      if (error) throw error;
      withReactContent(Swal).fire({
        title: <p>Actualizado con exito!</p>,
        icon: "success",
      });
      limpiarInput();
      fetchData();
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

  const editarProducto = (product) => {
    setEditar(true);
    setId(product.id);
    setProducto(product.producto);
    setCantidad(product.cantidad);
  };

  fetchData();

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
              Cantidad a vender:
            </span>
            <input
              type="number"
              onChange={(e) => {
                setCantidadVender(e.target.value);
              }}
              className="form-control"
              value={cantidadVender}
              placeholder="15..."
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {editar ? (
            <div>
              <button className="btn btn-warning m-2" onClick={updateData}>
                Actualizar
              </button>
              <button className="btn btn-info m-2" onClick={limpiarInput}>
                Cancelar
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <Table responsive striped bordered hover className="mt-4">
        <thead className="thead-dark">
          <tr className="text-center">
            <th scope="col">#Id</th>
            <th scope="col">Producto</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaEmpleados.map((product) => (
            <tr className="text-center" key={product.id}>
              <th scope="row">{product.id}</th>
              <td>{product.producto}</td>
              <td>{product.cantidad}</td>
              <td>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    onClick={() => {
                      editarProducto(product);
                    }}
                    className="btn btn-info"
                  >
                    Vender
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </main>
  );
}
