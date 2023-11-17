import React, { useContext, useState, useEffect } from "react";
import {
  CorralsArrayProvider,
  CorralsArrayContext,
} from "./context/corralsArrayProvider";
import "./css/field.css";
import Corral from "./components/Corral";
import Cowboy from "./components/Cowboy";
import Alien from "./components/Alien";
import Console from "./components/console";
import Cow from "./components/Cow";
import zzz from "./assets/zzz.svg";

const Field = () => {
  const { corralsArray, updateCorralsArray } = useContext(CorralsArrayContext);
  const [lastPositionC, setLastPositionC] = useState(0);
  const [lastPositionA, setLastPositionA] = useState(0);
  const [stop, setStop] = useState(false);
  const [isProducing, setIsProducing] = useState(true);
  const [messages, setMessages] = useState([]);

  const sleepPromise = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 6000);
    });
  };

  useEffect(() => {
    if (!stop) {
      const addElements = async () => {
        try {
          isProducing
            ? setMessages((prev) => [...prev, "Cowboy working"])
            : setMessages((prev) => [...prev, "Alien stealing"]);
          await sleepPromise();
          setIsProducing(!isProducing);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      addElements();
    }
  }, [isProducing, setIsProducing, stop]);

  const handleKeyPress = (event) => {
    switch (event.key) {
      case "Escape":
        setStop(true);
    }
  };

  //listener for keyboard
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isProducing, setIsProducing]);

  return (
    <div className="field">
      <div className="titleSun">
        <h1 className="field__title">Producer Consumer</h1>
      </div>
      <div className="consoleBox">
        <Console messages={messages} />
      </div>

      <div className="boardBox">
        <div>
          <h3>Cowboy</h3>
          {isProducing && !stop ? (
            <Cowboy
              lastPositionC={lastPositionC}
              setLastPositionC={setLastPositionC}
            />
          ) : (
            <img width="300px" height="300px" src={zzz} alt="zzz" />
          )}
        </div>
        <div className="corrals">
          {corralsArray.map((corral, index) =>
            corral ? (
              <Corral key={index}>
                <b>{index + 1}</b>
                <Cow />
              </Corral>
            ) : (
              <Corral key={index}>{index + 1}</Corral>
            )
          )}
        </div>
        <div>
          <h3>Alien</h3>
          {!isProducing && !stop ? (
            <Alien
              lastPositionA={lastPositionA}
              setLastPositionA={setLastPositionA}
            />
          ) : (
            <img width="300px" height="300px" src={zzz} alt="zzz" />
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <CorralsArrayProvider>
      <Field />
    </CorralsArrayProvider>
  );
};

export default App;
