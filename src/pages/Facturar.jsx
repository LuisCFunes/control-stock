import { useContext, useReducer } from "react";
import { ListProducts, CheckBoxNumber, CheckBoxText } from "../components";
import { useSendData, useUpdate } from "../hooks";
import { CartContext } from "../context/CartContext";
import NumberToWords from "../utilities/Number-to-Words";
import {
  FechaEmitida,
  SubTotal,
  Impuesto15,
  Total,
  NumeroFactura,
} from "../utilities/FacturaResultados";
import SendPdf from "../utilities/SendPdf";
import facturarReducer from "../utilities/FacturarReducer";

const initialState = {
  cantidades: {
    cantidadDescuento: 0,
    cantidadExonerado: 0,
    cantidadExento: 0,
    rtnCliente: 0,
  },
  Cliente: "Cliente Ordinario",
};

export default function Facturar() {
  const { cart, clearCart } = useContext(CartContext);
  const [state, dispatch] = useReducer(facturarReducer, initialState);

  const Id = NumeroFactura();
  const Fecha = FechaEmitida();
  const subTotal = SubTotal();
  const impuesto15 = Impuesto15(subTotal);
  const totalFactura = Total(
    subTotal,
    impuesto15,
    state.cantidades.cantidadDescuento
  );
  const totalWords = NumberToWords(totalFactura);

  const handleCliente = (nombreCliente) => {
    dispatch({ type: 'SET_CLIENTE', payload: nombreCliente });
  };

  const { putData } = useSendData(
    Id,
    Fecha,
    state.Cliente,
    totalFactura,
    "Facturas",
    cart
  );
  const { updateQuantity } = useUpdate();

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
        await updateQuantity(id, cantidad, "Productos");
        alert("Venta realizada");
        console.log(`Updated item with ID ${id} successfully.`);
        window.location.reload();
      } catch (error) {
        console.error(`Failed to update item with ID ${id}:`, error);
        throw error; 
      }
    }
  };

  const handleClick = async () => {
    try {
      Facturar();
      await putData();
      await updateCantidad();
      clearCart();
    } catch (error) {
      alert("Error:", error);
      return;
    }
  };

  const Facturar = () => {
    if (cart.length > 0) {
      SendPdf({
        Id,
        Fecha,
        Cliente: state.Cliente,
        totalFactura,
        cart,
        cantidades: state.cantidades,
        subTotal,
        impuesto15,
        totalWords,
      });
    } else {
      alert("No hay productos para facturar");
    }
  };

  const handleCantidad = (identifier, value) => {
    dispatch({ type: 'SET_CANTIDAD', payload: { identifier, value } });
  };

  return (
    <>
      <ListProducts list={cart} />
      <div className="d-flex flex-column align-items-center">
        <CheckBoxText
          tipo={"Nombre del cliente"}
          onTextoChange={handleCliente}
        />
        <p>Nombre del Cliente: {state.Cliente}</p>
        <CheckBoxNumber
          name={"RTN del cliente"}
          onCantidadChange={handleCantidad}
          tipo={"rtnCliente"}
        />
        <p>RTN: {state.cantidades.rtnCliente}</p>
        <CheckBoxNumber
          name={"Descuento"}
          onCantidadChange={handleCantidad}
          tipo={"cantidadDescuento"}
        />
        <p>Cantidad Descuento: {state.cantidades.cantidadDescuento}</p>

        <CheckBoxNumber
          name={"Exonerado"}
          onCantidadChange={handleCantidad}
          tipo={"cantidadExonerado"}
        />
        <p>Cantidad Exonerado: {state.cantidades.cantidadExonerado}</p>

        <CheckBoxNumber
          name={"Exento"}
          onCantidadChange={handleCantidad}
          tipo={"cantidadExento"}
        />
        <p>Cantidad Exento: {state.cantidades.cantidadExento}</p>
      </div>

      <button
        className="d-flex justify-content-center btn btn-primary mx-auto rounded-0"
        onClick={handleClick}
      >
        Facturar
      </button>
    </>
  );
}