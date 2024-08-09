import { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabase/client";
import OrdenarLista from "../utilities/OrdenarLista";

export const useData = () => {
  const [listProducts, setListProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchingFromProducts = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("Productos").select("*");
      if (error) {
        throw new Error(error.message);
      }
      if (data != null) {
        setListProducts(OrdenarLista(data));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const productosChannel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Productos" },
        (payload) => {
          console.log("Change received:", payload);
          fetchingFromProducts();
        }
      )
      .subscribe();

      fetchingFromProducts();

    return () => {
      productosChannel.unsubscribe();
    };
  }, [fetchingFromProducts]);

  return { listProducts, error, loading };
};