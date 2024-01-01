import { useState } from "react";

export function CheckBoxNumber({ tipo, onCantidadChange }) {
  const [isChecked, setisChecked] = useState(false);
  const [cantidad, setCantidad] = useState(0);

  const handleCheck = () => {
    setisChecked(!isChecked);
    if (!isChecked || !cantidad) {
      setCantidad(0);
      onCantidadChange(0);
    }
  };

  const handleCantidadChange = (e) => {
    const nuevaCantidad = parseInt(e.target.value, 10) || 0; 
    setCantidad(nuevaCantidad);
    onCantidadChange(nuevaCantidad);
  };

  return (
    <div className="d-flex">
      <label htmlFor="checkbox" className="mx-2 p-0 my-auto text-primary">
        <input
          type="checkbox"
          id="checkbox"
          name="nombreDescriptivo"
          checked={isChecked}
          onChange={handleCheck}
        />
        <strong>{tipo}</strong>
      </label>

      {isChecked && (
        <div>
          <label htmlFor="numberInput"> Ingrese el {tipo}:</label>
          <input 
            type="number" 
            onChange={handleCantidadChange}
          />
        </div>
      )}
    </div>
  );
}
