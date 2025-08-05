import { useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <div>
      <div>Theme: {theme}</div>
      <Toolbar theme={theme} setTheme={setTheme} />
    </div>
  );
}

// This component receives props it doesn't use, just to pass them down
function Toolbar({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: (theme: string) => void;
}) {
  return (
    <div>
      <ThemedButton theme={theme} setTheme={setTheme} />
    </div>
  );
}

// This component finally receives the props it needs
function ThemedButton({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: (theme: string) => void;
}) {
  return (
    <div>
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
