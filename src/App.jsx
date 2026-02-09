import React, { useState } from "react";
import "./App.css";

function App() {
  // STEP 2.1: States
  const [array, setArray] = useState([]);
  const [colors, setColors] = useState([]);
  const [sorting, setSorting] = useState(false);

  // STEP 2.2: Generate random array
  const generateArray = () => {
    if (sorting) return;

    let tempArray = [];
    let tempColors = [];

    for (let i = 0; i < 15; i++) {
      tempArray.push(Math.floor(Math.random() * 100) + 10);
      tempColors.push("blue"); // unsorted
    }

    setArray(tempArray);
    setColors(tempColors);
  };

  // STEP 2.3: Delay function
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // STEP 2.4: Bubble Sort Logic (NO array.sort)
  const bubbleSort = async () => {
    setSorting(true);
    let arr = [...array];
    let col = [...colors];

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        // Highlight comparison
        col[j] = "red";
        col[j + 1] = "red";
        setColors([...col]);
        await sleep(500);

        if (arr[j] > arr[j + 1]) {
          // Swap values
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          setArray([...arr]);
          await sleep(500);
        }

        // Reset color after comparison
        col[j] = "blue";
        col[j + 1] = "blue";
      }

      // Mark sorted element
      col[arr.length - i - 1] = "green";
      setColors([...col]);
    }

    // Mark first element sorted
    col[0] = "green";
    setColors([...col]);
    setSorting(false);
  };

  return (
    <div className="container">
      <h1>Bubble Sort Visualizer</h1>

      <div className="bars">
        {array.map((value, index) => (
          <div
            key={index}
            className="bar"
            style={{
              height: `${value * 3}px`,
              backgroundColor: colors[index],
            }}
          ></div>
        ))}
      </div>

      <div className="buttons">
        <button onClick={generateArray} disabled={sorting}>
          Generate New Array
        </button>
        <button onClick={bubbleSort} disabled={sorting}>
          Start Sorting
        </button>
      </div>
    </div>
  );
}

export default App;

