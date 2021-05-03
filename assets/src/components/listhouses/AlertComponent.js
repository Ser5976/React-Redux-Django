import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertComponent = ({ setFetchError }) => {
  return (
    <Alert
      variant="primary"
      onClose={() => setFetchError(false)}
      dismissible
      className="text-center"
    >
      <Alert.Heading>Ой! У вас ошибка!</Alert.Heading>
    </Alert>
  );
};

export default AlertComponent;
