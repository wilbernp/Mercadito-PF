import React, {useEffect, useState} from 'react';
import "./Slider.scss";
import sliderData from './Slider-data';



const Slider=() =>{

    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = sliderData.length;
  
    const autoScroll = true;
    let slideInterval;
    let intervalTime = 5000;
  
    const nextSlide = () => {
      setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
      console.log("next");
    };
  
    // const prevSlide = () => {
    //   setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    //   console.log("prev");
    // };
  
    function auto() {
      slideInterval = setInterval(nextSlide, intervalTime);
    }
  
    useEffect(() => {
      setCurrentSlide(0);
    }, []);
  
    useEffect(() => {
      if (autoScroll) {
        auto();
      }
      return () => clearInterval(slideInterval);
    }, [currentSlide]);

    
    return (
        <div  className='slider' >
            {/* flechas next and prev     */}
            {/* <a className='arrow prev' onclick={prevSlide}>❮</a>
            <a className='arrow next' onclick={nextSlide}>❯</a> */}
            
            <div className='sliderContainer'>
            
            { sliderData.map((slide, index)=> {
                return (
                    <div className={index===currentSlide? 'slide current': 'slide'} key={index}>

                        {index=== currentSlide &&(
                            <div>
                                <img src={slide.image} className='image' />
                                <div className='content'> 
                                    <h3>{slide.heading}</h3>
                                    <h5>{slide.desc}</h5>
                                    <a href='#'>{slide.button}</a>
                                </div>
                            </div>
                        )}

                    </div>              
                );
            })}
                
                {/* <div className='numbertext'>1/4</div> */}
            </div>
                    
                {/* <div className='dotsContainer'>
                    <span className='dot' onclick="currentSlide(1)"></span>
                    <span className='dot' onclick="currentSlide(2)"></span>
                    <span className='dot' onclick="currentSlide(3)"></span>
                    <span className='dot' onclick="currentSlide(4)"></span>
                </div> */}
        </div>


    )
}
export default Slider;
