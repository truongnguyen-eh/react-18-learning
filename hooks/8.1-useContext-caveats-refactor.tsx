import ReactDOM from "react-dom/client";

import { createContext, useContext, useEffect, useState } from "react";

const TextContext = createContext<{
  text: string;
  setText: (text: string) => void;
} | null>(null);

const CounterContext = createContext<{
  count: number;
  setCount: (count: number) => void;
} | null>(null);

const TextProvider = ({ children }: { children: React.ReactNode }) => {
  const [text, setText] = useState("Hello");
  return (
    <TextContext.Provider value={{ text, setText }}>
      {children}
    </TextContext.Provider>
  );
};

const CounterProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);
  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
};

const useTextContext = () => {
  const context = useContext(TextContext);
  if (!context) {
    throw new Error("useTextContext must be used within a TextContext");
  }
  return context;
};

const useCounterContext = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error(
      "useTextAndCounterContext must be used within a TextAndCounterProvider"
    );
  }
  return context;
};

const Counter = () => {
  const { count } = useCounterContext();
  console.log("Counter component rendered");

  return <div>The current count is: {count}</div>;
};

const TextDisplay = () => {
  const { text, setText } = useTextContext();

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
  const { count, setCount } = useCounterContext();
  return <button onClick={() => setCount(count + 1)}>Increment Count</button>;
};

const App = () => {
  return (
    <CounterProvider>
      <TextProvider>
        <ButtonIncrement />
        <hr />
        <Counter />
        <TextDisplay />
      </TextProvider>
    </CounterProvider>
  );
};

const root = document.getElementById("root");
if (root) {
  if (!window["REACT_ROOT"]) {
    window["REACT_ROOT"] = ReactDOM.createRoot(root);
  }
  window["REACT_ROOT"].render(<App />);
}
