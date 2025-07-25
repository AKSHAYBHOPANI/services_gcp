import https from "https"
import PaytmConfig from "./config"
import PaytmChecksum from "./PaytmChecksum"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { NextResponse } from "next/server"

export async function POST(req, res) {
  req = await req.json()
  if (req.custId) {
    var reqBody = req
    var orderId = "RSGI" + Math.floor(Math.random(6) * 1000000)
    var amount = reqBody.amount
    var callbackUrl = `https://beta.shilpwellness.com/api/create-paytm-session/Callback?email=${reqBody.email}`
    var userInfo = {
      custId: reqBody.custId, // CLIENT CUSTOMER ID
      mobile: reqBody.mobile,
      email: reqBody.email,
    }
    const paytmParams = {}

    paytmParams.body = {
      requestType: "Payment",
      mid: PaytmConfig.PaytmConfig.mid,
      websiteName: PaytmConfig.PaytmConfig.website,
      orderId: orderId,
      callbackUrl: callbackUrl,
      txnAmount: {
        value: amount,
        currency: "INR",
      },
      userInfo: userInfo,
    }
    console.log(paytmParams)
    PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), PaytmConfig.PaytmConfig.key).then(function (checksum) {
      paytmParams.head = {
        signature: checksum,
      }

      var post_data = JSON.stringify(paytmParams)

      var options = {
        /* for Staging */
        hostname: "securegw-stage.paytm.in",

        /* for Production */
        // hostname: 'securegw.paytm.in',

        port: 443,
        path: `/theia/api/v1/initiateTransaction?mid=${PaytmConfig.PaytmConfig.mid}&orderId=${orderId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": post_data.length,
        },
      }

      var response = ""
      var post_req = https.request(options, function (post_res) {
        post_res.on("data", function (chunk) {
          response += chunk
        })

        post_res.on("end", function () {
          response = JSON.parse(response)
          console.log("txnToken:", response)

          return new NextResponse(JSON.stringify({ mid: PaytmConfig.PaytmConfig.mid, orderId: orderId, token: response.body.txnToken }))
        })
      })

      post_req.write(post_data)
      post_req.end()
    })
  } else {
    return new NextResponse(req.body)
  }
}
