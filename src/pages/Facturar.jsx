import { supabase } from "../supabase/client";
import { useContext, useState } from "react";
import { ListProducts } from "../components/ListProducts";
import { CheckBoxNumber } from "../components/CheckBoxNumber";
import { CheckBoxText } from "../components/CheckBoxText";
import { CartContext } from "../context/CartContext";
//import { useSendData } from "../hooks/useSendData";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import FechaEmitida from "../utilities/FacturaResultados/FechaEmitida";
import SubTotal from "../utilities/FacturaResultados/SubTotal";
import Impuesto15 from "../utilities/FacturaResultados/Impuesto15";
import Total from "../utilities/FacturaResultados/Total";
import NumeroFactura from "../utilities/FacturaResultados/NumeroFactura";

export default function Facturar() {
  const { cart } = useContext(CartContext);
  const Id = NumeroFactura();
  const Fecha = FechaEmitida();
  const subTotal = SubTotal();
  const impuesto15 = Impuesto15(subTotal);
  const [cantidadDescuento, setCantidadDescuento] = useState(0);
  const [cantidadExonerado, setCantidadExonerado] = useState(0);
  const [cantidadExento, setCantidadExento] = useState(0);
  const [Cliente, setCliente] = useState("Cliente Ordinario");
  const total = Total(subTotal, impuesto15,cantidadDescuento);
  
  async function putData() {
    const datos = {Id,Fecha,Cliente};
    try {
      const { error } = await supabase
        .from("Facturas")
        .insert(datos)
        .select();
      if (error) throw error;
      console.log(datos);
      console.log("Se envió correctamente");
    } catch (error) {
      console.error("Error de envío", error);
    }
  }

  const handleCantidadChangeDescuento = (nuevaCantidad) => {
    setCantidadDescuento(nuevaCantidad);
  };

  const handleCantidadChangeExonerado = (nuevaCantidad) => {
    setCantidadExonerado(nuevaCantidad);
  };

  const handleCantidadChangeExento = (nuevaCantidad) => {
    setCantidadExento(nuevaCantidad);
  };

  const handleCliente = (nombreCliente) => {
    setCliente(nombreCliente);
  };

  const sendPdf = () => {
    if (cart.length > 0) {
      const doc = new jsPDF();
      const columns = ["ID", "Producto", "Cantidad", "Total"];
      doc.setFontSize(24);
      doc.text("Industrial de Alimentos E. YL., S.A. de C.V", 14, 17);
      doc.setFontSize(16);
      doc.text("INSUMOS E. Y L.", 85, 25);
      doc.text(`Factura 000-000-00-${Id}`, 14, 33);
      doc.setFontSize(9);
      doc.text("RTN:08019007088535", 14, 40);
      doc.text("CAI: 9ACDC8-FC347E-7B43B8-7790B8-3E2429-99", 14, 45);
      doc.text("Fecha Limite de Emision: 2023-12-15", 100, 40);
      doc.text(
        "Autorizado del: 001-002-01-00062371 al 001-002-01-00072370",
        100,
        45
      );
      doc.text(`Emitida: ${Fecha}`, 100, 50);
      doc.text(`Cliente: ${Cliente}`, 14, 50);
      doc.autoTable({
        head: [columns],
        body: cart.map((item) => [
          item.id,
          item.producto,
          item.cantidad,
          `${item.precio * item.cantidad} Lps`,
        ]),
        theme: "grid",
        headStyles: { fillColor: "#1F1717" },
        margin: { top: 65 },
        tableWidth: "auto",
      });
      doc.setFontSize(12);
      doc.text(
        `Desc. Y Reb Otorgados: ${cantidadDescuento} Lps.`,
        14,
        doc.autoTable.previous.finalY + 10
      );
      doc.text(
        `Importe Exonerado: ${cantidadExonerado} Lps.`,
        14,
        doc.autoTable.previous.finalY + 17
      );
      doc.text(
        `Importe Exento: ${cantidadExento} Lps.`,
        14,
        doc.autoTable.previous.finalY + 24
      );
      doc.text(
        `Importe Grabado 15%: ${subTotal} Lps.`,
        14,
        doc.autoTable.previous.finalY + 31
      );
      doc.text(
        `Importe Grabado 18%: 0 Lps.`,
        14,
        doc.autoTable.previous.finalY + 38
      );
      doc.text(
        `Impuesto 15%: ${impuesto15} Lps.`,
        14,
        doc.autoTable.previous.finalY + 45
      );
      doc.text(`Impuesto 18%: 0 Lps.`, 14, doc.autoTable.previous.finalY + 52);
      doc.text(`Total: ${total} Lps.`, 14, doc.autoTable.previous.finalY + 58);
      doc.save("factura.pdf");
      window.location.reload();
    } else {
      alert("No hay productos para facturar");
    }
  };

  return (
    <>
      <ListProducts list={cart} />
      <div className="d-flex flex-column align-items-center">
        <CheckBoxText
          tipo={"Nombre del cliente"}
          onTextoChange={handleCliente}
        />
        <p>Nombre del Cliente: {Cliente}</p>
        <CheckBoxNumber
          tipo={"Descuento"}
          onCantidadChange={handleCantidadChangeDescuento}
        />
        <p>Cantidad Descuento: {cantidadDescuento}</p>

        <CheckBoxNumber
          tipo={"Exonerado"}
          onCantidadChange={handleCantidadChangeExonerado}
        />
        <p>Cantidad Exonerado: {cantidadExonerado}</p>

        <CheckBoxNumber
          tipo={"Exento"}
          onCantidadChange={handleCantidadChangeExento}
        />
        <p>Cantidad Exento: {cantidadExento}</p>
      </div>

      <button
        className="d-flex justify-content-center btn btn-primary mx-auto rounded-0"
        onClick={() => {
          sendPdf(), putData();
        }}
      >
        Facturar
      </button>
    </>
  );
}
