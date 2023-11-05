export const ListProducts = ({list}) => {

  if (!list || list.length === 0) {
    return <h1 className="text-center">No hay productos en la lista</h1>;
  }

  return (
    <table className="table bordered mt-4">
      <thead className="table-dark">
        <tr className="text-center">
          <th scope="col">#Id</th>
          <th scope="col">Producto</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Precio</th>
        </tr>
      </thead>
      <tbody>
        {list.map((product) => (
          <tr className="text-center" key={product.id}>
            <th scope="row">{product.id}</th>
            <td>{product.producto}</td>
            <td>{product.cantidad}</td>
            <td>{product.precio}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
