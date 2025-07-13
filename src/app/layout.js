"use client"
import "./globals.css"
import Navbar from "./Components/navbar.js"
import Footer from "./Components/footer"
import { Libre_Franklin } from "next/font/google"
import React, { useEffect, useState, createContext, useContext } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { GoogleOAuthProvider } from "@react-oauth/google"
import ProgressBar from "./Components/ProgressBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleUp } from "@fortawesome/free-solid-svg-icons"
import UserContextProvider from "./context/userContext"
import CartContextProvider from "./context/cartContext"
import { Suspense } from "react"
const Font = Libre_Franklin({
  display: "swap",
  variable: "--font-default",
  subsets: ["latin"],
})

// export const metadata = {
//   title: "The Tech Show Media",
//   description: "Content Creation, Advertising, Blogs, Development and Hosting Services by The Tech Show Media",
// }
export default function RootLayout({ children }) {
  useEffect(() => {
    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
      initClassName: "aos-init", // class applied after initialization
      animatedClassName: "aos-animate", // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 1500, // values from 0 to 3000, with step 50ms
      easing: "ease", // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
    })
  }, [])
  const isBrowser = () => typeof window !== "undefined" //The approach recommended by Next.js

  function scrollToTop() {
    if (!isBrowser()) return
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = () => {
    // Show the button when the user scrolls down
    if (window.scrollY > 100) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll)

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  let clientID = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID
  // console.log("clientID", clientID)

  return (
    <GoogleOAuthProvider clientId={clientID}>
      <UserContextProvider>
        <CartContextProvider>
          <html lang="en">
            <body className={`${Font.variable}`}>
              <Suspense fallback={null}>
                <Navbar />
                {children}
                <Footer />
                <ProgressBar />
                <button className={`scrollToTopButton ${isVisible ? "visible" : ""}`} onClick={scrollToTop}>
                  <FontAwesomeIcon icon={faAngleUp} style={{ width: "22px", height: "32px" }} />
                </button>
              </Suspense>
            </body>
          </html>
        </CartContextProvider>
      </UserContextProvider>
    </GoogleOAuthProvider>
  )
}
