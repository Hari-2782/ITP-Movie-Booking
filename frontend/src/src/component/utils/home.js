import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import MovieCarousel from './moviecard/movieCarousel';

const HomeSlider = () => {

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [banners, setBanners] = useState([
        {
            imgUrl: 'https://res.cloudinary.com/dbv2awceg/image/upload/v1712662659/6a9a64566cc20e911ce140e6f462af8e_xhu4mf.jpg'
        },
        {
            imgUrl: 'https://res.cloudinary.com/dbv2awceg/image/upload/v1712662661/main_f4hueu.jpg'
        },
        {
            imgUrl: 'https://res.cloudinary.com/dbv2awceg/image/upload/v1712662662/main1_iq5r3s.jpg'
        },
        {
            imgUrl: 'https://res.cloudinary.com/dbv2awceg/image/upload/v1712662659/main_yzh6a6.jpg'
        },
        {
            imgUrl: 'https://res.cloudinary.com/dbv2awceg/image/upload/v1712687242/Screenshot_2024-04-09_235324_hijmtg.png'
        }
    ]);

    const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 11500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {banners.map((banner, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={banner.imgUrl}
                            alt=""
                            width={width}
                            height={height}
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div>
                <h1>Now showing</h1>
                <MovieCarousel />
            </div>
            <div>
                <h1>Now showing</h1>
                <MovieCarousel />
            </div>
            <div>
                <h1>Now showing</h1>
            </div>
            <div>
                <h1>Now showing</h1>
                <MovieCarousel />
            </div>
            <br />
            
        </div>
    );
};

export default HomeSlider;
