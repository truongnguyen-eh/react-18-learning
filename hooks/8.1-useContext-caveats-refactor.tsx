import ReactDOM from "react-dom/client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  user: { name: "Alice" },
  setUser: (user: { name: string }) => {},
});

const ThemeContext = createContext({
  theme: "light",
  setTheme: (theme: string) => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({ name: "Alice" });
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// UserProfile component only needs user info
function UserProfile() {
  const { user } = useContext(AuthContext);
  console.log("UserProfile re-rendered");
  return <h2>Hello, {user.name}</h2>;
}

// ThemeSwitcher component only needs theme settings
function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);
  console.log("ThemeSwitcher re-rendered");
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Toggle Theme
    </button>
  );
}

// Parent Component
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <UserProfile />
        <ThemeSwitcher />
      </ThemeProvider>
    </AuthProvider>
  );
}

const root = document.getElementById("root");
if (root) {
  if (!window["REACT_ROOT"]) {
    window["REACT_ROOT"] = ReactDOM.createRoot(root);
  }
  window["REACT_ROOT"].render(<App />);
}
