import { useState } from "react";
import { useData } from "../hooks/index";
import { ListProducts } from "../components";
import { useUpdateData } from "../hooks/index";

export default function Editar() {
  const { listProducts } = useData();
  const { updateData } = useUpdateData();
  const [infoProduct, setInfoProduct] = useState({
    id: "",
    producto: "",
    cantidad: 0,
    precio: 0,
  });

  const limpiarInput = () => {
    setInfoProduct({
      id: "",
      producto: "",
      cantidad: 0,
      precio: 0,
    });
  };

  const handleSendProductData = (data) => {
    setInfoProduct({
      id: data.id,
      producto: data.producto,
      cantidad: Number(data.cantidad),
      precio: data.precio,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(infoProduct, limpiarInput);
  };

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
            <button type="submit" className="btn btn-success m-2" onClick={handleSubmit}>
              Editar
            </button>
          </div>
        </div>
      </div>
      <ListProducts
        list={listProducts}
        showButtons={true}
        handleSendProductData={handleSendProductData}
        scopeName="Editar Producto"
        btnName="Editar"
      />
    </main>
  );
}
