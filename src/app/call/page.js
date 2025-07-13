"use client"
// import Form from "next/form "
import Image from "next/image"
import { useState, useEffect, useContext } from "react"
import Button from "../Components/Button"
import { loadStripe } from "@stripe/stripe-js"
import BG from "../../../assets/call/BG.png"
import Praise from "../../../assets/call/Praise.png"
import Youtuber from "../../../assets/call/YouTuber.jpg"
import Mi from "../../../assets/call/Mi Community Moderator.jpg"
import Google from "../../../assets/call/Google.jpeg"
import Session1 from "../../../assets/call/Session 1.jpeg"
import Session2 from "../../../assets/call/Session 2.jpeg"
import Session3 from "../../../assets/call/Session 3.jpeg"
import Session4 from "../../../assets/call/Session 4.jpeg"
import PMLE from "../../../assets/call/PMLE.png"
import Work from "../../../assets/call/Work.png"
import Blog from "../../../assets/media/Blog.png"
import YouTube from "../../../assets/home/YouTube.png"
import Profile from "../../../assets/call/AKSHAY.png"
import { collection } from "firebase/firestore"
import { Slider, swiperIndex, SwiperSlide } from "../Components/Slider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle, faCartPlus, faVideo } from "@fortawesome/free-solid-svg-icons"
import { CartContext } from "../context/cartContext"
import Modal from "../Components/Modal"
import Cart from "../Cart"
import { UserContext } from "../context/userContext"
import Link from "next/link"

