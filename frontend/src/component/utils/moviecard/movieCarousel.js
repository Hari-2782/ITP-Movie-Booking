import React, { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import MovieCard from './moviecard';

const MovieCarousel = () => {
    // const [user, setUser] = useState(null);
    const [movies, setMovies] = useState([]);

    // const getuser = async () => {
    //     fetch(`http://localhost:8000/auth/getuser`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         credentials: 'include'
    //     })
    //     .then((res) => res.json())
    //     .then((response) => {
    //         if (response.ok) {
    //             setUser(response.data);
    //         } else {
    //             window.location.href = "/auth/signin";
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }

    const getMovies = async () => {
        fetch(`http://localhost:8000/movie/getall`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.ok) {
                setMovies(data.data);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        getMovies();
        // getuser();
    }, []);

    return (
        <div className='sliderout'>
            {movies &&  (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={1}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        '@0.00': {
                            slidesPerView: 1,
                            spaceBetween: 2,
                        },
                        '@0.75': {
                            slidesPerView: 2,
                            spaceBetween: 2,
                        },
                        '@1.00': {
                            slidesPerView: 3,
                            spaceBetween: 2,
                        },
                        '@1.50': {
                            slidesPerView: 6,
                            spaceBetween: 2,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {movies.map((Movie) => (
                        <SwiperSlide key={Movie._id}>
                            <MovieCard
                                Movie={Movie}
                                
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default MovieCarousel;
