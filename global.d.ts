import ReactDOM from "react-dom/client";

declare global {
  interface Window {
    REACT_ROOT?: ReturnType<typeof ReactDOM.createRoot>;
  }
}

export {};