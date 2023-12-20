import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

export const useFactura = () => {
  const [facturas, setFacturas] = useState([]);
  const [errorState, setErrorState] = useState("");

  useEffect(() => {
    async function fetchFacturas() {
      try {
        const response = await supabase.from('Facturas').select('Id');
        const data = response?.data;
        if (data != null) {
          setFacturas(data);
        }
      } catch (error) {
        setErrorState(error.message || "Error al obtener facturas");
      }
    }
    fetchFacturas();
  }, []);

  return { facturas, error: errorState };
};

