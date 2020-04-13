/*

File Name: StripeCheckout.js
Purpose: A work-in-progress of the checkout system for the auction.
Document Created By: Team 1

*/

import React from 'react'
import StripeCheckout from 'react-stripe-checkout';


/*
Function: TakeMoney
Purpose: Processes the information. Will need to be live in order to take funds.
*/

export default class TakeMoney extends React.Component {
  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    })
    .then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  // Renders content based on Stripe commands and featires.
  render() {
    return (
      // ...
      <StripeCheckout
        ComponentClass="div"
        token={this.onToken}
        stripeKey="pk_test_Sbcpj3uG2YdtrQwmsTmgpb0000nTUbeXXd"
        name="All Things Possible" // the pop-in header title
        description="Auction Payment" // the pop-in header subtitle
        amount={500} // cents
        currency="USD"
      />
    )
  }
}
