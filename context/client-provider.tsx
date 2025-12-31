"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import type { Client } from "@/types";

interface ClientContextType {
  client: Client;
  setClient: (client: Client) => void;
}

const ClientContext = createContext<ClientContextType>({} as ClientContextType);

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient must be used within a ClientProvider");
  }
  return context;
};

type ClientAction = { type: "set-client"; payload: Client };

function clientReducer(_: Client, action: ClientAction) {
  switch (action.type) {
    case "set-client":
      return action.payload;
    default:
      throw new Error("Invalid action");
  }
}

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const [client, clientDispatch] = useReducer(clientReducer, "sunpharma");

  useEffect(() => {
    try {
      const savedClient = localStorage.getItem("client");
      if (savedClient) {
        const parsed = JSON.parse(savedClient);
        clientDispatch({ type: "set-client", payload: parsed });
      }
    } catch (error) {
      console.error(`Error loading client: ${error}`);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("client", JSON.stringify(client));
  }, [client]);

  const setClient = (client: Client): void => {
    clientDispatch({ type: "set-client", payload: client });
  };

  const value = { client, setClient };

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
}
