import useError from "../hooks/useError"
import { createContext, useContext } from "react";


const ErrorContext = createContext()

export const useErrorContext = () => {
  return useContext(ErrorContext)
}

export function ErrorContextProvider({ children }) {
  return (
    <ErrorContext.Provider value={useError()}>
      {children}
    </ErrorContext.Provider>
  );
}