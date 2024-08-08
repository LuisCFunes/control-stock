import { useState } from "react";
import { ProductCount, ListProducts } from "../components";
import { useData } from "../hooks/useData";
import Facturar from "../pages/Facturar";
export default function Vender() {
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

  return (
    <main className="row mx-4">
      <section className=" col-7">
      <ProductCount
        id={infoProduct.id}
        producto={infoProduct.producto}
        precio={infoProduct.precio}
      />
      <ListProducts
        list={listProducts}
        showButtons={true}
        handleSendProductData={handleSendProductData}
      />
      </section>
      <section className=" col-5">
        <Facturar/>
      </section>
    </main>
  );
}
