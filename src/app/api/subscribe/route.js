import { NextResponse } from "next/server"

export async function POST(req, res) {
  const body = await req.json()
  const { name, email, cred } = body

  if (cred === process.env.NEXT_PUBLIC_CRED) {
    const client = require("@mailchimp/mailchimp_marketing")

    client.setConfig({
      apiKey: process.env.MAILCHIMP_KEY,
      server: "us19",
    })
    const list_id = process.env.MAILCHIMP_ID
    try {
      const response = await client.lists.addListMember(list_id, {
        email_address: email,
        status: "pending",
        vip: false,
      })
      const body = await response
      console.log("Output", body)
      return NextResponse.json(body)
    } catch (error) {
      console.log("Error", error)
      return NextResponse.json(error, { status: 300 })
    }
  } else {
    return NextResponse.json("Not allowed", { status: 400 })
  }
}
