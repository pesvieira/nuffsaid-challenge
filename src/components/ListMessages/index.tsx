import React, { useContext } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import FilteredMessagesContext from '../../contexts/filteredMessages';

import { MainContainer } from './styles';

interface Props {
  messages: string[];
  priority: number;
}

const ListMessages: React.FC<Props> = ({ messages, priority }) => {
  const textType = priority === 0
    ?
    "Error"
    :
    (priority === 1 ? "Warning" : "Info");

  const { deleteMessage } = useContext(FilteredMessagesContext);


  return (
    <MainContainer>
      <Typography style={{ fontSize: "1.1rem", fontWeight: "bold" }}> {textType} Type {priority + 1}</Typography>
      <Typography style={{ marginBottom: "10px" }}>Count {messages.length}</Typography>

      {messages.length !== 0 &&
        messages.map((msg, index) => {
          return (
            <Card
              data-testid={msg}
              key={msg}
              style={{
                width: "100%",
                backgroundColor: priority === 0 ? "#F56236" : (priority === 1 ? "#FCE788" : "#88FCA3"),
                marginBottom: "10px",
              }}
            >
              <CardContent>
                <Typography>{msg}</Typography>
                <Typography
                  className={msg}
                  data-testid={"btn_delete" + index}
                  key={msg}
                  style={{ textAlign: "end", fontSize: "0.8rem", fontStyle: "italic", cursor: "pointer", marginTop: "10px" }}
                  onClick={() => deleteMessage(index, priority)}
                >Clear</Typography>
              </CardContent>
            </Card>
          );
        })
      }
    </MainContainer>
  );
}

export default ListMessages;