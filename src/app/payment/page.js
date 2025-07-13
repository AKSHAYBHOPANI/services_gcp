"use client"
// import Form from "next/form "
import { useState, useEffect, useContext } from "react"
import Button from "../Components/Button"
import { UserContext } from "../context/userContext"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { loadStripe } from "@stripe/stripe-js"
import Confetti from "react-confetti"

export default function Payment() {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [message, setMessage] = useState()
  const [mobile, setMobile] = useState()
  const [service, setService] = useState()
  const [isSubmitted, setiSSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { profile, setProfile } = useContext(UserContext)
  const searchParams = useSearchParams()
  const status = searchParams.get("status") ?? ""
  const id = searchParams.get("session_id") ?? ""
  const payMode = searchParams.get("mode") ?? ""
  const [Height, setHeight] = useState(500)
  const [Width, setWidth] = useState(500)

  async function HandleSubmit(e) {
    setIsLoading(true)
    e.preventDefault()
    let body = {
      cred: process.env.NEXT_PUBLIC_CRED,
      email: email,
      mobile: mobile,
      when: new Date().toLocaleDateString(),
      message: message,
      name: name,
      service: service,
    }
    let res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(function (response) {
      console.info(response)
      setIsLoading(false)
      setiSSubmitted(true)
    })
  }

  useEffect(() => {
    if (profile) {
      setEmail(profile.email)
      setName(profile.name)
    }
  }, [profile])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHeight(window.height)
      setWidth(window.width)
    }
  }, [])

  console.log(profile)

  return (
    <div className="section">
      <div className="container" style={{ flexDirection: "column", justifyContent: "space-evenly" }}>
        {status === "success" ? (
          <div>
            <span style={{ display: "flex", gap: "10px" }}>
              <h1>Thank You, Payment Received</h1>
              <FontAwesomeIcon icon={faCircleCheck} style={{ width: "32px", height: "32px", color: "#f7da73" }}></FontAwesomeIcon>
            </span>
            <br />
            {payMode === "subscription" ? (
              <p>Thank you for shopping with The Tech Show. Your The Tech Show Pro membership benefits will be activated shortly. </p>
            ) : (
              <p>Thank you for shopping with The Tech Show. Someone from our team will reply to you shortly on email conversation we just sent you. </p>
            )}
            <br />
            <div style={{ display: "flex", gap: "5px" }}>
              {payMode === "subscription" ? (
                <Link href="/pro">
                  <button>Check Pro</button>
                </Link>
              ) : (
                <Link href="https://calendly.com/akshaybhopani/30min">
                  <button>Book Slot</button>
                </Link>
              )}
              <Link href="/contact">
                <button>Contact Us</button>
              </Link>
            </div>
            <Confetti width={Width} height={Height} tweenDuration={"100"} />
          </div>
        ) : (
          <div>
            <span style={{ display: "flex", gap: "10px" }}>
              <h1>Sorry, Payment Failed</h1>
              <FontAwesomeIcon icon={faCircleXmark} style={{ width: "32px", height: "32px", color: "#f7da73" }}></FontAwesomeIcon>
            </span>
            <br />
            <p>We regret to inform you that your payment failed and your order was not complete. If any money deducted from your account should be credited back in 7 working days. </p>
            <br />
            <div style={{ display: "flex", gap: "5px" }}>
              <Link href="/">
                <button>Try Again</button>
              </Link>
              <Link href="/contact">
                <button>Contact Us</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
