import Image from "next/image"
import Link from "next/link"

import Loader from "../../../assets/icons/Loader.svg"

export default function Button({ loading, onClickFn, children }) {
  return (
    <button onClick={onClickFn}>
      {loading ? <Image src={Loader} width={24} height={24} alt="Loader" /> : ""}
      {children}
    </button>
  )
}
