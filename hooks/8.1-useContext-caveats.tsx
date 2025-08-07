import ReactDOM from "react-dom/client";

import { createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext<{
  text: string;
  count: number;
  setText: (text: string) => void;
  setCount: (count: number) => void;
} | null>(null);

const TextAndCounterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [text, setText] = useState("Hello");
  const [count, setCount] = useState(0);
  return (
    <StoreContext.Provider value={{ text, count, setText, setCount }}>
      {children}
    </StoreContext.Provider>
  );
};

const useTextAndCounterContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error(
      "useTextAndCounterContext must be used within a TextAndCounterProvider"
    );
  }
  return context;
};

const Counter = () => {
  const { count } = useTextAndCounterContext();
  console.log("Counter component rendered");

  return <div>The current count is: {count}</div>;
};

const TextDisplay = () => {
  const { text, setText } = useTextAndCounterContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  console.log("TextDisplay component rendered");

  return (
    <div>
      <p>Text: {text}</p>
      <input value={text} onChange={handleChange} />
    </div>
  );
};

const ButtonIncrement = () => {
  const { count, setCount } = useTextAndCounterContext();
  return <button onClick={() => setCount(count + 1)}>Increment Count</button>;
};

const App = () => {
  return (
    <TextAndCounterProvider>
      <ButtonIncrement />
      <hr />
      <Counter />
      <TextDisplay />
    </TextAndCounterProvider>
  );
};

const root = document.getElementById("root");
if (root) {
  if (!window["REACT_ROOT"]) {
    window["REACT_ROOT"] = ReactDOM.createRoot(root);
  }
  window["REACT_ROOT"].render(<App />);
}
