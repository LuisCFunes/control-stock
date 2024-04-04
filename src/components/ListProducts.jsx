/* eslint-disable react/prop-types */
export const ListProducts = ({ list, showButtons, handleSendProductData }) => {
  if (!list || list.length === 0) {
    return <h1 className="text-center">No hay productos en la lista</h1>;
  }

  return (
    <>
      <table className="table table-striped table-hover mt-4">
        <thead className="table-dark">
          <tr className="text-center">
            <th scope="col">#ID</th>
            <th scope="col">Producto</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio</th>
            {showButtons && <th scope="col">Agregar a la venta</th>}
          </tr>
        </thead>
        <tbody>
          {list.map((product) => (
            <tr className="text-center" key={product.id}>
              <td>{product.id}</td>
              <td>{product.producto}</td>
              <td>{product.cantidad}</td>
              <td>{product.precio}</td>
              {showButtons && (
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleSendProductData(product)}
                  >
                    Vender
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
