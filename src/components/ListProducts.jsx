import Table from "react-bootstrap/esm/Table";
import { useData } from "../hooks/useData";
import Swal from "sweetalert2";

export const ListProducts = () => {
  const { listProducts, error } = useData();

  return (
    <Table responsive striped bordered hover className="mt-4">
      <thead className="thead-dark">
        <tr className="text-center">
          <th scope="col">#Id</th>
          <th scope="col">Producto</th>
          <th scope="col">Cantidad</th>
        </tr>
      </thead>
      <tbody>
        {error &&
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se logró registrar el producto!",
            footer: JSON.parse(JSON.stringify(error)).message,
          })}
        {listProducts.map((product) => (
          <tr className="text-center" key={product.id}>
            <th scope="row">{product.id}</th>
            <td>{product.producto}</td>
            <td>{product.cantidad}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
