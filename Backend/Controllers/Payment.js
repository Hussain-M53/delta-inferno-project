const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.initiate_session = async (req, res, next) => {
    const { Order_Details } = req.body;

    const line_items = {
        currency: 'usd',
        product_data: 'Order_Details',
        unit_amount: Order_Details.fee * 100,
        quantity: 1,
    }
    const session = await stripe.checkout.sessions.create({
        payment_method_type: ['card'],
        line_items: line_items,
        mode: 'payment',
        success_url: 'localhost:3000/Orders',
        cancel_url: 'localhost:3000/Orders/error',
    });

    res.redirect(303, session.url);
}