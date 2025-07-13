"use client"
import { useState, useEffect, useContext, createContext } from "react"
import Image from "next/image"
import Link from "next/link"
import "./navbar.css"
import Hamburger from "../../../assets/icons/Hamburger.svg"
import Brand from "../../../assets/icons/logo.png"
import Modal from "./Modal"
import { googleLogout, useGoogleLogin, GoogleLogin } from "@react-oauth/google"
import { UserContext } from "../context/userContext"
import { CartContext } from "../context/cartContext"
import Login from "../Components/login"
import Cart from "../Cart"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { db } from "../firebase"
import { getDoc, doc, setDoc, updateDoc, serverTimestamp, increment } from "firebase/firestore"

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  // const [profile, setProfile] = useState([])
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [user, setUser] = useState([])
  const { profile, setProfile } = useContext(UserContext)
  const { cartProducts, setCartProducts } = useContext(CartContext)
  const [count, setCount] = useState(0)
  const [Limit, setLimit] = useState(15)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openCartModal = () => {
    setIsCartModalOpen(true)
  }

  const closeCartModal = () => {
    setIsCartModalOpen(false)
  }

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
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
    closeModal()
    googleLogout()
    setProfile(null)
    setUser(null)
    localStorage.removeItem("user")
  }
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

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link href="/">
            <Image src={Brand} width={"100%"} height={49} alt="Brand" />
          </Link>
        </div>
        <span style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", alignItems: "center", gap: "17px" }}>
          <div className={`nav-elements  ${showNavbar && "active"}`}>
            <ul>
              <li>
                <Link onClick={handleShowNavbar} href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link onClick={handleShowNavbar} href="/ai">
                  AI Guide
                </Link>
              </li>
              <li>
                <Link onClick={handleShowNavbar} href="https://store.yourtechshow.com">
                  Store
                </Link>
              </li>
              <li>
                <Link onClick={handleShowNavbar} href="https://www.yourtechshow.com">
                  Blog
                </Link>
              </li>
              <li>
                <Link onClick={handleShowNavbar} href="https://downloads.yourtechshow.com">
                  Downloads
                </Link>
              </li>
              <li>
                <Link onClick={handleShowNavbar} href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link onClick={handleShowNavbar} href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {profile ? (
            <p style={{ position: "relative" }}>
              <img src={profile?.picture} alt="Profile picture" width={40} height={40} onClick={openModal} style={{ cursor: "pointer" }} />
              {profile?.Limit === 100 ? <sup style={{ position: "absolute", right: "-8px", backgroundColor: "rgb(245, 245, 247)", borderRadius: "5px", padding: "3px", top: "0px", fontSize: "9px" }}>{"Pro"}</sup> : ""}
            </p>
          ) : (
            <Login
              loading={loading}
              onClickFn={() => {
                setLoading(true)
                login()
              }}
            />
          )}

          <p style={{ position: "relative" }}>
            <FontAwesomeIcon onClick={openCartModal} icon={faCartShopping} style={{ width: "20px", height: "20px", cursor: "pointer", paddingRight: "5px" }}></FontAwesomeIcon>
            {cartProducts?.length ? <sup style={{ position: "absolute", right: "-0px", backgroundColor: "rgb(245, 245, 247)", borderRadius: "5px", padding: "3px", top: "-11px", fontSize: "9px" }}>{cartProducts?.length}</sup> : ""}
          </p>

          <div className="menu-icon" onClick={handleShowNavbar}>
            <Image src={Hamburger} width={30} height={30} alt="Hamburger" />
          </div>
        </span>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Profile</h2>
        <p>Your Tech Show Profile</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <b>Hola, {profile?.name + "."}.</b>
          <img src={profile?.picture} alt="Profile picture" width={80} height={80} />
        </div>
        <p>
          <br />
          <b>Id:</b> {profile?.id}
          <br /> <br />
          <b>First Name:</b> {profile?.given_name}
          <br /> <br />
          <b>Surname:</b> {profile?.family_name}
          <br /> <br />
          <b>Email:</b> {profile?.email}
          <br /> <br />
          <b>Verification:</b> {profile?.verified_email}
          <br /> <br />
          <b>Membership:</b> {profile?.Limit === 100 ? "Pro" : "Free"}
          <br />
          <br />
          <b>Validity:</b> {profile?.validity == "" ? "No Subscription" : profile?.validity + "" + (new Date() < new Date(profile?.validity) ? " (Valid)" : " (Expired)")}
          <br />
        </p>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
          <button className="button" onClick={logOut}>
            Log out
          </button>
        </div>
      </Modal>
      <Modal isOpen={isCartModalOpen} onClose={closeCartModal}>
        <Cart products={cartProducts} setProducts={setCartProducts} />
      </Modal>
    </nav>
  )
}
