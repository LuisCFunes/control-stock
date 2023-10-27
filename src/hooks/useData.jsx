import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import OrdenarLista from "../utilities/ordenarLista";

export const useData = () => {
  const [listProducts, setListProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDataAndSetList() {
      try {
        const { data } = await supabase.from("Productos").select("*");
        if (data != null) {
          setListProducts(OrdenarLista(data));
        }
      } catch (error) {
        setError(error);
      }
    }

    fetchDataAndSetList();
  }, []);

  return { listProducts, error };
};
