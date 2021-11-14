import React from 'react';
import Home from "./pages/Home"
import { FilteredMessagesProvider } from './contexts/filteredMessages';

const App: React.FC<{}> = () => {

  return (
    <FilteredMessagesProvider>
      <Home />
    </FilteredMessagesProvider>
  );
}

export default App;
