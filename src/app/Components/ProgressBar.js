"use client"

import "nprogress/nprogress.css"
import NProgress from "nprogress"
import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

NProgress.configure({
  template: `<div className="bar" role="bar" style="height:3px;background:rgb(150 227 217);position:fixed;bottom:0px"></div>`,
})

export default function Progress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.done()
    return () => {
      NProgress.start()
    }
  }, [pathname, searchParams])

  return <></>
}
