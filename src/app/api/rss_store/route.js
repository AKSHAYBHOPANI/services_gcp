// Import `GoogleGenerative` from the package we installed earlier.
import { NextResponse } from "next/server"
import { headers } from "next/headers"
// Create an asynchronous function POST to handle POST
// request with parameters request and response.
export async function POST(req, res) {
  try {
    var rss = await fetch("https://store.yourtechshow.com/?feed=products", {
      headers: { "Access-Control-Allow-Origin": "*" }, // Forward the authorization header
    })
    var response = await rss.text()
    console.log(response)
    return new NextResponse(response, { headers: { "Content-Type": "text/xml" } })
  } catch (error) {
    console.error(error)
  }
}
