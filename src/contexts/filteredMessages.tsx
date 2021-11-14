import React, { createContext, useState } from 'react';
import { Message } from '../Api';


interface MessagesContextData {
  errorMessages: string[];
  warningMessages: string[];
  infoMessages: string[];
  handleNewMessage: (message: Message) => void;
  clearMessages(): void;
  deleteMessage: (index: number, priority: number) => void;
}

const FilteredMessagesContext = createContext<MessagesContextData>({} as MessagesContextData);

export const FilteredMessagesProvider: React.FC = ({ children }) => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [warningMessages, setWarningMessages] = useState<string[]>([]);
  const [infoMessages, setInfoMessages] = useState<string[]>([]);

  function handleNewMessage(message: Message) {
    switch (message.priority) {
      case 0:
        setErrorMessages(oldMessages => [...oldMessages, message.message]);
        break;
      case 1:
        setWarningMessages(oldMessages => [...oldMessages, message.message]);
        break;
      case 2:
        setInfoMessages(oldMessages => [...oldMessages, message.message]);
        break;
      default:
        console.log("Priority level not found!");
    }
  }

  function clearMessages() {
    setErrorMessages([]);
    setWarningMessages([]);
    setInfoMessages([]);
  }

  function deleteMessage(index: number, priority: number) {
    switch (priority) {
      case 0:
        const newErrorMessages = errorMessages.slice();
        newErrorMessages.splice(index, 1);
        setErrorMessages(newErrorMessages);
        break;
      case 1:
        const newWarningMessages = warningMessages.slice();
        newWarningMessages.splice(index, 1);
        setWarningMessages(newWarningMessages);
        break;
      case 2:
        const newInfoMessages = infoMessages.slice();
        newInfoMessages.splice(index, 1);
        setInfoMessages(newInfoMessages);
        break;
      default:
        console.log("Priority level not found!");
    }
  }

  return (
    <FilteredMessagesContext.Provider value={{ infoMessages, warningMessages, errorMessages, handleNewMessage, clearMessages, deleteMessage }}>
      {children}
    </FilteredMessagesContext.Provider>
  );
}

export default FilteredMessagesContext;