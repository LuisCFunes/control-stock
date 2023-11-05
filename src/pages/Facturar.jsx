import { useContext } from "react";
import { ListProducts } from "../components/ListProducts";
import { CartContext } from "../context/CartContext";
import { jsPDF } from "jspdf";
import 'jspdf-autotable'

export default function Facturar() {
  const { cart, setCart } = useContext(CartContext);
  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

  const SubTotal = () =>{
    return cart.reduce((acc,prod) => acc + (prod.cantidad * prod.precio),0)
  }

  const sendPdf = () => {
    if(cart.length > 0){
      const doc = new jsPDF();
      const columns = ["ID", "Producto", "Cantidad","Total"];
      doc.setTextColor("#C70039");
      doc.setFontSize(24);
      doc.text("Factura", 14, 17);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(16);
      doc.text(`Emitida:${formattedDate}`,14, 27);
      doc.text("Cliente:",14, 37)
      doc.autoTable({
        head: [columns],
        foot:[[' ',' ','Subtotal', SubTotal()]],
        body: cart.map(item => [item.id, item.producto, item.cantidad, `${ item.precio * item.cantidad} Lps`]),
        theme: 'grid',
        footStyles: { fillColor: "#39A7FF" },
        margin: { top: 40 },
        tableWidth: 'auto'
      });
      doc.save("factura.pdf");
      window.location.reload();
    } else{
      alert("No hay productos para facturar")
    }    
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
