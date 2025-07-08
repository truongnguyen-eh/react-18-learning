import React, { useMemo, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function Bad() {  
  const [enable, setEnable] = useState(true);
  if (enable) {
    // 🔴 Bad: inside a condition (to fix, move it outside!)
    const [count, setCount] = useState(0);

    setTimeout(() => {
      setEnable(false)
    }, 3000)
  }
  
  return 'Bad';
}

// function Bad() {
//   const [length, setLength] = useState(3);

//   for (let i = 0; i < length; i++) {
//     // 🔴 Bad: inside a loop (to fix, move it outside!)
//     const [count, setCount] = useState(0);

//     setTimeout(() => {
//       setLength(length + 1)
//     }, 3000)
//   }

//   return 'Bad';
// }

// function Bad() {
//   const [enable, setEnable] = useState(false);
//   if (enable) {
//     return;
//   }
//   // 🔴 Bad: after a conditional return (to fix, move it before the return!)
//   const [count, setCount] = useState(0);

//   setTimeout(() => {
//     setEnable(true)
//   }, 3000)
  
//   return 'Bad';
// }

// function Bad() {
//   function handleClick() {
//     // 🔴 Bad: inside an event handler (to fix, move it outside!)
//     const [count, setCount] = useState(0);
//   }

//   setTimeout(() => {
//     handleClick()
//   }, 3000)
  
//   return 'Bad';
// }

// function Bad() {
//   const style = useMemo(() => {
//     // 🔴 Bad: inside useMemo (to fix, move it outside!)
//     const [count, setCount] = useState(0);
//   }, []);
  
//   return 'Bad';
// }

// class Bad extends React.Component {
//   render() {
//     // 🔴 Bad: inside a class component (to fix, write a function component instead of a class!)
//     useEffect(() => {})
//     // ...
//     return null;
//   }
// }

const root = document.getElementById('root');
if (root) {
  if (!window['REACT_ROOT']) {
    window['REACT_ROOT'] = createRoot(root)
  }
  window['REACT_ROOT'].render(<Bad />);
}
