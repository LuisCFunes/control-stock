import { supabase } from "../supabase/client";

export const useSendData = (Id, Fecha, Cliente,Tabla ) => {
  async function putData() {
    const datos = { Id, Fecha, Cliente };
    if (
      datos.Id === "" &&
      datos.Fecha === "" &&
      datos.Cliente === ""
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
      }
    }
  }

  return { putData };
};
