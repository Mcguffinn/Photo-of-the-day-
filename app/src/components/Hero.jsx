import React, { useState }  from 'react'
import Image, { Shimmer } from "react-shimmer";
import globe from "../images/globe.mp4";
import {
    AccordionSection,
    Container,
    Wrap,
    Dropdown,
  } from "../styled/Accordian.js";

  const [clicked, setClick] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    api(config);
  };
const Hero = ( props ) => {
  return (
    <div>
        {props.data?.media_type === "image" ? (
        <div className="result">
          <Image src={props.data?.url} alt={props.data?.title} fallback={<Shimmer />} />
        </div>
        ) : (
        <video className="video-wrap" src={globe} muted loop autoPlay={true} />
        )}

        <AccordionSection>
          <Container>
            {data?.media_type != null ? (
              <>
                <Wrap
                  onClick={() =>
                    clicked === false ? setClick(true) : setClick(false)
                  }
                >
                  <h1>{data.title}</h1>
                </Wrap>
                {clicked === true ? (
                  <Dropdown>
                    <p>{data.explanation}</p>
                  </Dropdown>
                ) : null}
              </>
            ) : (
              <p></p>
            )}
          </Container>
        </AccordionSection>
    </div>
  )
}

export default Hero