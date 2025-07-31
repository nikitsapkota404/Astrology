import User from '../models/UserSchema.js'
import Astrologer from '../models/AstrologerSchema.js'
import Booking from '../models/BookingSchema.js'
import Stripe from 'stripe'

export const getCheckoutSession = async(req, res)=>{
    try {
        const astrologer = await Astrologer.findById(req.params.astrologerId);
        const user = await User.findById(req.userId);

        if (!astrologer || !user) {
            return res.status(404).json({ success: false, message: "Astrologer or user not found" });
        }

        const ticketPrice = Number(astrologer.ticketPrice);
        if (isNaN(ticketPrice)) {
            return res.status(400).json({ success: false, message: "Invalid astrologer ticket price" });
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.CLIENT_SIDE_URL}/checkout-success`,
            cancel_url: `${req.protocol}://${req.get('host')}/astrologers/${astrologer.id}`,
            customer_email: user.email,
            client_reference_id: req.params.astrologerId,
            line_items: [
                {
                    price_data: {
                        currency: 'npr',
                        unit_amount: Math.round(ticketPrice * 100),
                        product_data: {
                            name: astrologer.name,
                            description: astrologer.bio,
                            images: [astrologer.photo]
                        }
                    },
                    quantity: 1 
                }
            ]
        });

        const booking = new Booking({
            astrologer: astrologer._id,
            user: user._id,
            ticketPrice: ticketPrice,
            session: session.id
        });

        await booking.save();
        res.status(200).json({ success: true, message: "Successfully Paid", sessionURL: session.url });

    } catch (err) {
        console.error("Checkout Session Error:", err);
        res.status(500).json({
            success: false,
            message: "Error creating checkout session",
            error: err.message
        });
    }
}
