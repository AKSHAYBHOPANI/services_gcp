"use client"
// Core modules imports are same as usual
import { useState, useContext } from "react"
import Image from "next/image"
import { Slider, swiperIndex, SwiperSlide } from "../Components/Slider"
import Blog from "../../../assets/media/Blog.png"
import Downloads from "../../../assets/media/Downloads.png"
import Medium from "../../../assets/media/Medium.png"
import News from "../../../assets/media/News.png"
import GoogleNews from "../../../assets/media/Google_News.png"
import Discord from "../../../assets/media/Discord.png"
import Instagram from "../../../assets/media/Instagram.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DigiartyLogo from "../../../assets/media/clients/DigiartyLogo.png"
import Discovery_Jeet from "../../../assets/media/clients/Discovery_Jeet.webp"
import DomainRacer from "../../../assets/media/clients/DomainRacer.png"
import haylou from "../../../assets/media/clients/haylou.png"
import Wondershare from "../../../assets/media/clients/Wondershare.png"
import Cart from "../Cart"
import Modal from "../Components/Modal"
import { faCode, faVideo, faCartPlus } from "@fortawesome/free-solid-svg-icons"
import Button from "../Components/Button"
import { UserContext } from "../context/userContext"
import { CartContext } from "../context/cartContext"
import Link from "next/link"

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
                <h2>Article</h2>
              </div>
              <div className="card__desc">Feature your work/research related to anything in Tech and get Featured on all our platforms.</div>
            </div>

            <div className="price">
              ₹0<span>/ without backlink</span>
              ₹499<span>/ with backlink</span>
            </div>

            <ul className="featureList">
              <li>Get indexed in Google Search</li>
              <li>High quality backlink</li>
              <li>Featured & tagged across our social.</li>
              <li className="disabled">Become a author</li>
              <li className="disabled">Push notifications & Email</li>
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
                <h2>Video</h2>
                <div className="card__label label">Best Value</div>
              </div>
              <div className="card__desc">We will create a high quality video for you and post in on our channel and also share it in our socials.</div>
            </div>

            <div className="price">
              ₹4,999<span>/ for shorts</span>
              ₹9,999<span>/ for video</span>
            </div>

            <ul className="featureList">
              <li>High Quality Edited video</li>
              <li>Get indexed on YouTube</li>
              <li>Featured & tagged across our social</li>
              <li>Teaser and Music included</li>
              <li className="disabled">Custom Captions</li>
              <li className="disabled">Push notifications & Email</li>
            </ul>

            <Button className="button button--pink" style={{ width: "100%" }} onClickFn={() => addToCart(1)}>
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
                <h2>Article + Video</h2>
              </div>
              <div className="card__desc">We will create a high quality video, short & article for you and post in on our channel and socials.</div>
            </div>

            <div className="price">
              ₹14,999<span></span>
            </div>

            <ul className="featureList">
              <li>1 Video, 1 Short & 1 Article (with Backlink)</li>
              <li>High Quality Edited video</li>
              <li>Get indexed on YouTube & Google Search</li>
              <li>Featured & tagged across our social</li>
              <li>Teaser & Music included</li>
              <li>Custom Captions</li>
              <li>Push notifications & Email</li>
            </ul>

            <Button className="button button--white" style={{ width: "100%" }} onClickFn={() => addToCart(2)}>
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

