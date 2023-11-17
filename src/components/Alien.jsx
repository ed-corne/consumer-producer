import React, { useContext, useEffect, useState } from "react";
import alien from "../assets/alien.svg";
import { CorralsArrayContext } from "../context/corralsArrayProvider";

const Alien = ({ lastPositionA, setLastPositionA }) => {
  const { corralsArray, updateCorralsArray } = useContext(CorralsArrayContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      try {
        let currentPosition = lastPositionA;
        const elementsToProduce = Math.floor(Math.random() * (10 - 3 + 1) + 3);

        const nuevoCorralArray = [...corralsArray];
        for (let i = 0; i < elementsToProduce; i++) {
          nuevoCorralArray[currentPosition] = 0;
          currentPosition = (currentPosition + 1) % corralsArray.length;
          updateCorralsArray([...nuevoCorralArray]); // Actualizar el array en cada iteración
        }
        setLastPositionA(currentPosition);
      } catch (error) {
        console.error("Error:", error);
      }
    }, 3000); // Ejecutar cada 1000 milisegundos (1 segundo)

    // Limpiar el intervalo cuando el componente se desmonta o cuando corralsArray cambia
    return () => clearInterval(intervalId);
  }, [corralsArray, lastPositionA, updateCorralsArray, setLastPositionA]);

  return (
    <div>
      <img
        className="img-alien"
        width="300px"
        height="300px"
        src={alien}
        alt="alien"
      />
    </div>
  );
};

export default Alien;
