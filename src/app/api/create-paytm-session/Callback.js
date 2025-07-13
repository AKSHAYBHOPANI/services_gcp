import { db } from "../firebase"
import nodemailer from "nodemailer"
const redirectURL = process.env.NODE_ENV === "development" ? "http://localhost:3000/Booking" : "https://beta.shilpwellness.com/Booking"
async function callback(req, res) {
  if (req.method === "POST") {
    // res.send(req.body)

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILID, // generated ethereal user
        pass: process.env.MAILPASS, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    const Response = req.body
    const StoreCheckout = db.collection("payments").doc(Response.TXNID)
    // Successfully constructed event
    //console.log("✅ Success:", event)

    // 2. Handle event type (add business logic here)
    if (Response.STATUS === "TXN_SUCCESS") {
      //console.log(`💰  Payment received!`)

      const data = await StoreCheckout.set({
        gateway: "Paytm",
        payment: "paid",
        email: req.query.email,
        amount: Response.TXNAMOUNT,
        paytm: Response,
        date: new Date().toString(),
      })

      let info = await transporter.sendMail({
        from: process.env.MAILID, // sender address
        to: req.query.email, // list of receivers
        subject: "Payment Success ✔", // Subject line
        text: "Thank you for your Payment", // plain text body
        html: "<b>Payment Success ✅</b><br/><p>Our Team will Confirm your order soon. You will receive an email when your booking is confirmed. You can also check booking status in your <a href=`https://shilpwellness.com/MyAccount`>Shilp Account</a>.</p>", // html body
      })

      //console.log("Message sent: %s", info.messageId)
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      // //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
      res.redirect(302, redirectURL + `?status=success&session_id=${Response.TXNID}`)
    } else {
      console.warn(Response)

      const data = await StoreCheckout.set({
        gateway: "Paytm",
        paytm: Response,
        payment: "unpaid",
        // email: event.data.object.address.email,
        // name: event.data.object.address.name,
        // amount: event.data.object.amount_total,
        date: new Date().toString(),
      })

      let info = await transporter.sendMail({
        from: process.env.MAILID, // sender address
        to: req.query.email, // list of receivers
        subject: "Payment Failed ❌", // Subject line
        text: "Sorry, we did not received your Payment", // plain text body
        html: "<b>Payment Failed ❌</b><br/><p>If money was deducted from your bank then it should be refunded back in 48hrs. You can also check booking status in your <a href=`https://shilpwellness.com/MyAccount`>Shilp Account</a>.</p>", // html body
      })

      //console.log("Message sent: %s", info.messageId)
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      // //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
      // 3. Return a response to acknowledge receipt of the event.
    }

    // res.json({ received: true })
    res.redirect(302, redirectURL + `?status=cancel&session_id=${Response.TXNID}`)
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}

export default callback
