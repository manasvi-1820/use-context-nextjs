import { useMemo, useState } from "react";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { OrderContext } from "../components/OrderContext";

function MyApp({ Component, pageProps }) {
  const useLocalStorage = (key, initialValue) => {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Get from local storage by key
        const item =
          typeof window !== "undefined"
            ? window.localStorage.getItem(key)
            : null;
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };
    return [storedValue, setValue];
  };
  const [order, setOrder] = useLocalStorage("cartOrder", []);

  const value = useMemo(() => ({ order, setOrder }), [order, setOrder]);

  return (
    <OrderContext.Provider value={value}>
      <Component {...pageProps} />
    </OrderContext.Provider>
  );
}

export default MyApp;
