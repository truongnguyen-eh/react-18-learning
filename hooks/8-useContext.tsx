import {
  createContext,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ReactDOM from "react-dom/client";

const ThemeContext = createContext<{
  theme: string;
  setTheme: (theme: string) => void;
} | null>(null);

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("light");
  const [count, setCount] = useState(0);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      {children}
    </ThemeContext.Provider>
  );
};

function App() {
  return (
    <ThemeContextProvider>
      <div>
        <Toolbar />
      </div>
    </ThemeContextProvider>
  );
}

// This component receives props it doesn't use, just to pass them down
const Toolbar = () => {
  console.log("re-render Toolbar");

  return (
    <div>
      <ThemedButton />
    </div>
  );
};

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }
  return context;
};

// This component finally receives the props it needs
function ThemedButton() {
  console.log("re-render ThemedButton");

  const { theme, setTheme } = useThemeContext();

  return (
    <div>
      <div>Theme: {theme}</div>
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        style={{
          backgroundColor: theme === "light" ? "white" : "black",
          color: theme === "light" ? "black" : "white",
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
}

const root = document.getElementById("root");
if (root) {
  if (!window["REACT_ROOT"]) {
    window["REACT_ROOT"] = ReactDOM.createRoot(root);
  }
  window["REACT_ROOT"].render(<App />);
}
