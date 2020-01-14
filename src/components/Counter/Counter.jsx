import React from "react";

const defaultProps = {
  countFrom: 0,
  countTo: 20
};

const Counter = ({ countFrom, countTo }) => {
  const [count, setCount] = React.useState(countFrom);

  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();
  const countRef = React.useRef(countFrom);

  React.useEffect(() => {
    const counting = time => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;

        // Pass on a function to the setter of the state
        // to make sure we always have the latest state
        setCount(prevCount => {
          const newCount = prevCount + deltaTime * 0.01;
          countRef.current = Math.round(newCount);

          return newCount;
        });
      }
      console.log("countRef: ", countRef.current);
      previousTimeRef.current = time;

      if (countRef.current >= countTo) {
        requestRef.current = null;
      } else {
        requestRef.current = requestAnimationFrame(counting);
      }
    };

    requestRef.current = requestAnimationFrame(counting);

    return () => cancelAnimationFrame(requestRef.current);
  }, [countTo]); // Make sure the effect runs only once

  return <div>{Math.round(count)}</div>;
};

Counter.defaultProps = defaultProps;

export default Counter;
