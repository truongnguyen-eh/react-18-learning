import ReactDOM from "react-dom/client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

// useSelector(state => state.text)
// useSelector(state => state.count)

const StoreContext = createContext<{
  getState: () => { text: string; count: number };
  dispatch: (action: { type: string; payload?: any }) => void;
  subscribe: (listener: () => void) => () => void;
} | null>(null);

const reducer = (
  state: { text: string; count: number },
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case "setText":
      return { ...state, text: action.payload };
    case "increaseCount":
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};

const TextAndCounterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, {
    text: "Hello",
    count: 0,
  });

  const listenersRef = useRef<Set<() => void>>(new Set());

  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const storeRef = useRef<{
    getState: () => { text: string; count: number };
    dispatch: (action: { type: string; payload?: any }) => void;
    subscribe: (listener: () => void) => () => void;
  }>({
    getState: () => stateRef.current,
    dispatch,
    subscribe: (listeners) => {
      listenersRef.current.add(listeners);
      return () => {
        listenersRef.current.delete(listeners);
      };
    },
  });

  useEffect(() => {
    listenersRef.current.forEach((listener) => listener());
  }, [state]);

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

const useSelector = (
  selector: (state: { text: string; count: number }) => any
) => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error(
      "useTextAndCounterContext must be used within a TextAndCounterProvider"
    );
  }

  const { subscribe } = context;

  const [selected, setSelected] = useState(selector(context.getState()));

  useEffect(() => {
    const listener = () => {
      setSelected((prevState: any) => {
        const newState = selector(context.getState());
        if (prevState === newState) {
          return prevState;
        }
        return newState;
      });
    };
    const unsubscribe = subscribe(listener);
    return unsubscribe;
  }, [context]);

  return selected;
};

const useDispatch = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useDispatch must be used within a TextAndCounterProvider");
  }
  return context.dispatch;
};

const Counter = () => {
  const count = useSelector((state) => state.count);
  console.log("Counter component rendered");

  return <div>The current count is: {count}</div>;
};

const TextDisplay = () => {
  const text = useSelector((state) => state.text);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "setText", payload: e.target.value });
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
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch({ type: "increaseCount" })}>
      Increment Count
    </button>
  );
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

// BAD: unnecessary re-render

// const StoreContext = createContext<{
//   text: string;
//   count: number;
//   setText: (text: string) => void;
//   setCount: (count: number) => void;
// } | null>(null);

// const TextAndCounterProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [text, setText] = useState("Hello");
//   const [count, setCount] = useState(0);
//   return (
//     <StoreContext.Provider value={{ text, count, setText, setCount }}>
//       {children}
//     </StoreContext.Provider>
//   );
// };

// const useTextAndCounterContext = () => {
//   const context = useContext(StoreContext);
//   if (!context) {
//     throw new Error(
//       "useTextAndCounterContext must be used within a TextAndCounterProvider"
//     );
//   }
//   return context;
// };

// const Counter = () => {
//   const { count } = useTextAndCounterContext();
//   console.log("Counter component rendered");

//   return <div>The current count is: {count}</div>;
// };

// const TextDisplay = () => {
//   const { text, setText } = useTextAndCounterContext();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setText(e.target.value);
//   };

//   console.log("TextDisplay component rendered");

//   return (
//     <div>
//       <p>Text: {text}</p>
//       <input value={text} onChange={handleChange} />
//     </div>
//   );
// };

// const ButtonIncrement = () => {
//   const { count, setCount } = useTextAndCounterContext();
//   return <button onClick={() => setCount(count + 1)}>Increment Count</button>;
// };

// const App = () => {
//   return (
//     <TextAndCounterProvider>
//       <ButtonIncrement />
//       <hr />
//       <Counter />
//       <TextDisplay />
//     </TextAndCounterProvider>
//   );
// };
