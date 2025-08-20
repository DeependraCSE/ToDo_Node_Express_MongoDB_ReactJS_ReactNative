import { createContext, useContext, useState, type ReactNode } from "react";
import MessageContainer from "./messagecontainer";
import type { Message, MessageContextType } from "../interface/interface";
import type { AlertType } from "../component/commonProps";

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<Message[]>([]);

  const showMessage = (title: string, message: string, type: AlertType = "info") => {
    const id = Date.now();
    setMessage((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setMessage((prev) => prev.filter((t) => t.id !== id));
    }, 3000); // auto-hide after 3s
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
      <MessageContainer messages={message} />
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) throw new Error("useMessage must be used inside MessageProvider");
  return context;
};
