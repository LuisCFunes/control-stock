import { supabase } from "../supabase/client";
import { useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useData } from "../hooks/useData";
import { ListProducts } from "../components/ListProducts";

export default function Vender() {
  const [producto, setProducto] = useState();
  const [cantidad, setCantidad] = useState();
  const [id, setId] = useState();

  const { listProducts } = useData();

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
      <label className="text-center blond fs-4">
        Lista de Productos a Vender
      </label>

      <ListProducts />
    </main>
  );
}
