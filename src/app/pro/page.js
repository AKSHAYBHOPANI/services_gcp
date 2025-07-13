"use client"
// import Form from "next/form "
import Image from "next/image"
import { useState, useEffect, useContext } from "react"
import Button from "../Components/Button"
import { loadStripe } from "@stripe/stripe-js"
import Whatsapp from "../../../assets/pro/TechShow_Whatsapp.png"
import Investors from "../../../assets/pro/Investors_Whatsapp.png"
import Gaming from "../../../assets/pro/Gaming_Whatsapp.png"
import FreeCall from "../../../assets/pro/FreeCall.png"
import UnmeteredQuery from "../../../assets/pro/UnmeteredQuery.png"
import Support from "../../../assets/pro/Support.png"
import { collection } from "firebase/firestore"
import { Slider, swiperIndex, SwiperSlide } from "../Components/Slider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode, faVideo, faCartPlus } from "@fortawesome/free-solid-svg-icons"
import { CartContext } from "../context/cartContext"
import Modal from "../Components/Modal"
import Cart from "../Cart"
import Link from "next/link"
import CallWithAkshay from "../../../assets/home/Call_With_Akshay.svg"
import { UserContext } from "../context/userContext"
import { faSquareWhatsapp, faWhatsapp } from "@fortawesome/free-brands-svg-icons"

