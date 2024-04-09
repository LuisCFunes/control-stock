import { supabase } from "../supabase/client";

export const useSendData = (Id, Fecha, Cliente,Total,Tabla,ProductosV ) => {
  async function putData() {
    const datos = { Id, Fecha, Cliente,Total,ProductosV };
    if (
      datos.Id === "" &&
      datos.Fecha === "" &&
      datos.Cliente === "" &&
      datos.Total === "" &&
      datos.ProductosV === ""
    ) {
      alert("No hay datos para enviar");
      return;
    } else {
      try {
        const { error } = await supabase
          .from(Tabla)
          .insert(datos)
          .select();
        if (error) throw error;
        console.log(datos);
        console.log("Se envió correctamente");
      } catch (error) {
        console.error("Error de envío", error);
        console.log(datos);
        return;
      }
    }
  }

  return { putData };
};
