import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #000;
  padding-bottom: 5px;
  font-size: 1.15rem;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const ButtonHome = styled.button`
  background-color: #88FCA3;
  margin: 5px;
  padding: 5px 10px;
  border: none;
  box-shadow: 1px 1px;

  &:hover{
    background-color: #88E0A3;
  }
`;

export const MessagesContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: baseline;
  margin-top: 50px;
`;