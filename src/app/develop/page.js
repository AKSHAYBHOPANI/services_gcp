"use client"
import { useState, useContext } from "react"
import Image from "next/image"
import { Slider, swiperIndex, SwiperSlide } from "../Components/Slider"
import Performance from "../../../assets/develop/Performance.png"
import SEO from "../../../assets/develop/SEO.png"
import Ranking1 from "../../../assets/develop/Ranking 1.png"
import Ranking2 from "../../../assets/develop/Ranking 2.png"
import Ranking3 from "../../../assets/develop/Ranking 3.png"
import Data from "../../../assets/develop/Search Stats.png"
import AI from "../../../assets/develop/AI.png"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode, faVideo, faCartPlus } from "@fortawesome/free-solid-svg-icons"
import Dynamatic from "../../../assets/develop/clients/Dynamatic.png"
import Shilpwellness from "../../../assets/develop/clients/ShilpWellness.webp"
import UTM from "../../../assets/develop/clients/UTM.png"
import ConfluenceR from "../../../assets/develop/clients/Confluence-r.png"
import DCIPL from "../../../assets/develop/clients/DCIPL.jpeg"
import Ayushee from "../../../assets/testimonials/ayushee.jpeg"
import Amarnath from "../../../assets/testimonials/amarnath.png"
import Cart from "../Cart"
import Modal from "../Components/Modal"
import Button from "../Components/Button"
import { UserContext } from "../context/userContext"
import { CartContext } from "../context/cartContext"

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
                <h2>Basic</h2>
              </div>
              <div className="card__desc">Basic Wordpress or HTML Websites suitabile for Portfolio's, Intro Pages, and Startup Landing Pages.</div>
            </div>

            <div className="price">
              ₹4,999<span>/ for 1/4 HTML Pages</span>
              ₹9,999<span>/ for more than 4 Wordpress Pages</span>
            </div>

            <ul className="featureList">
              <li>Get indexed in Google Search</li>
              <li>Beauiful Template Design</li>
              <li>Free Hosting for 1st Year (5GB)</li>
              <li className="disabled">2 Custom Emails Free for 1st Year</li>
              <li className="disabled">1 Month of Free Maintenance</li>
              <li className="disabled">Teaser/Launch Video.</li>
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
                <h2>Store</h2>
                <div className="card__label label">Best Value</div>
              </div>
              <div className="card__desc">Basic Wordpress Store suitable for Startup and Small Businesses. Comes with preferred payment gateway integration.</div>
            </div>

            <div className="price">
              ₹14,999<span>/ for 10 Wordpress Pages/Products</span>
              ₹19,999<span>/ More than 10 Wordpress Pages/Products</span>
            </div>

            <ul className="featureList">
              <li>Get indexed in Google Search</li>
              <li>Beauiful Template Design</li>
              <li>Free Hosting for 1st Year (7GB)</li>
              <li>2 Custom Emails Free for 1st Year</li>
              <li className="disabled">1 Month of Free Maintenance included.</li>
              <li className="disabled">Teaser/Launch Video.</li>
            </ul>

            <Button className="button button--pink" style={{ width: "100%" }} onClickFn={() => addToCart(1)}>
              <FontAwesomeIcon icon={faCartPlus} style={{ width: "20px", height: "20px", cursor: "hover", paddingRight: "5px" }}></FontAwesomeIcon>
              Add to Cart
            </Button>
          </div>
          {/* <!--pro plan ends --> */}
          {/* <!--pro plan starts --> */}
          <div className="planItem planItem--pro">
            <div className="card">
              <div className="card__header">
                <div className="card__icon symbol"></div>
                <h2>Custom</h2>
                <div className="card__label label">Best Value</div>
              </div>
              <div className="card__desc">Custom WordPress/React/Next JS Design with preferred layout and payment gateway integration.</div>
            </div>

            <div className="price">
              ₹24,999<span>/ for 5 Custom Wordpress Pages</span>
              ₹34,999<span>/ More than 5 React/Next Pages</span>
            </div>

            <ul className="featureList">
              <li>Get indexed in Google Search</li>
              <li>Beauiful Custom Design</li>
              <li>Free Hosting for 1st Year (7GB)</li>
              <li>3 Custom Emails Free for 1st Year</li>
              <li>1 Month of Free Maintenance included.</li>
              <li className="disabled">Teaser/Launch Video.</li>
              <li className="disabled">Newsletter & Push Notifications.</li>
              <li className="disabled">Custom Dashboard</li>
            </ul>

            <Button className="button button--pink" style={{ width: "100%" }} onClickFn={() => addToCart(2)}>
              <FontAwesomeIcon icon={faCartPlus} style={{ width: "20px", height: "20px", cursor: "hover", paddingRight: "5px" }}></FontAwesomeIcon>
              Add to Cart
            </Button>
          </div>
          {/* <!--pro plan ends --> */}
          {/* <!--entp plan starts --> */}
          <div className="planItem planItem--entp">
            <div className="card">
              <div className="card__header">
                <div className="card__icon"></div>
                <h2>Custom + Store</h2>
              </div>
              <div className="card__desc">Custom React/Next JS Design with preferred layout, Payment Gateway and database integration.</div>
            </div>

            <div className="price">
              ₹39,999<span>/ for 5 React/Next Pages/Products</span>
              ₹59,999<span>/ More than 5 React/Next Pages/Products</span>
            </div>

            <ul className="featureList">
              <li>Get indexed in Google Search</li>
              <li>Beauiful Custom Design</li>
              <li>Free Hosting for 1st Year (10GB)</li>
              <li>4 Custom Emails Free for 1st Year</li>
              <li>1 Month of Free Maintenance included.</li>
              <li>Teaser/Launch Video.</li>
              <li>Newsletter & Push Notifications.</li>
              <li className="disabled">Custom Dashboard</li>
            </ul>

            <Button className="button button--white" style={{ width: "100%" }} onClickFn={() => addToCart(3)}>
              <FontAwesomeIcon icon={faCartPlus} style={{ width: "20px", height: "20px", cursor: "hover", paddingRight: "5px" }}></FontAwesomeIcon>
              Add to Cart
            </Button>
          </div>
          {/* <!--entp plan ends --> */}
          {/* <!--entp plan starts --> */}
          <div className="planItem planItem--pink">
            <div className="card">
              <div className="card__header">
                <div className="card__icon symbol"></div>
                <h2>Custom Store + Dashboard</h2>
              </div>
              <div className="card__desc">Custom React/Next JS Design with preferred layout, Payment Gateway, Database integration and Dashboard.</div>
            </div>

            <div className="price">
              ₹64,999<span>/ for 5 React/Next Pages/Products with 1 Dashboard</span>
              ₹99,999<span>/ More than 5 React/Next Pages/Product and 2 Dashboard</span>
            </div>

            <ul className="featureList">
              <li>Get indexed in Google Search</li>
              <li>Beauiful Custom Design</li>
              <li>Free Hosting for 1st Year (15GB)</li>
              <li>5 Custom Emails Free for 1st Year</li>
              <li>1 Month of Free Maintenance included.</li>
              <li>Teaser/Launch Video.</li>
              <li>Newsletter & Push Notifications.</li>
              <li>Custom Dashboard</li>
            </ul>

            <Button className="button button--white" style={{ width: "100%" }} onClickFn={() => addToCart(4)}>
              <FontAwesomeIcon icon={faCartPlus} style={{ width: "20px", height: "20px", cursor: "hover", paddingRight: "5px" }}></FontAwesomeIcon>
              Add to Cart
            </Button>
          </div>
          {/* <!--entp plan ends --> */}
        </div>
      </div>
    </section>
  )
}

