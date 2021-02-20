import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavbarContainer from './components/navbar/NavbarContainer';
import MyRouter from './router/MyRouter';
import RegistrationState from './state/registrationState/RegistrationState';
import BaseState from './state/baseState/BaseState';
import PersonalAccountState from './state/personalAccountState/PersonalAccountState';

function App() {
  return (
    <>
      <PersonalAccountState>
        <RegistrationState>
          <BaseState>
            <BrowserRouter>
              <NavbarContainer />
              <MyRouter />
            </BrowserRouter>
          </BaseState>
        </RegistrationState>
      </PersonalAccountState>
    </>
  );
}

export default App;
