import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import OrdenarLista from "../utilities/OrdenarLista";

export const useData = () => {
  const [listProducts, setListProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAndSetList = async () => {
      try {
        const { data } = await supabase.from("Productos").select("*");
        if (data != null) {
          setListProducts(OrdenarLista(data));
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const productosChannel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Productos" },
        (payload) => {
          console.log("Change received:", payload);
          fetchAndSetList(); 
        }
      )
      .subscribe();

    fetchAndSetList(); 

    return () => {
      productosChannel.unsubscribe(); 
    };
  }, []);

  return { listProducts, error };
};
