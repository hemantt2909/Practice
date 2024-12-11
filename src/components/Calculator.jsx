import { useState, useEffect } from "react";

const Calculator = () => {
  const [prevValue, setPrevValue] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [operator, setOperator] = useState(null);

  console.log(
    "prev" + prevValue,
    "current" + currentValue,
    "operator" + operator
  );
  const handleOperation = (value) => {
    if (Number.isInteger(Number(value))) {
      setCurrentValue((prev) => (prev = prev + value));
    } else if (value == ".") {
      if (!currentValue.includes(".")) {
        setCurrentValue((prev) => (prev === "" ? "0." : prev + "."));
      }
    } else if (value in { "+": 1, "-": 1, "*": 1, "/": 1, "%": 1 }) {
      if (currentValue) {
        if (operator === null) {
          setOperator(value);
          setPrevValue(currentValue);
          setCurrentValue("");
        } else {
          const result = performOp();
          setPrevValue(result);
          setOperator(value);
          setCurrentValue("");
        }
      }
    } else if (value === "=") {
      if (prevValue && currentValue && operator) {
        const result = performOp();
        setCurrentValue(result);
        setPrevValue(result);
        setOperator(null);  
      }
    } else if (value == "C") {
      setPrevValue("");
      setCurrentValue("");
      setOperator(null);
    }
  };
  const performOp = () => {
    const a = parseFloat(prevValue);
    const b = parseFloat(currentValue);

    switch (operator) {
      case "*":
        return a * b;
      case "+":
        return a + b;
      case "/":
        return a / b;
      case "-":
        return a - b;
      case "%":
        return (a * b) / 100;
      default:
        throw new Error("Unsupported operator");
    }
  };

  return (
    <>
      <div className="container">
        <div className="calculator_wrapper">
          <div className="result_container">
          <div>{currentValue || prevValue || "0"}</div>
          </div>
          <div>
            <div className="calculator_keys">
              <div onClick={() => handleOperation("C")}>C</div>
              <div onClick={() => handleOperation("+-")}>+-</div>
              <div onClick={() => handleOperation("%")}>%</div>
              <div onClick={() => handleOperation("+")}>+</div>
            </div>

            <div className="calculator_keys">
              <div
                onClick={() => {
                  handleOperation("7");
                }}
              >
                7
              </div>
              <div
                onClick={() => {
                  handleOperation("8");
                }}
              >
                8
              </div>
              <div
                onClick={() => {
                  handleOperation("9");
                }}
              >
                9
              </div>
              <div
                onClick={() => {
                  handleOperation("-");
                }}
              >
                -
              </div>
            </div>
            <div className="calculator_keys">
              <div onClick={() => handleOperation("4")}>4</div>
              <div onClick={() => handleOperation("5")}>5</div>
              <div onClick={() => handleOperation("6")}>6</div>
              <div onClick={() => handleOperation("*")}>*</div>
            </div>
            <div className="calculator_keys">
              <div onClick={() => handleOperation("1")}>1</div>
              <div onClick={() => handleOperation("2")}>2</div>
              <div onClick={() => handleOperation("3")}>3</div>
              <div onClick={() => handleOperation("/")}>/</div>
            </div>
            <div className="calculator_keys a">
              <div className="zero_key" onClick={() => handleOperation("0")}>
                0
              </div>
              <div onClick={() => handleOperation(".")}>.</div>
              <div onClick={() => handleOperation("=")}>=</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
