import { supabase } from "../supabase/client";

export const useUpdate = () => {
  const updateQuantity = async (id, nuevaCantidad, tabla) => {
    try {
      const { data: productoActual, error: fetchError } = await supabase
        .from(tabla)
        .select("cantidad")
        .eq("id", id)
        .single();

      if (fetchError) {
        throw new Error("Error al obtener el producto: " + fetchError.message);
      }

      if (!productoActual) {
        throw new Error(`No se encontró el producto con ID ${id}`);
      }

      const cantidadOriginal = productoActual.cantidad;
      const cantidadFinal = cantidadOriginal - nuevaCantidad;

      const { error: updateError } = await supabase
        .from(tabla)
        .update({ cantidad: cantidadFinal })
        .eq("id", id);

      if (updateError) {
        throw new Error("Error al actualizar el producto: " + updateError.message);
      }

      console.log("Producto actualizado exitosamente");
    } catch (error) {
      console.error("Error inesperado:", error.message);
    }
  };

  return { updateQuantity };
};
