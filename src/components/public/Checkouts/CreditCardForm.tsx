import React from 'react';

const CreditCardForm = () => (
  <div className="pt-4 space-y-4">
    <input placeholder="Card Number" className="input" required />
    <div className="grid grid-cols-2 gap-4">
      <input placeholder="MM/YY" className="input" required />
      <input placeholder="CVV" className="input" required />
    </div>
  </div>
);

export default CreditCardForm;
