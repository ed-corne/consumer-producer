import React, { useContext, useEffect, useState } from "react";
import cowboy from "../assets/cowboy.svg";
import { CorralsArrayContext } from "../context/corralsArrayProvider";

const Cowboy = ({ lastPositionC, setLastPositionC }) => {
  const { corralsArray, updateCorralsArray } = useContext(CorralsArrayContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      try {
        let currentPosition = lastPositionC;
        const elementsToProduce = Math.floor(Math.random() * (10 - 3 + 1) + 3);

        const nuevoCorralArray = [...corralsArray];
        for (let i = 0; i < elementsToProduce; i++) {
          nuevoCorralArray[currentPosition] = 1;
          currentPosition = (currentPosition + 1) % corralsArray.length;
          updateCorralsArray([...nuevoCorralArray]); // Actualizar el array en cada iteración
        }
        setLastPositionC(currentPosition);
      } catch (error) {
        console.error("Error:", error);
      }
    }, 3000); // Ejecutar cada 1000 milisegundos (1 segundo)

    // Limpiar el intervalo cuando el componente se desmonta o cuando corralsArray cambia
    return () => clearInterval(intervalId);
  }, [corralsArray, lastPositionC, updateCorralsArray, setLastPositionC]);

  return (
    <div>
      <img width="300px" height="300px" src={cowboy} alt="cowboy" />
    </div>
  );
};

export default Cowboy;
