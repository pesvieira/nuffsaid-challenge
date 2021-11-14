import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import ListMessages from '../components/ListMessages';


test('renders learn react link', () => {
  const comp = render(<App />);
  expect(comp).toBeTruthy();
});

test('Homepage: check if the buttons were rendered', () => {
  render(<App />);
  const btnStop = screen.getByTestId('btn-stop');
  expect(btnStop).toBeInTheDocument();
  const btnClear = screen.getByTestId('btn-clear');
  expect(btnClear).toBeInTheDocument();
});

test('ListMessages component: check if Error card is displayed properly', () => {
  const error_message = ["Message of test"];
  const priotiy = 0;
  const color = '#F56236';

  render(<ListMessages messages={error_message} priority={priotiy} />);

  const card_error = screen.getByTestId(error_message[0]);
  expect(card_error).toHaveStyle(`background: ${color}`);
});

test('ListMessages component: check if Warning card is displayed properly', () => {
  const warn_message = ["Message of test"];
  const priotiy = 1;
  const color = '#FCE788';

  render(<ListMessages messages={warn_message} priority={priotiy} />);

  const card_warn = screen.getByTestId(warn_message[0]);
  expect(card_warn).toHaveStyle(`background: ${color}`);
});

test('ListMessages component: check if Info card is displayed properly', () => {
  const info_message = ["Message of test"];
  const priotiy = 2;
  const color = '#88FCA3';

  render(<ListMessages messages={info_message} priority={priotiy} />);

  const card_info = screen.getByTestId(info_message[0]);
  expect(card_info).toHaveStyle(`background: ${color}`);
});

test('ListMessages component: check if the message is deleted after to press Delete button on card message', () => {
  render(<App />);

  const btn_delete = screen.getByTestId("btn_delete0");
  const { className } = btn_delete;
  let msg = className.split('1')[1].split('.')[0] + '.';
  msg = msg.substring(1, msg.length);

  const card = screen.getByTestId(msg);
  expect(card).toBeInTheDocument();

  userEvent.click(btn_delete);

  expect(card).not.toBeInTheDocument();
});
