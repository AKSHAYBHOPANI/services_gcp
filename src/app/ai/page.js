"use client"
import Image from "next/image"
import TechStore from "../../../assets/store/store.svg"
import Link from "next/link"
import { useState, useEffect, useContext } from "react"
import { googleLogout, useGoogleLogin, GoogleLogin } from "@react-oauth/google"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faIdBadge } from "@fortawesome/free-solid-svg-icons"
import Loader from "../../../assets/icons/Loader.svg"
import Login from "../Components/login"
import Button from "../Components/Button"
import Typewriter from "typewriter-effect"
var markdown = require("markdown").markdown
import { db } from "../firebase"
import { getDoc, doc, setDoc, updateDoc, serverTimestamp, increment } from "firebase/firestore"
import styles from "../page.module.css"
import Modal from "../Components/Modal"
import { UserContext } from "../context/userContext"
import Looking from "../../../assets/store/looking.svg"
import LookingNew from "../../../assets/store/LookingNew.svg"
import AskMe from "../../../assets/store/AskMe.svg"

export default function Store() {
  const [user, setUser] = useState([])
  const { profile, setProfile } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [loadingURL, setLoadingURL] = useState(false)
  const [loadingBuy, setLoadingBuy] = useState(false)
  const [loadingAMA, setLoadingAMA] = useState(false)
  const [url, setURL] = useState("")
  const [buy, setBuy] = useState("")
  const [ama, setAma] = useState("")
  const [RSSData, setRSSData] = useState("")
  const [count, setCount] = useState(0)
  const [Limit, setLimit] = useState(15)
  const [validity, setValidity] = useState("")

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

  const AddCount = async () => {
    const DocRef = doc(db, "users", profile.email)
    console.log("Add Count")
    // Atomically increment the count of the call by 1.
    await updateDoc(DocRef, {
      count: increment(1),
    })
    setCount((prev) => prev + 1)
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

  //Parse RSS from string when received from Server
  function parseRSS(rssText) {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(rssText, "text/xml")
    return xmlDoc
  }

  //Get RSS Feeds
  const callRSS = async () => {
    var rss = await fetch("/api/rss_blog", {
      method: "POST",
    })
    rss = parseRSS(await rss.text())
    var rss2 = await fetch("/api/rss_store", {
      method: "POST",
    })
    rss2 = parseRSS(await rss2.text())
    console.log("rss", rss, rss2)

    //Extract Items from RSS XML
    function extractFeedItems(xmlDoc) {
      const items = xmlDoc.getElementsByTagName("item")
      const feedItems = []

      for (let i = 0; i < items.length; i++) {
        console.log("Items Blog", items[i])
        const title = items[i].getElementsByTagName("title")[0].textContent
        const link = items[i].getElementsByTagName("link")[0].textContent
        const pubDate = items[i].getElementsByTagName("pubDate")[0]?.textContent
        feedItems.push({ title, link, pubDate })
      }

      return feedItems
    }
    function extractFeedItemsStore(xmlDoc) {
      const items = xmlDoc.getElementsByTagName("item")
      const feedItems = []

      for (let i = 0; i < items.length; i++) {
        console.log("Items", items[i].getElementsByTagName("g:link")[0]?.textContent)
        const title = items[i].getElementsByTagName("g:title")[0].textContent
        const link = items[i].getElementsByTagName("g:link")[0]?.textContent
        const description = items[i].getElementsByTagName("g:description")[0].textContent
        feedItems.push({ title, link, description })
      }

      return feedItems
    }

    // Convert Data into JS Object
    let rssFeed = await extractFeedItems(rss)
    let rssFeed2 = await extractFeedItemsStore(rss2)

    let rssCombinedFeed = []
    rssCombinedFeed.push(await rssFeed)
    rssCombinedFeed[0].push(await rssFeed2[0])
    console.log("rss feed", rssFeed, rssCombinedFeed)
    setRSSData(rssCombinedFeed[0])
  }

  const ShouldIBuy = `You are a Tech Reviewer and The Tech Show Representative. Summarise 5 pros and 5 cons for ${url} and at the end summarise reviews. Should I buy it?`

  const LookingToBuy = `You are a Tech Reviewer and The Tech Show Representative. I am Looking to buy ${buy}. Summarise 5 pros and 5 cons and at the end summarise reviews also let me know latest model and news for the same.`

  const AskMeAnything = `You are a Tech Reviewer and The Tech Show Representative. Answer my question about - ${ama} with your knowledge. At the end Pull relevant "title" and "link" from this json data - ${JSON.stringify(RSSData)} and give it title as "Similar from The Tech Show"`

  const [output, setOutput] = useState("This is a nextjs project.")
  const [ShouldIBuyOutput, setShouldIBuyOutput] = useState("")
  const [LookingToBuyOutput, setLookingToBuyOutput] = useState("")
  const [AskMeAnythingOutput, setAskMeAnythingOutput] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProModalOpen, setIsProModalOpen] = useState(false)
  const openModal = () => {
    setIsModalOpen(true)
  }

  const openProModal = () => {
    setIsProModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  const closeProModal = () => {
    setIsProModalOpen(false)
  }

  // Define an asynchronous function to send POST request to our api
  const AskGemini = async (prompt, target) => {
    const DocRef = doc(db, "users", profile.email)
    const docSnap = await getDoc(DocRef)

    // Check for User Count
    if (docSnap.exists()) {
      let userData = await docSnap.data()
      if (userData.count > Limit - 1) {
        console.log("Calls Exausted")
        setLoadingAMA(false)
        setLoadingBuy(false)
        setLoadingURL(false)
        openProModal()
        return
      } else {
        try {
          //Manage Count
          AddCount()
          // use the fetch method to send an http request to /api/generate endpoint
          let body = {
            cred: process.env.NEXT_PUBLIC_CRED,
            email: profile.email,
            question: prompt,
          }
          const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          })
          // Waits for the response to be converted to JSON format and stores it in the data variable
          const data = await response.json()
          //  If successful, updates the output state with the output field from the response data
          if (response.ok) {
            target(data.output)
            setLoadingAMA(false)
            setLoadingBuy(false)
            setLoadingURL(false)
          } else {
            target(data.error)
            setLoadingAMA(false)
            setLoadingBuy(false)
            setLoadingURL(false)
          }
          // Catches any errors that occur during the fetch request
        } catch (error) {
          console.error("Error:", error)
        }
      }
      console.log("Document data:", userData)
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!")
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {!profile ? (
          <div className="section">
            <meta name="google-signin-client_id" content="162005600249-akc9i5g7r66r79stsges5e85po2227he.apps.googleusercontent.com"></meta>
            <div className="container">
              <div style={{ width: "100%" }}>
                <h2>A revolutionary new way to SHOP Tech.</h2>
                <p>Get Review summarizations, recommendations and answer to your queries.</p>
                <br />
                <div data-aos="fade-up" data-aos-offset="400" style={{ display: "flex", alignItems: "center", columnGap: "5px" }}>
                  Let's get started,
                  <Login
                    loading={loading}
                    onClickFn={() => {
                      setLoading(true)
                      login()
                    }}
                  />
                </div>
              </div>
              <div data-aos="fade-left">
                <Image src={TechStore} width={"50%"} height={200} alt="Store" />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="section">
              <div className="container">
                <div style={{ width: "100%" }}>
                  {/* <img src={profile.picture} alt="user image" />
                <h3>User Logged in</h3>
                <p>Name: {profile.name}</p>
                <p>Email Address: {profile.email}</p>
                <br />
                <br /> */}
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignContent: "center", alignItems: "center" }}>
                      <span>
                        Welcome, {profile.name + "."} Let's Get Started.
                        {/* <img src={profile.picture} alt="Profile picture" width={50} height={50} /> */}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignContent: "center", alignItems: "center", gap: "5px" }}>
                      Query: {count + "/ " + Limit}
                      <button className="button" onClick={openProModal}>
                        {profile?.Limit === 100 ? "Pro" : "Go Pro"}
                      </button>
                    </div>
                    {/* <FontAwesomeIcon icon={faIdBadge} style={{ width: "30px", height: "30px", color: "#f7da73" }}></FontAwesomeIcon> */}
                    {/* <img src={profile.picture} alt="Profile picture" width={50} height={50} onClick={openModal} style={{ cursor: "pointer" }} /> */}
                  </div>
                  <br />
                  <div className="container" style={{ padding: "15px 0px" }}>
                    <div style={{ width: "100%" }}>
                      <h2>Looking to Buy Something?</h2>
                      <p>We will share Pros, Cons and Review Summarization of your choosen product.</p>
                    </div>
                    <div data-aos="fade-left" style={{ padding: "15px 0px" }}>
                      <Image src={Looking} width={"50%"} height={200} alt="Store" />
                    </div>
                  </div>
                  <br />
                  <input className="whiteBG" placeholder="Paste Product Link Here" type="URL" onChange={(input) => setURL(input.target.value)}></input>
                  {/* <button onClick={() => AskGemini(ShouldIBuy, setShouldIBuyOutput)}>Check</button>
              {<Markdown className="Markdown">{ShouldIBuyOutput}</Markdown>} */}
                  <Button
                    onClickFn={async () => {
                      setLoadingURL(true)
                      AskGemini(ShouldIBuy, setShouldIBuyOutput)
                    }}
                    loading={loadingURL}
                  >
                    Should you buy
                  </Button>
                  <br />
                  <br />
                  {ShouldIBuyOutput ? (
                    <section className="Markdown">
                      <Typewriter
                        options={{
                          strings: markdown.toHTML(ShouldIBuyOutput),
                          autoStart: true,
                          delay: 25,
                        }}
                      />
                    </section>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="section">
              <div className="container">
                <div style={{ width: "100%" }}>
                  <div className="container" style={{ padding: "15px 0px" }}>
                    <div style={{ width: "100%" }}>
                      <h2>Looking for New Product?</h2>
                      <p>We will share Pros, Cons, Review Summarization of your choosen product and News related to your product</p>
                    </div>
                    <div data-aos="fade-left" style={{ padding: "15px 0px" }}>
                      <Image src={LookingNew} width={"50%"} height={200} alt="Store" />
                    </div>
                  </div>
                  <br />
                  <input placeholder="I am looking for.." type="txt" onChange={(input) => setBuy(input.target.value)}></input>
                  {/* <button onClick={() => AskGemini(LookingToBuy, setLookingToBuyOutput)}>Should you buy</button>
              {<Markdown>{LookingToBuyOutput}</Markdown>} */}
                  <Button
                    onClickFn={async () => {
                      setLoadingBuy(true)
                      AskGemini(LookingToBuy, setLookingToBuyOutput)
                    }}
                    loading={loadingBuy}
                  >
                    Should you buy
                  </Button>
                  <br />
                  <br />
                  {LookingToBuyOutput ? (
                    <section className="Markdown">
                      <Typewriter
                        options={{
                          strings: markdown.toHTML(LookingToBuyOutput),
                          autoStart: true,
                          delay: 25,
                        }}
                      />
                    </section>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="section">
              <div className="container">
                <div style={{ width: "100%" }}>
                  <div className="container" style={{ padding: "15px 0px" }}>
                    <div style={{ width: "100%" }}>
                      <h2>Ask me anything in tech</h2>
                      <p>Ask your tech related questions and we will share possiible solutions for the same.</p>
                    </div>
                    <div data-aos="fade-left" style={{ padding: "15px 0px" }}>
                      <Image src={AskMe} width={"50%"} height={200} alt="Store" />
                    </div>
                  </div>

                  <br />
                  <input className="whiteBG" placeholder="How to fix this.." type="text" onChange={(input) => setAma(input.target.value)}></input>
                  <Button
                    onClickFn={async () => {
                      setLoadingAMA(true)
                      await callRSS()
                      AskGemini(AskMeAnything, setAskMeAnythingOutput)
                    }}
                    loading={loadingAMA}
                  >
                    Answer
                  </Button>
                  <br />
                  <br />
                  {AskMeAnythingOutput ? (
                    <section className="Markdown">
                      <Typewriter
                        options={{
                          strings: markdown.toHTML(AskMeAnythingOutput),
                          autoStart: true,
                          delay: 25,
                        }}
                      />
                    </section>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </>
        )}
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
          </p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
            <button className="button" onClick={logOut}>
              Log out
            </button>
          </div>
        </Modal>
        <Modal isOpen={isProModalOpen} onClose={closeProModal}>
          <h2>{profile?.Limit === 100 ? "You are PRO" : "Go PRO"}</h2>
          <p>{profile?.Limit === 100 ? "Get More Unmetered Query's" : "Get More Query's"}</p>
          <br />
          Query: {count + "/ " + Limit}
          <br />
          <br />
          {profile?.Limit === 100 ? (
            <p>
              You get 100 query's with Pro Plan. Contact us for more query's and
              <br /> we will increase it for you to meet your needs.
            </p>
          ) : (
            <p>
              You get limited query's with Free Plan. Upgrade for more query's and
              <br /> host of other benifits like priority tech support and whatsapp community.
            </p>
          )}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "15px", alignContent: "center" }}>
            {profile?.Limit === 100 ? (
              <Link href="/contact">
                <button className="button">Contact</button>
              </Link>
            ) : (
              <Link href="/pro">
                <button className="button">Get Pro</button>
              </Link>
            )}
          </div>
        </Modal>
      </main>
    </div>
  )
}