const Pricing = ({ addToCart }) => {
  return (
    <section className="plans__container">
      <div className="plans">
        <div className="planItem__container">
          {/* <!--free plan starts --> */}
          <div className="planItem planItem--free">
            <div className="card">
              <div className="card__header">
                <div className="card__icon symbol symbol--rounded"></div>
                <h2>Monthly</h2>
              </div>
              <div className="card__desc">Priority Tech Support, Unmetered Tech Store Queries and Private Community.</div>
            </div>

            <div className="price">
              ₹99<span>/ monthly</span>
            </div>

            <ul className="featureList">
              <li>100 Tech Store Queries</li>
              <li>Access to Whatsapp Community</li>
              <li>Priority Tech Support</li>
              <li className="disabled">Free 1:1 Call with Akshay</li>
            </ul>

            <Button className="button" style={{ width: "100%" }} onClickFn={() => addToCart(0)}>
              <FontAwesomeIcon icon={faCartPlus} style={{ width: "20px", height: "20px", cursor: "hover", paddingRight: "5px" }}></FontAwesomeIcon>
              Add to Cart
            </Button>
          </div>
          {/* <!--free plan ends --> */}

          {/* <!--pro plan starts --> */}
          <div className="planItem planItem--pro">
            <div className="card">
              <div className="card__header">
                <div className="card__icon symbol"></div>
                <h2>Yearly</h2>
                <div className="card__label label">Best Value</div>
              </div>
              <div className="card__desc">Priority Tech Support, Unmetered Tech Store Queries and Private Community.</div>
            </div>

            <div className="price">
              ₹1089<span>/ yearly</span>
            </div>

            <ul className="featureList">
              <li>100 Tech Store Queries</li>
              <li>Access to Whatsapp Community</li>
              <li>Priority Tech Support</li>
              <li>Free 1:1 Call with Akshay</li>
              <li>Pay for 11 Months get 1 Month Free</li>
            </ul>

            <Button className="button button--pink" style={{ width: "100%" }} onClickFn={() => addToCart(1)}>
              <FontAwesomeIcon icon={faCartPlus} style={{ width: "20px", height: "20px", cursor: "hover", paddingRight: "5px" }}></FontAwesomeIcon>
              Add to Cart
            </Button>
          </div>
          {/* <!--pro plan ends --> */}
        </div>
      </div>
    </section>
  )
}
export default function Pro() {
  const [loading, setLoading] = useState(false)
  const [mid, setMid] = useState(undefined)
  const [orderId, setOrderId] = useState(undefined)
  const [gotRes, setGotRes] = useState(false)
  const { profile, setProfile } = useContext(UserContext)
  const [item, setitem] = useState({
    name: "Akshay b",
    description: "Book a 1:1 call with Akshay",
    image: "https://shilpwellness.com/logo.webp",
    quantity: 1,
    price: "99",
    date: "11/03/2024",
    time: "11:24pm",
    email: "test@test.com",
    // id: Id,
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [products, setProducts] = useState([
    { id: 9, icon: faVideo, name: "Pro - Monthly", value: "₹99", summary: "Priority Tech Support, Unmetered Tech Store Queries and Private Community." },
    { id: 10, icon: faVideo, name: "Pro - Yearly", value: "₹1089", summary: "Priority Tech Support, Unmetered Tech Store Queries and Private Community." },
  ])
  const { cartProducts, setCartProducts } = useContext(CartContext)
  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  const stripePromise = loadStripe(publishableKey)
  const createCheckOutSession = async (e) => {
    setLoading(true)
    e.preventDefault()
    //console.log("Item", item)

    const stripe = await stripePromise
    const checkoutSession = await fetch("/api/create-stripe-session", {
      method: "POST",
      body: JSON.stringify({ item: item }),
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

  const addToCart = (index) => {
    var temp = [...cartProducts]
    // Check if Product Exist
    if (!(temp[index]?.id === products[index]?.id)) {
      temp.push(products[index])
      setCartProducts(temp)
    }
    openModal()
    console.log("addToCart", products, index, temp, temp[index]?.id, products[index]?.id)
  }
  return (
    <>
      <div className="Intro main pro">
        <div className="text" style={{ color: "white", padding: "15px", position: "absolute", top: "4rem" }}>
          <h1>Pro</h1>
          <p>The Tech Show Pro Membership</p>
        </div>
        {/* <section className="intro" style={{ display: "block", width: "50%" }}>
          <div className="macintosh">
            <svg className="mac-hello" version="1.1" x="0px" y="0px" viewBox="0 0 885 479">
              <path
                className="st0"
                d="M17,301c0,0,78-63,107-124s32-125,29-143s-20-27-40,0c-6.1,8.2-49.9,73.3-45.5,165.5c7,148,1,175-13,224
            c-5,14,0,0,0,0s34-95,50-130c7-15,12-25,24.7-23.7c12.3,0.7,17.3,8.7,20.3,21.7c6,26-2,97,45,89c11.4-1.9,19-3,40-20
            c22.1-19.1,92.8-56,102-86c11-36-19-45-19-45s-36-17-58,49c-12.1,36.4-16,98,54,119c60.1,18,117.1-62.1,149.2-148.3
            c17.8-47.7,29.8-73.7,30.8-123.7c0.5-26.1-5.4-38.2-10.6-43.7c-4.9-5.1-16.9-9.8-29.4,5.7c-74,92-44,291-37,303
            c0,0,17.7,59.8,79.9,15.9c35.7-25.2,85.8-97.4,108.1-165.9c15-46,18.5-85,19-101c1-30-8.4-45.2-13.6-50.7
            c-4.9-5.1-16.4-9.3-29.4,5.7c-16.5,19.1-64.8,77.1-43,278c10.3,50.4,35.5,59.7,57.6,56.2c0,0,39.4-3.2,52.4-42.2
            c41.8-125.4,127-84,129-77c-76-56-180,95-74,149c83,36,137-146,68-142s37,145,101,56"
                fill="none"
              />
            </svg>
          </div>
        </section>
        <Image src={BG} width={"100%"} height={"900px"} alt="Akshay Bhopani" /> */}
        <div className="containerPro">
          <div className="marquee">
            <ul>
              <li>
                <span className="textPro">You are so PRO </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container" style={{ flexWrap: "wrap", justifyContent: "space-evenly", flexDirection: "column", backgroundAttachment: "fixed", padding: "15px" }}>
        <div className="text">
          <h2>Introducing The Tech Show Pro</h2>
          <p>Priority Tech Support, Unmetered Tech Store Queries and Private Community.</p>
        </div>
        {profile?.Limit === 100 ? (
          <>
            <div className="text">
              <h3>{profile?.name}, Thank you for becoming The Tech Show Pro Member</h3>
              <p>Your benefits are activated.</p>
              <p>Your membership will end on {profile?.validity}.</p>
            </div>
            <div className="proBenefits">
              <Link href="/ai">
                <button>AI Guide (Unmetered) </button>
              </Link>
              <Link target="_blank" href="https://chat.whatsapp.com/Ju9OHOLrpZQ5IiokWm70Wm">
                <p style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                  <FontAwesomeIcon icon={faSquareWhatsapp} style={{ width: "32px", height: "32px", color: "#f7da73", cursor: "pointer" }}></FontAwesomeIcon>
                  Private Community
                </p>
              </Link>
              <Link href="/call">
                <button>15 Min 1:1 Call</button>
              </Link>
              <Link href="/contact">
                <button>Priority Support</button>
              </Link>
            </div>
          </>
        ) : (
          <Pricing addToCart={addToCart} />
        )}
        <div className="text">
          <h2>Unmetered Tech Store Queries.</h2>
          <p>Shop TECH like a PRO with AI. Just Contact Us if you run out out of 100 Pro Queries and we will increase it to meet your needs.</p>
        </div>
        <Image placeholder="blur" priority src={UnmeteredQuery} width={"900"} height={"100%"} alt="UnmeteredQuery" layout="responsive" sizes="(max-width: 700px) 100vw, 700px" />
        <div className="text">
          <h2>Access to Private Whatsapp Community.</h2>
          <p>Tech Assistance just a Text Away.</p>
        </div>
        <Slider index={3}>
          <SwiperSlide>
            <h3>The Tech Show</h3>
            <Image placeholder="blur" loading="lazy" src={Whatsapp} width={"900"} height={"100%"} alt="Blog" style={{ objectFit: "contain" }} />
            <p>Quick Tech Support and New Products discussion with like minded people.</p>
          </SwiperSlide>
          <SwiperSlide>
            <h3>The Tech Show Investors</h3>
            <Image placeholder="blur" loading="lazy" src={Investors} width={"900"} height={"100%"} alt="YouTube" style={{ objectFit: "contain" }} />
            <p>Crypto, Forex and Share Market discussion with like minded people.</p>
          </SwiperSlide>
          <SwiperSlide>
            <h3>The Tech Show Gaming</h3>
            <Image placeholder="blur" loading="lazy" src={Gaming} width={"900"} height={"100%"} alt="YouTube" style={{ objectFit: "contain" }} />
            <p>Gaming discussion with like minded people.</p>
          </SwiperSlide>
        </Slider>
        <div className="text">
          <h2>Free 1:1 Call with Akshay.</h2>
          <p>Ask anything in Tech and Dev Tech with a 15 Mins Call.</p>
        </div>
        <div className="container">
          <div>
            <h1>1:1 Call</h1>
            <p>Book a call with Akshay Bhopani and ask anyting in Consumer and Dev Tech.</p>
            <br />
            <Link href="/call">
              <button data-aos="fade-up" data-aos-offset="200" data-aos-delay="800">
                Learn More
              </button>
            </Link>
          </div>
          <div data-aos="fade-left">
            <Image loading="lazy" src={CallWithAkshay} width={"100%"} height={200} alt="CallWithAkshay" style={{ margin: "20px" }} />
          </div>
        </div>
        <br />
        <div className="text">
          <h2>Priority Tech Support</h2>
          <p>Skip the queue.</p>
        </div>
        <Image placeholder="blur" loading="lazy" src={Support} width={"900"} height={"100%"} alt="UnmeteredQuery" layout="responsive" sizes="(max-width: 700px) 100vw, 700px" />
        <br />
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <Cart products={cartProducts} setProducts={setCartProducts} isSubscription={true} isOpen={isModalOpen} />
        </Modal>
      </div>
    </>
  )
}
