import React from 'react'

const Payment = () => {
    const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');
    return (
        <div>Payment</div>
    )
}

export default Payment

try {
    const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: 1000  // $10 in cents
        })
    });

    const data = await response.json();
    const clientSecret = data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: await stripe.elements().create('card')
        }
    });

    if (result.error) {
        console.error(result.error.message);
    } else {
        if (result.paymentIntent.status === 'succeeded') {
            alert('Payment succeeded!');
        }
    }

} catch (error) {
    console.error('Error:', error);
}