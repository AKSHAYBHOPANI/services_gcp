"use client"

import Image from "next/image"
import styles from "./page.module.css"
import Blog from "../../assets/home/Blog.png"
import YouTube from "../../assets/home/YouTube.png"
import Dynamatics from "../../assets/home/Dynamatics.png"
import Shilpwellness from "../../assets/home/Shilpwellness.png"
import TechStore from "../../assets/home/TechStore.svg"
import CallWithAkshay from "../../assets/home/Call_With_Akshay.svg"
import Community from "../../assets/home/Tech_Show_Comm.svg"
import WebHosting from "../../assets/home/Website_Hosting.svg"
import Pro from "../../assets/home/Pro.svg"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMedium, faBlogger, faYoutube, faFacebook, faTwitter, faTelegram, faDiscord, faFacebookSquare } from "@fortawesome/free-brands-svg-icons"

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="section">
          <div className="container">
            <div>
              <h1>Media</h1>
              <p className={styles.home_desc} id="Media">
                Tech YouTube Channel & Blog with more than 53,000 Views Every Month
                <br />
                <sup>*</sup>Lifetime: 3.32M Views on YouTube and 7.79L on Blog
              </p>

              <div style={{ display: "flex", gap: "10px" }}>
                <Link href="/media">
                  <button data-aos="fade-up" data-aos-offset="200" data-aos-delay="800">
                    Learn More
                  </button>
                </Link>
                <div style={{ display: "flex", gap: "3px" }} data-aos="fade-up" data-aos-offset="200" data-aos-delay="800">
                  <Link href="https://youtube.com/akshaybhopani">
                    <FontAwesomeIcon icon={faYoutube} style={{ width: "32px", height: "32px", color: "#f7da73" }} />
                  </Link>
                  <Link href="https://www.yourtechshow.com">
                    <FontAwesomeIcon icon={faBlogger} style={{ width: "32px", height: "32px", color: "#f7da73" }} />
                  </Link>
                  <Link href="https://medium.com/the-tech-show">
                    <FontAwesomeIcon icon={faMedium} style={{ width: "32px", height: "32px", color: "#f7da73" }} />
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.threeDimage} data-aos="fade-left">
              <Image priority placeholder="blur" src={YouTube} width={"50%"} height={200} alt="YouTube" />
              <Image priority placeholder="blur" src={Blog} width={"50%"} height={200} alt="Blog" />
            </div>
          </div>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
          </svg>
        </div>
        <div className="section">
          <div className="container">
            <div>
              <h1>Development</h1>
              <p>We just don't build websites we build websites that brings sales.</p>
              <br />
              <div style={{ display: "flex", gap: "5px" }} data-aos="fade-up" data-aos-offset="200" data-aos-delay="800">
                <Link href="/develop">
                  <button className="buttonSecondary">Learn More</button>
                </Link>
                <Link href="/contact">
                  <button className="buttonSecondary">Contact Us</button>
                </Link>
              </div>
            </div>
            <div className={styles.threeDimage} data-aos="fade-left">
              <Image placeholder="blur" loading="lazy" src={Dynamatics} width={"50%"} height={200} alt="Blog" />
              <Image placeholder="blur" loading="lazy" src={Shilpwellness} width={"50%"} height={200} alt="YouTube" />
            </div>
          </div>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
          </svg>
        </div>

        <div className="section">
          <div className="container mob">
            <div>
              <h1>Tech Store</h1>
              <p>Shop Quality & Trusted Products from our Partners.</p>
              <br />
              <div style={{ display: "flex", gap: "5px" }} data-aos="fade-up" data-aos-offset="200">
                <Link href="/ai">
                  <button>AI Guide</button>
                </Link>
                <Link href="https://store.yourtechshow.com">
                  <button>Shop Now</button>
                </Link>
              </div>
            </div>
            <div data-aos="fade-left">
              <Image loading="lazy" src={TechStore} width={"100%"} height={200} alt="TechStoreAI" />
            </div>
          </div>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
          </svg>
        </div>

        <div className="section">
          <div className="container mob">
            <div>
              <h1>Hosting</h1>
              <p>Affordable Website Hosting with 99% Uptime</p>
              <br />
              <div style={{ display: "flex", gap: "5px" }} data-aos="fade-up" data-aos-offset="200">
                <Link href="">
                  <button disabled style={{ cursor: "no-drop", opacity: "0.5" }}>
                    Coming Soon
                  </button>
                </Link>
                <Link href="/contact">
                  <button>Contact Us</button>
                </Link>
              </div>
            </div>
            <div data-aos="fade-left">
              <Image loading="lazy" src={WebHosting} width={"100%"} height={200} alt="YouTube" />
            </div>
          </div>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
          </svg>
        </div>
        <div className="section">
          <div className="container mob">
            <div>
              <h1>Pro Membership</h1>
              <p>Unmetered Tech Store AI Queries, Priority Tech Support & Whatsapp Community Access at very affordable pricing.</p>
              <br />
              <div style={{ display: "flex", gap: "5px" }} data-aos="fade-up" data-aos-offset="200">
                <Link href="/pro">
                  <button>Learn More</button>
                </Link>
                <Link href="/contact">
                  <button>Contact Us</button>
                </Link>
              </div>
            </div>
            <div data-aos="fade-left">
              <Image loading="lazy" src={Pro} width={"100%"} height={200} alt="YouTube" />
            </div>
          </div>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
          </svg>
        </div>
        <div className="section">
          <div className="container mob">
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
              <Image loading="lazy" src={CallWithAkshay} width={"100%"} height={200} alt="CallWithAkshay" />
            </div>
          </div>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
          </svg>
        </div>
        <div className="section">
          <div className="container mob">
            <div>
              <h1>Community</h1>
              <p>
                Join our awesome community of like minded individuals to talk and share tech.
                <br />
                <sup>#</sup>240+ The Tech Show Newsletter Subscribers
              </p>
              <br />
              <span data-aos="fade-up" data-aos-offset="200" data-aos-delay="800" style={{ display: "flex", gap: "3px" }}>
                <Link target="_blank" href="https://www.facebook.com/share/g/1B6KfVDQMJ/">
                  <FontAwesomeIcon icon={faFacebookSquare} style={{ width: "32px", height: "32px", color: "#f7da73" }} />
                </Link>
                <Link target="_blank" href="https://discord.gg/uTddJYrS">
                  <FontAwesomeIcon icon={faDiscord} style={{ width: "32px", height: "32px", color: "#f7da73" }} />
                </Link>

                <Link target="_blank" href="https://t.me/TTSMG">
                  <FontAwesomeIcon icon={faTelegram} style={{ width: "30px", height: "32px", color: "#f7da73" }} />
                </Link>
              </span>
            </div>
            <div data-aos="fade-left">
              <Image loading="lazy" src={Community} width={"100%"} height={200} alt="Community" />
            </div>
          </div>
        </div>
        <div className="disclaimer">
          <sup>*</sup>Stats as per March 2025. Data keeps changing daily.
          <br />
          <sup>#</sup>Audience count as per March 2025. Data keeps changing daily.
          <br />
          The Tech Show Media has all rights to remove/restrict user accounts and community participation if violating any policy.
        </div>
      </main>
    </div>
  )
}
