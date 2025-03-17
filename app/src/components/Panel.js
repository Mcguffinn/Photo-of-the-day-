import React, { useState } from "react";
import axiosCall, { api_key } from "../hooks/nasaCall";
import {
  AccordionSection,
  Container,
  Wrap,
  Dropdown,
} from "../styled/Accordian.js";
import defaultImg from "../images/gradient.jpeg";
import globe from "../images/globe.mp4";
import github from "../images/github-logo.png";
import linkedin from "../images/linkedin.png";
import { Skeleton, IconButton, CircularProgress } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OpacityIcon from '@mui/icons-material/Opacity';
import "../css/ImagePanel.css";

const Panel = (props) => {
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
  const [explanationOpen, setExplanationOpen] = useState(true);
  const [explanationOpacity, setExplanationOpacity] = useState(0.8);

  // Toggle explanation opacity between values
  const toggleOpacity = () => {
    const opacityValues = [0.2, 0.5, 0.8, 1];
    const currentIndex = opacityValues.indexOf(explanationOpacity);
    const nextIndex = (currentIndex + 1) % opacityValues.length;
    setExplanationOpacity(opacityValues[nextIndex]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api(config);
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
  };

  // Preload HD image if available
  const preloadHDImage = (url, hdurl) => {
    if (hdurl && hdurl !== url) {
      const img = new Image();
      img.src = hdurl;
    }
  };

  // Handle image fetch on initial load
  React.useEffect(() => {
    if (data?.url && data?.hdurl && data.hdurl !== data.url) {
      // Preload HD image if available
      preloadHDImage(data.url, data.hdurl);
    }
  }, [data?.url, data?.hdurl]);

  // Custom image component with loading state
  const ImageWithSkeleton = ({ src, alt }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [loadError, setLoadError] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    
    // Simulate load progress for better user experience
    React.useEffect(() => {
      if (!imageLoaded && !loadError) {
        const interval = setInterval(() => {
          setLoadProgress((prev) => {
            // Gradually increase loading progress, maxing at 90% until actual load completes
            if (prev < 90) {
              return prev + Math.random() * 10;
            }
            return prev;
          });
        }, 500);
        
        return () => clearInterval(interval);
      }
    }, [imageLoaded, loadError]);

    return (
      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        {!imageLoaded && (
          <>
            <Skeleton 
              variant="rectangular" 
              width="100%" 
              height="100%" 
              animation="wave" 
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
            <div className="loading-animation">
              {loadError ? (
                <>
                  <div className="error-icon">!</div>
                  <p>Failed to load image</p>
                </>
              ) : (
                <>
                  <CircularProgress 
                    variant="determinate" 
                    value={loadProgress} 
                    size={60} 
                    thickness={4} 
                  />
                  <p>Loading image... {Math.round(loadProgress)}%</p>
                </>
              )}
            </div>
          </>
        )}
        <img 
          src={src} 
          alt={alt || ''} 
          style={{ 
            width: '100%', 
            height: '100%', 
            display: imageLoaded ? 'block' : 'none',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0
          }}
          onLoad={() => {
            setLoadProgress(100);
            setImageLoaded(true);
          }}
          onError={() => {
            setLoadError(true);
            // After 3 seconds, show the image anyway (might be partially loaded)
            setTimeout(() => setImageLoaded(true), 3000);
          }}
        />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="showcase">
        <div className="result">
          <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
          <div className="loading-animation">
            <CircularProgress size={60} thickness={4} />
            <p>Loading NASA's astronomy picture...</p>
          </div>
        </div>
        <div className="overlay" style={{ zIndex: 1 }}></div>
        <div className="hero-text" style={{ zIndex: 2, position: 'relative' }}>
          <h2>Exploring the stars...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    let errorMessage = "Uh oh something went wrong!";
    if (error.response) {
      if (error.response.status === 403) {
        errorMessage = "Authentication failed. Please check your NASA API key in the .env file.";
      } else if (error.response.status === 429) {
        errorMessage = "Rate limit exceeded. The DEMO_KEY has a limited number of requests per hour.";
      } else if (error.response.status === 400 && error.response.data?.msg) {
        // If API returns a specific error message (e.g., date format issues)
        errorMessage = `API Error: ${error.response.data.msg}`;
      } else {
        errorMessage = `Error ${error.response.status}: ${error.response.statusText}`;
      }
    }
    
    return (
      <div className="showcase">
        <div className="hero-text">
          <h3>{errorMessage}</h3>
          <p>Try a different date or check the console for more details.</p>
          <div className="result">
            <ImageWithSkeleton src={defaultImg} alt="Default image" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="showcase">
      <header className="socials">
        <ul>
          <li>
            <a
              href="https://github.com/Mcguffinn/Photo-of-the-day-"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <img src={github} alt="git hub link" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/edwin-deronvil-ab9499177/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="linkedin link" />
            </a>
          </li>
        </ul>
      </header>

      <div className="overlay" style={{ zIndex: 1 }}></div>

      <div className="hero-text" style={{ zIndex: 2, position: 'relative' }}>
        <a href=".">
          <h2>Explore the Stars</h2>
        </a>

        {data == null ? (
          <h3>
            {" "}
            This is a simple implementation of NASA's
            <a href="https://api.nasa.gov/" target="APOD">
              {" APOD "}
            </a>
            api. Enjoy browsing the dataset.
          </h3>
        ) : (
          <div />
        )}

        <div className="search">
          <input
            type="date"
            id="picker"
            name="date"
            min="1970-01-01"
            max={getFormattedDate(new Date())}
            onChange={handleChange}
          />

          <button onClick={handleSubmit}>
            Explore
          </button>
        </div>
      </div>

      {data?.media_type === "image" ? (
        <div className="result" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <ImageWithSkeleton src={data?.hdurl || data?.url} alt={data?.title} />
        </div>
      ) : (
        <video className="video-wrap" src={globe} muted loop autoPlay={true} style={{ zIndex: 0 }} />
      )}

      {data?.explanation && (
        <div 
          className={`explanation-container ${!explanationOpen ? 'collapsed' : ''}`}
          style={{ opacity: explanationOpacity }}
        >
          <div className="explanation-controls">
            <IconButton 
              onClick={() => setExplanationOpen(!explanationOpen)} 
              className="toggle-button"
              aria-label={explanationOpen ? "Collapse explanation" : "Expand explanation"}
            >
              {explanationOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
            <IconButton 
              onClick={toggleOpacity}
              className="opacity-button" 
              aria-label="Toggle opacity"
            >
              <OpacityIcon />
            </IconButton>
          </div>
          <div className="explanation-content">
            <h3 className="explanation-title">{data.title}</h3>
            <p>{data.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Panel;
