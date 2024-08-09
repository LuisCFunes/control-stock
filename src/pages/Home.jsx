import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../App.css";
import { ListProducts } from "../components";
import { supabase } from "../supabase/client";
import { useData } from "../hooks/useData";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  
  const { listProducts } = useData();

  const onSubmit = async (data) => {
    try {
      const { error } = await supabase.from("Productos").insert(data);
      if (error) throw error;

      withReactContent(Swal).fire({
        title: <p>Registro exitoso!</p>,
        html: `<i>El producto <b>${data.producto}</b> fue registrado con éxito</i>`,
        icon: "success",
      });
      reset(); 
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró registrar el producto!",
        footer: JSON.parse(JSON.stringify(error)).message,
      });
    }
  };

  return (
    <main className="container">
      <div className="card text-center">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-3">
              <label
                htmlFor="producto"
                className="input-group-text"
                id="basic-addon1"
              >
                Nombre del Producto:
              </label>
              <input
                type="text"
                {...register("producto", { required: true })}
                className="form-control"
                placeholder="Collar de perlas..."
              />
              {errors.producto && (
                <span className="text-danger">Producto requerido</span>
              )}
            </div>
            <div className="input-group mb-3">
              <label
                htmlFor="cantidad"
                className="input-group-text"
                id="basic-addon1"
              >
                Cantidad:
              </label>
              <input
                type="number"
                {...register("cantidad", { required: true })}
                className="form-control"
                placeholder="15..."
              />
              {errors.cantidad && (
                <span className="text-danger">Cantidad requerida</span>
              )}
            </div>
            <div className="input-group mb-3">
              <label
                htmlFor="precio"
                className="input-group-text"
                id="basic-addon1"
              >
                Precio:
              </label>
              <input
                type="number"
                {...register("precio", { required: true })}
                className="form-control"
                placeholder="15..."
              />
              {errors.precio && (
                <span className="text-danger">Precio requerido</span>
              )}
            </div>
            <div className="card-footer text-body-secondary">
              <div>
                <button type="submit" className="btn btn-success m-2">
                  Registrar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ListProducts list={listProducts} showButtons={false} />
    </main>
  );
}
