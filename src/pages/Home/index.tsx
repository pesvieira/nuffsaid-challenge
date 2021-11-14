import React, { useState, useEffect, useContext } from 'react';
import generateMessage, { Message } from '../../Api';
import ListMessages from '../../components/ListMessages';
import { Alert, Snackbar } from '@mui/material';
import FilteredMessagesContext from '../../contexts/filteredMessages';

import {
  MainContainer,
  HeaderContainer,
  ButtonsContainer,
  ButtonHome,
  MessagesContainer
} from "./styles";

interface Notification {
  msg: string;
  display: boolean;
}

const Home: React.FC<{}> = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const { infoMessages, warningMessages, errorMessages, handleNewMessage, clearMessages } = useContext(FilteredMessagesContext);

  const [stop, setStop] = useState<boolean>(false);
  const [notificationBar, setNotificationBar] = useState<Notification>({ msg: "", display: false });

  useEffect(() => {
    const cleanUp = stop ? undefined : generateMessage((message: Message) => {
      setMessages(oldMessages => [...oldMessages, message]);

      handleNewMessage(message);

      if (message.priority === 0) {
        setNotificationBar({ msg: message.message, display: true });
      }
    });

    return cleanUp;

  }, [setMessages, stop]);

  function resetMessages() {
    setMessages([]);
    clearMessages();
    setNotificationBar({ msg: "", display: false });
  }

  function handleNotificationClose() {
    setNotificationBar({
      display: false,
      msg: ""
    })
  }

  return (
    <MainContainer>
      <HeaderContainer>nunffsaid.com Coding Challenge</HeaderContainer>

      <Snackbar open={notificationBar.display} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={2000} onClose={handleNotificationClose}>
        <Alert onClose={handleNotificationClose} severity="error">
          {notificationBar.msg}
        </Alert>
      </Snackbar>

      <ButtonsContainer>
        <ButtonHome data-testid="btn-stop" onClick={() => setStop(!stop)}> {stop ? "Start" : "Stop"} </ButtonHome>
        <ButtonHome data-testid="btn-clear" onClick={() => resetMessages()}>Clear</ButtonHome>
      </ButtonsContainer>

      <MessagesContainer>
        <ListMessages messages={errorMessages} priority={0} />
        <ListMessages messages={warningMessages} priority={1} />
        <ListMessages messages={infoMessages} priority={2} />
      </MessagesContainer>

    </MainContainer>
  );
}

export default Home;