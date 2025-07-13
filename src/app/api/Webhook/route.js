// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server"
import Stripe from "stripe"
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY
import { db } from "../firebase"
import { headers } from "next/headers"
// export const config = { api: { bodyParser: false } }
export async function POST(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const sig = await req.headers.get("stripe-signature")
  const payload = await req.text()

  // console.log("Signature", sig, "Payload", payload, "endpointSecret", endpointSecret)

  async function fulfillCheckout(event) {
    // Set your secret key. Remember to switch to your live secret key in production.
    // See your keys here: https://dashboard.stripe.com/apikeys

    console.log("Fulfilling Checkout Session " + event.data.object.id)

    // TODO: Make this function safe to run multiple times,
    // even concurrently, with the same session ID

    // TODO: Make sure fulfillment hasn't already been
    // peformed for this Checkout Session

    // Retrieve the Checkout Session from the API with line_items expanded
    const checkoutSession = await stripe.checkout.sessions.retrieve(event.data.object.id, {
      expand: ["line_items"],
    })
    console.log("checkoutSession", checkoutSession, event.type)
    // Check the Checkout Session's payment_status property
    // to determine if fulfillment should be peformed

    if (checkoutSession.payment_status !== "unpaid") {
      console.log("Payment Success")
      // TODO: Perform fulfillment of the line items
      // TODO: Record/save fulfillment status for this
      // Checkout Session
      const StoreCheckout = db.collection("users").doc(event.data.object.customer_email)
      const data = await StoreCheckout.set(
        {
          payment_status: checkoutSession.payment_status,
        },
        { merge: true }
      )
    }
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
    console.log(event)
  } catch (err) {
    console.log(err)
    return new NextResponse(JSON.stringify(`Webhook Error: ${err.message} `), { status: 400 })
  }
  const StoreCheckout = db.collection("users").doc(event.data.object.customer_email)
  const data = await StoreCheckout.set(
    {
      sessionid: event.data.object.id,
    },
    { merge: true }
  )
  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    fulfillCheckout(event)
  }

  if (event.type === "invoice.paid" || event.type === "invoice.payment_failed") {
    if (event.type === "invoice.paid") {
      let Validity = event.data.object.subtotal === 104800 ? new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString() : new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString()
      console.log("Subscription Success", Validity)
      // Continue to provision the subscription as payments continue to be made.
      // Store the status in your database and check when a user accesses your service.
      // This approach helps you avoid hitting rate limits.
      const StoreCheckout = db.collection("users").doc(event.data.object.customer_email)
      const data = await StoreCheckout.set(
        {
          Limit: 100,
          validity: Validity,
        },
        { merge: true }
      )
    }

    if (event.type === "invoice.payment_failed") {
      console.log("Subscription Due")
      // The payment failed or the customer does not have a valid payment method.
      // The subscription becomes past_due. Notify your customer and send them to the
      // customer portal to update their payment information.
      const StoreCheckout = db.collection("users").doc(event.data.object.customer_email)
      const data = await StoreCheckout.set(
        {
          Limit: 15,
        },
        { merge: true }
      )
    }
  }

  return new NextResponse(JSON.stringify({ id: event.data.object.id }), { status: 200 })
}
