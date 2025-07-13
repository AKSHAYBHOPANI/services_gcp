// Import `GoogleGenerative` from the package we installed earlier.
import { NextResponse } from "next/server"
import { headers } from "next/headers"
// Create an asynchronous function POST to handle POST
// request with parameters request and response.
export async function POST(req, res) {
  try {
    //Fetch RSS Feed
    var rss = await fetch("https://www.yourtechshow.com/feeds/posts/default?alt=rss", {
      headers: { "Access-Control-Allow-Origin": "*" }, // Forward the authorization header
    })

    var response = await rss.text()
    console.log(response)
    //Send XLM to Front End
    return new NextResponse(response, { headers: { "Content-Type": "text/xml" } })
  } catch (error) {
    console.error(error)
  }
}
