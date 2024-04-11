import { useState } from "react";
import { supabase } from "../supabase/client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const useUpdateData = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const updateData = async (infoProduct, limpiarInput) => {
    const datos = {
      producto: infoProduct.producto,
      cantidad: infoProduct.cantidad,
      precio: infoProduct.precio,
      id: infoProduct.id,
    };

    if (datos.producto === "" && datos.cantidad === 0 && datos.precio === 0) {
      setErrorMessage("Llena el formulario");
      return;
    }
    if (datos.cantidad < 0 || datos.precio < 0) {
      setErrorMessage("No ingrese cantidad o precio menor a cero");
      return;
    }

    try {
      const { error } = await supabase
        .from("Productos")
        .update(datos)
        .eq("id", datos.id);

      if (error) {
        throw error;
      }
      withReactContent(Swal).fire({
        title: <p>Actualización exitosa!</p>,
        html: `<i>El producto ${datos.producto} fue actualizado con éxito</i>`,
        icon: "success",
      });
      limpiarInput();
    } catch (error) {
      setErrorMessage("No se logró actualizar el producto");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
        footer: JSON.parse(JSON.stringify(error)).message,
      });
    }
  };

  return { updateData };
};
