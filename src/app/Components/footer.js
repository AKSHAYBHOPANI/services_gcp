import Image from "next/image"
import Link from "next/link"
import Hamburger from "../../../assets/icons/Hamburger.svg"
import Brand from "../../../assets/icons/logo.png"
import { faFacebook, faTwitter, faTelegram, faDiscord, faFacebookMessenger, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect, useContext } from "react"
import Button from "./Button"

export default function Footer() {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [isSubmitted, setiSSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  async function HandleNewsletter(e) {
    setIsLoading(true)
    e.preventDefault()
    let body = {
      cred: process.env.NEXT_PUBLIC_CRED,
      email: email,
      name: name,
    }
    let res = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(async function (response) {
      const output = await response
      console.info(output.status)
      setIsLoading(false)
      setiSSubmitted(true)
      if (output.status === 200) {
        setEmail("Check your Email")
      } else {
        setEmail("Already Subscribed")
      }
    })
  }
  return (
    <footer>
      <div className="container">
        <Image src={Brand} width={100} height={60} alt="Brand" />

        <div className="footer-menu">
          <div>
            <h3>Blogs</h3>
            <ul>
              <li>
                <Link target="_blank" href="https://www.yourtechshow.com">
                  Blog
                </Link>
              </li>
              <li>
                <Link target="_blank" href="https://downloads.yourtechshow.com">
                  Downloads
                </Link>
              </li>
              <li>
                <Link target="_blank" href="https://medium.com/the-tech-show">
                  Medium
                </Link>
              </li>
              <li>
                <Link target="_blank" href="https://news.google.com/publications/CAAqBwgKMPGWqQsw46HBAw?ceid=IN:en&oc=3">
                  Tech News
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Shop</h3>
            <ul>
              <li>
                <Link target="_blank" href="https://store.yourtechshow.com">
                  Tech Store
                </Link>
              </li>
              <li>
                <Link target="_blank" href="https://www.amazon.in/shop/akshaybhopani">
                  Amazon Storefront
                </Link>
              </li>
              <li>
                <Link href="/pro">Pro Membership</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Pages</h3>
            <ul>
              <li>
                <Link target="_blank" href="https://newsletter.yourtechshow.com/subscribe">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms</Link>
              </li>
              <li>
                <Link href="/refund">Refund Policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: "12px" }}>Newsletter</h3>
            <ul>
              <p style={{ marginBottom: "5px", width: "160px" }}>Exclusive Tech Tips, Tech News and Tech Deals directly in your inbox.</p>
              <li style={{ display: "flex", gap: "3px" }}>
                <form className="newsLetter" onSubmit={(e) => HandleNewsletter(e)}>
                  <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                  <Button loading={isLoading}>
                    <FontAwesomeIcon icon={isSubmitted ? faEnvelopeCircleCheck : faEnvelope} style={{ width: "20px", height: "32px" }} />
                  </Button>
                </form>
              </li>
            </ul>
          </div>
          <div>
            <h3>Social</h3>
            <ul>
              <li style={{ display: "flex", gap: "3px" }}>
                <Link target="_blank" href="https://www.youtube.com/akshaybhopani?sub_confirmation=1">
                  <FontAwesomeIcon icon={faYoutube} style={{ width: "20px", height: "32px" }} />
                </Link>
                <Link target="_blank" href="https://www.facebook.com/thetechshowmedia">
                  <FontAwesomeIcon icon={faFacebook} style={{ width: "20px", height: "32px" }} />
                </Link>

                <Link target="_blank" href="https://twitter.com/ttsmgofficial">
                  <FontAwesomeIcon icon={faTwitter} style={{ width: "20px", height: "32px" }} />
                </Link>
                <Link target="_blank" href="https://m.me/thetechshowmedia">
                  <FontAwesomeIcon icon={faFacebookMessenger} style={{ width: "20px", height: "32px" }} />
                </Link>
                <Link target="_blank" href="https://discord.gg/uTddJYrS">
                  <FontAwesomeIcon icon={faDiscord} style={{ width: "20px", height: "32px" }} />
                </Link>
                <Link target="_blank" href="https://t.me/TTSMG">
                  <FontAwesomeIcon icon={faTelegram} style={{ width: "20px", height: "32px" }} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
