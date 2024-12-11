# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


import { useEffect, useState } from "react";

const Calculator = () => {
  const [prevValue, setPrevValue] = useState("");
  const [nextValue, setNextValue] = useState("");
  const [op, setOp] = useState(null);

  const handleOperation = (value) => {
    if (Number.isInteger(Number(value))) {
      setNextValue((prev) => {
        return prev + value;
      });
    } else if (value == ".") {
      if (!nextValue.includes(".")) {
        setNextValue((prev) => (prev === "" ? "0." : prev + "."));
      }
    } else if (value in { "+": 1, "-": 1, "*": 1, "%": 1, "+-": 1, "/": 1 }) {
      if (op == null) {
        setOp(value);
        setPrevValue(nextValue);
        setNextValue("");
      } else {
        if (nextValue) {
          const result = performOp();
          setPrevValue(result);
          setNextValue("");
        }
        setOp(value);
      }
    } else if (value === "=") {
      if (prevValue && nextValue && op) {
        const result = performOp();
        setPrevValue(result);
        setNextValue("");
      }
    } else if (value == "C") {
      setPrevValue("");
      setNextValue("");
      setOp(null);
    }
  };
  const performOp = () => {
    switch (op) {
      case "+":
        return parseFloat(prevValue) + parseFloat(nextValue);
      case "-":
        return parseFloat(prevValue) - parseFloat(nextValue);
      case "*":
        return parseFloat(prevValue) * parseFloat(nextValue);
      case "/":
        return parseFloat(prevValue) / parseFloat(nextValue);
      case "%":
        return prevValue % nextValue;
      case "+-":
        return prevValue + -nextValue;
      default:
        return 0;
    }
  };

  useEffect(() => {
    console.log("next" + nextValue, "prev" + prevValue, "op" + op);
  }, [prevValue, nextValue, op]);