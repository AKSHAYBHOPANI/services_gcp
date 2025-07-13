// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server"
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// import { db } from "../firebase"

export async function POST(req, res) {
  req = await req.json()
  const { item } = req
  console.log("itemStripe", item)
  // const StoreCheckout = db.collection("bookings").doc(item.id)
  const redirectURL = "https://yourtechshow.com/payment"

  const transformedItem = {
    price_data: {
      currency: "inr",
      unit_amount: item.price * 100,
      product_data: {
        name: item.name,
        description: item.description,
        images: [item.image],
      },
    },
    quantity: item.quantity,
  }

  const transformedItemSubcription = {
    price: item.price === 99 ? "price_1QxMBlSCvFaRLDQmypJUTpFt" : "price_1QxMBlSCvFaRLDQmozo34E6K",
    quantity: item.quantity,
  }
  const reqPay = {
    // payment_method_types: ["card"],
    customer_email: item.email,
    line_items: item.mode === "payment" ? [transformedItem] : [transformedItemSubcription],
    mode: item.mode,
    invoice_creation: {
      enabled: true,
    },
    success_url: redirectURL + `?status=success&mode=${await item.mode}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: redirectURL + `?status=cancel&mode=${await item.mode}&session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      images: item.image,
    },
  }
  const reqSub = {
    // payment_method_types: ["card"],
    customer_email: item.email,
    line_items: item.mode === "payment" ? [transformedItem] : [transformedItemSubcription],
    mode: item.mode,

    success_url: redirectURL + `?status=success&mode=${await item.mode}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: redirectURL + `?status=cancel&mode=${await item.mode}&session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      images: item.image,
    },
  }
  const session = await stripe.checkout.sessions.create(item.mode === "payment" ? reqPay : reqSub)

  // const data = await StoreCheckout.set(
  //   {
  //     sessionid: session.id,
  //   },
  //   { merge: true }
  // )

  return new NextResponse(JSON.stringify({ id: session.id }))
}
