import React from 'react';
import DatePicker from 'react-horizontal-datepicker';
import { useNavigate, useParams } from 'react-router-dom';
import './BuyTicketsPage.css';

const BuyTicketsPage = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedTime, setSelectedTime] = React.useState(null);
    const [movie, setMovie] = React.useState(null);
    const [theatres, setTheatres] = React.useState(null);

    const { movieid } = useParams(); // Replace with your movie id
    // const { title } = useParams(); // Replace with your title

    const getMovie = async () => {
        fetch(`http://localhost:8000/movie/get/${movieid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    setMovie(data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getTheatres = async () => {
        if (selectedTime) {
            try {
                const res = await fetch(`http://localhost:8000/screen/schedule/${selectedDate}/${selectedTime}/${movieid}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                const data = await res.json();
                if (data.success) {
                    setTheatres(data.data);
                } else {
                    setTheatres(null); // Set theatres to null if data.success is false
                    console.log("Error:", data.message); // Log the error message
                }
            } catch (error) {
                console.log("Fetch error:", error); // Log any fetch errors
            }
        } else {
            setTheatres(null); // Reset theatres to null if no time is selected
        }
    };
    

    const handleSelectTime = (time) => {
        setSelectedTime(time);
    };

    React.useEffect(() => {
        getMovie();
    }, []);

    React.useEffect(() => {
        if (selectedTime) {
            getTheatres(selectedDate, selectedTime);
        }
    }, [selectedTime, selectedDate]);
    
    return (
        <>
            {movie && (
                <div className='buytickets'>
                    <div className='s1'>
                        <div className='head'>
                            <h1>{movie.title} - Tamil</h1>
                            <h3>{movie.genre.join(',')}</h3>
                        </div>
                        <DatePicker
                            getSelectedDay={(date) => {
                                setSelectedDate(date);
                            }}
                            endDate={80}
                            selectDate={selectedDate}
                            labelFormat={'MMMM'}
                            color={'rgb(1, 9, 48)'}
                        />
                    <div className='time'>
                        <h2>Show Times:</h2>
                            <div className="time-boxes">
                            <div className="time-box" onClick={() => handleSelectTime('7:30')}>7:30 AM</div>
                               <div className="time-box" onClick={() => handleSelectTime('10:30')}>10:30 AM</div>
                               <div className="time-box" onClick={() => handleSelectTime('2:30')}>2:30 PM</div>
                               <div className="time-box" onClick={() => handleSelectTime('6:30')}>6:30 PM</div>
                               <div className="time-box" onClick={() => handleSelectTime('9:30')}>9:30 PM</div>
                            </div>
                       </div>


                    </div>

                    {theatres && theatres.length > 0 && (
                          <div className='screens'>
                           {theatres.map((screen, index) => {
                                 let screenid = screen._id;
                                      return (
                                       <div className='screen' key={index}>
                                                <div>
                                           <h2>{screen.name}</h2>
                                               <h3>{screen.screenType}</h3>
                                       </div>
                                        <button
                                            onClick={() => {navigate(`/seat-layout/${movieid}/${screenid}/${selectedDate}`)}}
                                            className='theme_btn1 linkstylenone'
                                        >
                                            Select
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default BuyTicketsPage;
