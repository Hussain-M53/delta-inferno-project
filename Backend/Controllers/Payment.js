
exports.payment_intent = async (req, res, next) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,  // amount in cents
            currency: 'usd',
        });

        res.send({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
}