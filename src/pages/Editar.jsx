function Editar() {
  /*async function updateData() {
    try {
      const { error } = await supabase
        .from("Productos")
        .update({
          id: id,
          producto: producto,
          cantidad: cantidad,
        })
        .eq("id", id)
        .select();
      if (error) throw error;
      withReactContent(Swal).fire({
        title: <p>Actualizado con exito!</p>,
        icon: "success",
      });
      setEditar(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró registrar el producto!",
        footer: JSON.parse(JSON.stringify(error)).message,
      });
    }
  }*/

  return <div>Editar</div>;
}

export default Editar;
