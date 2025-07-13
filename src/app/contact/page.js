"use client"
// import Form from "next/form "
import { useState, useEffect, useContext } from "react"
import Button from "../Components/Button"
import { googleLogout, useGoogleLogin, GoogleLogin } from "@react-oauth/google"
import { UserContext } from "../context/userContext"
import Login from "../Components/login"
import { faSquareWhatsapp, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { db } from "../firebase"
import { getDoc, doc, setDoc, updateDoc, serverTimestamp, increment } from "firebase/firestore"
import { CartContext } from "../context/cartContext"

export default function Contact() {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [message, setMessage] = useState()
  const [mobile, setMobile] = useState()
  const [service, setService] = useState()
  const [isSubmitted, setiSSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { profile, setProfile } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState([])
  const { cartProducts, setCartProducts } = useContext(CartContext)
  const [count, setCount] = useState(0)
  const [Limit, setLimit] = useState(15)
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

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log("Login Contact", codeResponse)
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

  // console.log(profile)

  return (
    <div className="section" style={{ height: "unset" }}>
      <div className="container" style={{ flexWrap: "wrap", justifyContent: "space-evenly" }}>
        <div className="text">
          <h1>Contact</h1>
        </div>
        <div className="contact-form">
          <>
            {profile ? (
              <>
                {!isSubmitted ? (
                  <>
                    {profile?.Limit === 100 ? (
                      <div>
                        <p>
                          Thank you for being a Pro Member, you can skip the queue and get direct support. Just drop in a message in our Private Group and someone will be available for your help as early as possible.
                          <sup style={{ backgroundColor: "rgb(245, 245, 247)", borderRadius: "5px", padding: "3px", fontSize: "9px" }}>{"Pro"}</sup>
                        </p>
                        <br />
                        <div style={{ display: "flex", gap: "10px" }}>
                          <Link target="_blank" href="https://chat.whatsapp.com/Ju9OHOLrpZQ5IiokWm70Wm">
                            <FontAwesomeIcon icon={faSquareWhatsapp} style={{ width: "32px", height: "32px", color: "#f7da73", cursor: "pointer" }}></FontAwesomeIcon>
                          </Link>
                          <Link target="_blank" href="mailto:info@yourtechshow.com?cc=akshaybhopani@gmail.com">
                            <FontAwesomeIcon icon={faEnvelope} style={{ width: "32px", height: "32px", color: "#f7da73", cursor: "pointer" }}></FontAwesomeIcon>
                          </Link>
                          <Link target="_blank" href="tel:9769434383">
                            <FontAwesomeIcon icon={faPhone} style={{ width: "28px", height: "28px", color: "#f7da73", cursor: "pointer" }}></FontAwesomeIcon>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={(e) => HandleSubmit(e)}>
                        <input name="name" type="name" placeholder="Name" autoFocus required onChange={(e) => setName(e.target.value)} value={name} />
                        <input name="email" type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} value={email} />
                        <input name="mobile" type="number" placeholder="Mobile" required maxLength={13} onChange={(e) => setMobile(e.target.value)} />
                        <input name="message" type="text" placeholder="Message" max={14} min={10} onChange={(e) => setMessage(e.target.value)} />
                        <label style={{ paddingLeft: "5px" }} for="cars">
                          Choose a Request Type:
                        </label>

                        <select name="services" id="service" required onChange={(e) => setService(e.target.value)}>
                          <option value="Content Marketing">Media</option>
                          <option value="Website Development">Development</option>
                          <option value="Hosting">Hosting</option>
                          <option value="Hosting">Pro Membership</option>
                          <option value="Tech Support">Tech Support</option>
                        </select>
                        {/* <button type="submit">Submit</button> */}
                        <Button loading={isLoading} type="submit" children={"Submit"} />
                      </form>
                    )}
                  </>
                ) : (
                  <p>Thank you for submitting your request. Someone from our team will reply to you shortly on email conversation we just sent you. </p>
                )}
              </>
            ) : (
              <div>
                You need to Sign in to fill the Contact Form. Pro members have direct access and they do not need to fill the form for support.
                <br />
                <br />
                <Login
                  loading={loading}
                  onClickFn={() => {
                    setLoading(true)
                    login()
                  }}
                />
              </div>
            )}
            <br />
            <br />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d942.1247039239646!2d72.93623306957993!3d19.173403598878217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b8f870fe24e7%3A0xa974a6949c49d046!2sThe%20Tech%20Show%20Media%20Group!5e0!3m2!1sen!2sin!4v1735117427341!5m2!1sen!2sin"
              width="400"
              height="350"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </>
        </div>
        <br />
      </div>
      <br /> <br />
    </div>
  )
}
