import { supabase } from "../supabase/client";

export const useSendData = ({ nFactura,fecha,cliente, tabla }) => {
  async function putData() {
    const datos = {nFactura,fecha,cliente};
    try {
      const { error } = await supabase
        .from(tabla)
        .insert(datos)
        .select();
      if (error) throw error;
      console.log(datos);
      console.log("Se envió correctamente");
    } catch (error) {
      console.error("Error de envío", error);
    }
  }

  return { putData };
};
