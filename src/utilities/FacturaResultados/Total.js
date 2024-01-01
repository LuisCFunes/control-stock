export default function Total(subtotal, impuesto,descuento) {
  let total = subtotal + impuesto;
  if(descuento){
    total = total - descuento;
    return total; 
  }else{
    return total;
  }
  
}
