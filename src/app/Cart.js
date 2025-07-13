"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useContext } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { googleLogout, useGoogleLogin, GoogleLogin } from "@react-oauth/google"
import Button from "./Components/Button"
import Login from "./Components/login"
import { loadStripe } from "@stripe/stripe-js"
import { UserContext } from "./context/userContext"
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons"
import { db } from "./firebase"
import { getDoc, doc, setDoc, updateDoc, serverTimestamp, increment } from "firebase/firestore"

export default function Cart({ products, setProducts, isSubscription = false, noBookingAmt = false }) {
  const [user, setUser] = useState([])
  const { profile, setProfile } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState()
  const [message, setMessage] = useState("")
  const [mobile, setMobile] = useState()
  const [service, setService] = useState()
  const [isSubmitted, setiSSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [cartValue, setCartValue] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cartProducts, setCartProducts] = useState(products)
  const [count, setCount] = useState(0)
  const [Limit, setLimit] = useState(15)
  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

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
      cart: JSON.stringify(cartProducts),
      qty: cartProducts.length,
      price: cartValue,
    }
    let res = await fetch("/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(function (response) {})
    await HandleNewsletter()
    await createCheckOutSession(e)
  }

  const removeProduct = async (index) => {
    let temp = [...cartProducts]
    temp.splice(index, 1)
    setCartProducts(temp)
    setProducts(temp)
    console.log("removeproduct", index, temp, products)
  }
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse)
      localStorage.setItem("user", JSON.stringify(codeResponse))
      checkOAuth(codeResponse)
      setLoading(false)
    },

    onError: (error) => {
      console.log("Login Failed:", error)
      setLoading(false)
    },
  })

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout()
    setProfile(null)
    setUser(null)
    localStorage.removeItem("user")
  }

  async function HandleNewsletter() {
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
    })
  }
  let checkOAuth = async (user) => {
    if (user) {
      let response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: "application/json",
        },
      })
      if (response) {
        response = await response.json()
        console.log("response", response)
        if (response.id) {
          setProfile(response)
          const DocRef = doc(db, "users", await response.email)
          const docSnap = await getDoc(DocRef)
          // Check for User Count
          if (docSnap.exists()) {
            let userData = await docSnap.data()
            await setCount(await userData?.count)
            //Check Validity
            let valid = new Date() < new Date(userData?.validity)
            if (valid) {
              await setLimit(userData.Limit)
              await setProfile((prevState) => ({
                ...prevState,
                Limit: userData.Limit,
                validity: userData.validity,
              }))
            } else {
              await setLimit(15)
              await setProfile((prevState) => ({
                ...prevState,
                Limit: 15,
                validity: userData.validity,
              }))
            }
            console.log("Firestore Data", userData, "Expiry", userData.validity, "Current", new Date().toLocaleDateString(), valid)

            await updateDoc(DocRef, {
              count: userData.count,
              timestamp: serverTimestamp(),
              name: response.name,
              email: response.email,
              Limit: userData.Limit,
              validity: userData.validity,
            })
          } else {
            await setDoc(DocRef, {
              count: 0,
              timestamp: serverTimestamp(),
              name: response.name,
              email: response.email,
              Limit: 15,
              validity: "",
            })
          }
        } else {
          logOut()
        }
      } else {
        logOut()
      }
    }
  }
  useEffect(() => {
    if (profile) {
      setEmail(profile.email)
      setName(profile.name)
    }
  }, [profile])
  // useEffect(() => {
  //   checkOAuth()
  // }, [user])
  useEffect(() => {
    async function CheckLocalStorage() {
      if (localStorage.user) {
        let userParsedData = await JSON.parse(localStorage.user)
        await setUser(userParsedData)
        checkOAuth(userParsedData)
      }
    }
    CheckLocalStorage()
  }, [])

  useEffect(() => {
    let value
    let num = 0
    value = Array.prototype.map.call(cartProducts, (prod) => {
      num += Number(prod.value.split("₹").pop())
      return num
    })
    setitem({
      name: cartProducts[0]?.name,
      description: cartProducts[0]?.summary,
      image: "https://yourtechshow.com/logo.webp",
      quantity: cartProducts?.length.toString(),
      price: !isSubscription && !noBookingAmt ? "99" : num,
      date: new Date(),
      time: new Date().toLocaleTimeString(),
      cart: JSON.stringify(cartProducts),
      email: email,
      mode: !isSubscription ? "payment" : "subscription",
    })
  }, [cartProducts, profile])

  //Calculate Cart Pricing
  useEffect(() => {
    let num = 0
    let value
    let range
    const updateCartValue = async () => {
      value = Array.prototype.map.call(cartProducts, (prod) => {
        num += Number(prod.value.split("₹").pop())
        return num
      })
      range = " " + cartProducts[0]?.value?.split("-").shift().toString() + " - " + cartProducts[cartProducts.length - 1]?.value?.split("-").pop().toString()
      await setCartValue(!isSubscription && !noBookingAmt ? range : num)
    }
    updateCartValue()
    console.log("setCart", value, num, cartValue)
  }, [products, cartProducts])

  const [item, setitem] = useState({
    name: "",
    description: "",
    image: "https://yourtechshow.com/logo.webp",
    quantity: "",
    price: "",
    date: new Date(),
    time: new Date().toLocaleTimeString(),
    cart: "",
    email: email,
    // id: Id,
  })
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  const stripePromise = loadStripe(publishableKey)
  const createCheckOutSession = async (e) => {
    setLoading(true)
    e.preventDefault()
    //console.log("Item", item)

    const stripe = await stripePromise
    const checkoutSession = await fetch("/api/create-stripe-session", {
      method: "POST",
      body: JSON.stringify({ item: await item }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    let response = await checkoutSession.json()
    const result = await stripe.redirectToCheckout({
      sessionId: response.id,
    })
    if (result.error) {
      alert(result.error.message)
    }

    setLoading(false)
  }
  const createPaytmSession = async (e) => {
    setLoading(true)
    e.preventDefault()

    // await HandleSubmit("Pay Now")
    let data = {
      custId: "1234",
      mobile: "989898989898",
      email: "test@test.com",
      amount: "999",
    }

    console.log(data)
    await fetch("/api/create-paytm-session", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setToken(data.token)
        setMid(data.mid)
        setOrderId(data.orderId)
        setGotRes(true)
        setTimeout(() => {
          document.getElementById("redFrom").submit()
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
      })
    setLoading(false)
  }

  return (
    <>
      <h1>Let's Start</h1>
      <p>We will guide you through the process.</p>
      <br />
      {cartProducts?.length > 0 ? (
        <>
          {cartProducts?.map((prod, i) => (
            <>
              <div className="products">
                <FontAwesomeIcon id={prod?.id} icon={prod?.icon} style={{ width: "50px", height: "50px", color: "#f7da73" }}></FontAwesomeIcon>
                <span>
                  <h3>{prod?.name}</h3>
                  <p>{prod?.summary}</p>
                </span>
                <div className="productPrice">
                  <h4>{prod?.value}</h4>
                  <FontAwesomeIcon className="MinusIcon" id={prod?.id} icon={faCircleMinus} style={{ width: "20px", height: "20px", color: "#f7da73", cursor: "hover" }} onClick={() => removeProduct(i)}></FontAwesomeIcon>
                </div>
              </div>
            </>
          ))}
          <div style={{ textAlign: "right" }}>
            {!isSubscription && !noBookingAmt ? (
              <p className="cost">
                <sup>$</sup>Estimated Cost:{cartValue}
              </p>
            ) : (
              ""
            )}
            <p className="BookAmt">Booking Amount: ₹{!isSubscription && !noBookingAmt ? 99 * cartProducts?.length : cartValue}</p>
          </div>
          {!profile ? (
            <>
              <br />
              <br />
              <br />
              <div data-aos="fade-appear" data-aos-offset="400" style={{ display: "flex", alignItems: "center", columnGap: "5px", justifyContent: "center" }}>
                Let's get started,
                <Login
                  loading={loading}
                  onClickFn={() => {
                    setLoading(true)
                    login()
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div data-aos="fade-appear" data-aos-offset="400" style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
                <form className="CartForm" onSubmit={(e) => HandleSubmit(e)}>
                  {/* <img src={profile.picture} alt="Profile picture" width={50} height={50} /> */}
                  <input name="name" type="name" placeholder="Name" autoFocus required onChange={(e) => setName(e.target.value)} value={name} />
                  <input name="email" type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} value={email} />
                  <input name="mobile" type="mobile" maxLength={13} placeholder="Mobile" required onChange={(e) => setMobile(e.target.value)} />
                  <input name="message" type="text" placeholder="One liner for what you want to build / create?" max={14} min={10} value={message} onChange={(e) => setMessage(e.target.value)} />
                  {/* <label for="cars">Choose Payment Type:</label>
                <select name="services" id="service" required onChange={(e) => setService(e.target.value)}>
                  <option value="Content Marketing">Pay Booking Amount - ₹99</option>
                  <option value="Website Development">Pay 10%</option>
                  <option value="Hosting">Pay 20%</option>
                  <option value="Tech Support">Pay Full</option>
                </select> */}
                  {/* <button type="submit">Submit</button> */}
                  <div style={{ display: "flex", padding: "5px" }}>
                    <Button loading={isLoading} type="submit" children={"Pay Now"} />
                    <Button className="button" onClickFn={logOut} children={"Log out"} />
                  </div>
                </form>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <div className="disclaimer">
                <sup>@</sup>Booking Amount is non refundable. We take this to keep away spammers and only deal with customers that actually are interested in our services.
                <br />
                <sup>$</sup>Estimated price can change and you pay with "pay as you go model" as your service progresses.
                <br />
                We automatically add you to our Mailing List once you proceed to payment so we can loop you with offers and announcements. But you can always opt out through the email you receive from mailchimp.
                <br />
                Once you complete the payment, you will receive a mail from us for next steps and scheduling a requirement understanding call.
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignContent: "center", alignItems: "center", height: "300px", gap: "15px" }}>
            <p>Your Cart is Empty. Add a Service first.</p>
            <Link href={"https://yourtechshow.com"}>
              <Button onClick={() => closeModal()} loading={isLoading} type="submit" children={"Browse Now"} />
            </Link>
          </div>
        </>
      )}
    </>
  )
}
