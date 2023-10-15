export default function OrdenarLista (lista) {
    const listaArreglada = lista.sort((a, b) => a.id - b.id);
    return listaArreglada;
  }