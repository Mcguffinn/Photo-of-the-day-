import React, { Fragment, useState } from 'react';
import './App.css';
import defaultImg from "./images/default.jpg";
import nasaCall, {api_key} from "./hooks/nasaCall";


function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  
  const requestConfig = {
    method: "GET",
    url: "/planetary/apod",
    params: {
      date: selectedDate,
      api_key,
    },
  };

  const [{ data, loading, error }] = nasaCall(requestConfig, {
    manual: selectedDate === null,
  });

  const handleSubmit = e =>{
 
  }

  const handleChange = (e) => {
    setSelectedDate(e.target.value);
    console.debug("Date Changed:", selectedDate);
  };

  if (loading) return "null";
  if (error) return "null";

  return (
    <div className="container">
      
      <div className="hero-image">
        <section className="masthead" role="img" aria-label="Image Description">
          <h1>Call to the Stars</h1>
            {!data && <img src={defaultImg} alt="space"/>}
            {data?.media_type === "image" && <img src={data?.url} alt="space"/>}
            <div style={{backgroundImage: data?.url}}></div>
          <pre>
            <code>{JSON.stringify({ data, selectedDate }, null, 2)}</code>
          </pre>
        </section>
        
      </div>
      
      <div>
        <input  
            type="date"
            id="picker"
            name="date"
            min="1970-01-01"
            max={getFormattedDate(new Date())}
            onChange={handleChange}
          />
            <button type="submit">Explore</button>
      </div>
    </div>
  );
}

export default App;
