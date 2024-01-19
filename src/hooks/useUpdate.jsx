import { supabase } from "../supabase/client";

export const useUpdate = () => {
  async function updateData(id, nuevaCantidad, tabla) {
    try {
      const { data: productoActual, error } = await supabase
        .from(tabla)
        .select('cantidad')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (!productoActual) {
        console.error(`No se encontró el producto con ID ${id}`);
        return;
      }
      const cantidadOriginal = productoActual.cantidad;
      const cantidadFinal = cantidadOriginal - nuevaCantidad;
      const { updateError } = await supabase
        .from(tabla)
        .update({ cantidad: cantidadFinal })
        .eq('id', id)
        .select();

      if (updateError) throw updateError;
    } catch (error) {
      console.error("Error de actualización", error);
    }
  }

  return { updateData };
};