const Pricing = ({ addToCart }) => {
  const { profile, setProfile } = useContext(UserContext)
  return (
    <section className="plans__container">
      <div className="plans">
        <div className="planItem__container">
          {/* <!--free plan starts --> */}
          <div className="planItem planItem--free">
            <div className="card">
              <div className="card__header">
                <div className="card__icon symbol symbol--rounded"></div>
                <h2>15 Min</h2>
              </div>
              <div className="card__desc">15 Mins 1:1 Call with Akshay Bhopani</div>
            </div>

            <div className="price">
              {profile?.Limit === 100 ? (
                <>
                  Free <span>/ Pro Member</span>
                </>
              ) : (
                "₹299"
              )}
            </div>

            <ul className="featureList">
              <li>Ask anything in Consumer & Dev Tech</li>
              <li>Choose your convienient time slot</li>
              <li className="disabled">Free 1 Month Tech Show Pro Membership</li>
            </ul>

            {profile?.Limit === 100 ? (
              <Link href="https://calendly.com/akshaybhopani/15-min-1-1-meeting">
                <button className="button" style={{ width: "100%" }}>
                  <FontAwesomeIcon icon={faVideo} style={{ width: "20px", height: "20px", cursor: "hover", paddingRight: "5px" }}></FontAwesomeIcon>
                  Book Now
                </button>
              </Link>
            ) : (
              <Button className="button" style={{ width: "100%" }} onClickFn={() => addToCart(0)}>
                <FontAwesomeIcon icon={faCartPlus} style={{ width: "20px", height: "20px", cursor: "hover", paddingRight: "5px" }}></FontAwesomeIcon>
                Add to Cart
              </Button>
            )}
          </div>
          {/* <!--free plan ends --> */}

          {/* <!--pro plan starts --> */}
          <div className="planItem planItem--pro">
            <div className="card">
              <div className="card__header">
                <div className="card__icon symbol"></div>
                <h2>30 Min</h2>
                <div className="card__label label">Best Value</div>
              </div>
              <div className="card__desc">30 Mins 1:1 Call with Akshay Bhopani</div>
            </div>

            <div className="price">₹499</div>

            <ul className="featureList">
              <li>Ask anything in Consumer & Dev Tech</li>
              <li>Choose your convienient time slot</li>
              <li>Free 1 Month Tech Show Pro Membership</li>
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
export default function call() {
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
    price: "1000",
    date: "11/03/2024",
    time: "11:24pm",
    email: "test@test.com",
    // id: Id,
  })
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  const stripePromise = loadStripe(publishableKey)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [products, setProducts] = useState([
    { id: 11, icon: faVideo, name: "15 Min 1:1 Call", value: "₹299", summary: "15 Mins 1:1 Support & Mentorship Call with Akshay Bhopani" },
    { id: 12, icon: faVideo, name: "30 Min 1:1 Call", value: "₹499", summary: "30 Mins 1:1 Support & Mentorship Call with Akshay Bhopani" },
  ])
  const { cartProducts, setCartProducts } = useContext(CartContext)
  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
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
      <div className="Intro main">
        <div className="text" style={{ color: "white", padding: "15px", position: "absolute", top: "4rem" }}>
          <h1>Call</h1>
          <p>Setup a call with Akshay Bhopani</p>
        </div>
        <section className="intro" style={{ display: "block", width: "50%" }}>
          <div className="macintosh" style={{ maxWidth: "600px" }}>
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
        <Image data-aos="fade-up" data-aos-offset="200" src={BG} quality={100} width={"650"} height={"650"} alt="Akshay Bhopani" />
      </div>
      <div className="container" style={{ flexWrap: "wrap", justifyContent: "space-evenly", flexDirection: "column", backgroundAttachment: "fixed", padding: "15px" }}>
        <div className="text">
          <h2>Who is Akshay Bhopani?</h2>
          <p>Senior Software Developer, Tech YouTuber and Crypto Miner</p>
        </div>
        <Image className="akshay" style={{ borderRadius: "25px" }} src={Profile} width={"100%"} height={"900px"} alt="Akshay Bhopani" />
        <br />
        <p>
          Hi, my name is Akshay. I create things on the internet. From YouTube Videos, Blog posts, Social network posts, and more. I like to learn, explore, and experiment with different things. If you are a business seeking a web presence or an employer looking to hire, you can get in touch with
          me. Innovation is my passion.
        </p>
        <div className="text">
          <h2>Professional Google Cloud Certified Machine Learning Engineer</h2>
          <p>ML/AI Certified Web Developer</p>
        </div>
        <Image src={PMLE} width={"700"} height={"100%"} alt="PMLE" layout="responsive" sizes="(max-width: 700px) 100vw, 700px" />
        <div className="text">
          <h2>5+ Years Experience in Development and 7+ Years in Content Creation.</h2>
        </div>
        {/* <Slider index={1}>
          <SwiperSlide>
            <h3>Experience</h3>
            <Image src={Work} width={"900"} height={"100%"} alt="Blog" />
            <p>5+ Years of Professional Work Experience</p>
          </SwiperSlide>
          <SwiperSlide>
            <h3>Praises</h3>
            <Image src={Praise} width={"900"} height={"100%"} alt="Blog" />
            <p>Praises received at work. </p>
          </SwiperSlide>
        </Slider> */}

        <ul class="timeline">
          <li>
            <div class="timeline-badge">
              <a>
                {/* <i class="fa fa-circle" id=""></i> */}
                <FontAwesomeIcon icon={faCircle} style={{ width: "20px", height: "20px", color: "#f7da73" }}></FontAwesomeIcon>
              </a>
            </div>
            <div class="timeline-panel">
              <div class="timeline-heading">
                <h4>Senior Software Developer, Former Product Owner.</h4>
              </div>
              <div class="timeline-body">
                <p>Front End Developer working on React JS For DePronto Infotech Client's Websites especially in BFSI Segment.</p>
              </div>
              <div class="timeline-footer">
                <p class="text-right">
                  December 2021 - Present <span style={{ float: "right" }}>~3.3 Years</span>
                </p>
              </div>
            </div>
          </li>

          <li class="timeline-inverted">
            <div class="timeline-badge">
              <a>
                {/* <i class="fa fa-circle invert" id=""></i> */}
                <FontAwesomeIcon className="fa invert" icon={faCircle} style={{ width: "20px", height: "20px", color: "#f7da73" }}></FontAwesomeIcon>
              </a>
            </div>
            <div class="timeline-panel">
              <div class="timeline-heading">
                <h4>Website Designer & Developer - Confluence-r</h4>
              </div>
              <div class="timeline-body">
                <p>Front End Developer and Designer for Confluence-r clients website. Managing Linux Hosting and Making SEO friendly Websites for SMB's.</p>
              </div>
              <div class="timeline-footer">
                <p class="text-right">
                  August 2020 - December 2021 <span style={{ float: "right" }}>~1.4 Years</span>
                </p>
              </div>
            </div>
          </li>

          <li>
            <div class="timeline-badge">
              <a>
                {/* <i class="fa fa-circle" id=""></i> */}
                <FontAwesomeIcon icon={faCircle} style={{ width: "20px", height: "20px", color: "#f7da73" }}></FontAwesomeIcon>
              </a>
            </div>
            <div class="timeline-panel">
              <div class="timeline-heading">
                <h4>Enterprise Network Support Engineer - Orient Technologies Pvt Ltd</h4>
              </div>
              <div class="timeline-body">
                <ul>Fault Finding, Troubleshooting, and Configuring Tikona Fibre-To-RF Digital Network. Operating and Monitoring Cambium, Ligo Wave, TP-Link Pharos Radios, and TP-Link, Mogralite Switches.</ul>
              </div>
              <div class="timeline-footer">
                <p class="text-right">
                  July 2019 - July 2020 <span style={{ float: "right" }}>~1 Years</span>
                </p>
              </div>
            </div>
          </li>

          <li class="timeline-inverted">
            <div class="timeline-badge">
              <a>
                {/* <i class="fa fa-circle invert" id=""></i> */}
                <FontAwesomeIcon className="fa invert" icon={faCircle} style={{ width: "20px", height: "20px", color: "#f7da73" }}></FontAwesomeIcon>
              </a>
            </div>
            <div class="timeline-panel">
              <div class="timeline-heading">
                <h4>Founder- The Tech Show Media</h4>
              </div>
              <div class="timeline-body">
                <p>We Love To Bring Technology and Innovation To Our Fans At The Tech Show Media. We Help Users To Get The Best Tech They Can Buy.</p>
              </div>
              <div class="timeline-footer">
                <p class="text-right">
                  2015 - Present <span style={{ float: "right" }}>~10 Years</span>
                </p>
              </div>
            </div>
          </li>

          <li class="clearfix no-float"></li>
        </ul>

        <div className="text">
          <h2>YouTuber and Blogger.</h2>
          <p>YouTube Creator, Mi Community Moderator & Blogger</p>
        </div>
        <Slider index={1}>
          <SwiperSlide>
            <Image src={Youtuber} width={"550"} height={"100%"} alt="Youtuber" style={{ objectFit: "contain" }} />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={Mi} width={"550"} height={"100%"} alt="Mi" style={{ objectFit: "contain" }} />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={Google} width={"550"} height={"100%"} alt="Google" />
          </SwiperSlide>
        </Slider>

        <div className="text">
          <h2>In-Person Learning Sessions</h2>
          <p>For Code Vipassana</p>
        </div>
        <Slider index={2}>
          <SwiperSlide>
            <h3>GDG Mad, Mumbai</h3>
            <Image src={Session4} width={"900"} height={"100%"} alt="Sessions" />
            <p>Text Summarization using Bigquery ML and Vertex AI PaLM API at DevFest 24.</p>
          </SwiperSlide>
          <SwiperSlide>
            <h3>GDG Mad, Mumbai</h3>
            <Image src={Session1} width={"900"} height={"100%"} alt="Sessions" />
            <p>Generative Insights with BigQuery SQL and Vertex AI at Build with AI.</p>
          </SwiperSlide>
          <SwiperSlide>
            <h3>St.Xavier’s College, Mumbai</h3>
            <Image src={Session3} width={"900"} height={"100%"} alt="Sessions" />
            <p>Build a movie prediction and prescription app with BigQuery SQL & Vertex AI.</p>
          </SwiperSlide>
          <SwiperSlide>
            <h3>Google, Mumbai</h3>
            <Image src={Session2} width={"900"} height={"100%"} alt="Sessions" />
            <p>Session on RSS to ML at Build & Blog Marathon.</p>
          </SwiperSlide>
        </Slider>
        <div className="text">
          <h2>Wrote 200+ articles & made 200+ Videos.</h2>
          <p>On The Tech Show Blog, Downloads & Medium.</p>
        </div>
        <Slider index={3}>
          <SwiperSlide>
            <h3>Articles</h3>
            <Image src={Blog} width={"900"} height={"100%"} alt="Blog" />
            <p>Over 200+ High Quality Articles with Lifetime views of 7.6L</p>
          </SwiperSlide>
          <SwiperSlide>
            <h3>Videos</h3>
            <Image src={YouTube} width={"900"} height={"100%"} alt="YouTube" />
            <p>Over 200+ High Quality Videos with Lifetime views of 3.1M</p>
          </SwiperSlide>
        </Slider>
        <div className="text">
          <h2>Book Now</h2>
          <p>Support & Mentorship Call</p>
        </div>
        {profile?.Limit === 100 ? (
          <p>
            Thank you for being a Pro Member, you can book your Free 15 Min 1:1 Tech Support and Mentorship call with Akshay. <sup style={{ backgroundColor: "rgb(245, 245, 247)", borderRadius: "5px", padding: "3px", fontSize: "9px" }}>{"Pro"}</sup>
          </p>
        ) : (
          ""
        )}
        <Pricing addToCart={addToCart} />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Cart products={cartProducts} setProducts={setCartProducts} noBookingAmt={true} />
      </Modal>
    </>
  )
}