export default function Media() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [products, setProducts] = useState([
    { id: 1, icon: faVideo, name: "Media - Article", value: "₹0-₹499", summary: "Feature your work/research related to anything in Tech and get Featured on all our platforms." },
    { id: 2, icon: faVideo, name: "Media - Video", value: "₹4,999-₹9,999", summary: "We will create a high quality video for you and post in on our channel and also share it in our socials." },
    { id: 3, icon: faVideo, name: "Media - Article + Video", value: "₹9999-₹14,999", summary: "We will create a high quality video, short & article for you and post in on our channel and socials." },
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
    <>
      <div className="container" style={{ flexWrap: "wrap", justifyContent: "space-evenly" }}>
        <div className="text">
          <h1>Media</h1>
          <h2>Content that makes difference.</h2>
          <p>We just dont create content we create experience. </p>
        </div>
        <Slider delay={26000} index={1}>
          <SwiperSlide style={{ height: "unset" }}>
            <h3>Videos</h3>
            <video priority playsInline src="/media/Unboxing.mp4" autoPlay muted width={"500px"} height={"500px"} controls onEnded={() => swiperIndex[1].slideNext()}></video>
            <p>5 to 20 Mins Unboxing, Reviews, Impressions and How To videos.</p>
          </SwiperSlide>
          <SwiperSlide style={{ height: "unset" }}>
            <h3>Trailers</h3>
            <video preload="none" playsInline style={{ objectFit: "contain" }} src="/media/Trailer.mp4" autoPlay muted width={"500px"} height={"500px"} controls onEnded={() => swiperIndex[1].slideNext()}></video>
            <p>3 to 7 Mins Animated teaser videos for launch and partnerships.</p>
          </SwiperSlide>
          <SwiperSlide style={{ height: "unset" }}>
            <h3>Shorts</h3>
            <video preload="none" playsInline style={{ objectFit: "contain" }} src="/media/Shorts.mp4" autoPlay muted width={"500px"} height={"500px"} controls></video>
            <p>1 Min Short How to and Unboxing Videos.</p>
          </SwiperSlide>
          <div className="swiper-pagination"></div>
        </Slider>

        <div className="text">
          <h2>Written Content</h2>
          <p>For people who don't have time to watch videos.</p>
        </div>
        <Slider index={2}>
          <SwiperSlide>
            <h3>Posts/Blogs</h3>
            <Image priority placeholder="blur" src={Blog} width={"100%"} height={"100%"} alt="Blog" />
            <p>Blog that tells story. Tech News, Tech Tips and Downloads.</p>
          </SwiperSlide>
          <SwiperSlide>
            <h3>Downloads</h3>
            <Image placeholder="blur" loading="lazy" src={Downloads} width={"100%"} height={"100%"} alt="Downloads" />
            <p>Download high quality wallpapers, ringtones and apps.</p>
          </SwiperSlide>
          <SwiperSlide>
            <h3>Medium Channel</h3>
            <Image placeholder="blur" loading="lazy" src={Medium} width={"100%"} height={"100%"} alt="Medium" />
            <p>AdFree experience and Member only stories available on Medium.</p>
          </SwiperSlide>
        </Slider>
        <div className="text">
          <h2>Spread the News</h2>
          <p>Unfiltered and Authentic Tech News.</p>
        </div>
        <Slider index={3}>
          <SwiperSlide>
            <h3>News</h3>
            <Image placeholder="blur" loading="lazy" src={News} width={"100%"} height={"100%"} alt="News" />
            <p>Unfiltered Tech News, that makes sense. Get your voice heared</p>
          </SwiperSlide>
          <SwiperSlide>
            <h3>News on Google</h3>
            <Image placeholder="blur" loading="lazy" src={GoogleNews} width={"100%"} height={"100%"} alt="GoogleNews" />
            <p>Our News gets indexed in Google News and Search Snippets.</p>
          </SwiperSlide>
        </Slider>
        <div className="text">
          <h2>Connect with Real Humans</h2>
          <p>Find like minded people in tech to socialise with. </p>
        </div>
        <Slider index={4}>
          <SwiperSlide>
            <h3>Social Media</h3>
            <Image placeholder="blur" loading="lazy" src={Instagram} width={"100%"} height={"100%"} alt="Instagram" />
            <p>Quality posts, no spam guranteed.</p>
          </SwiperSlide>
          <SwiperSlide>
            <h3>Discord</h3>
            <Image placeholder="blur" loading="lazy" src={Discord} width={"100%"} height={"100%"} alt="Discord" />
            <p>Engage with our Discord Community Server.</p>
          </SwiperSlide>
        </Slider>
        <div className="text">
          <h2>Our Clients</h2>
          <p>We believe in deep long term connections. These our the clients with whom we have worked with.</p>
        </div>
        <div className="slider">
          <div className="slide-track">
            <div className="slide">
              <Image loading="lazy" src={Wondershare} height="70" width="170" alt="Wondershare" />
            </div>
            <div className="slide">
              <Image loading="lazy" src={DomainRacer} height="70" width="170" alt="DomainRacer" />
            </div>
            <div className="slide">
              <Image loading="lazy" src={DigiartyLogo} height="70" width="170" alt="DigiartyLogo" />
            </div>
            <div className="slide">
              <Image loading="lazy" src={haylou} height="70" width="170" alt="haylou" />
            </div>
            <div className="slide">
              <Image loading="lazy" src={Discovery_Jeet} height="70" width="170" alt="Discovery_Jeet" />
            </div>
          </div>
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
    </>
  )
}
