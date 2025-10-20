import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

export type CarouselProps = {
    children: React.ReactNode
    slidesPerView?: number  
    autoPlayDelay?: number
    loop?: boolean
    showPagination?: boolean
    showNavigation?: boolean
    
}

const Carousel: React.FC<CarouselProps> = ({
    children,
    slidesPerView = 4,
    autoPlayDelay = 3000,
    loop = true,
    showPagination = false,
    showNavigation = true,
}) => {
    
    return (
        <div className="carousel-container">
            <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={slidesPerView}
            loop={loop}
            autoplay={{
                delay: autoPlayDelay,
                disableOnInteraction: false,
            }}
            navigation={showNavigation}
            pagination={showPagination ? { clickable: true } : false}
            >
                {React.Children.map(children, (child: React.ReactNode, index) => (
                    <SwiperSlide key={index}>
                        {child}
                    </SwiperSlide>
                ))}
        
            </Swiper>
        </div>
    )
}

export default Carousel
