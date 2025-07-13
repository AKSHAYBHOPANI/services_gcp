import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMedium, faBlogger, faYoutube, faFacebook, faTwitter, faTelegram, faDiscord, faFacebookSquare, faFacebookMessenger } from "@fortawesome/free-brands-svg-icons"
import Image from "next/image"
import Team from "../../../assets/about/team.jpeg"
import Logo from "../../../assets/about/logo.gif"

export default function About() {
  return (
    <>
      <br />
      <br />
      <br />
      <div className="container" style={{ display: "block", padding: "10px" }}>
        <h1>About Us</h1>
        <br />
        <p>
          We at The Tech Show Media Group aim to provide the best tech guide to our audience. We try hard to create great threads and videos so that our followers are satisfied. We love to bring you news and stories about the latest technology and trends. We also help users to get the best tech that
          they can buy.
        </p>
        <div style={{ display: "flex", justifyItems: "center", justifyContent: "center" }}>
          <Image src={Logo} width={"50%"} height={200} alt="Logo" loop />
        </div>
        <br />
        <p>
          Every business has a beginning, and this is where we are now. We have an opportunity and a goal to achieve. We started working without any special guidance or help. We learned from our own mistakes and we try hard to not repeat them. We have expanded and learned a lot of things and today
          we aim to be a good blog.
        </p>
        <br />
        <h2>The Crew</h2>
        <br />
        <p>This is our DREAM TEAM. We all have a common goal of best customer satisfaction. Every member of the team is equipped with ample knowledge and experience. We work together as friends and we also are like friends to our audience because that's our basic tendency as human beings.</p>

        <br />
        <div style={{ display: "flex", justifyItems: "center", justifyContent: "center" }}>
          <Image src={Team} width={"50%"} height={200} alt="Team" layout="responsive" sizes="(max-width: 700px) 100vw, 700px" />
        </div>
        <br />
        <h2>Community</h2>
        <br />
        <p>We create some great content across various social networks. Check out our YouTube channel and Facebook page. We are sure that you're going to love it.</p>
        <br />
        <ul style={{ display: "flex", gap: "7px", justifyContent: "center" }}>
          <li style={{ display: "flex", gap: "3px" }}>
            <Link target="_blank" href="https://www.youtube.com/akshaybhopani?sub_confirmation=1">
              <FontAwesomeIcon icon={faYoutube} style={{ width: "32px", height: "32px" }} />
            </Link>
            <Link target="_blank" href="https://www.facebook.com/thetechshowmedia">
              <FontAwesomeIcon icon={faFacebook} style={{ width: "32px", height: "32px" }} />
            </Link>

            <Link target="_blank" href="https://twitter.com/ttsmgofficial">
              <FontAwesomeIcon icon={faTwitter} style={{ width: "32px", height: "32px" }} />
            </Link>
            <Link target="_blank" href="https://m.me/thetechshowmedia">
              <FontAwesomeIcon icon={faFacebookMessenger} style={{ width: "30px", height: "32px" }} />
            </Link>
            <Link target="_blank" href="https://discord.gg/uTddJYrS">
              <FontAwesomeIcon icon={faDiscord} style={{ width: "32px", height: "32px" }} />
            </Link>
            <Link target="_blank" href="https://t.me/TTSMG">
              <FontAwesomeIcon icon={faTelegram} style={{ width: "32px", height: "32px" }} />
            </Link>
          </li>
        </ul>

        <br />
      </div>
      <div className={"disclaimer"}>Made in 💛 for and by The Tech Show Developers.</div>
    </>
  )
}
