"use client";

import React, { useEffect, useState } from "react";

import { Hat } from "./types";

export interface HatsContextValue {
  hats: Hat[];
  isLoading: boolean;
  isError: boolean;
}

export const HatsContext = React.createContext({} as HatsContextValue);

export interface HatsProviderProps {
  children: React.ReactNode;
}

export function HatsProvider({ children }: HatsProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hats, setHats] = useState([] as Hat[]);

  async function fetchHats() {
    setIsLoading(true);
    try {
      // Please, swap for .env var
      const response = await fetch("http://localhost:8000/api/products");
      const json = (await response.json()) as Hat[];
      setHats(json);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchHats();
  }, []);

  const value = {
    hats,
    isLoading,
    isError,
  };

  return <HatsContext.Provider value={value}>{children}</HatsContext.Provider>;
}

export function useHatsContext() {
  const context = React.useContext(HatsContext);

  if (!context) {
    throw new Error("useHatsContext can only be used inside a HatsProvider");
  }

  return context;
}
