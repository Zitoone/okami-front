import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

export type CarouselProps = {
    children: React.ReactNode //N'importe quel élément du carousel
    autoPlayDelay?: number
    loop?: boolean
    showPagination?: boolean
    showNavigation?: boolean    
}

const Carousel: React.FC<CarouselProps> = ({
    children,
    autoPlayDelay = 3000,
    loop = true,
    showPagination = false,
    showNavigation = true,
// = valeur par défaut si aucune valeur n'est passée
    
}) => {
    
    return (
        <div className="carousel-container">
            <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={2}
            loop={loop}
            autoplay={autoPlayDelay ? { delay: autoPlayDelay, disableOnInteraction: true} : false} //s'arrête quand on clic dessus
            navigation={showNavigation}
            pagination={showPagination ? { clickable: true } : false}
            breakpoints={{ //Change le nombre de slide selon la taille d'écran
            1280: { slidesPerView: 4 },
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 },
            }}
            
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
