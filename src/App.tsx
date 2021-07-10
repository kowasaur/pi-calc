import React, { useState, useRef } from "react";

function App() {
  const [pi, setPi] = useState(1);
  const [prePi, setPrePi] = useState(1);
  const [delay, setDelay] = useState(30);
  const [hasStarted, setHasStarted] = useState(false);
  const sliderRef = useRef<HTMLInputElement>(null);

  function calculate(denominator: number, doAdd: boolean) {
    // If I just used delay, it doesn't update
    const lDelay = Number(sliderRef.current?.value ?? 30) ** 2;

    const newDen = denominator + 2;

    const change = doAdd ? 1 / newDen : -1 / newDen;

    setPi(pi => {
      setPrePi(pi);
      return pi + change;
    });

    setTimeout(() => {
      calculate(newDen, !doAdd);
    }, lDelay);
  }

  return (
    <>
      <h1>{(pi + prePi) * 2}</h1>
      {hasStarted ? (
        <input
          type="range"
          min="0"
          max="50"
          onChange={d => setDelay(Number(d.target.value))}
          value={delay}
          ref={sliderRef}
        />
      ) : (
        <button
          onClick={() => {
            setHasStarted(true);
            calculate(1, false);
          }}
        >
          start
        </button>
      )}
    </>
  );
}

export default App;
