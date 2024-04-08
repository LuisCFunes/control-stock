import { useContext, useState } from "react";
import { ListProducts, CheckBoxNumber, CheckBoxText } from "../components";
import { useSendData, useUpdate } from "../hooks";
import { CartContext } from "../context/CartContext";
import NumberToWords from "../utilities/Number-to-Words";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  FechaEmitida,
  SubTotal,
  Impuesto15,
  Total,
  NumeroFactura,
} from "../utilities/FacturaResultados";

export default function Facturar() {
  const { cart } = useContext(CartContext);
  const Id = NumeroFactura();
  const Fecha = FechaEmitida();
  const subTotal = SubTotal();
  const impuesto15 = Impuesto15(subTotal);
  const [cantidades, setCantidades] = useState({
    cantidadDescuento: 0,
    cantidadExonerado: 0,
    cantidadExento: 0,
    rtnCliente: 0,
  });
  const [Cliente, setCliente] = useState("Cliente Ordinario");
  const totalFactura = Total(
    subTotal,
    impuesto15,
    cantidades.cantidadDescuento
  );
  const totalWords = NumberToWords(totalFactura);

  const handleCliente = (nombreCliente) => {
    setCliente(nombreCliente);
  };
  
  const { putData } = useSendData(Id, Fecha, Cliente, totalFactura, "Facturas",cart);
  const { updateData } = useUpdate();
  
  const updateCantidad = async () => {
    for (const item of cart) {
      const { id, cantidad, precio } = item;
      if (cantidad <= 0 || precio <= 0) {
        console.log(
          `La cantidad o el precio para el producto con ID ${id} es menor o igual a cero.`
        );
        continue;
      }
      try {
        await updateData(id, cantidad, "Productos");
        alert("Venta realizada");
        console.log(`Updated item with ID ${id} successfully.`);
      } catch (error) {
        console.error(`Failed to update item with ID ${id}:`, error);
      }
    }
  };

  const handleClick = async () => {
    sendPdf();
    updateCantidad();
    putData();
  };

  const handleCantidad = (identifier, value) => {
    setCantidades((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
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
      doc.text("San Pedro Sula,Carretera El Carmen", 100, 33);
      doc.setFontSize(9);
      doc.text("RTN:08019007088535", 14, 40);
      doc.text("CAI: 9ACDC8-FC347E-7B43B8-7790B8-3E2429-99", 14, 45);
      doc.text("Factura Original", 100, 40);
      doc.text(`Fecha emitida: ${Fecha}`, 100, 45);
      doc.text(
        "Autorizado del: 001-002-01-00062371 al 001-002-01-00072370",
        100,
        50
      );
      doc.text(`Fecha Limite de Emision: 2023-12-15`, 100, 55);
      doc.text(`Cliente: ${Cliente}`, 14, 50);
      doc.text(`RTN del cliente: ${cantidades.rtnCliente}`, 14, 55);
      doc.autoTable({
        head: [columns],
        body: cart.map((item) => [
          item.id,
          item.producto,
          item.cantidad,
          `${item.precio * item.cantidad} Lps`,
        ]),
        theme: "plain",
        headStyles: { fillColor: "#1F1717", textColor: "white" },
        margin: { top: 65 },
        tableWidth: "auto",
      });
      doc.setFontSize(12);
      doc.text(
        `Desc. Y Reb Otorgados:`,
        14,
        doc.autoTable.previous.finalY + 10
      );
      doc.text(
        `${cantidades.cantidadDescuento} Lps.`,
        148,
        doc.autoTable.previous.finalY + 10
      );
      doc.text(`Importe Exonerado:`, 14, doc.autoTable.previous.finalY + 17);
      doc.text(
        `${cantidades.cantidadExonerado} Lps.`,
        148,
        doc.autoTable.previous.finalY + 17
      );
      doc.text(`Importe Exento:`, 14, doc.autoTable.previous.finalY + 24);
      doc.text(
        `${cantidades.cantidadExento} Lps.`,
        148,
        doc.autoTable.previous.finalY + 24
      );
      doc.text(`Importe Grabado 15%:`, 14, doc.autoTable.previous.finalY + 31);
      doc.text(`${subTotal} Lps.`, 148, doc.autoTable.previous.finalY + 31);
      doc.text(`Importe Grabado 18%:`, 14, doc.autoTable.previous.finalY + 38);
      doc.text(`0 Lps.`, 148, doc.autoTable.previous.finalY + 38);
      doc.text(`Impuesto 15%:`, 14, doc.autoTable.previous.finalY + 45);
      doc.text(`${impuesto15} Lps.`, 148, doc.autoTable.previous.finalY + 45);
      doc.text(`Impuesto 18%:`, 14, doc.autoTable.previous.finalY + 52);
      doc.text(`0 Lps.`, 148, doc.autoTable.previous.finalY + 52);
      doc.text(`Total:`, 14, doc.autoTable.previous.finalY + 58);
      doc.text(`${totalFactura} Lps.`, 148, doc.autoTable.previous.finalY + 58);
      doc.text(`Son: ${totalWords}`, 14, doc.autoTable.previous.finalY + 64);
      doc.save("factura.pdf");
    } else {
      alert("No hay productos para facturar");
      return;
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
          name={"RTN del cliente"}
          onCantidadChange={handleCantidad}
          tipo={"rtnCliente"}
        />
        <p>RTN: {cantidades.rtnCliente}</p>
        <CheckBoxNumber
          name={"Descuento"}
          onCantidadChange={handleCantidad}
          tipo={"cantidadDescuento"}
        />
        <p>Cantidad Descuento: {cantidades.cantidadDescuento}</p>

        <CheckBoxNumber
          name={"Exonerado"}
          onCantidadChange={handleCantidad}
          tipo={"cantidadExonerado"}
        />
        <p>Cantidad Exonerado: {cantidades.cantidadExonerado}</p>

        <CheckBoxNumber
          name={"Exento"}
          onCantidadChange={handleCantidad}
          tipo={"cantidadExento"}
        />
        <p>Cantidad Exento: {cantidades.cantidadExento}</p>
      </div>

      <button
        className="d-flex justify-content-center btn btn-primary mx-auto rounded-0"
        onClick={handleClick}
      >
        Facturar
      </button>
      <button
        className="d-flex justify-content-center btn btn-secondary mx-auto rounded-0"
        onClick={() => window.location.reload()}
      >
        Quitar productos
      </button>
    </>
  );
}
