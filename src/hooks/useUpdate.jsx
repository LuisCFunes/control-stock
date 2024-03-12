import { supabase } from "../supabase/client";

export const useUpdate = () => {
  async function updateData(id, nuevaCantidad, tabla) {
    try {
      const { data: productoActual, error } = await supabase
        .from(tabla)
        .select("cantidad")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
        return;
      }

      if (!productoActual) {
        console.error(`No se encontró el producto con ID ${id}`);
        return;
      }

      const cantidadOriginal = productoActual.cantidad;
      const cantidadFinal = cantidadOriginal - nuevaCantidad;

      const { error: updateError } = await supabase
        .from(tabla)
        .update({ cantidad: cantidadFinal })
        .eq("id", id);

      if (updateError) {
        console.error("Error updating product:", updateError);
      } else {
        console.log("Product updated successfully");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  return { updateData };
};
