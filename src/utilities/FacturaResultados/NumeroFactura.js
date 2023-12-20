import { useFactura } from "../../hooks/useFactura";

export default function NumeroFactura() {
  const { facturas } = useFactura();
  let idMaximo = 0;  

  if (facturas.length > 0) {
    idMaximo = Math.max(...facturas.map((factura) => factura.Id));
  }
  
  return `000-000-00-${idMaximo + 1}`;
}
