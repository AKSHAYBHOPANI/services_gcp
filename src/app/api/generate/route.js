// Import `GoogleGenerative` from the package we installed earlier.
import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"
import { db } from "../firebase"

// Create an asynchronous function POST to handle POST
// request with parameters request and response.
export async function POST(req, res) {
  const body = await req.json()
  const { cred, email, question } = body

  if (cred === process.env.NEXT_PUBLIC_CRED) {
    const docRef = db.collection("users").doc(email)
    const docSnap = await docRef.get()
    const data = docSnap.data()
    // console.log("Gemini Inputs", email, data.count, data.Limit)
    if (docSnap.exists && data.count <= data.Limit) {
      console.log("Document data:", docSnap.data())

      try {
        // Access your API key by creating an instance of GoogleGenerativeAI we'll call it GenAI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

        // Ininitalise a generative model
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

        // Retrieve the data we recieve as part of the request body
        // const data = await req.json()

        // Define a prompt varibale
        const prompt = question

        // Pass the prompt to the model and retrieve the output
        const result = await model.generateContent(prompt)
        const response = await result.response
        const output = await response.text()

        // Send the llm output as a server reponse object
        return NextResponse.json({ output: output })
      } catch (error) {
        console.error(error)
      }
    } else {
      return NextResponse.json("Not allowed", { status: 400 })
    }
  }
}
