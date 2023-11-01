import { useContext } from "react";
import { ListProducts } from "../components/ListProducts";
import { CartContext } from "../context/CartContext";
import { jsPDF } from "jspdf";
import 'jspdf-autotable'

export default function Facturar() {
  const { cart, setCart } = useContext(CartContext);

  const sendPdf = () => {
    const doc = new jsPDF();
    const columns = ["ID", "Cantidad", "Producto"];
    doc.text("Factura", 95, 10);
    doc.autoTable({
      head: [columns],
      body: cart.map(item => [item.id, item.cantidad, item.producto]),
      theme: 'grid',
      margin: { top: 20 },
      tableWidth: 'auto'
    });
    doc.save("factura.pdf");
    //setCart[[]];
    window.location.reload();
  };

  return (
    <>
      <ListProducts list={cart} />
      <button
        className="d-flex justify-content-center btn btn-primary mx-auto rounded-0"
        onClick={sendPdf}
      >
        Facturar
      </button>
    </>
  );
}
