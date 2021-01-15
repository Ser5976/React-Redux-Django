import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navibar from './components/Navibar';
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
              <Navibar />
              <MyRouter />
            </BrowserRouter>
          </BaseState>
        </RegistrationState>
      </PersonalAccountState>
    </>
  );
}

export default App;
