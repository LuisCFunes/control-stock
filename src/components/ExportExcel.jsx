import { supabase } from "../supabase/client";
import * as XLSX from "xlsx";

export function ExportButton({ tableName, buttonName, columns }) {
  const handleExport = async () => {
    const { data, error } = await supabase.from(tableName).select("*");

    if (error) {
      console.error("Error al obtener los datos de Supabase:", error.message);
      return;
    }

    let formattedData = data;
    if (tableName === "Facturas") {
      formattedData = data.map((item) => ({
        ...item,
        ProductosV: item.ProductosV
          ? item.ProductosV.map((producto) => producto.producto).join(", ")
          : "",
      }));
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formattedData, { header: columns });
    XLSX.utils.book_append_sheet(wb, ws, "Datos");
    XLSX.writeFile(wb, "datos.xlsx");
  };

  return <button onClick={handleExport}>{buttonName}</button>;
}
