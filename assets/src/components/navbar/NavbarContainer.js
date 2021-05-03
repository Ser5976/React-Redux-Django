import React, { useState } from 'react';
import Navibar from './Navibar';

export default function NavbarContainer() {
  const [showCustomer, setShowCustomer] = useState(false);

  return (
    <>
      <Navibar showCustomer={showCustomer} setShowCustomer={setShowCustomer} />
    </>
  );
}
