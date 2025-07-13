"use client"
// Core modules imports are same as usual
import { Swiper, SwiperSlide } from "swiper/react"
import { A11y, Navigation, Pagination, Scrollbar, Mousewheel, Autoplay } from "swiper/modules"
import "swiper/swiper-bundle.css"
var swiperIndex = []

export default function Slider({ children, delay = 5000, index }) {
  return (
    <Swiper
      modules={[Pagination, Autoplay, Mousewheel, Navigation, Scrollbar]}
      onSwiper={(swiper) => {
        swiperIndex.splice(index, 0, swiper)
        // console.log("swiperIndex", swiperIndex, index)
      }}
      slidesPerView={1.1}
      threshold={2}
      spaceBetween={10}
      // navigation={true}
      mousewheel={{ forceToAxis: true, sensitivity: 0.1, releaseOnEdges: true }}
      pagination={{ clickable: true }}
      autoplay={{
        delay: delay,
        disableOnInteraction: true,
      }}
    >
      {children}
    </Swiper>
  )
}

export { Slider, swiperIndex, SwiperSlide }
