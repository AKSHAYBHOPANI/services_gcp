import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import Loader from "../../../assets/icons/Loader.svg"

export default function Login({ loading, onClickFn }) {
  return (
    <div className="LoginButton" onClick={onClickFn}>
      <FontAwesomeIcon icon={faGoogle} />
      {loading ? <Image src={Loader} width={24} height={24} alt="Loader" /> : <p>Sign in</p>}
    </div>
  )
}
