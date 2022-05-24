import { useState, useEffect } from 'react'
import './Slider.scss'
import { sliderData } from './slider-data'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const slideLength = sliderData.length;
    // slideLength = 1 2 3
    // currentSlide = 0 1 2

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    };

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    };

    const autoScroll = true;
    let slideInterval;
    let intervalTime = 5000;

    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    useEffect(() => {
        setCurrentSlide(0)
    }, [])

    useEffect(() => {
        if (autoScroll) {
            auto();
        }
        return () => {
            clearInterval(slideInterval);
        }
    }, [currentSlide])


  return (
    <div className="slider">
        <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
        <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />

        {sliderData.map((slide, index) => {
            return (
                <div className={index === currentSlide ? "slide current" : "slide"} key={index}>
                    {index === currentSlide && (
                        <>
                        <img src={slide.image} alt='slide' className='image' />
                        <div className='content'>
                            <h2>{slide.heading}</h2>
                            <p>{slide.desc}</p>
                            <button className='--btn --btn-primary'>
                                Get Started
                            </button>
                        </div>
                        </>
                    )}
                </div>
            )
        })}
    </div>
  )
}

export default Slider