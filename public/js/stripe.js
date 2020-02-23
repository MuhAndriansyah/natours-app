import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe('pk_test_RhbRTyCnAU8hAuvQ5Eu6gtv700yCkRWnHn');

export const bookTour = async tourId => {
  try {
    // Get session from the server
    const session = await axios(
      `http://localhost:3000/api/v1/booking/checkout-session/${tourId}`
    );
    console.log(session);

    // create checkout form + process + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (error) {
    console.log(error);
    showAlert('error', error);
  }
};
