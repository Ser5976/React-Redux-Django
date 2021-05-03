import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavbarContainer from './components/navbar/NavbarContainer';
import MyRouter from './router/MyRouter';

function App() {
  return (
    <BrowserRouter>
      <NavbarContainer />
      <MyRouter />
    </BrowserRouter>
  );
}

export default App;
