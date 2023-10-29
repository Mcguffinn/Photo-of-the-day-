import React, {useState} from "react";
import axiosCall, { api_key } from "../hooks/nasaCall";
import defaultImg from "../images/gradient.jpeg";
import globe from "../images/globe.mp4";
import github from "../images/github-logo.png"
import linkedin from "../images/linkedin.png"
import Image, { Shimmer } from "react-shimmer";
import "../css/ImagePanel.css"

const ImagePanel = () => {

    function getFormattedDate(date) {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, "0");
        let day = date.getDate().toString().padStart(2, "0");
      
        return `${year}-${month}-${day}`;
    }

    const [config, setconfig] = useState({
        method: "GET",
        url: "/planetary/apod",
        params: {
          date: getFormattedDate(new Date()),
          api_key,
        },
      });
    
      const [{ data, loading, error }, api] = axiosCall(config, { manual: true });
    
      const handleSubmit = (e) => {
        e.preventDefault();
        api(config);
        console.log('Hit', data)
      };
    
      const handleChange = (e) => {
        setconfig({
          method: "GET",
          url: "/planetary/apod",
          params: {
            date: e.target.value,
            api_key,
          },
        });
        console.log(e.target.value)
      };


    if (loading){
        return <Image src={defaultImg} fallback={<Shimmer/>}/>
    }

    if(error){
        return (
            <div className="showcase">
                <div className="hero-text">
                    <h3>Uh oh something went wrong!</h3>
                    <div className="result"><Image src={defaultImg} fallback={<Shimmer/>}/></div>
                </div>
            </div>
            
        )
    }
    return (
    <div className="showcase">
        <header className="socials">       
            <ul >
                <li><a href={`${process.env.REACT_APP_GIT_URL}`} target="_blank" rel="noopener noreferrer"> <img src={github} alt="git hub link"/></a></li>
                <li><a href={`${process.env.REACT_APP_LINKED_URL}`} rel="noopener noreferrer"><img src={linkedin} alt="linkedin link"/></a></li>
            </ul>
        </header>
            {data?.media_type === "image" ? (<div className="result"><Image src={data?.url} alt={data.title} fallback={<Shimmer/>}/></div>):(
                <video className ="video-wrap"src={globe} muted loop autoPlay={true}/>
            )}
            
            <div className ="overlay"></div>
        
        <div className="hero-text">
            <h2>Explore the Stars</h2>

            {data == null? (<h3> This is a simple implementation of NASA's
                <a href="https://api.nasa.gov/" target="APOD">
                   {" APOD "}
                </a>
                 api. Enjoy browsing the dataset.
            </h3>): <div/>}
            
        {/* <label htmlFor="picker">Date:</label> */}
        <div className="search">
            <input 
                type="date"
                id="picker"
                name="date"
                min="1970-01-01"
                max={getFormattedDate(new Date())}
                onChange={handleChange}
                />
            
            <button variant="contained" onClick={handleSubmit}>
                Explore
            </button> 
        </div>
          
        <div>
            {data?.media_type != null? <p>{data.explanation}</p> : <p></p>}
        </div>           
        </div>
        
    </div>
    )
}

export default ImagePanel