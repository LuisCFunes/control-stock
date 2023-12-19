export default function Impuesto15(subtotal){
    const impuesto = subtotal + (subtotal * 0.15);
    return impuesto;
}