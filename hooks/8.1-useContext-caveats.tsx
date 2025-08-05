import ReactDOM from "react-dom/client";

import { createContext, useContext, useState } from "react";

// Creating a single, large context
export const AuthAndThemeContext = createContext({
  user: { name: "Alice" },
  theme: "light",
  setUser: (user: { name: string }) => {},
  setTheme: (theme: string) => {},
});

export const AuthAndThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState({ name: "Alice" });
  const [theme, setTheme] = useState("light");

  // The context value contains both user and theme
  const value = { user, theme, setUser, setTheme };

  return (
    <AuthAndThemeContext.Provider value={value}>
      {children}
    </AuthAndThemeContext.Provider>
  );
};

// UserProfile component only needs user info
function UserProfile() {
  const { user } = useContext(AuthAndThemeContext);
  console.log("UserProfile re-rendered");
  return <h2>Hello, {user.name}</h2>;
}

// ThemeSwitcher component only needs theme settings
function ThemeSwitcher() {
  const { theme, setTheme } = useContext(AuthAndThemeContext);
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
    <AuthAndThemeContextProvider>
      <UserProfile />
      <ThemeSwitcher />
    </AuthAndThemeContextProvider>
  );
}

const root = document.getElementById("root");
if (root) {
  if (!window["REACT_ROOT"]) {
    window["REACT_ROOT"] = ReactDOM.createRoot(root);
  }
  window["REACT_ROOT"].render(<App />);
}
