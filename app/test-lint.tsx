import { useEffect, useState } from "react";

// This file is intentionally written to trigger ESLint rules
function TestComponent() {
  const [count, setCount] = useState(0);
  var x = 10;
  let unusedVariable = "this will trigger an unused variable warning";

  // This will trigger the sonarjs/no-duplicate-string rule
  console.log("duplicate string");
  console.log("duplicate string");
  console.log("duplicate string");

  // This will trigger security warnings
  eval("console.log('Hello')");

  // This will trigger promise-related rules
  const myPromise = new Promise((resolve, reject) => {
    if (x > 5) {
      resolve("Success");
    } else {
      reject("Failed");
    }
  });

  // Not using async/await properly
  myPromise.then((result) => {
    console.log(result);
  });

  // This function will trigger cognitive complexity warnings
  function complexFunction(a, b, c) {
    if (a > 10) {
      if (b > 10) {
        for (let i = 0; i < 10; i++) {
          if (c > 10) {
            while (a > 0) {
              a--;
              if (a === 5) {
                return "Complex!";
              }
            }
          }
        }
      }
    }

    return "Not complex";
  }

  // Using setTimeout without cleanup (React hooks rule)
  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(count + 1);
    }, 1000);
  }, []);

  // Incorrect tailwind class order
  return (
    <div className="flex items-center bg-blue-500 p-4">
      <h1>Test Component</h1>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}

export default TestComponent;
