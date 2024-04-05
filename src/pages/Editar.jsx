import { useState } from "react";
import { useData } from "../hooks/useData";
import { supabase } from "../supabase/client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ListProducts } from "../components";

export default function Editar() {
  const { listProducts } = useData();
  const [infoProduct, setInfoProduct] = useState({
    id: "",
    producto: "",
    cantidad: 0,
    precio: 0,
  });

  const handleSendProductData = (data) => {
    setInfoProduct({
      id: data.id,
      producto: data.producto,
      cantidad: Number(data.cantidad),
      precio: data.precio,
    });
  };

  const limpiarInput = () => {
    setInfoProduct({
      id: "",
      producto: "",
      cantidad: 0,
      precio: 0,
    });
  };

  async function updateData() {
    const datos = {
      producto: infoProduct.producto,
      cantidad: infoProduct.cantidad,
      precio: infoProduct.precio,
      id: infoProduct.id,
    };

    if (datos.producto === "" && datos.cantidad === 0 && datos.precio === 0) {
      alert("Llena el formulario");
      return;
    }
    if (datos.cantidad < 0 || datos.precio < 0) {
      alert("No ingrese cantidad o precio menor a cero");
      return;
    }

    try {
      const { error } = await supabase
        .from("Productos")
        .update(datos)
        .eq("id", datos.id);
      if (error) throw error;
      limpiarInput();
      withReactContent(Swal).fire({
        title: <p>Actualización exitosa!</p>,
        html: `<i>El producto <b>${datos.producto}</b> fue actualizado con éxito</i>`,
        icon: "success",
      });
      limpiarInput();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró actualizar el producto!",
        footer: JSON.parse(JSON.stringify(error)).message,
      });
    }
  }

  return (
    <main className="container">
      <div className="card text-center">
        <div className="card-body">
          <div className="input-group mb-3">
            <label
              htmlFor="text"
              className="input-group-text"
              id="basic-addon1"
            >
              Nombre del Producto:
            </label>
            <input
              type="text"
              name="producto"
              onChange={(e) =>
                setInfoProduct({ ...infoProduct, producto: e.target.value })
              }
              className="form-control"
              value={infoProduct.producto}
            />
          </div>
          <div className="input-group mb-3">
            <label
              htmlFor="number"
              className="input-group-text"
              id="basic-addon1"
            >
              Cantidad:
            </label>
            <input
              type="number"
              name="cantidad"
              onChange={(e) =>
                setInfoProduct({
                  ...infoProduct,
                  cantidad: Number(e.target.value),
                })
              }
              className="form-control"
              value={infoProduct.cantidad}
            />
          </div>
          <div className="input-group mb-3">
            <label
              htmlFor="number"
              className="input-group-text"
              id="basic-addon1"
            >
              Precio:
            </label>
            <input
              type="number"
              name="precio"
              onChange={(e) =>
                setInfoProduct({ ...infoProduct, precio: e.target.value })
              }
              className="form-control"
              value={infoProduct.precio}
            />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          <div>
            <button className="btn btn-success m-2" onClick={updateData}>
              Editar
            </button>
          </div>
        </div>
      </div>
      <ListProducts
        list={listProducts}
        showButtons={true}
        handleSendProductData={handleSendProductData}
      />
    </main>
  );
}
