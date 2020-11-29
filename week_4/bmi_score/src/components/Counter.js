import React, { useState } from "react";

const Counter = () => {
  let [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <button onClick={handleClick} className="btn btn-danger">
      {count}
    </button>
  );
};

export default Counter;