export default function Hosting() {
  // var swiper = new Swiper(".slide-container", {
  //   slidesPerView: 4,
  //   spaceBetween: 20,
  //   sliderPerGroup: 4,
  //   loop: true,
  //   centerSlide: "true",
  //   fade: "true",
  //   grabCursor: "true",
  //   pagination: {
  //     el: ".swiper-pagination",
  //     clickable: true,
  //     dynamicBullets: true,
  //   },
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  //   },
  //   breakpoints: {
  //     0: {
  //       slidesPerView: 1,
  //     },
  //     520: {
  //       slidesPerView: 2,
  //     },
  //     768: {
  //       slidesPerView: 3,
  //     },
  //     1000: {
  //       slidesPerView: 4,
  //     },
  //   },
  // })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [products, setProducts] = useState([
    { id: 4, icon: faCode, name: "Development - Basic", value: "₹4,999-₹9,999", summary: "We will create a high quality video, short & article for you and post in on our channel and socials." },
    { id: 5, icon: faCode, name: "Development - Store", value: "₹14,999-₹19,999", summary: "We will create a high quality video, short & article for you and post in on our channel and socials." },
    { id: 6, icon: faCode, name: "Development - Custom", value: "₹24,999-₹34,999", summary: "We will create a high quality video, short & article for you and post in on our channel and socials." },
    { id: 7, icon: faCode, name: "Development - Custom + Store", value: "₹39,999-₹59,999", summary: "We will create a high quality video, short & article for you and post in on our channel and socials." },
    { id: 8, icon: faCode, name: "Development - Custom Store + Dashboard", value: "₹64,999-₹99,999", summary: "We will create a high quality video, short & article for you and post in on our channel and socials." },
  ])
  const { cartProducts, setCartProducts } = useContext(CartContext)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
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
    <div className="container" style={{ flexWrap: "wrap", justifyContent: "space-evenly" }}>
      <div className="text">
        <h1>Develop</h1>
        <h2>Stunning Websites that makes BUSINESS</h2>
      </div>
      <Slider delay={26000} index={1}>
        <SwiperSlide>
          <h3>Shilpwellness</h3>
          <video
            src="/develop/Shilpwellness.mp4"
            priority
            playsInline
            autoPlay
            muted
            width={"500px"}
            height={"500px"}
            onEnded={() => {
              swiperIndex[1].slideNext()
              document.getElementById("Dynamatic").play()
            }}
          ></video>
          <p>Beautiful SPA Booking website made with in collaboration with Ave Consultancy x Confluence-r.</p>
        </SwiperSlide>
        <SwiperSlide>
          <h3>Dynamatics</h3>
          <video playsInline id="Dynamatic" src="/develop/dynamatics.mp4" autoPlay muted width={"500px"} height={"500px"}></video>
          <p>Minimal video heavy website for south asia's leading manufacturer for aero structures. </p>
        </SwiperSlide>
      </Slider>
      <div className="text">
        <h2>Top Grade Performance</h2>
        <p>Because speed matters.</p>
      </div>
      <Slider index={2}>
        <SwiperSlide>
          <h3>High Performace</h3>
          <Image priority placeholder="blur" src={Performance} width={"100%"} height={"100%"} alt="Performance" />
          <p>Tested and verified on GtMetrix. Because Performance Impacts Engagement.</p>
        </SwiperSlide>
        <SwiperSlide>
          <h3>Built for SEO</h3>
          <Image placeholder="blur" loading="lazy" src={SEO} width={"100%"} height={"100%"} alt="SEO" />
          <p>Tested and verified on Google Page Speed Insights. Because ranking matters.</p>
        </SwiperSlide>
      </Slider>
      <div className="text">
        <h2>Higher Search Rankings</h2>
        <p>Designed to RANK</p>
      </div>
      <Slider index={3}>
        <SwiperSlide>
          <h3>Rank on TOP</h3>
          <Image placeholder="blur" loading="lazy" src={Ranking1} width={"100%"} height={"100%"} alt="Ranking" />
          <p>Our client Dynamatics major pages rank No 1 on Google Search. </p>
        </SwiperSlide>
        <SwiperSlide>
          <h3>Rank on TOP</h3>
          <Image placeholder="blur" loading="lazy" src={Ranking2} width={"100%"} height={"100%"} alt="Ranking" />
          <p>Our client Shilpwellness most pages rank No 1 on Google Search. </p>
        </SwiperSlide>
        <SwiperSlide>
          <h3>Rank on First Page</h3>
          <Image placeholder="blur" loading="lazy" src={Ranking3} width={"100%"} height={"100%"} alt="Ranking" />
          <p>Our Micro niche website ranks under Top 10 for the targeted keyword.</p>
        </SwiperSlide>
      </Slider>

      <div className="text">
        <h2>Smooth Experience</h2>
        <p>Minute details can change the game.</p>
      </div>
      <Slider delay={26000} index={4}>
        <SwiperSlide>
          <h3>Responsive</h3>
          <video
            src="/develop/Confluence-r Next Js.mp4"
            preload="none"
            playsInline
            autoPlay
            muted
            width={"500px"}
            height={"500px"}
            controls
            onEnded={() => {
              swiperIndex[4].slideNext()
              document.getElementById("Confluence").play()
            }}
          ></video>
          <p>We make sure our websites looks best on most screens.</p>
        </SwiperSlide>
        <SwiperSlide>
          <h3>Launch Trailer</h3>
          <video preload="none" playsInline id="Confluence" src="/develop/Confluence-r Color Update.mp4" autoPlay muted width={"500px"} height={"500px"} controls></video>
          <p>Because we are also a media company you get Trailer Video with our Pro Plans.</p>
        </SwiperSlide>
      </Slider>

      <div className="text">
        <h2>Data that matters</h2>
        <p>We help you understand your customer flow with data.</p>
      </div>
      <Image placeholder="blur" loading="lazy" src={Data} width={"900"} height={"100%"} alt="Data" layout="responsive" sizes="(max-width: 700px) 100vw, 700px" />
      <div className="text">
        <h2>Fuure Proof</h2>
        <p>AI ? WEB3 ? Our websites are designed with latest tech in mind.</p>
      </div>
      <Image placeholder="blur" loading="lazy" src={AI} width={"900"} height={"100%"} alt="AI" layout="responsive" sizes="(max-width: 700px) 100vw, 700px" />
      <div className="text">
        <h2>Our Clients</h2>
        <p>We believe in deep long term connections. These our the clients with whom we have worked with.</p>
      </div>
      <div className="slider">
        <div className="slide-track">
          <div className="slide">
            <Image loading="lazy" src={DCIPL} height="70" width="170" alt="DCIPL" />
          </div>
          <div className="slide">
            <Image loading="lazy" src={ConfluenceR} height="70" width="170" alt="ConfluenceR" />
          </div>
          <div className="slide">
            <Image loading="lazy" src={Dynamatic} height="70" width="170" alt="Dynamatic" />
          </div>
          <div className="slide">
            <Image loading="lazy" src={UTM} height="70" width="170" alt="UTM" />
          </div>
          <div className="slide">
            <Image loading="lazy" src={Shilpwellness} height="70" width="170" alt="Shilpwellness" />
          </div>
        </div>
      </div>
      <div className="text">
        <h2>Testimonials</h2>
        <p>This is what they say.</p>
      </div>
      <div className="responsive-quote-wrapper">
        <blockquote class="responsive-quote">
          <p>Akshay is a versatile and dependable developer who is able to solve issues and create solutions from an entirely creative perspective. His knowledge of the various coding languages along with his initiative taking abilities, make him a must to work with.</p> <br />
          <cite style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            &mdash; <Image placeholder="blur" loading="lazy" src={Ayushee} width={"50"} height={"50"} alt="Ayushee Mehta" />
            <span>
              <b>Ayushee Mehta</b> <br />
              <span style={{ fontSize: "12px" }}>Partner, Shilpwellness</span>
            </span>
          </cite>
        </blockquote>
        <blockquote class="responsive-quote">
          <p>Akshay, our website developer exceeded our expectations in every way! He brought our vision to a detail-oriented website as per our requirement. His responsiveness, expertise, and passion for work make him an absolute pleasure to work with – I highly recommend them!</p>
          <br />
          <cite style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            &mdash; <Image placeholder="blur" loading="lazy" src={Amarnath} width={"50"} height={"50"} alt="Amarnath H M" />
            <span>
              <b>Amarnath H M</b> <br />
              <span style={{ fontSize: "12px" }}>Senior Manager, Dynamatic</span>
            </span>
          </cite>
        </blockquote>
      </div>
      <div className="text">
        <h2> Simple, transparent pricing</h2>
        <p>No contracts. No suprise fees.</p>
      </div>
      <Pricing addToCart={addToCart} />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Cart products={cartProducts} setProducts={setCartProducts} />
      </Modal>
    </div>
  )
}
